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
      </div>
    </div>
  </div>
</template>

<script setup>

  import { useGlobalStore } from '../stores/global.js'

  import { computed } from 'vue';

  const { user } = useGlobalStore();

  const props = defineProps({
  workoutData: {
      type: Object
  }
  });

</script>