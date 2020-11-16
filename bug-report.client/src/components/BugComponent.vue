<template>
  <div class="bug-component col-12 border rounded shadow-lg d-flex justify-content-between">
    <div class="text-left">
      <p>Title: {{ bug.title }}</p>
      <p>Reported By: {{ bug.reportedBy }}</p>
      <button @click="goToBug(bug._id)" class="btn-info">
        View Details
      </button>
    </div>
    <div class="text-right">
      <p>Created Date: {{ bug.createdAt }}</p>
      <p>Last Updated: {{ bug.updatedAt }}</p>
      <p class="text-success" v-if="bug.closed == false">
        <b>Open</b>
      </p>
      <p class="text-danger" v-else>
        <b>Closed</b>
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'BugComponent',
  props: {
    bugProp: Object
  },
  setup(props) {
    const router = useRouter()
    return {
      bug: computed(() => props.bugProp),
      goToBug(id) {
        router.push({ name: 'Bug', params: { id: id } })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
