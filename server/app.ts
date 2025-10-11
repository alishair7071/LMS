import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import { errorMiddleware } from './middleware/error';
import userRouter from './routes/user.route';

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));


//api for test
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({success: true, message: 'API is working' });
});


//routes
app.use('/api/v1', userRouter);


//for unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
    const err= new Error(`Can't find ${req.originalUrl} on this server!`) as any;
    err.statusCode= 404;
    next(err);
});


app.use(errorMiddleware);
