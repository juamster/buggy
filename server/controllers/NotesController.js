import express from "express";
import noteService from "../services/NoteService";

export default class NotesController {
  constructor() {
    this.router = express
      .Router()
      .post("", this.create)
      .delete("/:id", this.delete);
  }

  async create(req, res, next) {
    try {
      let aBug = await noteService.createNote(req.body);
      res.send(aBug);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await noteService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await noteService.delete(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}