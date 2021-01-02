import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class AppointmentsService {
  private appointmentRepository: AppointmentRepository;

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    this.appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentsInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsService;
