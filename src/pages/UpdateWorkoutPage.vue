<template>
  <div class="card shadow-sm">
    <div class="card-body p-4">
      <h4 class="card-title mb-3 text-center">Edit Workout</h4>

      <form id="editWorkoutForm" class="needs-validation" @submit.prevent="handleSubmit">
        <div class="row g-3">

          <!-- Name -->
          <div class="col-12">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="name" required />
          </div>

          <!-- Duration -->
          <div class="col-12">
            <label for="duration" class="form-label">Duration</label>
            <div class="input-group">
              <input type="text" class="form-control" id="duration" v-model="duration" required />
            </div>
          </div>


          <!-- Submit Button -->
          <div class="col-12 d-grid">
            <button type="submit" class="btn btn-primary btn-block" v-if="isEnabled" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ loading ? 'Updating...' : 'Update Workout' }}
            </button>
            <button type="submit" class="btn btn-danger btn-block" v-else disabled>Update Workout</button>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../api'; // your Axios instance
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const route = useRoute();
const router = useRouter();
const notyf = new Notyf();

const name = ref('');
const duration = ref('');

const loading = ref(false);
const isEnabled = ref(true);

let workoutId = null; // store workout ID

// Populate form from route query
onMounted(() => {
  const workoutData = JSON.parse(route.query.data || '{}');
  workoutId = workoutData._id; // get ID for API call
  name.value = workoutData.name || '';
  duration.value = workoutData.duration || '';

});

// Submit logic
async function handleSubmit() {
  if (!workoutId) {
    notyf.error('Workout ID is missing.');
    return;
  }

  loading.value = true;
  isEnabled.value = false;

  try {
    const res = await api.patch(`/workouts/updateWorkout/${workoutId}`, {
      name: name.value,
      duration: duration.value
    });

    if (res.status === 200) {
      notyf.success('Workout updated successfully');
      router.push({ path: '/workouts' }); // redirect after update
    }

  } catch (error) {
    console.log(error);
    if ([400, 401, 404].includes(error.response?.status)) {
      notyf.error(error.response.data.error);
    } else {
      notyf.error('Update failed. Please contact administrator');
    }
  } finally {
    loading.value = false;
    isEnabled.value = true;
  }
}
</script>
