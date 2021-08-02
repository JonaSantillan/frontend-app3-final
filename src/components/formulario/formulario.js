import React from 'react'
import css from './formulario.module.css'
import { Field } from 'redux-form'

class Formulario extends React.Component {

  render = () => {
      return (
          <div className={css.app}>
          <div className={css.container}>
            <section className={css.addSection}>  
              <div className={css.informationSection}>
                  <span className={css.titleAlumno}>Datos del Usuario:</span>
                  <Field name="id" className={css.hiddenInput} component="input" type="text" />
                  <Field placeholder="Nombre" name="name" className={css.input} component="input" type="text" />
                  <Field placeholder="Email" name="email" className={css.input} component="input" type="text" />
                  <button id="saveButton" className={css.buttonSave} onClick={this.saveNewUsuario}>Guardar Información</button>
              </div>
            </section>
            <button 
                className={css.button} 
                onClick={() => {
                        this.props.history.push('/');
                    }}>
                    Volver
            </button>
          </div>
        </div>
      )
  }

  saveNewUsuario = () => {
      this.props.handleSubmit();
      this.props.history.push('/');
  }
}
export default Formulario

/* componentWillMount = () => {
    
  if (!this.props.logged) {
    this.props.history.push('/');
  }
  if (this.props.match.params.id) {
    let usuarioEditado = this.props.usuarios.filter(obj => 
    {
      return obj.id === this.props.match.params.id
    })
    if (usuarioEditado) {
      this.props.initialize({ 
        id: usuarioEditado[0].id,
        name: usuarioEditado[0].name,
        email: usuarioEditado[0].email,
      });
    }
  }
}*/