import {v4 as uuidv4} from 'uuid';
import {Service, ServiceMetricsMap} from "../types/service.types";

const getRandomNumber = (start: number, end: number) => {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}
const generateRandomMetrics = (currentServices: Service[]): ServiceMetricsMap => {
    const metricsMap: ServiceMetricsMap = {}
    currentServices.forEach((service, index) => {
        metricsMap[service.id] = {
            cpu: getRandomNumber(0, 100),
            memory: getRandomNumber(0, 100),
            errorRate: getRandomNumber(0, 10),
        }
    })
    return metricsMap;
}

const createService = (serviceName: string): Service => {
    return {
        serviceName: serviceName,
        id: uuidv4()
    }
}

const createServices = (servicesList: string[]): Service[] => {
    return servicesList.map((serviceName) => createService(serviceName));
}

export {generateRandomMetrics, createService, createServices}
