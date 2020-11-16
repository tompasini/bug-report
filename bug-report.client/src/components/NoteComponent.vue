<template>
  <div class="note-component col-12 border rounded shadow-lg mb-3 bg-light">
    <div>
      <p>{{ note.content }}</p>
      <p><i>-{{ note.reportedBy }}</i></p>
    </div>
    <div>
      <button @click="deleteNote(note._id, note.bug)" class="btn-danger">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { noteService } from '../services/NoteService'
export default {
  name: 'NoteComponent',
  props: {
    noteProp: Object
  },
  setup(props) {
    return {
      note: computed(() => props.noteProp),
      deleteNote(noteId, bugId) {
        noteService.deleteNote(noteId, bugId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
