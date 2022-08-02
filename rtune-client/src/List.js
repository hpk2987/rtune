import React from 'react';

class List extends React.Component {
  esFavorito(id) {
    return this.props.favoritos.find(x => x.id === id);
  }

  alternarFavorito(x) {
    this.esFavorito(x.id)
      ? this.props.onEliminarFavorito(x)
      : this.props.onAgregarFavorito(x);
  }

  render() {
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Lugar</th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.value
              .map(x =>
                <tr key={x.id}>
                  <td>{x.lugar}</td>
                  <td>{x.nombre}</td>
                  <td>
                    <div className="d-flex">
                      <button type='button'
                        className='btn btn-sm btn-secondary me-2'
                        title={(this.esFavorito(x.id) ? 'Eliminar favorito' : 'Agregar favorito')}
                        onClick={() => this.alternarFavorito(x)}>
                        <i className={'fa-solid ' + (this.esFavorito(x.id) ? 'fa-minus' : 'fa-star')}></i>
                      </button>
                      <button type='button' className='btn btn-sm btn-primary' onClick={() => this.props.onPlay(x.id)}>
                        <i className='fa-solid fa-circle-play'></i>
                      </button>
                    </div>
                  </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default List;