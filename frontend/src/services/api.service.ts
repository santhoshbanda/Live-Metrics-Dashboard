import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";

export const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const getHeaders = (headers: {[key: string]: string }) => {
    headers = {
        ...defaultHeaders,
        ...headers,
    };
    return headers;
};

const ApiService = {
    post: (
        url: string,
        payload = {},
        headers = {},
    ): Promise<any> => {
        const axiosOptions: AxiosRequestConfig = {
            headers: getHeaders(headers),
        };
        const request = axios.post(url, payload, axiosOptions);
        return getRequestPromise(request);
    },
    get: (
        url: string,
        payload = {},
        headers = {},
    ): Promise<any> => {
        const axiosOptions: AxiosRequestConfig = {
            headers: getHeaders(headers),
            params: payload,
        };
        const request = axios.get(url, axiosOptions);
        return getRequestPromise(request);
    },
    delete: (
        url: string,
        payload = {},
        headers = {},
    ): Promise<any> => {
        // options = getParsedOptions(headers, options);
        const axiosOptions: AxiosRequestConfig = {
            headers: getHeaders(headers),
            data: payload,
        };
        const request = axios.delete(url, axiosOptions);
        return getRequestPromise(request);
    },
};

const getRequestPromise = (request: Promise<AxiosResponse>) => {
    return new Promise((resolve, reject) => {
        request
            .then((resp) => {
                resolve({...resp.data, status: resp.status});
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default ApiService;
