import { api } from '../services/AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class NoteService {
  async getBugNotes(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async addNote(bugId, body) {
    try {
      body.bug = bugId
      await api.post('api/notes', body)
      this.getBugNotes(bugId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteNote(noteId, bugId) {
    try {
      await api.delete('api/bugs/' + bugId + '/notes/' + noteId)
      this.getBugNotes(bugId)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const noteService = new NoteService()
