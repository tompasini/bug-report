import BaseController from '../utils/BaseController'
import { noteService } from '../services/NoteService'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      res.send(await noteService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
}
