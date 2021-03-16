import Formulario from './formulario'
import { connect } from 'react-redux'
import { addUsuario, editUsuario} from '../../redux/index'
import {reduxForm} from 'redux-form'


const onSubmit = (values, dispatch) => {
    dispatch(addUsuario(values.name, values.email))
    
    if (values.id) {
        dispatch(editUsuario(values.id, values.name, values.email))
    }
}

const mapStateToProps = (store) => {
    return {
        logged: store.auth.logged
    }
}

const reduxFormConfig = {
    form: 'formUsuario',
    onSubmit
}

export default connect(mapStateToProps)(reduxForm(reduxFormConfig)(Formulario))

/* usuarios: store.usuarios.lista,
        isFetchingUsuarios: store.usuarios.isFetchingUsuarios, */