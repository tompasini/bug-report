import BaseController from '../utils/BaseController'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:bugId', this.getOne)
      .get('/:bugId/notes', this.getBugNotes)
      .post('', this.create)
      .put('/:bugId', this.edit)
      .delete('/:bugId', this.close)
      .delete('/:bugId/notes/:noteId', this.deleteBugNote)
  }

  async deleteBugNote(req, res, next) {
    try {
      res.send(await noteService.deleteBugNote(req.params.noteId))
    } catch (error) {
      next(error)
    }
  }

  async getBugNotes(req, res, next) {
    try {
      res.send(await noteService.getBugNotes(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async close(req, res, next) {
    try {
      res.send(await bugService.close(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await bugService.edit(req.params.bugId, req.body))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      res.send(await bugService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugService.getAll())
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await bugService.getOne(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }
}
