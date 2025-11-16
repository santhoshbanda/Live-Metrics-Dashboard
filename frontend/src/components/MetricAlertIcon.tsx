import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

interface MetricAlertIconProps {
    cpu: number,
    errorRate: number
}

const MetricAlertIcon = ({cpu, errorRate}: MetricAlertIconProps) => {
    if (cpu > 80 || errorRate > 5) {
        return <ErrorOutlineOutlinedIcon color={'error'} />
    } else if (cpu > 60) {
        return <ReportProblemOutlinedIcon color={'warning'} />;
    } else {
        return <CheckCircleOutlineOutlinedIcon color={'success'} />
    }
}

export default MetricAlertIcon;
