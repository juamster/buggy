import mongoose from "mongoose";
import Note from "../models/Note";
import { BadRequest } from "../errors";

const _repository = mongoose.model("Note", Note);

class NoteService {
  async getAll() {
    return await _repository.find({});
  }
  async createNote(noteData) {
    return await _repository.create(noteData);
  }
  async getByBugId(bugId) {
    let project = await _repository.find({ bug: bugId });
    if (!project) {
      throw new BadRequest("Invalid Id");
    }
    return project;
  }
  async editNote(id, updateData) {
    // do some business logic
    return await _repository.findByIdAndUpdate(id, updateData, { new: true });

  }
  async delete(id) {
    return await _repository.findByIdAndRemove(id);
  }
}

const noteService = new NoteService();
export default noteService;