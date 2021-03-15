import React from 'react'
import css from './formulario.module.css'
import { Field } from 'redux-form'

class Formulario extends React.Component {

  componentWillMount = () => {
    
    if (!this.props.logged) {
      this.props.history.push('/');
    }
    if (this.props.match.params.id) {
      let productoEditado = this.props.productos.filter(obj => {
        return obj._id === this.props.match.params.id
      })
      if (productoEditado) {
        this.props.initialize({ 
          _id: productoEditado[0]._id,
          nombre: productoEditado[0].nombre,
          descripcion: productoEditado[0].descripcion,
          precio: productoEditado[0].precio,
        });
      }
    }
  }

  render = () => {
      return (
          <div className={css.app}>
          <div className={css.container}>
            <section className={css.addSection}>  
              <div className={css.informationSection}>
                  <span className={css.titleAlumno}>Producto:</span>
                  <Field name="_id" className={css.hiddenInput} component="input" type="text" />
                  <Field placeholder="Nombre" name="nombre" className={css.input} component="input" type="text" />
                  <Field placeholder="Descripción" name="descripcion" className={css.input} component="input" type="text" />
                  <Field placeholder="Precio" name="precio" className={css.input} component="input" type="text" />
                  <button id="saveButton" className={css.buttonSave} onClick={this.saveNewProducto}>Guardar Información</button>
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

  saveNewProducto = () => {
      this.props.handleSubmit();
      this.props.history.push('/');
  }
}
export default Formulario