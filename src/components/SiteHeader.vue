<template>
  <header class="site-header">
    <router-link class="brand" to="/generate">
      <img src="/images/logo.png" alt="MYQR" />
      <span>MYQR</span>
    </router-link>
    <nav class="main-tabs">
      <router-link to="/generate">在线生成</router-link>
      <router-link to="/decode">在线解码</router-link>
      <router-link to="/batch">批量生成</router-link>
    </nav>
    <div class="header-actions">
      <el-segmented v-model="language" :options="['中文', 'English']" size="small" />
      <a href="#about">关于我们</a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const language = ref('中文');
</script>
