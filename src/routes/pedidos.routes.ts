import express from 'express';
import * as pedidos from '../services/pedidos.service';
import { idPositivo } from '../validacion';
import { requiereRol, requiereSesion } from '../middleware/auth';

const requierePersonal = [requiereSesion, requiereRol('admin', 'barista', 'mozo')] as const;

const router = express.Router();
router.post('/', async (req, res, next) => {
  try {
    const { mesa, cliente, items } = req.body || {};
    const pedido = await pedidos.crear({ mesa, cliente, items });
    res.status(201).json(pedido);
  } catch (err) {
    next(err);
  }
});
router.get('/', ...requierePersonal, async (req, res, next) => {
  try {
    res.json({ pedidos: await pedidos.listar(req.query.mesa as string | undefined) });
  } catch (err) {
    next(err);
  }
});
router.get('/:id', ...requierePersonal, async (req, res, next) => {
  try {
    const id = idPositivo(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID de pedido no válido.' });
    const pedido = await pedidos.obtenerConItems(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    res.json(pedido);
  } catch (err) {
    next(err);
  }
});
router.patch('/:id/estado', ...requierePersonal, async (req, res, next) => {
  try {
    const { estado } = req.body || {};
    const id = idPositivo(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID de pedido no válido.' });
    const pedido = await pedidos.cambiarEstado(id, estado);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    res.json(pedido);
  } catch (err) {
    next(err);
  }
});

export default router;
