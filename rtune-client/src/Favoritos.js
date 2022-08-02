
import './Favoritos.css';
import React from 'react';
import List from './List';

class Favoritos extends React.Component {
  hideAndPlay(id) {
    window.bootstrap.Offcanvas.getInstance(
      document.getElementById(this.props.id))
      .hide();

    this.props.onPlay(id)
  }

  render() {
    return (
      <div className="offcanvas offcanvas-bottom offcanvas-favoritos"
        tabIndex="-1"
        id={this.props.id}
        aria-labelledby="offcanvasFavoritos">
        <div className="offcanvas-header">
          <div className='d-flex align-items-center justify-content-start'>
            <div className='btn btn-sm btn-secondary rounded-circle me-2'>
              <i className='fa-solid fa-star'></i>
            </div>
            <h5 className="offcanvas-title" id="offcanvasFavoritos">Favoritos</h5>
          </div>
          <button type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {this.props.favoritos.length === 0
            ? <div>Todavia no se marcó ningún favorito</div>
            : <List value={this.props.favoritos}
              favoritos={this.props.favoritos}
              onAgregarFavorito={x => this.props.onAgregarFavorito(x)}
              onEliminarFavorito={x => this.props.onEliminarFavorito(x)}
              onPlay={id => this.hideAndPlay(id)} />}
        </div>
      </div>
    )
  }
}

export default Favoritos;