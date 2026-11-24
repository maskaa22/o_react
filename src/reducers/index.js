import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./userReducer";
import productReducer from "./productReducer";
import {saveBasket} from "../utils/basketStorage/basketStorage";

export const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// Кошик дублюється в localStorage при кожній його зміні, щоб переживати оновлення сторінки.
// Відновлюється він у defaultState productReducer.
let lastBasket = store.getState().product.currentProduct;

store.subscribe(() => {
    const basket = store.getState().product.currentProduct;

    if (basket !== lastBasket) {
        lastBasket = basket;
        saveBasket(basket);
    }
});
