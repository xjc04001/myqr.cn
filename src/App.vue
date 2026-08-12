<template>
  <SiteHeader />
  <main>
    <PrivacyNotice />
    <router-view />
    <section id="about" class="content-band">
      <div class="section-title">
        <div>
          <p>{{ home.whyEyebrow }}</p>
          <h2>{{ home.whyTitle }}</h2>
        </div>
      </div>
      <div class="feature-grid">
        <article v-for="feature in home.features" :key="feature">
          {{ feature }}
        </article>
      </div>
    </section>

    <section class="content-band faq-band">
      <div class="section-title">
        <div>
          <p>{{ home.faqEyebrow }}</p>
          <h2>{{ home.faqTitle }}</h2>
        </div>
      </div>
      <el-collapse class="faq-collapse">
        <el-collapse-item v-for="item in home.faqs" :key="item[0]">
          <template #title>
            <span class="faq-title">
              <span class="faq-mark">Q</span>
              <span>{{ item[0] }}</span>
            </span>
          </template>
          <div class="faq-answer">
            {{ item[1] }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </section>
  </main>
  <SiteFooter />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import PrivacyNotice from './components/PrivacyNotice.vue';
import { useI18n } from './utils/i18n';

const { text } = useI18n();
const home = computed(() => text.value.home);
</script>
