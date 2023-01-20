import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useCookies } from "vue3-cookies";

import router from './router';
import './style.css';
import App from './App.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "leaflet/dist/leaflet.css";

import '@fortawesome/fontawesome-free/css/all.css'

import './assets/scss/main.scss';


createApp(App).use(createPinia()).use(useCookies).use(router).mount('#app')
