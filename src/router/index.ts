import { createRouter, createWebHistory } from 'vue-router';
import GeneratorView from '../views/GeneratorView.vue';
import DecoderView from '../views/DecoderView.vue';
import BatchView from '../views/BatchView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/generate' },
    { path: '/generate', name: 'generate', component: GeneratorView },
    { path: '/decode', name: 'decode', component: DecoderView },
    { path: '/batch', name: 'batch', component: BatchView },
  ],
});

export default router;
