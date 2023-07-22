import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cardReducer from './reducer'; // Importa tu reducer personalizado

// Combina todos los reducers en un solo reducer raíz
const rootReducer = combineReducers({
  cards: cardReducer, // "cards" es el estado manejado por el reducer "cardReducer"
  // Agrega aquí más reducers si es necesario
});

// Configura el store de Redux con el reducer combinado y el middleware "redux-thunk"
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;