
import {configureStore} from '@reduxjs/toolkit'
import {productReducer,productDetailsReducer, addReviewReducer, newProductReducer} from './Reducers/productReducer/productReducer';
import { allUserReducer, loginReducer, userDetailsReducer} from './Reducers/userReducer/userReducer';
import { profileReducer } from './Reducers/profileReducer/profileReducer';
import { forgotPasswordReducer } from './Reducers/ForgotPasswordReducer/ForgotPasswordReducer';
import { cartReducer } from './Reducers/CartReducer/CartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from './Reducers/orderReducer/orderReducer';
//Making of reducer functions
const reducers = {productReducer,productDetailsReducer,loginReducer,profileReducer,forgotPasswordReducer}

//Creating store
const store = configureStore({
    reducer:{...reducers,cart:cartReducer,newOrder:newOrderReducer,
        orders:myOrdersReducer,order:orderDetailsReducer,
        newReview:addReviewReducer,newProduct:newProductReducer,
        allOrders:allOrdersReducer,
        allUsers:allUserReducer,
        user:userDetailsReducer
    }
});

export default store;