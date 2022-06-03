import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose'
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });

mongoose.connect(process.env.MONGO_URI as string, {
    //@ts-ignore
    useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch((err : any) => {
    console.log('Could not connect to the database. Error...', err);
    process.exit();
});

const app = express();
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.json({"message": "Server is running :D"});
});

let PORT = process.env.PORT || 8080;

// require('./app/routes/app.routes.js')(app);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
