import {ADD_CART, RMV_CART, RST_CART} from "./cartTypes";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    shoppingCart: [],
    total: 0
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['shoppingCart','total']
}

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_CART: return {
            ...state,
            shoppingCart: [...state.shoppingCart,action.payload],
            total: state.total + (action.payload.quantity*action.payload.price)
        }
        case RMV_CART: return {
            ...state,
            shoppingCart: state.shoppingCart.filter(function (item) {
                console.log(item.itemId)
                return item.itemId !== action.payload.itemId;
            }),
            total: state.total - (action.payload.price*action.payload.quantity)
        }
        case RST_CART: return {
            shoppingCart: [],
            total: 0
        }
        default: return state
    }

}

export default persistReducer(persistConfig, cartReducer)