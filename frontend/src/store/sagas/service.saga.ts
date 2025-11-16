import {call, put, takeEvery } from "redux-saga/effects";
import {GET_SERVICES, REMOVE_SERVICE, setServices} from "../actions/service.action.ts";
import ApiService from "../../services/api.service.ts";
import {ENV} from "../../constants";
import type {Service} from "../../utils/types.ts";
import {toast} from "react-toastify";

const servicesAPICall = () => {
    return ApiService.get(`${ENV.API_URL}/service`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error.response;
        });
}

function* loadServices() {
    try {
        const services:Service[] = yield call(servicesAPICall);
        yield put(setServices(services));
    } catch (error) {
        console.error(error);
        yield put(setServices([]));
    }
}

const removeServicesAPICall = (serviceId:string) => {
    return ApiService.delete(`${ENV.API_URL}/service/remove/${serviceId}`)
        .then((response) => {
            return response;
        }).catch((error) => {
            throw error.response;
        });
}

function* removeService(action: any) {
    try {
        const resp = yield call(removeServicesAPICall, action.payload.serviceId);
        toast(resp.message, {type: 'success'})
    } catch (error) {
        console.error(error);
        toast(error.data.message, {type: 'error'})
    }
}

export default function* serviceSaga() {
    yield takeEvery(GET_SERVICES, loadServices);
    yield takeEvery(REMOVE_SERVICE, removeService);
}
