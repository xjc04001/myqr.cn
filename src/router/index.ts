import { createRouter, createWebHistory } from 'vue-router';
import GeneratorView from '../views/GeneratorView.vue';

const DecoderView = () => import('../views/DecoderView.vue');
const BatchView = () => import('../views/BatchView.vue');
const BarcodeGenerator = () => import('../views/BarcodeGenerator.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/generate' },
    { path: '/generate', name: 'generate', component: GeneratorView },
    { path: '/decode', name: 'decode', component: DecoderView },
    { path: '/batch', name: 'batch', component: BatchView },
    { path: '/barcode', name: 'barcode', component: BarcodeGenerator },
  ],
});

export default router;
