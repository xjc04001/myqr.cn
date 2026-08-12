import bwipjs from 'bwip-js/browser';

export const barcodeTypes = ['CODE128', 'EAN-13', 'EAN-8', 'UPC-A', 'CODE39', 'ITF-14'] as const;

export type BarcodeType = (typeof barcodeTypes)[number];

export interface BarcodeOptions {
  type: BarcodeType;
  text: string;
  scale: number;
  height: number;
  width?: number;
  showText: boolean;
  colorDark: string;
  colorLight: string;
}

export const previewBarcodeHeight = 8;
export const pngExportScaleMultiplier = 8;

export const defaultBarcodeHeights: Record<BarcodeType, number> = {
  CODE128: 10,
  'EAN-13': 23.6,
  'EAN-8': 23.6,
  'UPC-A': 23.6,
  CODE39: 10,
  'ITF-14': 14,
};

const barcodeIds: Record<BarcodeType, string> = {
  CODE128: 'code128',
  'EAN-13': 'ean13',
  'EAN-8': 'ean8',
  'UPC-A': 'upca',
  CODE39: 'code39',
  'ITF-14': 'itf14',
};

export function buildBwipOptions(options: BarcodeOptions) {
  const bwipOptions = {
    bcid: barcodeIds[options.type],
    text: options.text,
    scaleX: options.scale,
    scaleY: options.scale,
    height: options.height,
    includetext: options.showText,
    textxalign: 'center' as const,
    barcolor: normalizeHex(options.colorDark),
    backgroundcolor: normalizeHex(options.colorLight),
    paddingwidth: 12,
    paddingheight: 8,
  };

  if (options.width && options.width > 0) {
    return {
      ...bwipOptions,
      width: options.width,
    };
  }

  return bwipOptions;
}

export function createPreviewBarcodeOptions(options: BarcodeOptions): BarcodeOptions {
  return {
    ...options,
    scale: Math.max(options.scale, 3),
    height: previewBarcodeHeight,
  };
}

export function createPngExportBarcodeOptions(options: BarcodeOptions): BarcodeOptions {
  return {
    ...options,
    scale: options.scale * pngExportScaleMultiplier,
  };
}

export function getDefaultBarcodeHeight(type: BarcodeType): number {
  return defaultBarcodeHeights[type];
}

export function createBarcodeSvg(options: BarcodeOptions): string {
  return bwipjs.toSVG(buildBwipOptions(options));
}

export async function createBarcodePng(canvas: HTMLCanvasElement, options: BarcodeOptions) {
  await bwipjs.toCanvas(canvas, buildBwipOptions(options));
}

export function normalizeHex(value: string): string {
  return value.replace('#', '').toUpperCase();
}
