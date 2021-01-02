import { Router } from 'express';
import SessionService from '../services/session.service';

const sessionsRouters = Router();

sessionsRouters.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const sessionService = new SessionService();

    const { user, token } = await sessionService.execute({ email, password });

    delete user.password;

    return res.json({ user, token });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default sessionsRouters;
