import Usuarios from './usuarios'
import { connect } from 'react-redux'
import { deleteUsuario} from '../../redux/index'

const mapStateToProps = (store) => {
    return {
        logged: store.auth.logged,
        usuarios: store.usuarios.lista,
        isFetchingUsuarios: store.usuarios.isFetchingUsuarios,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {        
        borrarUsuario: (id) => dispatch(deleteUsuario(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios)