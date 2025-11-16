import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import {configureStore} from "@reduxjs/toolkit";
import rootSaga from "./sagas";
import {logger} from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(logger, sagaMiddleware),
    devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
