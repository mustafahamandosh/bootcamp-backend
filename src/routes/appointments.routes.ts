import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsService from '../services/appointments.service';
import AppointmentRepository from '../repositories/AppointmentRepository';
import isAuthenticated from '../middlewares/isAuthenticated';

const appointmentsRouters = Router();

appointmentsRouters.use(isAuthenticated);

appointmentsRouters.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  return res.json(await appointmentRepository.find());
});

appointmentsRouters.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);

  const appointmentService = new AppointmentsService();

  const appointment = await appointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouters;
