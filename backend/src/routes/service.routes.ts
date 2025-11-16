import { Router, Request, Response } from 'express';
import {servicesList} from "../utils/data";
import {createService} from "../utils/common-functions";

const router = Router();

// returns list of services
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({success: true, data: servicesList})
})

// adds new service to list
router.post('/add',(req: Request, res: Response) => {
    const body = req.body;
    if(body?.name) {
        const service = createService(req.body.name)
        servicesList.push(service);
        return res.status(201).json({success: true, service, message: 'Service added'})
    } else {
        return res.status(400).json({success: false, message: 'Service name required'})
    }
})

// remove service from list
router.delete('/remove/:id',(req: Request, res: Response) => {
    const params = req.params;
    const index = servicesList.findIndex((service)=> service.id === params.id);
    if (index > -1) {
        servicesList.splice(index, 1);
        return res.status(201).json({success: true, message: 'Service removed'})
    } else {
        return res.status(404).json({success: false, message: 'Service not found'})
    }
})

export default router;
