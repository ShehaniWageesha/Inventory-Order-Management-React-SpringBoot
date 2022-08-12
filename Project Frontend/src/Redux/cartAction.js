import {ADD_CART, RMV_CART, RST_CART} from "./cartTypes";


export const addCart = (itemId,name,quantity,price) => {
    return {
        type: ADD_CART,
        payload: {
            itemId: itemId,
            name: name,
            quantity: quantity,
            price: price
        }
    }
}

export const rmvCart = (itemId, price, quantity) => {
    return {
        type: RMV_CART,
        payload: {
            itemId: itemId,
            quantity: quantity,
            price: price
        }
    }
}

export const rstCart = () => {
    return {
        type: RST_CART
    }
}

