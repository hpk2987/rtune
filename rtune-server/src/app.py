import requests
import os
import subprocess
from flask import Flask, request, render_template, send_from_directory
import json

DEV_MODE="DEV_MODE" in os.environ

if DEV_MODE:
  print(' * DEV_MODE ON')

app = Flask(__name__)

DB_FILE='./db.json'
DB = {
  'favoritos':[]
}

def load_db():
  with open(DB_FILE) as json_file:
    val = json.load(json_file)
    DB['favoritos'] = val['favoritos']
def write_db():
  with open(DB_FILE, "w") as outfile:
      json.dump(DB, outfile)
def init_db():
  if not os.path.exists(DB_FILE):
    with open(DB_FILE, 'w'): pass
    write_db()
  else:
    load_db()

def clear_now():
  now_playing['nombre']=NOT_PLAYING_NOW['nombre']
  now_playing['lugar']=NOT_PLAYING_NOW['lugar']
  now_playing['url']=NOT_PLAYING_NOW['url']
  now_playing["volumen"]=NOT_PLAYING_NOW['volumen']

init_db()

# Especificacion no oficial del api obtenida desde
# https://github.com/TheLastZombie/Radio-Garden-API

API_URI='https://radio.garden/api'
RADIO_SCRIPT="/home/hernan/.local/bin/aspen"
CHANGE_VOL_SCRIPT="/home/hernan/.local/bin/change_app_vol"

NOT_PLAYING_NOW={
  'nombre':'',
  'lugar':'',
  'url':'',
  'volumen':28
}
now_playing=NOT_PLAYING_NOW.copy()

@app.route("/")
def home():
  return render_template('index.html')

@app.route("/manifest.json")
def manifest():
  return send_from_directory('./static', 'manifest.json')

@app.route('/favicon.ico')
def favicon():
  return send_from_directory('./static', 'favicon.ico')

@app.route('/api', methods=['GET'])
def get_radios():
  if 'query' in request.args:
    print('Request {query: ' + request.args.get('query') + '}')
    json_data=requests.get(API_URI+'/search?q='+request.args.get('query')).content
    data=json.loads(json_data)
    results=[]
    for hit in data.get('hits').get('hits'):
      if hit.get('_source').get('type') == 'channel':
        url = hit.get('_source').get('url')
        results.append({
          'lugar': hit.get('_source').get('subtitle'),
          'nombre': hit.get('_source').get('title'),
          'id': url[url.rindex('/')+1:len(url)]
        })
    return json.dumps(results)
  else:
    return '{}'

@app.route('/api/favoritos', methods=['GET'])
def get_favoritos():
  return json.dumps(DB['favoritos'])

@app.route('/api/favoritos', methods=['POST'])
def post_cambiar_favoritos():
  if(request.is_json):
    DB['favoritos']=request.json['favoritos']
    write_db()

  return json.dumps(DB['favoritos'])

@app.route('/api/now_playing', methods=['GET'])
def get_now_playing():
  return json.dumps(now_playing)

@app.route('/api/now_playing/stop', methods=['GET'])
def stop_now_playing():
  if not DEV_MODE:
    subprocess.run([RADIO_SCRIPT, 'stop'], stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  clear_now()
  return json.dumps(now_playing)

@app.route('/api/clear', methods=['GET'])
def clear_playing():
  clear_now()
  return json.dumps(now_playing)

@app.route('/api/now_playing/volume', methods=['POST'])
def change_volume_now_playing():
  data=json.loads(request.data)
  now_playing["volumen"]=data["volumen"]
  if not DEV_MODE:
    subprocess.run([CHANGE_VOL_SCRIPT,"MPlayer",str(data["volumen"])],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  return json.dumps(now_playing)

@app.route('/api/<id>/play', methods=['GET'])
def play_radio(id):
  url=API_URI+'/ara/content/listen/'+id+'/channel.mp3'
  r=requests.get(url, allow_redirects=False)
  radio_url=r.headers['Location']
  print(r.status_code,radio_url)
  
  if not DEV_MODE:
    subprocess.run([RADIO_SCRIPT, radio_url,str(now_playing["volumen"])], stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  
  # Fill now_playing
  json_data=requests.get(API_URI+'/ara/content/channel/'+id).content
  data=json.loads(json_data)
  now_playing['nombre']=data['data']['title']
  now_playing['lugar']=data['data']['place']['title']
  now_playing['url']=radio_url

  return json.dumps(now_playing)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
