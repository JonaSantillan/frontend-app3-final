import React from 'react'
import { Field } from 'redux-form'
import css from './login.module.css'

const TextInput = (props) => {
  return (<input 
    className={css.input}
    type={props.type}
    {...props.input} 
  />)
}

class Login extends React.Component {

  componentDidUpdate = () => {
    if(this.props.logged) {
      this.props.history.push('/')
    }
  }

  render = () => {
    return (
      <div className={css.app}>
        <div className={css.container}>
          <div className={css.title}>Login</div>
            <Field name="email" component={TextInput} type="text" />
            <Field name="password" component={TextInput} type="password" />
            <div className={css.error}>{this.props.messageError}</div>
          <button
            type="button"
            className={css.button}
            onClick={this.props.handleSubmit}
          >
            {this.props.isFetching ? "Cargando" : "Iniciar sesión"}
          </button>
        </div>
      </div>
    )
  }
}

export default Login