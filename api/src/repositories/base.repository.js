class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filter = {}) {
    return this.model.find(filter);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository; 