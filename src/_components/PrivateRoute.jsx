import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )

class PrivateRouteContainer extends React.Component {
  render() {
    const {
      component: Component,
      ...props
    } = this.props

    return (
      <Route
        {...props}
        render={props =>
          localStorage.getItem('user')
            ? <Component {...props} />
            : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
          )
        }
      />
    )
  }
}


export const PrivateRoute = connect()(PrivateRouteContainer)