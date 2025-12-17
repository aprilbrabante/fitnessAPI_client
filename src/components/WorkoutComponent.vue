<template>
  <div>
    <div id="ProductCard" class="card p-2 h-80">
      <div class="card-body d-flex flex-column">
        <img
          class="img-fluid rounded"
          :src="`https://placehold.co/600x200/orange/black?font=playfair&text=${encodeURIComponent(workoutData.name)}`"
        />

        <p class="mt-auto fw-semibold text-orange">
          Duration: {{ workoutData.duration }}
        </p>

        <p class="mt-auto fw-semibold text-orange">
          Status: {{ workoutData.status }}
        </p>

        <p class="mt-auto fw-semibold text-orange">
          Date Added: {{ new Date(workoutData.dateAdded).toLocaleDateString('en-GB') }}
        </p>

        <div class="mt-2 d-flex justify-content-between">
          <button class="btn btn-sm btn-warning" @click="goToEditPage">
            Edit
          </button>
          <button class="btn btn-sm btn-success" @click="completeWorkout" :disabled="workoutData.status === 'completed'">
            Complete
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteWorkout">
            Delete
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Notyf } from 'notyf';

import api from "../api.js";

const props = defineProps({
  workoutData: {
    type: Object
  }
});

const router = useRouter();
const notyf = new Notyf();
const emit = defineEmits(['deleted']);

function goToEditPage() {
  router.push({
    name: 'EditWorkout', // Make sure your route has this name
    query: { data: JSON.stringify(props.workoutData) }
  });
}

async function deleteWorkout() {
  const confirmed = confirm('Are you sure you want to delete this workout?');
  if (!confirmed) return;

  const workoutId = props.workoutData._id; // <-- use _id

  if (!workoutId) {
    notyf.error('Workout ID is missing.');
    return;
  }

  try {
    const res = await api.delete(`/workouts/deleteWorkout/${workoutId}`);
    if (res.status === 200) {
      notyf.success('Workout deleted successfully');
      emit('deleted', workoutId); // notify parent to remove card
    }
  } catch (error) {
    console.log(error);
    if ([400, 401, 404].includes(error.response?.status)) {
      notyf.error(error.response.data.error);
    } else {
      notyf.error('Delete failed. Please contact administrator');
    }
  }
}

async function completeWorkout() {
  const workoutId = props.workoutData._id;
  if (!workoutId) {
    notyf.error('Workout ID is missing.');
    return;
  }

  if (props.workoutData.status === 'completed') {
    notyf.info('Workout is already completed.');
    return;
  }

  try {
    const res = await api.patch(`/workouts/completeWorkoutStatus/${workoutId}`);
    if (res.status === 200) {
      notyf.success('Workout marked as completed');
      emit('updated', workoutId); // notify parent to refresh or update status
    }
  } catch (error) {
    console.log(error);
    notyf.error(error.response?.data?.error || 'Failed to complete workout');
  }
}
</script>
