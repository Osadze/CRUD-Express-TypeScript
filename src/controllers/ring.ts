import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RingInstance } from '../models/ring.model';
import {
  RingResultForGetAll,
  RingResult,
  RingResultForDelete,
  Result,
  Message,
  Ring,
  Error,
} from '../types/types';

class RingController {
  async create(req: Request, res: Response): Promise<Response<RingResult>> {
    const id = uuidv4();
    const ring: Ring = {
      id,
      ...req.body,
    };
    try {
      const result = await RingInstance.create(ring);
      const finalResult: RingResult = {
        data: result.dataValues,
      };
      return res.json(finalResult).status(200);
    } catch (error) {
      const err: RingResult = {
        error: { message: 'Failed to add ring', code: 500 },
      };
      return res.json(err);
    }
  }

  async getAll(
    req: Request,
    res: Response
  ): Promise<Response<RingResultForGetAll>> {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const result = await RingInstance.findAll({ where: {}, limit, offset });
      if (!result) {
        const err: RingResultForGetAll = {
          error: { message: 'Could not find the rings', code: 404 },
        };
        return res.json(err);
      }
      const ringDataValues = result.map((instance) => instance.dataValues);
      const finalResult: RingResultForGetAll = {
        data: ringDataValues,
      };

      return res.json(finalResult).status(200);
    } catch (error) {
      const err: RingResultForGetAll = {
        error: { message: 'Could not find the rings', code: 404 },
      };
      return res.json(err);
    }
  }

  async getById(req: Request, res: Response): Promise<Response<RingResult>> {
    try {
      const { id } = req.params;
      const result = await RingInstance.findByPk(id);
      const finalResult: RingResult = {
        data: result?.dataValues,
      };
      if (!result) {
        const err: RingResult = {
          error: { message: 'Could not find the ring', code: 404 },
        };
        return res.json(err);
      }
      return res.json(finalResult).status(200);
    } catch (error) {
      const err: RingResult = {
        error: { message: 'Could not find the ring', code: 404 },
      };
      return res.json(err);
    }
  }
  async update(req: Request, res: Response): Promise<Response<RingResult>> {
    try {
      const { id } = req.params;
      const { title, description, image_url } = req.body;

      const existingRing = await RingInstance.findByPk(id);
      if (!existingRing) {
        const err: RingResult = {
          error: { message: 'Could not find the ring', code: 404 },
        };
        return res.json(err);
      }

      await RingInstance.update(
        { title, description, image_url },
        { where: { id } }
      );

      const result = await RingInstance.findByPk(id);
      const finalResult: RingResult = {
        data: result?.dataValues,
      };

      return res.json(finalResult).status(200);
    } catch (error) {
      const err: RingResult = {
        error: { message: 'Could not update', code: 500 },
      };
      return res.json(err);
    }
  }
  async delete(
    req: Request,
    res: Response
  ): Promise<Response<RingResultForDelete>> {
    try {
      const { id } = req.params;

      const result = await RingInstance.findByPk(id);
      if (!result) {
        const err: RingResultForDelete = {
          error: { message: 'Could not find the ring', code: 404 },
        };
        return res.json(err);
      }
      await result.destroy();
      const finalResult: Message = { message: 'Ring Deleted' };

      return res.json(finalResult).status(200);
    } catch (error) {
      const err: RingResultForDelete = {
        error: { message: 'Could not Delete', code: 500 },
      };
      return res.json(err);
    }
  }
}

export default new RingController();
