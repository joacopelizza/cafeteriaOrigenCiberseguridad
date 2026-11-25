import express from 'express';
import * as reportes from '../services/reportes.service';
import { requiereSesion, requiereRol } from '../middleware/auth';

const router = express.Router();

router.use(requiereSesion, requiereRol('admin'));

router.get('/facturacion', async (req, res, next) => {
  try {
    res.json(await reportes.facturacion());
  } catch (err) {
    next(err);
  }
});


router.get('/cantidad-vendida', async (req, res, next) => {
  try {
    res.json({ cantidadVendida: await reportes.cantidadVendidaPorTipo() });
  } catch (err) {
    next(err);
  }
});


router.get('/mas-vendido', async (req, res, next) => {
  try {
    res.json({ producto: await reportes.masVendido() });
  } catch (err) {
    next(err);
  }
});


router.get('/ticket-promedio', async (req, res, next) => {
  try {
    res.json(await reportes.ticketPromedio());
  } catch (err) {
    next(err);
  }
});


router.get('/ventas-por-variedad', async (req, res, next) => {
  try {
    const variedad = (req.query.variedad as string | undefined) || '';
    res.json({ ventas: await reportes.ventasPorVariedad(variedad) });
  } catch (err) {
    next(err);
  }
});

export default router;
