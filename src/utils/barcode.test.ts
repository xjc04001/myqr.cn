import { describe, expect, it } from 'vitest';
import { barcodeTypes, buildBwipOptions, createBarcodeSvg, normalizeHex } from './barcode';

describe('barcode utilities', () => {
  it('supports the requested barcode formats', () => {
    expect(barcodeTypes).toEqual(['CODE128', 'EAN-13', 'EAN-8', 'UPC-A', 'CODE39', 'ITF-14']);
  });

  it('maps UI options to bwip-js options', () => {
    const options = buildBwipOptions({
      type: 'CODE128',
      text: 'MYQR-1001',
      scale: 3,
      height: 64,
      width: 2,
      showText: true,
      colorDark: '#111827',
      colorLight: '#ffffff',
    });

    expect(options).toMatchObject({
      bcid: 'code128',
      text: 'MYQR-1001',
      scaleX: 3,
      scaleY: 3,
      height: 64,
      width: 2,
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

  it('normalizes hex color values for bwip-js', () => {
    expect(normalizeHex('#0f5cff')).toBe('0F5CFF');
  });
});
