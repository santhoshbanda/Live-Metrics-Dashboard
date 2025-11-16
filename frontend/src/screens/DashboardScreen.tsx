import './DashboardScreen.scss';
import {Card, CardContent, CardHeader, IconButton, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import {addService, getServices, removeService} from "../store/actions/service.action.ts";
import type {Service, ServiceMetricsMap} from "../utils/types.ts";
import {ColorConfig, ENV} from "../constants";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {io as SocketIO} from "socket.io-client";
import MetricAlertIcon from "../components/MetricAlertIcon.tsx";
import {getCPUMetricColors, getErrorMetricColors, randomNameGenerator} from "../utils/common-functions.ts";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import BasicSpeedDial from "../components/BasicSpeedDial.tsx";
import ApiService from "../services/api.service.ts";
import { toast } from "react-toastify";
import AnalyticsModal from "../components/AnalyticsModal.tsx";

const socket = SocketIO(ENV.WEB_SOCKET_URL);

const DashboardScreen = () => {
    const dispatch = useAppDispatch();
    const {services, isLoading} = useAppSelector(state => state.service);
    const [metrics, setMetrics] = useState<ServiceMetricsMap>({})

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch])

    const deleteService = useCallback((service: Service) => {
        dispatch(removeService(service.id));
    }, [dispatch])

    const createService = useCallback((name: string) => {
        ApiService.post(`${ENV.API_URL}/service/add`, {name})
            .then(resp => {
                dispatch(addService(resp.service));
                toast(resp.message, {type:'success'});
            })
            .catch(reason => {
                console.error(reason.response);
                toast(reason.response.data.message, {type:'error'});
            })
    }, [dispatch]);

    const createRandomService = useCallback(() => {
        const name = randomNameGenerator();
        createService(name);
    }, [createService]);

    const SpeedDialActionsConfig = useMemo(() => {
        return [
            {name: 'Create Random Service', icon: <ShuffleIcon/>, onClick: createRandomService},
            // {name: 'New Service', icon: <EditIcon/>, onClick: ()=>{
            //         toast('Coming soon!')
            //     }}
        ];
    }, [createRandomService])

    useEffect(() => {
        // Listen for messages
        socket.on("dataStream", (message) => {
            // console.log(message, 'dataStream');
            try {
                const parsedMessage = JSON.parse(message);
                setMetrics(parsedMessage);
            } catch (e) {
                console.error(e, 'Failed to parse metrics');
            }
        });
        socket.on("connect", () => {
            console.log(socket.id);
            // socket.emit("sendData", []);
        });
        socket.on("disconnect", () => {
            console.log(socket.id); // undefined
        });
        return () => {
            socket.off("dataStream");
        };
    }, []);

    const [analyticsOpen, setAnalyticsOpen] = useState<Service | null>(null);

    return <>
        {isLoading && <LinearProgress/>}

        <BasicSpeedDial actions={SpeedDialActionsConfig}/>

        <AnalyticsModal isOpen={!!analyticsOpen} service={analyticsOpen} handleClose={() => {
            setAnalyticsOpen(null);
        }}/>

        {!isLoading && <div className={'dashboard-screen'}>
            <div className={'dashboard-cards-holder'}>
                {
                    services.map((service) => {
                        return <Card onClick={() => {
                            setAnalyticsOpen(service);
                        }} className={'card-item'} key={service.id}>
                            <CardHeader avatar={<MetricAlertIcon cpu={(metrics[service.id]?.cpu || 0)}
                                                                 errorRate={(metrics[service.id]?.errorRate || 0)}/>}
                                        action={<IconButton onClick={(e) => {
                                            e.stopPropagation()
                                            deleteService(service);
                                        }}><DeleteOutlineIcon color={'error'}/></IconButton>}
                                        slotProps={{title: {color: ColorConfig.textDark}}}
                                        title={service.serviceName.toUpperCase()}/>
                            <CardContent className={'metrics-holder'}>
                                <div
                                    className={'metric-item metric-cpu ' + getCPUMetricColors(metrics[service.id]?.cpu)}>
                                    <div className="item-title">CPU</div>
                                    <div className="item-value">{metrics[service.id]?.cpu || 0}%</div>
                                </div>
                                <div className={'metric-item metric-memory'}>
                                    <div className="item-title">Memory</div>
                                    <div className="item-value">{metrics[service.id]?.memory || 0}%</div>
                                </div>
                                <div
                                    className={'metric-item metric-errorRate ' + getErrorMetricColors(metrics[service.id]?.errorRate)}>
                                    <div className="item-title">Error Rate</div>
                                    <div className="item-value">{metrics[service.id]?.errorRate || 0}%</div>
                                </div>
                            </CardContent>
                        </Card>
                    })
                }
            </div>
        </div>}
    </>
}

export default DashboardScreen;
