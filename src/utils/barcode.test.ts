import { describe, expect, it } from 'vitest';
import {
  barcodeTypes,
  buildBwipOptions,
  createBarcodeSvg,
  createPngExportBarcodeOptions,
  createPreviewBarcodeOptions,
  getDefaultBarcodeHeight,
  normalizeHex,
  pngExportScaleMultiplier,
  previewBarcodeHeight,
} from './barcode';

describe('barcode utilities', () => {
  it('supports the requested barcode formats', () => {
    expect(barcodeTypes).toEqual(['CODE128', 'EAN-13', 'EAN-8', 'UPC-A', 'CODE39', 'ITF-14']);
  });

  it('maps UI options to bwip-js options', () => {
    const options = buildBwipOptions({
      type: 'CODE128',
      text: 'MYQR-1001',
      scale: 3,
      height: 10,
      width: 80,
      showText: true,
      colorDark: '#111827',
      colorLight: '#ffffff',
    });

    expect(options).toMatchObject({
      bcid: 'code128',
      text: 'MYQR-1001',
      scaleX: 3,
      scaleY: 3,
      height: 10,
      width: 80,
      includetext: true,
      barcolor: '111827',
      backgroundcolor: 'FFFFFF',
    });
  });

  it('creates SVG markup with bwip-js', () => {
    const svg = createBarcodeSvg({
      type: 'EAN-13',
      text: '6901234567892',
      scale: 2,
      height: 48,
      width: 2,
      showText: true,
      colorDark: '#000000',
      colorLight: '#ffffff',
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  it('creates distinct SVG markup for different barcode content', () => {
    const first = createBarcodeSvg({
      type: 'CODE128',
      text: '123456',
      scale: 3,
      height: 24,
      width: 2,
      showText: true,
      colorDark: '#000000',
      colorLight: '#ffffff',
    });
    const second = createBarcodeSvg({
      type: 'CODE128',
      text: '654321',
      scale: 3,
      height: 24,
      width: 2,
      showText: true,
      colorDark: '#000000',
      colorLight: '#ffffff',
    });

    expect(first).not.toBe(second);
  });

  it('normalizes hex color values for bwip-js', () => {
    expect(normalizeHex('#0f5cff')).toBe('0F5CFF');
  });

  it('uses a fixed preview height without mutating download options', () => {
    const downloadOptions = {
      type: 'CODE128' as const,
      text: '123456789',
      scale: 3,
      height: 30,
      showText: true,
      colorDark: '#111827',
      colorLight: '#ffffff',
    };

    const previewOptions = createPreviewBarcodeOptions(downloadOptions);

    expect(previewOptions.height).toBe(previewBarcodeHeight);
    expect(previewOptions.scale).toBeGreaterThanOrEqual(3);
    expect(downloadOptions.height).toBe(30);
  });

  it('raises PNG export scale for print output', () => {
    const options = createPngExportBarcodeOptions({
      type: 'CODE128',
      text: '123456789',
      scale: 3,
      height: 10,
      width: 2,
      showText: true,
      colorDark: '#111827',
      colorLight: '#ffffff',
    });

    expect(options.scale).toBe(3 * pngExportScaleMultiplier);
    expect(options.height).toBe(10);
  });

  it('provides reasonable default heights by barcode type', () => {
    expect(getDefaultBarcodeHeight('CODE128')).toBe(10);
    expect(getDefaultBarcodeHeight('EAN-13')).toBe(23.6);
    expect(getDefaultBarcodeHeight('ITF-14')).toBe(14);
  });

  it('omits width by default so bwip-js can preserve natural module width', () => {
    const options = buildBwipOptions({
      type: 'CODE128',
      text: '123456',
      scale: 3,
      height: 10,
      showText: true,
      colorDark: '#111827',
      colorLight: '#ffffff',
    });

    expect(options).not.toHaveProperty('width');
  });
});
