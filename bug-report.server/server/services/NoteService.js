import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async deleteBugNote(id) {
    return await dbContext.Note.findByIdAndDelete(id)
  }

  async getBugNotes(id) {
    return await dbContext.Note.find({ bug: id })
  }

  async create(body) {
    return await dbContext.Note.create(body)
  }
}

export const noteService = new NoteService()
