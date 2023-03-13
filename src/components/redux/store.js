import {configureStore, Store} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {useDispatch} from "react-redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: rootReducer,
    middleware: [logger, thunk]
})
export default store;

export const useAppDispatch = () => useDispatch<store.dispatch>({});