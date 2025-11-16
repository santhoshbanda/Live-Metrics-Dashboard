import type {Service} from "../../utils/types.ts";

export const GET_SERVICES = "GET_SERVICES";
export const SET_SERVICES = "SET_SERVICES";
export const ADD_SERVICE = "ADD_SERVICE";
export const REMOVE_SERVICE = "REMOVE_SERVICE";

export const getServices = () => {
    return {
        type: GET_SERVICES,
        payload: null
    }
};

export const setServices = (services: Service[]) => {
    return {
        type: SET_SERVICES,
        payload: services
    }
};

export const addService = (service: Service) => {
    return {
        type: ADD_SERVICE,
        payload: service
    }
};

export const removeService = (serviceId: string) => {
    return {
        type: REMOVE_SERVICE,
        payload: {serviceId}
    }
};
