import QRCode, { type QRCodeErrorCorrectionLevel } from 'qrcode';

export interface QrOptions {
  size: number;
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  colorDark: string;
  colorLight: string;
  margin: number;
  logoDataUrl?: string;
}

export async function createQrDataUrl(text: string, options: QrOptions): Promise<string> {
  const baseDataUrl = await QRCode.toDataURL(text, {
    errorCorrectionLevel: options.errorCorrectionLevel,
    width: options.size,
    margin: options.margin,
    color: {
      dark: options.colorDark,
      light: options.colorLight,
    },
  });

  if (!options.logoDataUrl) {
    return baseDataUrl;
  }

  return drawLogo(baseDataUrl, options.logoDataUrl, options.size);
}

async function drawLogo(qrDataUrl: string, logoDataUrl: string, size: number): Promise<string> {
  const [qrImage, logoImage] = await Promise.all([loadImage(qrDataUrl), loadImage(logoDataUrl)]);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    return qrDataUrl;
  }

  canvas.width = size;
  canvas.height = size;
  context.drawImage(qrImage, 0, 0, size, size);

  const logoSize = Math.round(size * 0.2);
  const x = Math.round((size - logoSize) / 2);
  const y = Math.round((size - logoSize) / 2);
  const radius = Math.round(logoSize * 0.16);

  context.fillStyle = '#ffffff';
  roundRect(context, x - 8, y - 8, logoSize + 16, logoSize + 16, radius + 6);
  context.fill();
  context.drawImage(logoImage, x, y, logoSize, logoSize);

  return canvas.toDataURL('image/png');
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] ?? 'image/png';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mime });
}
