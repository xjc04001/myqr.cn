<template>
  <PageShell :eyebrow="t.eyebrow" :title="t.title">
    <template #aside>
      <span class="muted">{{ t.aside }}</span>
    </template>

    <div class="tool-grid">
      <el-card shadow="never">
        <template #header>
          <strong>{{ t.content }}</strong>
        </template>
        <el-input v-model="form.text" type="textarea" :rows="6" maxlength="120" show-word-limit :placeholder="t.placeholder" />
        <div class="form-grid">
          <el-form-item :label="t.type">
            <el-select v-model="form.type">
              <el-option v-for="type in barcodeTypes" :key="type" :value="type" :label="type" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t.scale">
            <el-input-number v-model="form.scale" :min="1" :max="6" />
          </el-form-item>
          <el-form-item :label="t.height">
            <el-input-number v-model="form.height" :min="20" :max="160" />
          </el-form-item>
          <el-form-item :label="t.width">
            <el-input-number v-model="form.width" :min="1" :max="8" />
          </el-form-item>
          <el-form-item :label="t.foreground">
            <el-color-picker v-model="form.colorDark" />
          </el-form-item>
          <el-form-item :label="t.background">
            <el-color-picker v-model="form.colorLight" />
          </el-form-item>
          <el-form-item :label="t.showText">
            <el-switch v-model="form.showText" />
          </el-form-item>
        </div>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <strong>{{ t.result }}</strong>
        </template>
        <div class="barcode-preview">
          <canvas ref="canvasRef" />
          <el-empty v-if="!form.text.trim()" :description="t.empty" />
        </div>
        <div class="button-row">
          <el-button type="primary" :disabled="!canDownload" @click="downloadPng">{{ t.downloadPng }}</el-button>
          <el-button :disabled="!canDownload" @click="downloadSvg">{{ t.downloadSvg }}</el-button>
        </div>
      </el-card>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { saveAs } from 'file-saver';
import PageShell from '../components/PageShell.vue';
import { barcodeTypes, createBarcodePng, createBarcodeSvg, type BarcodeOptions } from '../utils/barcode';
import { useI18n } from '../utils/i18n';

const { text } = useI18n();
const t = computed(() => text.value.barcode);
const canvasRef = ref<HTMLCanvasElement>();
const canDownload = ref(false);
const svgMarkup = ref('');
const form = reactive<BarcodeOptions>({
  type: 'CODE128',
  text: '',
  scale: 3,
  height: 64,
  width: 2,
  showText: true,
  colorDark: '#111827',
  colorLight: '#ffffff',
});

watch(form, renderBarcode, { deep: true });
onMounted(renderBarcode);

async function renderBarcode() {
  await nextTick();
  const canvas = canvasRef.value;
  const value = form.text.trim();

  canDownload.value = false;
  svgMarkup.value = '';
  if (!canvas || !value) {
    clearCanvas();
    return;
  }

  try {
    const options = { ...form, text: value };
    await createBarcodePng(canvas, options);
    svgMarkup.value = createBarcodeSvg(options);
    canDownload.value = true;
  } catch {
    clearCanvas();
    ElMessage.error(t.value.invalid);
  }
}

function clearCanvas() {
  const canvas = canvasRef.value;
  const context = canvas?.getContext('2d');
  if (canvas && context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function downloadPng() {
  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }
  canvas.toBlob((blob) => {
    if (blob) {
      saveAs(blob, 'barcode.png');
    }
  }, 'image/png');
}

function downloadSvg() {
  if (!svgMarkup.value) {
    return;
  }
  saveAs(new Blob([svgMarkup.value], { type: 'image/svg+xml;charset=utf-8' }), 'barcode.svg');
}
</script>
