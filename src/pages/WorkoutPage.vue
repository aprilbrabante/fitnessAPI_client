<template>

    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 300px;">
      <div class="text-center">
        <div class="spinner-border text-orange" role="status" aria-hidden="true"></div>
        <div class="mt-2 text-orange">Loading workouts...</div>
      </div>
    </div>

    <div v-else class="container py-2" >

        <div class="row g-4">
            <div class="col my-2">
                <h1 class="text-center py-1 fw-bold text-orange">My Workouts</h1>
                
                <button class="btn btn-success" @click="goToRegister" id="addWorkout">
                  Add Workout
                </button>

                <!-- Display message if no workouts -->
                <p v-if="!loading && workouts.data.length === 0" class="mt-3 text-center text-muted">
                  No workouts found. Please add a workout.
                </p>

            </div>
        </div>

        <div class="row g-4">
            <WorkoutComponent
                v-for="(workout, index) in paginatedWorkouts"
                :key="index"
                :workoutData="workout"
                class="col-12 col-md-6 col-lg-4"
            /> 
        </div>
        <br/><br/>
        <div class="container">
            <div class="d-flex justify-content-center align-items-center mt-4 gap-3">
                <button
                    class="btn btn-warning"
                    @click="prevPage"
                    :disabled="currentPage === 1"
                >
                    Previous
                </button>

                <span class="text-orange">Page {{ currentPage }} of {{ totalPages }}</span>

                <button
                    class="btn btn-warning"
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                >
                    Next
                </button>
            </div>
        </div>   
    </div>
</template>

<script setup>

    import { reactive, onBeforeMount, ref, computed } from 'vue';
    import api from '../api.js';
    import { useGlobalStore } from '../stores/global.js'
    import { Notyf } from 'notyf';
    import WorkoutComponent from '../components/WorkoutComponent.vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const notyf = new Notyf();
    const { user } = useGlobalStore();
    const workouts = reactive({ data: [] });

    const loading = ref(false);

    const itemsPerPage = 6;
    const currentPage = ref(1);

    onBeforeMount(async () => {
      try {
        loading.value = true;
        const res = await api.get("/workouts/getMyWorkouts");
        workouts.data = res.data.workouts || [];
      } catch (error) {
        console.error('Error loading workouts:', error);
        workouts.data = [];
      } finally {
        loading.value = false;
      }
    });

    const totalPages = computed(() =>
        Math.max(1, Math.ceil(workouts.data.length / itemsPerPage))
    );

    const paginatedWorkouts = computed(() => {
      const data = workouts.data || [];
      const start = (currentPage.value - 1) * itemsPerPage;
      return data.slice(start, start + itemsPerPage);
    });

    function nextPage() {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }
    }

    function prevPage() {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    }

    function goToRegister() {
      console.log('goto register')
      router.push({name: 'RegisterWorkout'});

    }


</script>