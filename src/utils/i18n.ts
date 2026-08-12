import { computed, ref } from 'vue';

export type Locale = 'zh' | 'en';

export const locale = ref<Locale>('zh');

export function setLocale(value: Locale) {
  locale.value = value;
}

export function useI18n() {
  const isZh = computed(() => locale.value === 'zh');
  const text = computed(() => (isZh.value ? zh : en));

  return { locale, isZh, text, setLocale };
}

export const zh = {
  nav: {
    generate: '在线生成',
    decode: '在线解码',
    batch: '批量生成',
  },
  privacy: '本站所有二维码生成、识别和批量处理均在您的浏览器本地完成，不保存您提交的数据，不涉及您的隐私。',
  generator: {
    eyebrow: 'QR Code Generator',
    title: '在线二维码生成',
    aside: '即时输入，即时生成',
    input: '输入内容',
    placeholder: '请输入文本、URL、中文或特殊字符',
    size: '尺寸',
    correction: '容错',
    foreground: '前景色',
    background: '背景色',
    margin: '边距',
    logo: '中心 Logo',
    uploadLogo: '上传 Logo',
    result: '生成结果',
    empty: '输入内容后自动生成',
    previewAlt: '二维码预览',
    download: '下载 PNG',
  },
  decoder: {
    eyebrow: 'QR Code Decoder',
    title: '在线二维码识别',
    upload: '上传图片',
    uploadHint: '拖放或点击上传 PNG / JPG / JPEG / BMP / WebP',
    previewAlt: '上传预览',
    result: '识别结果',
    placeholder: '识别成功后显示二维码内容',
    copy: '一键复制',
    success: '识别成功',
    copied: '已复制',
    failed: '图片无法识别，请上传清晰完整二维码图片。',
  },
  batch: {
    eyebrow: 'Batch QR Code',
    title: '批量生成二维码',
    file: 'TXT 文件',
    choose: '选择 TXT 文件',
    hint: '最多 10000 行，文件不超过 1MB，空行和超过 200 字符的行会自动跳过。',
    state: '处理状态',
    validRows: '有效行数',
    generated: '已生成',
    waiting: '等待上传 TXT 文件',
    fileTooLarge: '文件大小不能超过 1MB',
    noValidContent: '没有可生成的有效内容',
    generating: '正在生成二维码',
    packing: '正在打包 ZIP',
    done: '已完成并触发下载',
    success: '批量二维码生成完成',
  },
  home: {
    whyEyebrow: 'Why MYQR',
    whyTitle: '为什么选择 MYQR',
    faqEyebrow: 'FAQ',
    faqTitle: '常见问题',
    features: ['完全免费', '无需注册', '无需登录', '浏览器本地运行', '不上载用户数据', '不保存二维码内容', '无服务器存储', '更安全、更保护隐私'],
    faqs: [
      ['网站会泄露我生成二维码或上传二维码图片的数据吗？', '不会。本网站所有操作均在您的浏览器本地完成，无论是生成、识别还是批量生成，数据都不会上传到任何服务器。关闭页面后，所有数据即被清除。'],
      ['批量生成二维码支持多大的文件？', '建议单次处理的 TXT 文件控制在 1MB 内、10000 行以内，可以获得更流畅的体验。'],
      ['生成的二维码有有效期吗？', '没有。二维码本身是静态图像，不包含任何时效信息，一旦生成即可永久使用。但如果您生成的是指向某个网址的二维码，那么该网址本身是否有效取决于网站运营方。'],
      ['批量生成时，记事本文件每行只能放一个二维码内容吗？', '是的。记事本文件中每行对应一个二维码，系统会逐行读取内容并生成对应的二维码图片。请确保每行只包含一条需要编码的内容，避免多余的空行或特殊格式。'],
      ['二维码容错率是什么意思？', '容错率表示二维码被遮挡或损坏后仍可被识别的能力。叠加 Logo 或用于印刷时建议选择 H。'],
      ['生成的二维码可以商用吗？', '可以。本网站生成的二维码为纯技术产物，不附加任何版权限制，您可以自由用于个人项目或商业用途。'],
      ['网站支持活码吗？', '不支持。活码需要服务器中转和数据库存储，本站主打纯前端本地处理，因此仅生成静态二维码。'],
	  ['我想了解一物一码技术，该怎么实施？', '一物一码技术广泛应用于防伪、追溯、防窜货、营销等场景，涉及编码规则设计、数据库管理、扫码验证等多个环节，超出了本网站的功能范围。如需了解或实施一物一码方案，欢迎联系咨询：QQ: 2280476667。'],
    ],
  },
};

export const en = {
  nav: {
    generate: 'Generate',
    decode: 'Decode',
    batch: 'Batch',
  },
  privacy: 'All QR generation, decoding, and batch processing run locally in your browser. We do not save submitted data or touch your privacy.',
  generator: {
    eyebrow: 'QR Code Generator',
    title: 'Online QR Code Generator',
    aside: 'Type and generate instantly',
    input: 'Content',
    placeholder: 'Enter text, URL, Chinese, or special characters',
    size: 'Size',
    correction: 'Correction',
    foreground: 'Foreground',
    background: 'Background',
    margin: 'Margin',
    logo: 'Center Logo',
    uploadLogo: 'Upload Logo',
    result: 'Result',
    empty: 'Enter content to generate automatically',
    previewAlt: 'QR preview',
    download: 'Download PNG',
  },
  decoder: {
    eyebrow: 'QR Code Decoder',
    title: 'Online QR Code Decoder',
    upload: 'Upload Image',
    uploadHint: 'Drop or click to upload PNG / JPG / JPEG / BMP / WebP',
    previewAlt: 'Upload preview',
    result: 'Decoded Result',
    placeholder: 'Decoded QR content will appear here',
    copy: 'Copy',
    success: 'Decoded successfully',
    copied: 'Copied',
    failed: 'Unable to decode this image. Please upload a clear, complete QR code image.',
  },
  batch: {
    eyebrow: 'Batch QR Code',
    title: 'Batch QR Code Generator',
    file: 'TXT File',
    choose: 'Choose TXT File',
    hint: 'Up to 10,000 lines, file size under 1MB. Empty lines and lines over 200 characters are skipped.',
    state: 'Status',
    validRows: 'Valid Rows',
    generated: 'Generated',
    waiting: 'Waiting for TXT upload',
    fileTooLarge: 'File size must not exceed 1MB',
    noValidContent: 'No valid content found',
    generating: 'Generating QR codes',
    packing: 'Packing ZIP',
    done: 'Completed and download started',
    success: 'Batch QR codes generated',
  },
  home: {
    whyEyebrow: 'Why MYQR',
    whyTitle: 'Why Choose MYQR',
    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently Asked Questions',
    features: ['Free', 'No registration', 'No login', 'Runs locally in browser', 'No user data upload', 'No QR content storage', 'No server storage', 'Safer privacy protection'],
    faqs: [
      ['Will the site leak my QR content or uploaded image data?', 'No. All operations run locally in your browser. Data is never uploaded to any server and is cleared when you close the page.'],
      ['How large can a batch TXT file be?', 'We recommend keeping each TXT file under 1MB and within 10,000 lines for a smooth experience.'],
      ['Do generated QR codes expire?', 'No. A QR code is a static image. If it points to a URL, the URL validity depends on the website owner.'],
      ['Which image formats can be decoded?', 'PNG, JPG/JPEG, BMP, WebP, and other common image formats are supported.'],
      ['What does QR error correction mean?', 'It means the QR code can still be scanned after partial damage or cover. Choose H when adding a logo or printing.'],
      ['Can generated QR codes be used commercially?', 'Yes. The generated static QR images have no extra copyright restrictions from this site.'],
      ['Does the site support dynamic QR codes?', 'No. Dynamic QR codes require server redirects and database storage. MYQR focuses on local static QR generation.'],

    ],
  },
};
