import Productos from './home'
import { connect } from 'react-redux'
import { fetchUsuarios } from '../../redux'
import { logout } from '../../redux/modulos/auth'

const mapStateToProps = (store) => {
    return {
        usuarios: store.usuarios.lista,
        isFetchingUsuarios: store.usuarios.isFetchingUsuarios,
        fail: store.usuarios.fail,
        logged: store.auth.logged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsuarios: () => dispatch(fetchUsuarios()),
        logout:() => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos)