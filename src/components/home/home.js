import React from 'react';
import css from './home.module.css';
import Usuario from '../usuario/index'

class Usuarios extends React.Component {

  componentDidMount = () => {
      this.props.fetchUsuarios();
  }

  render() {
    return (
      <div className={css.app}>
        <div className={css.container}>
          <button className={css.button} onClick={this.loginLogout}>{this.props.logged ? "Logout" : "Iniciar Sesión"}</button>        
          <section className={css.listSection}>    
          {!this.props.isFetchingUsuarios && !this.props.fail && <span className={css.listTitle}>Lista de Usuarios:</span>}
          {this.props.isFetchingUsuarios && <span className={css.listTitle}>Cargando Usuarios...</span>} 
          {this.props.fail && <span className={css.listTitle}>Error al cargar usuarios...</span>}
            {
              this.props.usuarios.map((usuario) => {
                return <Usuario key={usuario.id} item={usuario}/>
              })
            }
          </section>
          <button hidden={!this.props.logged} className={css.button} onClick={this.addUsuario}>Agregar Usuario</button>
        </div>
      </div>
    );
  }

  loginLogout = () => {
    if (this.props.logged) {
      this.props.history.push('/home')
    } else {
      this.props.history.push("/login")
    }
  }

  addUsuario = () => {
    this.props.history.push("/formulario")
  }
}


export default Usuarios;