import React from 'react';

class Playing extends React.Component {

  truncate(str, n) {
    return str
      ? (str.length > n) ? str.substr(0, n - 1) + '...' : str
      : str;
  }

  render() {
    return (
      !this.props.nowPlaying || this.props.nowPlaying.nombre === ''
        ? <div></div>
        : <table className='table table-light playing-control'>
          <tbody>
            <tr>
              <td width='5%'>
                <i className='fa-solid fa-music'></i>
              </td>
              <td>
                <span title={this.props.nowPlaying.url}>
                  {this.props.nowPlaying.nombre}
                </span>
              </td>
              <td>
                {this.props.nowPlaying.lugar}
              </td>
              <td>
                {this.truncate(this.props.url,40)}
              </td>
            </tr>
          </tbody>
        </table>
    )
  }
}

export default Playing;