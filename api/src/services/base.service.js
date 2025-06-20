class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(filter = {}) {
    return this.repository.findAll(filter);
  }

  async getById(id) {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async update(id, data) {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new Error('Item not found');
    }
    return updated;
  }

  async delete(id) {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error('Item not found');
    }
    return deleted;
  }
}

export default BaseService; 