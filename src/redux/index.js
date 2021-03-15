import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as authReducer } from './modulos/auth'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))