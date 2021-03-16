import Producto from './producto'
import { connect } from 'react-redux'
import { deleteUsuario} from '../../redux/index'

const mapStateToProps = (store) => {
    return {
        logged: store.auth.logged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {        
        borrarUsuario: (id) => dispatch(deleteUsuario(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Producto)