import {
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    ADD_QUANTITY_WITH_NUMBER,
    RESET_CART,
    CART_ADDED,
    CART_COUNT_INIT_SET,
    SET_TOTAL,
    SET_CHECKOUT_INFO,
    SET_BUYER_INFO_DATA,
    INIT_BUYER_INFO_DATA,
    SET_BUYER_INFO_FIRST_NAME,
    SET_BUYER_INFO_LAST_NAME,
    SET_BUYER_INFO_PHONE,
    SET_BUYER_INFO_COMPANY,
    SET_BUYER_INFO_ADDRESS,
    SET_BUYER_INFO_TOWN_CITY,
    SET_BUYER_INFO_STATE,
    SET_BUYER_INFO_ZIP,
    SET_BUYER_INFO_EMAIL,
    SET_BUYER_INFO_ORDER_NOTE, SET_BUYER_INFO_COUNTRY
} from './action-types/cart-actions'

//add cart action
export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
};

// added by Coding
export const addedToCart = (addedCount) => {
    return{
        type : CART_ADDED,
        addedCount
    }
};

// added by Coding
export const setCheckoutInfo = (data) => ({
    type : SET_CHECKOUT_INFO,
    cartInfo : data
});

export const initCartCountSet = (initCount) => ({
    type : CART_COUNT_INIT_SET,
    initCount
});

export const setBuyerInfoData = (buyerInfo) => ({
    type : SET_BUYER_INFO_DATA,
    buyerInfo
});

export const initBuyerInfoData = () => ({
    type : INIT_BUYER_INFO_DATA,
});

export const changeFirstName = (firstName) => ({
    type : SET_BUYER_INFO_FIRST_NAME,
    firstName
});

export const changeLastName = (lastName) => ({
    type : SET_BUYER_INFO_LAST_NAME,
    lastName
});

export const changeCompany = (company) => ({
    type : SET_BUYER_INFO_COMPANY,
    company
});

export const changeCountry = (country) => ({
    type : SET_BUYER_INFO_COUNTRY,
    country
});

export const changeCity = (city) => ({
    type : SET_BUYER_INFO_TOWN_CITY,
    city
});

export const changeState = (state) => ({
    type : SET_BUYER_INFO_STATE,
    state
});

export const changeEmail = (email) => ({
    type : SET_BUYER_INFO_EMAIL,
    email
});

export const changeZip = (zip) => ({
    type : SET_BUYER_INFO_ZIP,
    zip
});

export const changeAddress = (address) => ({
    type : SET_BUYER_INFO_ADDRESS,
    address
});

export const changePhone = (phone) => ({
    type : SET_BUYER_INFO_PHONE,
    phone
});

export const changeOrderNote = (orderNote) => ({
    type : SET_BUYER_INFO_ORDER_NOTE,
    orderNote
});

//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
};
//subtract qt action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
};
//add qt action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

//add qt action with quantity number
export const addQuantityWithNumber = (id, qty) => {
    return {
        type: ADD_QUANTITY_WITH_NUMBER,
        id,
        qty
    }
}

// Reset cart after form submit
export const resetCart = () => {
    return {
        type: RESET_CART
    }
}
