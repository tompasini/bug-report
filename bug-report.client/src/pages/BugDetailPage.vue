<template>
  <div class="bug container-fluid bg-light">
    <div class="row">
      <div class="col-8 pt-5 details-border pr-2 details-height">
        <h1 class="text-center">
          <span class="border-bottom border-dark">"{{ bug.title }}"</span>
        </h1>
        <p><b>Details: </b>{{ bug.description }}</p>
        <p><b>Reported By: </b>{{ bug.reportedBy }}</p>
        <p class="text-success" v-if="bug.closed == false">
          <b>Open</b>
        </p>
        <p class="text-danger" v-else>
          <b>Closed</b>
        </p>
        <p><b>Created Date: </b>{{ bug.createdAt }}</p>
        <p><b>Last Updated: </b>{{ bug.updatedAt }}</p>
        <!-- <div v-if="bug.closed == false">
          <button type="button" class="btn-warning" data-toggle="modal" data-target="#edit-bug">
            Edit
          </button>

          <div class="modal fade"
               id="edit-bug"
               tabindex="-1"
               role="dialog"
               aria-labelledby="exampleModalLabel"
               aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form class="form-group" @submit.prevent="editBug(bug._id)">
                  <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Title" required v-model="state.editedBug.title">
                    <input type="text" class="form-control" placeholder="Description" required v-model="state.editedBug.description">
                    <input type="text" class="form-control" placeholder="Reported By" required v-model="state.editedBug.reportedBy">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> -->
        <div v-if="bug.closed == false">
          <button @click="closeBug(bug._id)" class="btn-danger">
            Close
          </button>
        </div>
      </div>
      <div class="col-4 notes-bg">
        <div class="row border-dark border-top border-bottom shadow-lg p-2">
          <div class="col-12 py-2 my-2 bg-light shadow-lg">
            <form @submit.prevent="addNote(bug._id)" class="form-group">
              <div>
                <textarea cols="50" rows="5" v-model="state.newNote.content"></textarea>
              </div>
              <div>
                <input type="text" placeholder="Reported By" v-model="state.newNote.reportedBy">
              </div>
              <div>
                <button type="submit" class="btn-info">
                  Add Note
                </button>
              </div>
            </form>
          </div>
          <note-component v-for="note in notes" :key="note._id" :note-prop="note" />
        </div>
      </div>
    </div>
    <div class="row">
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
export default {
  name: 'Bug',
  setup() {
    const route = useRoute()
    const state = reactive({
      editedBug: {},
      newNote: {}
    })
    onMounted(async() => {
      await bugService.getActiveBug(route.params.id)
      await noteService.getBugNotes(route.params.id)
    })
    return {
      state,
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      closeBug(id) {
        bugService.closeBug(id)
      },
      editBug(id) {
        bugService.editBug(id, state.editedBug)
      },
      addNote(id) {
        noteService.addNote(id, state.newNote)
        state.newNote = {}
      }
    }
  },
  components: {}
}
</script>

<style
    NoteComponent lang="scss" scoped>

    .details-height{
      height: 100vh;
    }

    .details-border{
      border-right: 3px double black;
    }

    .notes-bg{
      background-color: #dfe9f7;
    }

    .underline{
      text-decoration: underline;
    }

</style>
