import type {ActionModel, Service} from "../../utils/types.ts";
import {ADD_SERVICE, GET_SERVICES, REMOVE_SERVICE, SET_SERVICES} from "../actions/service.action.ts";

export interface MetaReducerState {
    services: Service[];
    isLoading: boolean
}

const INITIAL_STATE: MetaReducerState = {
    services: [],
    isLoading: true
};


const serviceReducer = (state: MetaReducerState = INITIAL_STATE, action: ActionModel): MetaReducerState => {
    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state,
                services: [],
                isLoading: true
            };
        case SET_SERVICES:
            return {
                ...state,
                isLoading: false,
                services: action.payload,
            };
        case ADD_SERVICE: {
            const services = [...(state.services || [])];
            const serviceIndex = services.findIndex(value => value.id === action.payload.id);
            if (serviceIndex > -1) {
                services[serviceIndex] = action.payload;
            } else {
                services.push(action.payload);
            }
            return {
                ...state,
                services
            };
        }
        case REMOVE_SERVICE: {
            const services = [...(state.services || [])];
            const serviceIndex = services.findIndex(value => value.id === action.payload.serviceId);
            if (serviceIndex > -1) {
                services.splice(serviceIndex, 1);
            }
            return {
                ...state,
                services,
            };
        }
        default:
            return state;
    }
};

export default serviceReducer;

