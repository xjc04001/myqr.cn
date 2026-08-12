<template>
  <Teleport to="body">
    <div v-if="visible" class="qr-share-overlay" role="dialog" aria-modal="true" aria-label="QR share preview">
      <section class="qr-share-card">
        <button class="qr-share-close" type="button" aria-label="Close preview" @click="$emit('close')">
          ×
        </button>
        <div class="qr-share-image-wrap">
          <img class="qr-share-image" :src="imageSrc" alt="QR code share preview">
        </div>
        <div class="qr-share-content-tag">
          {{ content }}
        </div>
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
  imageSrc: string;
  content: string;
}>();

defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.qr-share-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: max(20px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom))
    max(16px, env(safe-area-inset-left));
  overflow: hidden;
  background: rgb(0 0 0 / 75%);
}

.qr-share-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(360px, 100%);
  max-height: calc(100vh - 56px);
  padding: clamp(20px, 5vw, 28px);
  overflow: visible;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 24px 80px rgb(0 0 0 / 28%);
}

.qr-share-image-wrap {
  display: grid;
  place-items: center;
  width: min(260px, 72vw);
  padding: 16px;
  background: #ffffff;
}

.qr-share-image {
  display: block;
  width: 100%;
  max-width: 240px;
  height: auto;
}

.qr-share-content-tag {
  max-width: 100%;
  margin-top: 18px;
  padding: 8px 16px;
  overflow-wrap: anywhere;
  color: #263244;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  white-space: normal;
  background: #fafafa;
  border: 1px solid #dddddd;
  border-radius: 999px;
}

.qr-share-close {
  position: absolute;
  top: -22px;
  right: -22px;
  z-index: 10000;
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  padding: 0;
  color: #ffffff;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
  background: rgb(17 24 39 / 92%);
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.qr-share-close:hover {
  background: rgb(255 255 255 / 24%);
}

@media (max-width: 560px) {
  .qr-share-card {
    width: min(330px, 100%);
    max-height: calc(100vh - 72px);
    padding: 20px;
  }

  .qr-share-close {
    top: -18px;
    right: -12px;
  }

  .qr-share-image-wrap {
    width: min(240px, 70vw);
    padding: 14px;
  }

  .qr-share-content-tag {
    max-height: 22vh;
    overflow-y: auto;
    border-radius: 8px;
	color: #0052a4;
	line-height: 1.2;
    background-color: #e8f4ff;
  }
}
</style>
