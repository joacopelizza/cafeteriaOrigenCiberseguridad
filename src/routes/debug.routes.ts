import express from 'express';
import { requiereRol, requiereSesion } from '../middleware/auth';

const router = express.Router();
router.use(requiereSesion, requiereRol('admin'));

router.get('/', (_req, res) => {
  res.json({ mensaje: 'Diagnóstico disponible.', version: process.version });
});

export default router;
