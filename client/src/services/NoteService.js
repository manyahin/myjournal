import axios from 'axios'

export default {
  async loadNotes (filter = {}) {
    const { data } = await axios.get(`Notes?filter=${JSON.stringify(filter)}`)
    return data
  },
  async addNote (note) {
    return axios.post('Notes', note)
  },
  async favoriteNote (note) {
    return axios.patch('Notes/' + note.id, { favorite: note.favorite })
  }
}
