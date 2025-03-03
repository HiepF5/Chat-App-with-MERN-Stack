import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDb from './config/connectToMongoDB.js';

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);



app.listen(port, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${port}`);
    }
);
