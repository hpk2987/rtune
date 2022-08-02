import './Alerts.css'
import React from 'react';
import Expire from './Expire'

class Controls extends React.Component {

  render() {
    return (
      !this.props.alerts || this.props.alerts.length === 0
        ? <div></div>
        : <ul className='alert-list'>
          {this.props.alerts.map(alert =>
            <li key="{alert}">
              <Expire delay={5000}>
                <div className="alert alert-danger" role="alert">
                  {alert}
                </div>
              </Expire>
            </li>
          )}
        </ul>
    )
  }
}

export default Controls;