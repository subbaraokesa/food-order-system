import {combineReducers} from "@reduxjs/toolkit";
import * as contactReducer from './contacts/contact.reducer';

const rootReducer= combineReducers({
    [contactReducer.contactFeatureKey]: contactReducer.contactSlice.reducer
});
export default rootReducer;