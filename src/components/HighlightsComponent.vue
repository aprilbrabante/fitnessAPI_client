<template>
  <section class="py-5 bg-dark text-center text-light">
    <div class="container">
      <h2 class="mb-4 fw-bold text-orange">Your Body. Your Power.</h2>
      <div class="row justify-content-center">
        <!-- Card 1 -->
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm border-0 custom-card">
            <div class="card-body">
              <i class="bi bi-fire display-4 text-orange mb-3"></i>
              <h5 class="card-title fw-semibold text-light">Strength Training</h5>
              <p class="card-text text-secondary">
                Build muscle and get stronger with progressive resistance exercises you can do at home or in the gym.
              </p>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm border-0 custom-card">
            <div class="card-body">
              <i class="bi bi-heart-pulse display-4 text-orange mb-3"></i>
              <h5 class="card-title fw-semibold text-light">Cardio & Conditioning</h5>
              <p class="card-text text-secondary">
                Improve endurance and burn calories with HIIT, running, cycling and bodyweight cardio circuits.
              </p>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm border-0 custom-card">
            <div class="card-body">
              <i class="bi bi-universal-access display-4 text-orange mb-3"></i>
              <h5 class="card-title fw-semibold text-light">Mobility & Recovery</h5>
              <p class="card-text text-secondary">
                Stretching, mobility drills and recovery tips to keep you moving pain-free and ready for your next session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WhyChooseUs",
};
</script>

<style scoped>
  .custom-card {
    background-color: #1a1a1a;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 10px;
  }

  .custom-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(255, 165, 0, 0.3);
  }


</style>
