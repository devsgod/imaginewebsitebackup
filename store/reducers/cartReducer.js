// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunkMiddleware from 'redux-thunk';

import {
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY_WITH_NUMBER,
    RESET_CART,

    //added by Coding
    CART_ADDED,
    CART_COUNT_INIT_SET,
    SET_CHECKOUT_INFO,
    CLEAR_CHECKOUT_INFO,
    SET_BUYER_INFO_DATA,
    INIT_BUYER_INFO_DATA,
    SET_BUYER_INFO_FIRST_NAME,
    SET_BUYER_INFO_LAST_NAME,
    SET_BUYER_INFO_COMPANY,
    SET_BUYER_INFO_ADDRESS,
    SET_BUYER_INFO_TOWN_CITY,
    SET_BUYER_INFO_STATE, SET_BUYER_INFO_ZIP, SET_BUYER_INFO_EMAIL, SET_BUYER_INFO_PHONE,
    SET_BUYER_INFO_ORDER_NOTE, SET_BUYER_INFO_COUNTRY
} from '../actions/action-types/cart-actions'

const initState = {
    new_products: [
        {
            id: 1,
            title: "Drop Side Watch",
            price: 350,
            image: require("../../images/shop-item1.jpg")
        },
        {
            id: 2,
            title: "Drop Side Watch",
            price: 120,
            image: require("../../images/shop-item2.jpg")
        },
        {
            id: 3,
            title: "Drop Side Watch",
            price: 160,
            image: require("../../images/shop-item3.jpg")
        }
    ],
    addedItems:[],
    subTotal : 0,
    total: 0,
    tax : 0,
    cartData : {},
    buyerInfo : {
       firstName : '',
       lastName : '',
       company : '',
       address : '',
       country : 'Russia',
       city : '',
       state    : '',
       zip      : '',
       email    : '',
       phone    : '',
       orderNote    : ''
    },
    shipping: 0,
    cartCount : 0,
};

export default function (state = initState, action){
   
    if(action.type === ADD_TO_CART){
        let addedItem = state.cartData.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item= state.addedItems.find(item=> action.id === item.id)
        if(existed_item)
        {
            addedItem.quantity += 1 ;
            return {
                ...state,
                total: state.total + addedItem.price 
            }
        } else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
        }
    }

    // added by Coding
    if (action.type === CART_ADDED) {
        let currentCartCount = state.cartCount;

        let newCount = currentCartCount + action.addedCount;

        if (newCount < 0) {
            newCount = 0;
        }
        localStorage.setItem('cart_count', newCount);
        return {
            ...state,
            cartCount: newCount
        }
    }

    if (action.type === SET_BUYER_INFO_FIRST_NAME) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                firstName : action.firstName
            }
        }
    }

    if (action.type === SET_BUYER_INFO_LAST_NAME) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                lastName : action.lastName
            }
        }
    }

    if (action.type === SET_BUYER_INFO_COMPANY) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                company : action.company
            }
        }
    }

    if (action.type === SET_BUYER_INFO_ADDRESS) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                address : action.address
            }
        }
    }

    if (action.type === SET_BUYER_INFO_TOWN_CITY) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                city : action.city
            }
        }
    }

    if (action.type === SET_BUYER_INFO_STATE) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                state : action.state
            }
        }
    }

    if (action.type === SET_BUYER_INFO_ZIP) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                zip : action.zip
            }
        }
    }

    if (action.type === SET_BUYER_INFO_EMAIL) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                email : action.email
            }
        }
    }

    if (action.type === SET_BUYER_INFO_PHONE) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                phone : action.phone
            }
        }
    }

    if (action.type === SET_BUYER_INFO_ORDER_NOTE) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                orderNote : action.orderNote
            }
        }
    }

    if (action.type === SET_BUYER_INFO_COUNTRY) {
        return {
            ...state,
            buyerInfo : {
                ...state.buyerInfo,
                country : action.country
            }
        }
    }
    
    if (action.type === INIT_BUYER_INFO_DATA) {
        let buyerInfo = {
            firstName : '',
            lastName : '',
            company : '',
            address : '',
            country : 'Russia',
            city : '',
            state    : '',
            zip      : '',
            email    : '',
            phone    : '',
            orderNote    : ''
        };

        return {
            ...state,
            buyerInfo : buyerInfo
        }
    }

    // added by Coding
    if (action.type === CART_COUNT_INIT_SET) {
        return {
            ...state,
            cartCount: action.initCount
        }
    }

    if(action.type === ADD_QUANTITY_WITH_NUMBER){
        let addedItem = state.cartData.find(item => item.id === action.id);
        //check if the action id exists in the addedItems
        let existed_item= state.addedItems.find(item=> action.id === item.id)
        if(existed_item)
        {
            addedItem.quantity += action.qty
            return {
                ...state,
                total: state.total + addedItem.price * action.qty
            }
        } else {
            addedItem.quantity = action.qty;
            //calculating the total
            let newTotal = state.total + addedItem.price * action.qty
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }

    // added by Coding
    if (action.type === SET_CHECKOUT_INFO) {
        return {
            ...state,
            subTotal : action.cartInfo.subTotal,
            tax : action.cartInfo.tax,
            shipping : action.cartInfo.shipping,
            total : action.cartInfo.total,
            cartData : action.cartInfo.cartData
        }
    }
    // added by Coding
    if (action.type === CLEAR_CHECKOUT_INFO) {
        return {
            ...state,
            subTotal : 0,
            tax : 0,
            shipping : 0,
            total : 0
        }
    }

    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity );

        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }

    if(action.type === RESET_CART){
        return {
            ...state,
            addedItems: [],
            total: 0,
            shipping: 0
        }
    }
    
    else {
        return state
    }
}

// export const initStore = (initialState = initState) => {
//     return createStore(
//         cartReducer,
//         initialState,
//         composeWithDevTools(applyMiddleware(thunkMiddleware))
//     )
// }