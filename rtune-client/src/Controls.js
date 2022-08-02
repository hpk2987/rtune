import React from 'react';

class Controls extends React.Component {

  handleEvent = (e) => {
    this.props.onVolume(parseInt(e.target.value))
  }

  render() {
    return (
      !this.props.nowPlaying || this.props.nowPlaying.nombre === ''
        ? <div></div>
        : <table className='table table-light'>
          <tbody>
            <tr>
              <td width='5%'>
                <i className='fa-solid fa-volume-high'></i>
              </td>
              <td width='5%'>
                <label className="form-label">{this.props.nowPlaying.volumen}</label>
              </td>
              <td>
                <form>
                  <input type='range' id='volumen' className='form-range'
                    defaultValue={this.props.nowPlaying.volumen}
                    onMouseUp={this.handleEvent}
                    onTouchEnd={this.handleEvent} />
                </form>
              </td>
              <td width='5%' align='center'>
                <button type='button' title='Detener' className='btn btn-sm btn-danger' onClick={e => this.props.onStop()}>
                  <i className='fa-solid fa-pause'></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    )
  }
}

export default Controls;