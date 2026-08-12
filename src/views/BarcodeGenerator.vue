<template>
  <PageShell :eyebrow="t.eyebrow" :title="t.title">
    <template #aside>
      <span class="muted">{{ t.aside }}</span>
    </template>

    <div class="tool-grid barcode-grid">
      <el-card class="barcode-card" shadow="never">
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
            <el-input-number v-model="form.height" :min="5" :max="80" :precision="1" />
          </el-form-item>
          <el-form-item :label="t.width">
            <el-input-number v-model="form.width" :min="0" :max="160" />
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

      <el-card class="barcode-card" shadow="never">
        <template #header>
          <strong>{{ t.result }}</strong>
        </template>
        <div class="barcode-preview">
          <img v-if="previewSvgUrl" class="barcode-preview-image" :src="previewSvgUrl" alt="Barcode preview">
          <el-empty v-if="!form.text.trim()" :description="t.empty" />
        </div>
        <div class="button-row">
          <el-button type="primary" :disabled="!canDownload" @click="downloadPng">{{ t.downloadPng }}</el-button>
          <el-button :disabled="!canDownload" @click="downloadSvg">{{ t.downloadSvg }}</el-button>
        </div>
        <canvas ref="downloadCanvasRef" class="download-canvas" aria-hidden="true" />
      </el-card>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { saveAs } from 'file-saver';
import PageShell from '../components/PageShell.vue';
import {
  barcodeTypes,
  createBarcodePng,
  createBarcodeSvg,
  createPngExportBarcodeOptions,
  createPreviewBarcodeOptions,
  getDefaultBarcodeHeight,
  type BarcodeOptions,
  type BarcodeType,
} from '../utils/barcode';
import { useI18n } from '../utils/i18n';

const { text } = useI18n();
const t = computed(() => text.value.barcode);
const downloadCanvasRef = ref<HTMLCanvasElement>();
const canDownload = ref(false);
const previewSvgUrl = ref('');
const form = reactive<BarcodeOptions>({
  type: 'CODE128',
  text: '',
  scale: 3,
  height: getDefaultBarcodeHeight('CODE128'),
  width: undefined,
  showText: true,
  colorDark: '#111827',
  colorLight: '#ffffff',
});

watch(() => form.type, applyTypeDefaults);
watch(form, renderBarcode, { deep: true });

function applyTypeDefaults(type: BarcodeType) {
  form.height = getDefaultBarcodeHeight(type);
}

function renderBarcode() {
  const value = form.text.trim();

  canDownload.value = false;
  previewSvgUrl.value = '';
  if (!value) {
    return;
  }

  try {
    const options = { ...form, text: value };
    previewSvgUrl.value = svgToDataUrl(createBarcodeSvg(createPreviewBarcodeOptions(options)));
    canDownload.value = true;
  } catch {
    ElMessage.error(t.value.invalid);
  }
}

function svgToDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function downloadPng() {
  const canvas = downloadCanvasRef.value;
  if (!canvas) {
    return;
  }
  try {
    await createBarcodePng(canvas, createPngExportBarcodeOptions({ ...form, text: form.text.trim() }));
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, 'barcode.png');
      }
    }, 'image/png');
  } catch {
    ElMessage.error(t.value.invalid);
  }
}

function downloadSvg() {
  const value = form.text.trim();
  if (!value) {
    return;
  }
  try {
    const svg = createBarcodeSvg({ ...form, text: value });
    saveAs(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), 'barcode.svg');
  } catch {
    ElMessage.error(t.value.invalid);
  }
}
</script>
