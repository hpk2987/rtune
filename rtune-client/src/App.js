import './App.css';
import React from 'react';
import List from './List';
import Searchbox from './Searchbox';
import Playing from './Playing';
import Controls from './Controls';
import Alerts from './Alerts'
import Favoritos from './Favoritos'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      radios: [],
      errors: [],
      favoritos: []
    }
  }

  componentDidMount() {
    this.updateNowPlaying()
    this.fetchFavoritos();
  }

  render() {
    return (
      <div className='container mt-2'>
        <Alerts alerts={this.state.errors}></Alerts>
        <Playing nowPlaying={this.state.nowPlaying}></Playing>
        <Controls nowPlaying={this.state.nowPlaying}
          onVolume={e => this.handleVolume(e)}
          onStop={() => this.handleStop()}></Controls>
        <hr />
        <Searchbox query={this.state.query} onSearch={q => this.handleSearch(q)} />
        <hr />
        <div className='d-flex align-items-baseline justify-content-start'>
          <i className='radios-header fa-solid fa-radio'></i>
          <h5 className='me-2'>Radios encontradas</h5>
          <button type='button'
            title='Ver favoritos'
            className='btn btn-sm btn-secondary rounded-circle'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasFavoritos'
            aria-controls='offcanvasFavoritos'>
            <i className='fa-solid fa-star'></i>
          </button>
        </div>
        <List value={this.state.radios}
          favoritos={this.state.favoritos}
          onAgregarFavorito={x => this.handleAgregarFavorito(x)}
          onEliminarFavorito={x => this.handleEliminarFavorito(x)}
          onPlay={id => this.handlePlay(id)} />
        <Favoritos id='offcanvasFavoritos'
          favoritos={this.state.favoritos}
          onAgregarFavorito={x => this.handleAgregarFavorito(x)}
          onEliminarFavorito={x => this.handleEliminarFavorito(x)}
          onPlay={id => this.handlePlay(id)}></Favoritos>
      </div>
    )
  }

  handleAgregarFavorito(x) {
    const favs = this.state.favoritos.slice(0);
    favs.push(x);
    this.saveFavoritos(favs)
  }

  handleEliminarFavorito(x) {
    const favs = this.state.favoritos.filter(y => y !== x);
    this.saveFavoritos(favs)
  }

  handleVolume(val) {
    console.log('VOLUMEN ' + val);
    fetch(`/api/now_playing/volume`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ volumen: val })
      })
      .then(res => this.checkAndConvert(res))
      .then(res => this.setState({ ...this.state, nowPlaying: res }))
      .catch(this.addError())
  }

  checkAndConvert(res) {
    if (res.status !== 200) {
      return new Promise((r, e) => e(`Ocurrió un error, status=${res.status}`))
    }
    return res.json();
  }

  check(res) {
    if (res.status !== 200) {
      return new Promise((r, e) => e(`Ocurrió un error, status=${res.status}`))
    }
  }

  updateNowPlaying() {
    fetch(`/api/now_playing`)
      .then(res => this.checkAndConvert(res))
      .then(res => this.setState({ ...this.state, nowPlaying: res }))
      .catch(this.addError())
  }

  handleStop() {
    fetch(`/api/now_playing/stop`)
      .then(res => this.checkAndConvert(res))
      .then(res => this.setState({ ...this.state, nowPlaying: res }))
      .catch(this.addError())
  }

  handlePlay(id) {
    fetch(`/api/${id}/play`)
      .then(res => this.checkAndConvert(res))
      .then(res => this.setState({ ...this.state, nowPlaying: res }))
      .catch(this.addError())
  }

  handleSearch(nquery) {
    this.setState({ ...this.state, query: nquery })
    this.fetchRadios(nquery)
  }

  fetchRadios(query) {
    fetch('/api?query=' + query)
      .then(res => this.checkAndConvert(res))
      .then(data => this.setState({ ...this.state, radios: data }))
      .catch(this.addError())
  }

  fetchFavoritos() {
    fetch('/api/favoritos')
      .then(res => this.checkAndConvert(res))
      .then(data => this.setState({ ...this.state, favoritos: data }))
      .catch(this.addError())
  }

  saveFavoritos(favs) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoritos: favs })
    };
    fetch('/api/favoritos', requestOptions)
      .then(res => this.checkAndConvert(res))
      .then(data => this.setState({ ...this.state, favoritos: data }))
      .catch(this.addError())
  }

  addError() {
    return err => this.setState({ ...this.state, errors: [...this.state.errors, err] })
  }
}

export default App;
