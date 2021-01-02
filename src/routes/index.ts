import { Router } from 'express';
import appointmentsRouters from './appointments.routes';
import usersRouters from './users.routes';
import sessionRouters from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouters);

routes.use('/users', usersRouters);

routes.use('/sessions', sessionRouters);

export default routes;
