import express, { Request, Response } from "express";
import 'dotenv/config';
import cors from 'cors';
import { createServer } from 'http';
import config from "@/config";
import { usersRouter } from '@/routes/usersRoutes';
import { accountRoutes } from '@/routes/accountRoutes';
import { aiRoutes } from '@/routes/aiRoutes';
import { chatsRoutes } from '@/routes/chatsRoutes';

const app = express();
const httpServer = createServer(app);
const methodTypes = ['GET', 'POST', 'PUT', 'PATCH','DELETE']

app.use(cors({
    origin: config.origins,
    methods: methodTypes,
    credentials: true,
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("INITIAL ENDPOINT OF EXPRESS TS SERVER.");
});

app.use('/users', usersRouter);
app.use('/account', accountRoutes)
app.use('/ai', aiRoutes)
app.use('/chats', chatsRoutes)

httpServer.listen(config.port, () => {
    console.log(`Server running on port ${config.port}, open ${config.localhost}`);
});