import mongoose from "mongoose";
import Bug from "../models/Bug";
import { BadRequest } from "../errors";

const _repository = mongoose.model("Bug", Bug);

class BugService {
  async getAll() {
    return await _repository.find({});
  }

  async getById(id) {
    let bug = await _repository.findById(id);
    if (!bug) {
      throw new BadRequest("Invalid Id");
    }
    return bug;
  }
  async createBug(bugData) {
    return await _repository.create(bugData);
  }

  async update(id, updateData) {
    // do some business logic
    let bug = await this.getById(id);
    // @ts-ignore
    if (!bug.closed) {
      return await _repository.findByIdAndUpdate(id, updateData, { new: true });
    }
  }
  async checkOpenBug(id) {
    let bug = await this.getById(id);
    // @ts-ignore
    if (!bug.closed) {
      throw new BadRequest("This bug is already deleted");
    }
    return true;
  }
  async delete(id) {
    let bug = await this.getById(id);
    // @ts-ignore
    if (!bug.closed) {
      // @ts-ignore
      bug.closed = true;
      return await _repository.findByIdAndUpdate(id, bug, { new: true });
    } else {
      throw new BadRequest("This bug is already deleted ");
    }

  }
}


const bugService = new BugService();
export default bugService;