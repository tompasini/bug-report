import { api } from '../services/AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class BugService {
  async getAll() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveBug(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async submitBug(body) {
    try {
      await api.post('api/bugs', body)
      this.getAll()
    } catch (error) {
      logger.error(error)
    }
  }

  async closeBug(id) {
    try {
      await api.delete('api/bugs/' + id)
      this.getActiveBug(id)
    } catch (error) {
      logger.error(error)
    }
  }

  async editBug(id, body) {
    try {
      await api.put('api/bugs/' + id, body)
      this.getActiveBug(id)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const bugService = new BugService()
