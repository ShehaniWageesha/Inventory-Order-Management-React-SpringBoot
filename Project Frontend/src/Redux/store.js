import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import cartReducer from "./cartReducer";
import {persistStore} from "redux-persist";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(cartReducer, composeWithDevTools(applyMiddleware(logger)))
export const persistor = persistStore(store)

export default store