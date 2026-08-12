import bwipjs from 'bwip-js/browser';

export const barcodeTypes = ['CODE128', 'EAN-13', 'EAN-8', 'UPC-A', 'CODE39', 'ITF-14'] as const;

export type BarcodeType = (typeof barcodeTypes)[number];

export interface BarcodeOptions {
  type: BarcodeType;
  text: string;
  scale: number;
  height: number;
  width: number;
  showText: boolean;
  colorDark: string;
  colorLight: string;
}

const barcodeIds: Record<BarcodeType, string> = {
  CODE128: 'code128',
  'EAN-13': 'ean13',
  'EAN-8': 'ean8',
  'UPC-A': 'upca',
  CODE39: 'code39',
  'ITF-14': 'itf14',
};

export function buildBwipOptions(options: BarcodeOptions) {
  return {
    bcid: barcodeIds[options.type],
    text: options.text,
    scaleX: options.scale,
    scaleY: options.scale,
    height: options.height,
    width: options.width,
    includetext: options.showText,
    textxalign: 'center' as const,
    barcolor: normalizeHex(options.colorDark),
    backgroundcolor: normalizeHex(options.colorLight),
    paddingwidth: 12,
    paddingheight: 8,
  };
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
