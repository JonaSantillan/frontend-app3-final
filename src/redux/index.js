import {createStore, applyMiddleware, combineReducers} from 'redux'
import {reducer as formReducer } from 'redux-form'
import {reducer as authReducer} from  './modulos/auth'
import thunk from 'redux-thunk'

const initialStore = {
    isFetchingProductos: false,
    fail: false,
    lista: [],
}

export const addProducto = (nombre, descripcion, precio) => {
    return {
        type: 'ADD_PRODUCTO',
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    }
}

export const editProducto = (_id, nombre, descripcion, precio) => {
    return {
        type: 'EDIT_PRODUCTO',
        _id: _id,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    }
}

export const delProducto = (_id) => {
    return {
        type: 'DEL_PRODUCTO',
        _id: _id,
    }
}

export const fetchProductos = () => {
    return async (dispatch) => {
        dispatch(fetchProductosPending());
        try {
            const response = await fetch("http://localhost:3001/productos");
            const data = await response.json();
            return dispatch(fetchProductosSuccess(data));
        }
        catch (error) {
            return dispatch(fetchProductosFail(error.toString()));
        }
    }
}

export const fetchProductosPending = () => {
    return {
        type: "FETCH_PRODUCTOS_PENDING",
    }
}

export const fetchProductosSuccess = (data) => {
    return {
        type: "FETCH_PRODUCTOS_SUCCESS",
        payload: data,
    }
}

export const fetchProductosFail = (error) => {
    return {
        type: "FETCH_PRODUCTOS_FAIL",
        payload: error,
    }
}

const reducer = (store = initialStore, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTOS_SUCCESS': {
            return {
                ...store,
                lista: action.payload,
                isFetchingProductos: false,
            };
        }
        case 'FETCH_PRODUCTOS_PENDING': {
            return {
                ...store,
                isFetchingProductos: true,
            };
        }
        case 'FETCH_PRODUCTOS_FAIL': {
            return {
                ...store,
                isFetchingProductos: false,
                fail: true,
            };
        }
        case 'ADD_PRODUCTO': {
            let prod = JSON.stringify({
                nombre: action.nombre,
                descripcion: action.descripcion,
                precio: parseFloat(action.precio)
            });
            fetch("http://localhost:3001/productos", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: prod
            }).then((productoNuevo) => {
                console.log('Producto Agregado');
            }).catch((error) => {
                console.log(error);
            });
            return {
                ...store,
            };
        }
        case 'EDIT_PRODUCTO': {
            let prod = JSON.stringify({
                nombre: action.nombre,
                descripcion: action.descripcion,
                precio: parseFloat(action.precio)
            });
            fetch("http://localhost:3001/productos?id="+action._id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: prod
            }).then((productoEditado) => {
                console.log('Producto Editado');
            }).catch((error) => {
                console.log(error);
            });
            return {
                ...store,
            };
        }
        case 'DEL_PRODUCTO': {
            const productos = [...store.lista]
            fetch("http://localhost:3001/productos?id="+action._id, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((productoElimado) => {
                console.log('Producto Eliminado');
            }).catch((error) => {
                console.log(error);
            });
            const list = productos.filter((producto) => {
                return producto._id !== action._id;
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
    productos: reducer,
    form: formReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))