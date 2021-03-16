import React from 'react'
import css from './producto.module.css'


class Producto extends React.Component {
        
    render = () => {
        return (
            <div className={css.counter}>
                <span className={css.label}>
                    <b>Nombre:</b> {this.props.item.nombre}<br></br>
                    <b>Email:</b> {this.props.item.email}<br></br>
                </span>
                <button hidden={!this.props.logged} className={css.button} onClick={this.editarUsuario}>Editar</button>
                <button hidden={!this.props.logged} className={css.button} onClick={this.deleteUsuario}>Eliminar</button>
            </div>
        )
    }

    editarUsuario = () => {
      this.props.history.push("/formulario/"+this.props.item.id)
    }
    deleteUsuario = () => {
        this.props.borrarUsuario(this.props.item.id);
    }
}
export default Producto