<template>
    <div class="card shadow-sm">
        <div class="card-body p-4">
            <h4 class="card-title mb-3 text-center">Add Workout</h4>
            <p class="text-muted text-center small mb-4">Please fill in the form to register workout</p>

            <form id="addWorkoutForm" class="needs-validation" v-on:submit="handleSubmit">
                <div class="row g-3">
                    <div class="col-12">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name" required  v-model="name">
                    </div>

                    <div class="col-12">
                        <label for="duration" class="form-label">Duration</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="duration" name="duration" required v-model="duration">
                        </div>
                    </div>

                    <div class="col-12 d-grid">
						<button type="submit" class="btn btn-primary btn-block" v-if="isEnabled" :disabled="loading">
                            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            {{ loading ? 'Adding...' : 'Add Workout' }}
                        </button>
						<button type="submit" class="btn btn-danger btn-block" v-else disabled>Add Workout</button>
                    </div>

                </div>

            </form>
        </div>
    </div>
</template>

<style>
    body { background: #f8f9fa; }
    .card { max-width: 540px; margin: 48px auto; }
</style>

<script setup>

    import { watch, ref, onBeforeMount } from "vue";
	import { useRouter } from 'vue-router';
	import { useGlobalStore } from '../stores/global.js'
    import { Notyf } from 'notyf';
    import api from "../api.js";

    const name = ref("");
    const duration = ref("");
    const isEnabled = ref(false);
    const loading = ref(false);

	const router = useRouter();
	const { user } = useGlobalStore();
    const notyf = new Notyf();

    watch([name, duration], (currentValue, oldValue) => {
        if (currentValue.every(input => input != "") ) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    })

    async function handleSubmit(e) {
        
        e.preventDefault();

        const confirmed = window.confirm('Are you sure you want to add this workout?');
        if (!confirmed) return;

        loading.value = true
        
        try {
            let res = await api.post("/workouts/addWorkout", {
                name: name.value,
                duration: duration.value                
            });

            if (res.status === 201) {
                notyf.success("Registration Successful");

                name.value = "";
                duration.value = "";

                router.push({path: "/workouts"});
            }
        } catch (error) {
            console.log(error)
            if ([400,401,404].includes(error.response.status)) {
                notyf.error(error.response.data.error);
            } else {
                notyf.error("Registration failed. Please contact administrator");
            }            
        } finally {
            loading.value = false;
        }
    }

</script>