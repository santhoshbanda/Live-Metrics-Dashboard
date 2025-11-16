import {combineReducers} from "@reduxjs/toolkit";
import serviceReducer from "./service.reducer";

const rootReducer = combineReducers({
    service: serviceReducer,
});

export default rootReducer;
