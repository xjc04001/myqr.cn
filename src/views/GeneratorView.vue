<template>
  <PageShell :eyebrow="t.eyebrow" :title="t.title">
    <template #aside>
      <span class="muted">{{ t.aside }}</span>
    </template>

    <div class="tool-grid">
      <el-card shadow="never">
        <template #header>
          <strong>{{ t.input }}</strong>
        </template>
        <el-input v-model="content" type="textarea" :rows="8" maxlength="1200" show-word-limit :placeholder="t.placeholder" />
        <div class="form-grid">
          <el-form-item :label="t.size">
            <el-select v-model="options.size">
              <el-option :value="128" label="128px" />
              <el-option :value="256" label="256px" />
              <el-option :value="512" label="512px" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t.correction">
            <el-select v-model="options.errorCorrectionLevel">
              <el-option value="L" label="L" />
              <el-option value="M" label="M" />
              <el-option value="Q" label="Q" />
              <el-option value="H" label="H" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t.foreground">
            <el-color-picker v-model="options.colorDark" />
          </el-form-item>
          <el-form-item :label="t.background">
            <el-color-picker v-model="options.colorLight" />
          </el-form-item>
          <el-form-item :label="t.margin">
            <el-input-number v-model="options.margin" :min="0" :max="8" />
          </el-form-item>
          <el-form-item :label="t.logo">
            <el-upload accept="image/*" :auto-upload="false" :show-file-list="false" :on-change="onLogoChange">
              <el-button>{{ t.uploadLogo }}</el-button>
            </el-upload>
          </el-form-item>
        </div>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <strong>{{ t.result }}</strong>
        </template>
        <div class="preview-box">
          <img v-if="qrDataUrl" :src="qrDataUrl" :alt="t.previewAlt" :class="{ 'is-placeholder': !hasContent }">
          <div v-if="!hasContent && qrDataUrl" class="preview-mask">
            {{ overlayText }}
          </div>
          <el-empty v-if="!qrDataUrl" :description="t.empty" />
        </div>
        <el-button type="primary" :disabled="!hasContent || !qrDataUrl" @click="download">{{ t.download }}</el-button>
      </el-card>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { saveAs } from 'file-saver';
import PageShell from '../components/PageShell.vue';
import { debounce } from '../utils/debounce';
import { createQrDataUrl, dataUrlToBlob, type QrOptions } from '../utils/qr';
import { useI18n } from '../utils/i18n';

const { isZh, text } = useI18n();
const t = computed(() => text.value.generator);
const placeholderContent = 'https://myqr.cn';
const content = ref('');
const qrDataUrl = ref('');
const hasContent = computed(() => content.value.trim().length > 0);
const overlayText = computed(() => (isZh.value ? '请在左侧输入内容即生成' : 'Enter content on the left to generate'));
const options = reactive<QrOptions>({
  size: 256,
  errorCorrectionLevel: 'H',
  colorDark: '#111827',
  colorLight: '#ffffff',
  margin: 2,
});

const generate = debounce(async () => {
  const value = content.value.trim();
  qrDataUrl.value = await createQrDataUrl(value || placeholderContent, options);
}, 400);

watch([content, options], generate, { immediate: true, deep: true });

function onLogoChange(file: { raw?: File }) {
  if (!file.raw) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    options.logoDataUrl = String(reader.result);
    generate();
  };
  reader.readAsDataURL(file.raw);
}

function download() {
  if (qrDataUrl.value) {
    saveAs(dataUrlToBlob(qrDataUrl.value), 'myqr.png');
  }
}
</script>
