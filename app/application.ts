import express, { type Express } from 'express';
import "reflect-metadata";
import cors from 'cors';
import routes from './routes';
import sequelize from "@app/models";

const app: Express = express();
app.use(express.json(), cors());
app.use(express.urlencoded({ extended: true }));

routes(app);
 sequelize.sync().then((r) => console.log("Connected")).catch((err) => console.log('error', err))
export default app;
