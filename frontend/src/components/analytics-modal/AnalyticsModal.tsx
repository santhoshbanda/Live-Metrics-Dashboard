import './AnalyticsModal.scss';
import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import type {TransitionProps} from '@mui/material/transitions';
import type {Service, ServiceAnalyticMetrics} from "../../utils/types.ts";

import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {ENV} from "../../constants";
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AnalyticsModalProps {
    isOpen: boolean,
    service?: Service | null,
    handleClose: () => void,
}

const AnalyticsModal = ({handleClose, service, isOpen}: AnalyticsModalProps) => {

    const [serviceData, setServiceData] = useState<ServiceAnalyticMetrics[]>([]);
    const options = useMemo(() => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: service?.serviceName.toUpperCase() + ' Metrics',
                },
            },
        }
    }, [service])

    const chartData = useMemo(() => {
        const cpuMetrics:number[] = [];
        const memoryMetrics:number[] = [];
        const errorRateMetrics:number[] = [];
        const labels:string[] = [];
        (serviceData || []).forEach(dataPoint => {
            cpuMetrics.push(dataPoint.cpu);
            memoryMetrics.push(dataPoint.memory);
            errorRateMetrics.push(dataPoint.errorRate);
            labels.push(dataPoint.time);
        })
        return {
            labels,
            datasets: [
                {
                    label: 'CPU',
                    data: cpuMetrics,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Memory',
                    data: memoryMetrics,
                    borderColor: 'rgb(0, 202, 135)',
                    backgroundColor: 'rgba(0, 202, 135, 0.5)',
                },
                {
                    label: 'Error Rate',
                    data: errorRateMetrics,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }
    }, [serviceData]);

    useEffect(() => {
        if (!isOpen) return;
        const es = new EventSource(ENV.API_URL+'/metrics/stream');
        const onMessage = (ev: { data: string; }) => {
            try {
                const parsedData: ServiceAnalyticMetrics = JSON.parse(ev.data);
                // console.log(parsedData, 'parsedData');
                setServiceData(prevState => {
                    const newState = [...prevState, {...parsedData, time: moment().format('hh:mm:ss')}];
                    return newState.slice(-30);
                });
            } catch (e) {
                console.error(e);
            }
        }
        es.addEventListener("message", onMessage)

        return () => {
            console.log('Closing es')
            es.removeEventListener('message', onMessage);
            es.close()
        }
    },[isOpen])

    return <>
        <Dialog
            fullScreen
            open={isOpen}
            className={'analytics-modal-holder'}
            onClose={handleClose}
            slots={{
                transition: Transition,
            }}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <Typography sx={{flex: 1}} variant="h6" component="div">
                        {service?.serviceName.toUpperCase()}
                    </Typography>
                    <Button color="inherit" onClick={handleClose}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={'analytics-holder'}>
                <div className={'analytics-wrapper'}>
                    <Line options={options} data={chartData}/>
                </div>
            </div>

        </Dialog>
    </>
}

export default AnalyticsModal;
