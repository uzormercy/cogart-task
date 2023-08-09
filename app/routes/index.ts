import { Express, Request, Response } from 'express';
import mediaRoutes from '@app/routes/media.routes';

const routes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => res.send({ status: 200, message: 'Welcome to IvoryPay' }));
  app.use('/media', mediaRoutes);
  app.all('*', (req: Request, res: Response) =>
    res.status(404).send({
      status: 404,
      message: "Oops the url has been moved or doesn't exist",
    })
  );
};

export default routes;
