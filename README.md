# MYQR

MYQR 是一个纯前端在线二维码工具网站，支持在线生成二维码、在线识别二维码和批量生成二维码。所有处理均在浏览器本地完成，不依赖后端 API、数据库、用户登录或服务器存储。

## 功能

- 在线生成二维码：支持文本、URL、中文和特殊字符，支持尺寸、容错率、颜色、边距和中心 Logo。
- 在线识别二维码：支持 PNG、JPG/JPEG、BMP、WebP 等常见图片格式。
- 批量生成二维码：读取 TXT 文件，按行生成 PNG，并自动打包为 `qrcode.zip`。
- 隐私保护：用户提交的数据只存在于浏览器内存，不上传、不保存。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist` 目录，可直接作为静态站点发布。

## ESA Pages 部署

1. 将项目推送到 GitHub Repository。
2. 在阿里云 ESA Pages 创建项目并关联该 GitHub 仓库。
3. 构建命令填写：

```bash
npm run build
```

4. 输出目录填写：

```bash
dist
```

5. 部署完成后，将自定义域名 `myqr.cn` 绑定到 ESA Pages，并按平台提示配置 DNS。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Element Plus
- qrcode
- @zxing/browser
- JSZip
- file-saver
