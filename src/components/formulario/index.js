import Formulario from './formulario'
import { connect } from 'react-redux'
import { addUsuario, editUsuario} from '../../redux/index'
import {reduxForm} from 'redux-form'


const onSubmit = (values, dispatch) => {
    if (!values.id) {
        dispatch(addUsuario(values.nombre, values.email))
    } else {
        dispatch(editUsuario(values.id, values.nombre, values.email))
    }
}

const mapStateToProps = (store) => {
    return {
        usuarios: store.usuarios.lista,
        logged: store.auth.logged
    }
}

const reduxFormConfig = {
    form: 'formUsuario',
    onSubmit
}

export default connect(mapStateToProps)(reduxForm(reduxFormConfig)(Formulario))