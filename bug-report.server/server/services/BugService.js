import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async getAll() {
    return await dbContext.Bug.find()
  }

  async getOne(id) {
    return await dbContext.Bug.findById(id)
  }

  async create(body) {
    return await dbContext.Bug.create(body)
  }

  async edit(id, body) {
    const bug = await this.getOne(id)
    if (bug._doc.closed === false) {
      return await dbContext.Bug.findByIdAndUpdate(id, body, { new: true })
    } else {
      throw new BadRequest('Cannot edit a closed bug.')
    }
  }

  async close(id) {
    const bug = await dbContext.Bug.findByIdAndUpdate(id, { closed: true }, { new: true })
    return bug
  }
}

export const bugService = new BugService()
