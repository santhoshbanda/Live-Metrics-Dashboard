import {all, fork} from 'redux-saga/effects';
import serviceSaga from "./service.saga";

export default function* rootSaga() {
    yield all([
        fork(serviceSaga),
    ]);
}
