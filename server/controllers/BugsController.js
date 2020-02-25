import express from "express";
import bugService from "../services/BugService";
import noteService from "../services/NoteService";

export default class BugsController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/notes", this.getAllNotesByBugId)
      .post("", this.create)
      .put("/:id", this.editBug)
      .put("/:bugId/notes/:noteId", this.editNote)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await bugService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAllNotesByBugId(req, res, next) {
    try {
      let notes = await noteService.getByBugId(req.params.bugId);
      res.send(notes);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      let aBug = await bugService.getById(req.params.id);
      res.send(aBug);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let aBug = await bugService.createBug(req.body);
      res.send(aBug);
    } catch (error) {
      next(error);
    }
  }
  async editBug(req, res, next) {
    try {
      let editedBug = await bugService.update(req.params.id, req.body)
      return res.send(editedBug)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await bugService.delete(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }

  async editNote(req, res, next) {
    try {
      if (await bugService.checkOpenBug(req.params.bugID)) {
        let editedNote = await noteService.editNote(req.parms.noteId, req.body)
        return res.send(editedNote)
      }
    } catch (error) {
      next(error)
    }
  }

}
