import React from 'react';

class Searchbox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: props.query
    }
  }

  render() {
    return (
      <div>
        <form className="form form-inline" onSubmit={e => this.handleSubmit(e)}>
          <div className="input-group mb-3">
            <input className="form-control form-control-sm" placeholder='Buscar radios por nombre/descripción/lugar' type="text" name="query" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-sm btn-outline-primary "><i className="fa fa-search" title="Buscar"></i></button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  handleSubmit(event) {
    this.setState({ query: event.target.query.value })
    this.props.onSearch(event.target.query.value)
    event.preventDefault()
  }
}

export default Searchbox;