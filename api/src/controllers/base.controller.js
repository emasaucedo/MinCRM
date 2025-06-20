class BaseController {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res, next) {
    try {
      const items = await this.service.getAll(req.query);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const item = await this.service.getById(req.params.id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const item = await this.service.update(req.params.id, req.body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default BaseController; 