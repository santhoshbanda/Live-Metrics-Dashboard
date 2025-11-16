
export interface Service {
    id: string,
    serviceName: string
}
export interface ServiceMetrics {
    cpu: number,
    memory: number,
    errorRate: number,
}
export type ServiceMetricsMap = {[key: string]: ServiceMetrics}
