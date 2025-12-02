/**
 * ROUTER FILE
 */
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import ErrorPage from './pages/ErrorPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import WorkoutPage from './pages/WorkoutPage.vue';
import AddWorkoutPage from './pages/AddWorkoutPage.vue';
import LogoutPage from './pages/LogoutPage.vue';

  const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/workouts',
            name: 'Workouts',
            component: WorkoutPage
        },
        {
            path: '/register-workout',
            name: 'RegisterWorkout',
            component: AddWorkoutPage
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage
        },  
        {
            path: '/:catchAll(.*)',
            component: ErrorPage
        }
    ]
  });

  export default router;
