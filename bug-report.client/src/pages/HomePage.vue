<template>
  <div class="home container-fluid">
    <div class="row text-center">
      <div class="col-12 log-header">
        <h3>
          Bug Log
        </h3>
      </div>
    </div>

    <div class="row bg-white">
      <div class="col-8 log-height overflow-auto">
        <div class="row">
          <bug-component v-for="bug in bugs" :key="bug._id" :bug-prop="bug" />
        </div>
      </div>
      <div class="col-4 d-flex align-content-center flex-wrap bg-light">
        <div class="row text-center">
          <div class="col-12">
            <div class="add-bug-border shadow-lg">
              <h2 class="add-bug-header">
                Report a Bug
              </h2>
              <form @submit.prevent="submitBug" class="form-group">
                <input type="text"
                       class="form-control"
                       aria-describedby="helpId"
                       placeholder="Title"
                       v-model="state.newBug.title"
                >
                <label for="">Describe the issue:</label>
                <textarea cols="52" rows="10" v-model="state.newBug.description"></textarea>
                <input type="text"
                       class="form-control"
                       aria-describedby="helpId"
                       placeholder="Enter your name here"
                       v-model="state.newBug.reportedBy"
                >
                <button type="submit" class="btn btn-success btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBug: {}
    })
    onMounted(() => {
      bugService.getAll()
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      submitBug() {
        bugService.submitBug(state.newBug)
        state.newBug = {}
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

.log-height{
  height: 80vh;
}

.log-header{
  background-color: #b9d4f8;
  border: black solid 3px;
}

.add-bug-header{
  background-color: #dae5e7;
  border-bottom: black solid 1px;
}

.add-bug-border{
  border: black solid 1px;
}

.bg-form{
  background-color: rgba(185, 212, 248, .1);
}

</style>
