import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RingInstance } from '../models/ring.model';


class RingController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const result = await RingInstance.create({ ...req.body, id });
      return res.json({ result, message: 'Ring Added +' }).status(200);
    } catch (error) {
      return res
        .json({
          error,
          message: 'Failed to add ring',
          route: '/create',
        })
        .status(500);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const result = await RingInstance.findAll({ where: {}, limit, offset });
      if (!result) {
        return res.json('Can not find ring').status(404);
      }
      return res.json({ result }).status(200);
    } catch (error) {
      return res
        .json({
          error,
          message: 'Failed to get Rings',
          route: '/read',
        })
        .status(500);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await RingInstance.findByPk(id);
      if (!result) {
        return res.json('Can not find ring').status(404);
      }
      return res.json({ result }).status(200);
    } catch (error) {
      return res
        .json({
          error,
          message: 'Failed to get Ring',
          route: '/read:id',
        })
        .status(500);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, image_Url } = req.body;

      const existingRing = await RingInstance.findByPk(id);
      if (!existingRing) {
        return res.json({ message: 'Ring not found' }).status(404);
      }

      await RingInstance.update(
        { title, description, image_Url },
        { where: { id } }
      );

      const result = await RingInstance.findByPk(id);

      return res.json({ result }).status(200);
    } catch (error) {
      return res
        .json({
          error,
          message: 'Failed to update Ring',
          route: '/update/:id',
        })
        .status(500);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await RingInstance.findByPk(id);
      if (!result) {
        return res.json({ message: 'Ring not found' }).status(404);
      }

      await result.destroy();

      return res.json('Ring Deleted').status(200);
    } catch (error) {
      return res
        .json({
          error,
          message: 'Failed to delete Ring',
          route: '/delete/:id',
        })
        .status(500);
    }
  }
}

export default new RingController();
