<template>
  <SiteHeader />
  <main>
    <PrivacyNotice />
    <router-view />
    <section id="about" class="content-band">
      <div class="section-title">
        <div>
          <p>Why MYQR</p>
          <h2>为什么选择 MYQR</h2>
        </div>
      </div>
      <div class="feature-grid">
        <article v-for="feature in features" :key="feature">
          {{ feature }}
        </article>
      </div>
    </section>

    <section class="content-band">
      <div class="section-title">
        <div>
          <p>FAQ</p>
          <h2>常见问题</h2>
        </div>
      </div>
      <el-collapse>
        <el-collapse-item v-for="item in faqs" :key="item.question" :title="item.question">
          {{ item.answer }}
        </el-collapse-item>
      </el-collapse>
    </section>
  </main>
  <SiteFooter />
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import PrivacyNotice from './components/PrivacyNotice.vue';

const features = [
  '完全免费',
  '无需注册',
  '无需登录',
  '浏览器本地运行',
  '不上载用户数据',
  '不保存二维码内容',
  '无服务器存储',
  '更安全、更保护隐私',
];

const faqs = [
  {
    question: '网站会泄露我生成二维码或上传二维码图片的数据吗？',
    answer:
      '不会。本网站所有操作均在您的浏览器本地完成，无论是生成、识别还是批量生成，数据都不会上传到任何服务器。关闭页面后，所有数据即被清除。',
  },
  {
    question: '批量生成二维码支持多大的文件？',
    answer: '建议单次处理的 TXT 文件控制在 1MB 内、10000 行以内，可以获得更流畅的体验。',
  },
  {
    question: '生成的二维码有有效期吗？',
    answer: '没有。二维码本身是静态图像，不包含时效信息。但如果二维码指向网址，该网址是否有效取决于网站运营方。',
  },
  {
    question: '二维码最多能包含多少内容？',
    answer: '普通二维码可容纳约 1200 个字符。内容过长会让图案变密集，可能影响扫码识别率。',
  },
  {
    question: '识别二维码支持哪些图片格式？',
    answer: '支持 PNG、JPG/JPEG、BMP、WebP 等常见图片格式。',
  },
  {
    question: '二维码容错率是什么意思？',
    answer: '容错率表示二维码被遮挡或损坏后仍可被识别的能力。叠加 Logo 或用于印刷时建议选择 H。',
  },
  {
    question: '批量生成时每行只能放一个二维码内容吗？',
    answer: '是的。TXT 文件中每行对应一个二维码，系统会逐行读取并生成对应 PNG 图片。',
  },
  {
    question: '网站生成的二维码会被搜索引擎收录吗？',
    answer: '不会。本站不保存您生成或上传的任何内容，也不存在可被搜索引擎抓取的数据页面。',
  },
  {
    question: '生成的二维码可以商用吗？',
    answer: '可以。本站生成的是静态二维码图片，不附加版权限制，可用于个人项目或商业用途。',
  },
  {
    question: '网站支持活码吗？',
    answer: '不支持。活码需要服务器中转和数据库存储，本站主打纯前端本地处理，因此仅生成静态二维码。',
  },
  {
    question: '我想了解一物一码技术，该怎么实施？',
    answer: '一物一码涉及编码规则、数据库管理和扫码验证等环节。如需了解或实施方案，欢迎联系咨询：QQ 2280476667。',
  },
];
</script>
