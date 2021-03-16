import {createStore, applyMiddleware, combineReducers} from 'redux'
import {reducer as formReducer } from 'redux-form'
import {reducer as authReducer} from  './modulos/auth'
import thunk from 'redux-thunk'

const initialStore = {
    isFetchingUsuarios: false,
    fail: false,
    lista: [],
}

export const addUsuario = (name, email) => {
    return {
      type: 'ADD_USER',
      name: name,
      email: email
    }
}

export const editUsuario = (id, name, email) => {
    return {
        type: 'EDIT_USER',
        id: id,
        name: name,
        email: email
    }
}

export const deleteUsuario = (id) => {
    return {
        type: 'DELETE_USER',
        id: id,
    }
}

export const fetchUsuarios = () => {
    return async (dispatch) => {
        dispatch(fetchUsuariosPending());
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            return dispatch(fetchUsuariosSuccess(data));
        }
        catch (error) {
            return dispatch(fetchUsuariosFail(error.toString()));
        }
    }
}

export const fetchUsuariosPending = () => {
    return {
        type: "FETCH_USUARIOS_PENDING",
    }
}

export const fetchUsuariosSuccess = (data) => {
    return {
        type: "FETCH_USUARIOS_SUCCESS",
        payload: data,
    }
}

export const fetchUsuariosFail = (error) => {
    return {
        type: "FETCH_USUARIOS_FAIL",
        payload: error,
    }
}

const reducer = (store = initialStore, action) => {
    switch (action.type) {
        case 'FETCH_USUARIOS_SUCCESS': {
            return {
                ...store,
                lista: action.payload,
                isFetchingUsuarios: false,
            };
        }
        case 'FETCH_USUARIOS_PENDING': {
            return {
                ...store,
                isFetchingUsuarios: true,
            };
        }
        case 'FETCH_USUARIOS_FAIL': {
            return {
                ...store,
                isFetchingUsuarios: false,
                fail: true,
            };
        }
        case 'ADD_USER': {
          const newUsers = [...store.lista]
          newUsers.push({
              id: Date.now(),
              name: action.name,
              email: action.email
          })
          const list = newUsers
          console.log(list)
            return {
                lista: list
            };

      }


        case 'EDIT_USER': {
          const usuarios = [...store.lista]
               let usuario = JSON.stringify({
                 name: action.name,
                 email: action.email,
             });
             fetch("https://jsonplaceholder.typicode.com/users"+action.id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: usuario
            }).then((usuarioEditado) => {
                console.log('Usuario Editado');
            }).catch((error) => {
                console.log(error);
            });
            const list = usuarios.filter((usuario) => {
              return usuario.id !== action.id;
          })
            return {
                lista: list,
            };
        }
        case 'DELETE_USER': {
            const usuarios = [...store.lista]
            fetch("https://jsonplaceholder.typicode.com/users"+action.id, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((usuarioElimado) => {
                console.log('Usuario Eliminado');
            }).catch((error) => {
                console.log(error);
            });
            const list = usuarios.filter((usuario) => {
                return usuario.id !== action.id;
            })
            return {
                lista: list
            };
        }
        default:
            return store;
    }
    
}

const rootReducer = combineReducers({
    usuarios: reducer,
    form: formReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))