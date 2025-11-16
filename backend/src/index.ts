import express, {Request, Response} from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import serviceRoutes from './routes/service.routes';
import {createServices, generateRandomMetrics} from './utils/common-functions'
import {servicesList} from "./utils/data";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

// using a global variable to store services since we are not using any database.
servicesList.push(...createServices(['auth-service', 'order-service', 'wishlist-service', 'notifications-service', 'profile-service']));

app.use(cors());
app.use(express.json());

app.use('/service', serviceRoutes);

app.get('/config', (req: Request, res: Response) => {
    return res.json(servicesList)
})
app.get('/', (req: Request, res: Response) => {
    const numbers = generateRandomMetrics(servicesList);
    res.json(numbers);
    // res.send('Hello There!');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    let timer:  NodeJS.Timeout;

    timer = setInterval(() => {
        const numbers = generateRandomMetrics(servicesList);
        socket.emit('dataStream', JSON.stringify(numbers));
        console.log('sending ->', Object.keys(numbers).length);
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(timer);
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
