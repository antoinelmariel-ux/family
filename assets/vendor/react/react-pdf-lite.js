(function (global) {
  if (global.ReactPDF && typeof global.ReactPDF.generatePDF === 'function') {
    return;
  }

  const PAGE_WIDTH = 595.28; // A4 width in points
  const PAGE_HEIGHT = 841.89; // A4 height in points
  const DEFAULT_MARGIN = 48;
  const HEADER_HEIGHT = 72;
  const FOOTER_HEIGHT = 72;
  const LOGO_WIDTH = 120;
  const LOGO_HEIGHT = 36;
  const LOGO_TEXT = 'LFB';
  const LOGO_COLOR_HEX = '#2f4f9f';
  const REGULAR_FONT = 'F1';
  const BOLD_FONT = 'F2';

  const encoder = new TextEncoder();

  function hexToRgbFraction(hex) {
    if (!hex || typeof hex !== 'string') {
      return [0, 0, 0];
    }
    const sanitized = hex.replace('#', '');
    if (sanitized.length !== 6) {
      return [0, 0, 0];
    }
    const r = parseInt(sanitized.slice(0, 2), 16) / 255;
    const g = parseInt(sanitized.slice(2, 4), 16) / 255;
    const b = parseInt(sanitized.slice(4, 6), 16) / 255;
    return [r, g, b];
  }

  const LOGO_COLOR = hexToRgbFraction(LOGO_COLOR_HEX);
  const WHITE_COLOR = [1, 1, 1];

  function estimateTextWidth(text, fontSize) {
    if (!text) {
      return 0;
    }
    const averageCharWidth = fontSize * 0.55;
    return text.length * averageCharWidth;
  }

  function toFixedNumber(value) {
    return Number.isFinite(value) ? value.toFixed(2) : '0';
  }

  const WIN_ANSI_CHAR_CODES = {
    0x20ac: 0x80,
    0x201a: 0x82,
    0x0192: 0x83,
    0x201e: 0x84,
    0x2026: 0x85,
    0x2020: 0x86,
    0x2021: 0x87,
    0x02c6: 0x88,
    0x2030: 0x89,
    0x0160: 0x8a,
    0x2039: 0x8b,
    0x0152: 0x8c,
    0x017d: 0x8e,
    0x2018: 0x91,
    0x2019: 0x92,
    0x201c: 0x93,
    0x201d: 0x94,
    0x2022: 0x95,
    0x2013: 0x96,
    0x2014: 0x97,
    0x02dc: 0x98,
    0x2122: 0x99,
    0x0161: 0x9a,
    0x203a: 0x9b,
    0x0153: 0x9c,
    0x017e: 0x9e,
    0x0178: 0x9f,
    0x00a1: 0xa1,
    0x00a2: 0xa2,
    0x00a3: 0xa3,
    0x00a4: 0xa4,
    0x00a5: 0xa5,
    0x00a6: 0xa6,
    0x00a7: 0xa7,
    0x00a8: 0xa8,
    0x00a9: 0xa9,
    0x00aa: 0xaa,
    0x00ab: 0xab,
    0x00ac: 0xac,
    0x00ae: 0xae,
    0x00af: 0xaf,
    0x00b0: 0xb0,
    0x00b1: 0xb1,
    0x00b2: 0xb2,
    0x00b3: 0xb3,
    0x00b4: 0xb4,
    0x00b5: 0xb5,
    0x00b6: 0xb6,
    0x00b7: 0xb7,
    0x00b8: 0xb8,
    0x00b9: 0xb9,
    0x00ba: 0xba,
    0x00bb: 0xbb,
    0x00bc: 0xbc,
    0x00bd: 0xbd,
    0x00be: 0xbe,
    0x00bf: 0xbf,
    0x00c0: 0xc0,
    0x00c1: 0xc1,
    0x00c2: 0xc2,
    0x00c3: 0xc3,
    0x00c4: 0xc4,
    0x00c5: 0xc5,
    0x00c6: 0xc6,
    0x00c7: 0xc7,
    0x00c8: 0xc8,
    0x00c9: 0xc9,
    0x00ca: 0xca,
    0x00cb: 0xcb,
    0x00cc: 0xcc,
    0x00cd: 0xcd,
    0x00ce: 0xce,
    0x00cf: 0xcf,
    0x00d0: 0xd0,
    0x00d1: 0xd1,
    0x00d2: 0xd2,
    0x00d3: 0xd3,
    0x00d4: 0xd4,
    0x00d5: 0xd5,
    0x00d6: 0xd6,
    0x00d7: 0xd7,
    0x00d8: 0xd8,
    0x00d9: 0xd9,
    0x00da: 0xda,
    0x00db: 0xdb,
    0x00dc: 0xdc,
    0x00dd: 0xdd,
    0x00de: 0xde,
    0x00df: 0xdf,
    0x00e0: 0xe0,
    0x00e1: 0xe1,
    0x00e2: 0xe2,
    0x00e3: 0xe3,
    0x00e4: 0xe4,
    0x00e5: 0xe5,
    0x00e6: 0xe6,
    0x00e7: 0xe7,
    0x00e8: 0xe8,
    0x00e9: 0xe9,
    0x00ea: 0xea,
    0x00eb: 0xeb,
    0x00ec: 0xec,
    0x00ed: 0xed,
    0x00ee: 0xee,
    0x00ef: 0xef,
    0x00f0: 0xf0,
    0x00f1: 0xf1,
    0x00f2: 0xf2,
    0x00f3: 0xf3,
    0x00f4: 0xf4,
    0x00f5: 0xf5,
    0x00f6: 0xf6,
    0x00f7: 0xf7,
    0x00f8: 0xf8,
    0x00f9: 0xf9,
    0x00fa: 0xfa,
    0x00fb: 0xfb,
    0x00fc: 0xfc,
    0x00fd: 0xfd,
    0x00fe: 0xfe,
    0x00ff: 0xff,
  };

  function encodeToWinAnsiBytes(text) {
    const bytes = [];
    if (!text) {
      return bytes;
    }
    for (const char of text) {
      const codePoint = char.codePointAt(0);
      if (codePoint <= 0x7f) {
        bytes.push(codePoint);
      } else if (Object.prototype.hasOwnProperty.call(WIN_ANSI_CHAR_CODES, codePoint)) {
        bytes.push(WIN_ANSI_CHAR_CODES[codePoint]);
      } else {
        bytes.push(0x3f);
      }
    }
    return bytes;
  }

  function textToHex(text) {
    const bytes = encodeToWinAnsiBytes(text);
    return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  function createTextItem(text, options = {}) {
    const {
      fontSize = 12,
      bold = false,
      x = DEFAULT_MARGIN,
      y = DEFAULT_MARGIN,
      color = [0, 0, 0],
    } = options;
    return {
      type: 'text',
      text,
      fontSize,
      fontName: bold ? BOLD_FONT : REGULAR_FONT,
      x,
      y,
      color,
    };
  }

  function createRectangleItem({ x = 0, y = 0, width = 0, height = 0, color = [0, 0, 0] } = {}) {
    return {
      type: 'rect',
      x,
      y,
      width,
      height,
      color,
    };
  }

  function createImageItem({
    x = DEFAULT_MARGIN,
    y = DEFAULT_MARGIN,
    width = 0,
    height = 0,
    data = null,
    format = 'jpeg',
    key = null,
    pixelWidth = 0,
    pixelHeight = 0,
  } = {}) {
    if (!data) {
      return null;
    }
    let bytes;
    if (data instanceof Uint8Array) {
      bytes = data;
    } else if (data instanceof ArrayBuffer) {
      bytes = new Uint8Array(data);
    } else if (Array.isArray(data)) {
      bytes = Uint8Array.from(data);
    } else {
      return null;
    }
    if (!bytes || bytes.length === 0) {
      return null;
    }
    const normalizedFormat = typeof format === 'string' ? format.toLowerCase() : 'jpeg';
    const formatHint = normalizedFormat.includes('jpg') || normalizedFormat.includes('jpeg') ? 'jpeg' : normalizedFormat;
    if (formatHint !== 'jpeg') {
      return null;
    }
    const naturalWidth = Number.isFinite(pixelWidth) && pixelWidth > 0 ? pixelWidth : width;
    const naturalHeight = Number.isFinite(pixelHeight) && pixelHeight > 0 ? pixelHeight : height;
    return {
      type: 'image',
      x,
      y,
      width,
      height,
      bytes,
      format: formatHint,
      key,
      pixelWidth: naturalWidth,
      pixelHeight: naturalHeight,
    };
  }

  function wrapText(text, maxChars) {
    if (!text) {
      return [];
    }
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      return [];
    }
    const lines = [];
    let current = '';
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length <= maxChars) {
        current = candidate;
      } else {
        if (current) {
          lines.push(current);
        }
        if (word.length > maxChars) {
          let start = 0;
          while (start < word.length) {
            lines.push(word.slice(start, start + maxChars));
            start += maxChars;
          }
          current = '';
        } else {
          current = word;
        }
      }
    });
    if (current) {
      lines.push(current);
    }
    return lines;
  }

  function createLogoItems(branding = {}) {
    if (branding.showLogo === false) {
      return [];
    }
    const items = [];
    const logoX = DEFAULT_MARGIN;
    const logoY = PAGE_HEIGHT - DEFAULT_MARGIN - LOGO_HEIGHT;
    const maxWidth = LOGO_WIDTH;
    const maxHeight = LOGO_HEIGHT;
    const logoImage = branding.logoImage;
    if (logoImage && logoImage.bytes && logoImage.bytes.length > 0) {
      const naturalWidth = Number.isFinite(logoImage.width) && logoImage.width > 0 ? logoImage.width : LOGO_WIDTH;
      const naturalHeight =
        Number.isFinite(logoImage.height) && logoImage.height > 0 ? logoImage.height : LOGO_HEIGHT;
      const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
      const drawWidth = naturalWidth * (Number.isFinite(scale) && scale > 0 ? scale : 1);
      const drawHeight = naturalHeight * (Number.isFinite(scale) && scale > 0 ? scale : 1);
      const offsetX = logoX + (maxWidth - drawWidth) / 2;
      const offsetY = logoY + (maxHeight - drawHeight) / 2;
      const imageItem = createImageItem({
        x: offsetX,
        y: offsetY,
        width: drawWidth,
        height: drawHeight,
        data: logoImage.bytes,
        format: logoImage.format || 'jpeg',
        key: logoImage.key || 'logo-image',
        pixelWidth: naturalWidth,
        pixelHeight: naturalHeight,
      });
      if (imageItem) {
        items.push(imageItem);
        return items;
      }
    }
    items.push(
      createRectangleItem({
        x: logoX,
        y: logoY,
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
        color: LOGO_COLOR,
      })
    );
    const fontSize = 20;
    const textWidth = estimateTextWidth(LOGO_TEXT, fontSize);
    const textX = logoX + (LOGO_WIDTH - textWidth) / 2;
    const baselineOffset = fontSize * 0.35;
    const textY = logoY + LOGO_HEIGHT / 2 - baselineOffset;
    items.push(
      createTextItem(LOGO_TEXT, {
        fontSize,
        bold: true,
        color: WHITE_COLOR,
        x: textX,
        y: textY,
      })
    );
    return items;
  }

  function createFooterItems(footer = {}, pageNumber = 1, pageCount = 1) {
    const items = [];
    const labels = footer.labels || {};
    const titleLabel = labels.titleLabel || '';
    const referenceLabel = labels.referenceLabel || '';
    const effectiveDateLabel = labels.effectiveDateLabel || '';
    const pageLabel = labels.pageLabel || 'Page';
    const titleValue = footer.title || '';
    const referenceValue = footer.reference || '';
    const effectiveDateValue = footer.effectiveDate || '';
    const confidentialityText = footer.confidentialityText || '';

    const titleLineY = DEFAULT_MARGIN + FOOTER_HEIGHT - 26;
    const infoLineY = DEFAULT_MARGIN + FOOTER_HEIGHT - 42;

    if (titleValue) {
      const titleText = titleLabel ? `${titleLabel} : ${titleValue}` : titleValue;
      items.push(
        createTextItem(titleText, {
          fontSize: 8,
          bold: true,
          x: DEFAULT_MARGIN,
          y: titleLineY,
        })
      );
    }

    const infoParts = [];
    if (referenceValue) {
      infoParts.push(referenceLabel ? `${referenceLabel} : ${referenceValue}` : referenceValue);
    }
    if (effectiveDateValue) {
      infoParts.push(
        effectiveDateLabel ? `${effectiveDateLabel} : ${effectiveDateValue}` : effectiveDateValue
      );
    }
    if (infoParts.length > 0) {
      items.push(
        createTextItem(infoParts.join('    '), {
          fontSize: 8,
          x: DEFAULT_MARGIN,
          y: infoLineY,
        })
      );
    }

    const pageFontSize = 8;
    const pageText = `${pageLabel} ${pageNumber} / ${pageCount}`;
    const pageTextWidth = estimateTextWidth(pageText, pageFontSize);
    const pageX = PAGE_WIDTH - DEFAULT_MARGIN - pageTextWidth;
    items.push(
      createTextItem(pageText, {
        fontSize: pageFontSize,
        x: pageX,
        y: infoLineY,
      })
    );

    if (confidentialityText) {
      const confidentialityFontSize = 8;
      const confidentialityWidth = estimateTextWidth(confidentialityText, confidentialityFontSize);
      const confidentialityX = (PAGE_WIDTH - confidentialityWidth) / 2;
      const confidentialityY = DEFAULT_MARGIN + 12;
      items.push(
        createTextItem(confidentialityText, {
          fontSize: confidentialityFontSize,
          x: confidentialityX,
          y: confidentialityY,
        })
      );
    }

    return items;
  }

  function decoratePagesWithBranding(pages, branding, footer) {
    if (!Array.isArray(pages) || pages.length === 0) {
      return;
    }
    const pageCount = pages.length;
    pages.forEach((page, index) => {
      const headerItems = createLogoItems(branding);
      if (headerItems.length > 0) {
        page.unshift(...headerItems);
      }
      const footerItems = createFooterItems(footer, index + 1, pageCount);
      if (footerItems.length > 0) {
        page.push(...footerItems);
      }
    });
  }

  function createLayout() {
    const pages = [[]];
    let currentPage = pages[0];
    let currentY = PAGE_HEIGHT - DEFAULT_MARGIN - HEADER_HEIGHT;

    function startNewPage() {
      currentPage = [];
      pages.push(currentPage);
      currentY = PAGE_HEIGHT - DEFAULT_MARGIN - HEADER_HEIGHT;
    }

    function ensureSpace(height) {
      if (currentY - height < DEFAULT_MARGIN + FOOTER_HEIGHT) {
        startNewPage();
      }
    }

    function addLine(text, fontSize, options = {}) {
      const { bold = false, indent = 0, spacingAfter = 0 } = options;
      const lineHeight = fontSize + (options.extraSpacing || 4);
      ensureSpace(lineHeight);
      currentY -= lineHeight;
      const line = createTextItem(text, {
        fontSize,
        bold,
        x: DEFAULT_MARGIN + indent,
        y: currentY,
      });
      currentPage.push(line);
      if (spacingAfter > 0) {
        ensureSpace(spacingAfter);
        currentY -= spacingAfter;
      }
    }

    function addParagraph(text, fontSize, options = {}) {
      if (!text) {
        return;
      }
      const {
        indent = 0,
        bullet = false,
        bold = false,
        spacingAfter = 6,
      } = options;
      const availableWidth = PAGE_WIDTH - (DEFAULT_MARGIN * 2) - indent;
      const averageCharWidth = fontSize * 0.55;
      const maxChars = Math.max(8, Math.floor(availableWidth / averageCharWidth));
      const lines = wrapText(text, maxChars);
      if (lines.length === 0) {
        return;
      }
      lines.forEach((line, index) => {
        const prefix = bullet ? (index === 0 ? '\u2022 ' : '  ') : '';
        addLine(prefix + line, fontSize, {
          bold,
          indent,
          extraSpacing: 4,
          spacingAfter: index === lines.length - 1 ? spacingAfter : 0,
        });
      });
    }

    function addSpacer(amount) {
      if (amount <= 0) {
        return;
      }
      ensureSpace(amount);
      currentY -= amount;
    }

    return {
      pages,
      addLine,
      addParagraph,
      addSpacer,
    };
  }

  function buildContentStream(items) {
    const parts = [];
    items.forEach((item) => {
      if (!item) {
        return;
      }
      if (item.type === 'rect') {
        const color = Array.isArray(item.color) && item.color.length === 3 ? item.color : [0, 0, 0];
        parts.push('q');
        parts.push(
          `${toFixedNumber(color[0])} ${toFixedNumber(color[1])} ${toFixedNumber(color[2])} rg`
        );
        parts.push(
          `${toFixedNumber(item.x)} ${toFixedNumber(item.y)} ${toFixedNumber(item.width)} ${toFixedNumber(item.height)} re`
        );
        parts.push('f');
        parts.push('Q');
        return;
      }
      if (item.type === 'image') {
        if (!item.resourceName) {
          return;
        }
        const width = Number.isFinite(item.width) ? item.width : 0;
        const height = Number.isFinite(item.height) ? item.height : 0;
        if (width <= 0 || height <= 0) {
          return;
        }
        const x = Number.isFinite(item.x) ? item.x : 0;
        const y = Number.isFinite(item.y) ? item.y : 0;
        parts.push('q');
        parts.push(
          `${toFixedNumber(width)} 0 0 ${toFixedNumber(height)} ${toFixedNumber(x)} ${toFixedNumber(y)} cm`
        );
        parts.push(`/${item.resourceName} Do`);
        parts.push('Q');
        return;
      }
      if (item.type === 'text') {
        const color = Array.isArray(item.color) && item.color.length === 3 ? item.color : [0, 0, 0];
        parts.push('BT');
        parts.push(`/${item.fontName} ${toFixedNumber(item.fontSize)} Tf`);
        parts.push(
          `${toFixedNumber(color[0])} ${toFixedNumber(color[1])} ${toFixedNumber(color[2])} rg`
        );
        parts.push(`1 0 0 1 ${toFixedNumber(item.x)} ${toFixedNumber(item.y)} Tm`);
        parts.push(`<${textToHex(item.text)}> Tj`);
        parts.push('ET');
      }
    });
    if (parts.length === 0) {
      parts.push('BT', 'ET');
    }
    const content = parts.join('\n');
    const length = encoder.encode(content).length;
    return `<< /Length ${length} >>\nstream\n${content}\nendstream`;
  }

  function buildPDFDocument(pages) {
    const pageCount = pages.length > 0 ? pages.length : 1;
    const fontRegularId = 1;
    const fontBoldId = 2;
    const pagesObjectId = 3;
    const contentObjectIds = [];
    const pageObjectIds = [];
    let nextId = 4;

    const imageEntries = [];
    const imageEntriesByKey = new Map();
    const imageEntriesByName = new Map();
    const pageImageResources = [];

    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      pageImageResources[pageIndex] = new Set();
      const pageItems = Array.isArray(pages[pageIndex]) ? pages[pageIndex] : [];
      pageItems.forEach((item) => {
        if (!item || item.type !== 'image') {
          return;
        }
        if (!item.bytes || item.bytes.length === 0) {
          return;
        }
        const key = item.key || `image_${imageEntries.length}`;
        let entry = imageEntriesByKey.get(key);
        if (!entry) {
          const name = `Im${imageEntries.length + 1}`;
          const bytes = item.bytes instanceof Uint8Array ? item.bytes : new Uint8Array(item.bytes || []);
          const width = Math.max(
            1,
            Math.round(
              Number.isFinite(item.pixelWidth) && item.pixelWidth > 0 ? item.pixelWidth : item.width || 1
            )
          );
          const height = Math.max(
            1,
            Math.round(
              Number.isFinite(item.pixelHeight) && item.pixelHeight > 0 ? item.pixelHeight : item.height || 1
            )
          );
          entry = {
            key,
            name,
            bytes,
            format: item.format || 'jpeg',
            width,
            height,
            objectId: 0,
          };
          imageEntries.push(entry);
          imageEntriesByKey.set(key, entry);
          imageEntriesByName.set(name, entry);
        }
        item.resourceName = entry.name;
        pageImageResources[pageIndex].add(entry.name);
      });
    }

    imageEntries.forEach((entry) => {
      entry.objectId = nextId;
      nextId += 1;
    });

    for (let i = 0; i < pageCount; i += 1) {
      contentObjectIds.push(nextId);
      nextId += 1;
      pageObjectIds.push(nextId);
      nextId += 1;
    }

    const catalogId = nextId;
    const objects = [
      { id: fontRegularId, content: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>' },
      { id: fontBoldId, content: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>' },
    ];

    const kids = pageObjectIds.map((id) => `${id} 0 R`).join(' ');
    objects.push({ id: pagesObjectId, content: `<< /Type /Pages /Kids [${kids}] /Count ${pageCount} >>` });

    imageEntries.forEach((entry) => {
      const dictionary = [
        '<< /Type /XObject',
        '/Subtype /Image',
        `/Width ${entry.width}`,
        `/Height ${entry.height}`,
        '/ColorSpace /DeviceRGB',
        '/BitsPerComponent 8',
        '/Filter /DCTDecode',
        `/Length ${entry.bytes.length}`,
        '>>',
      ].join('\n');
      objects.push({
        id: entry.objectId,
        content: {
          stream: true,
          dictionary,
          bytes: entry.bytes,
        },
      });
    });

    for (let i = 0; i < pageCount; i += 1) {
      const lines = pages[i] || [];
      const contentId = contentObjectIds[i];
      const pageId = pageObjectIds[i];
      const stream = buildContentStream(lines);
      objects.push({ id: contentId, content: stream });
      const xObjectEntries = [];
      const imageNames = pageImageResources[i] ? Array.from(pageImageResources[i]) : [];
      imageNames.forEach((name) => {
        const entry = imageEntriesByName.get(name);
        if (entry) {
          xObjectEntries.push(`/${name} ${entry.objectId} 0 R`);
        }
      });
      const resourceParts = [`/Font << /${REGULAR_FONT} ${fontRegularId} 0 R /${BOLD_FONT} ${fontBoldId} 0 R >>`];
      if (xObjectEntries.length > 0) {
        resourceParts.push(`/XObject << ${xObjectEntries.join(' ')} >>`);
      }
      const resources = `<< ${resourceParts.join(' ')} >>`;
      const pageContent = [
        '<< /Type /Page',
        `/Parent ${pagesObjectId} 0 R`,
        `/Resources ${resources}`,
        `/MediaBox [0 0 ${toFixedNumber(PAGE_WIDTH)} ${toFixedNumber(PAGE_HEIGHT)}]`,
        `/Contents ${contentId} 0 R >>`,
      ].join(' ');
      objects.push({ id: pageId, content: pageContent });
    }

    objects.push({ id: catalogId, content: `<< /Type /Catalog /Pages ${pagesObjectId} 0 R >>` });

    objects.sort((a, b) => a.id - b.id);

    const header = '%PDF-1.4\n';
    const headerBytes = encoder.encode(header);
    const parts = [headerBytes];
    const offsets = new Array(objects.length + 1).fill(0);
    let byteLength = headerBytes.length;

    objects.forEach((object) => {
      offsets[object.id] = byteLength;
      const content = object.content;
      if (content && typeof content === 'object' && content.stream) {
        const header = `${object.id} 0 obj\n${content.dictionary}\nstream\n`;
        const headerBytes = encoder.encode(header);
        parts.push(headerBytes);
        byteLength += headerBytes.length;
        const dataBytes = content.bytes instanceof Uint8Array ? content.bytes : new Uint8Array(content.bytes || []);
        parts.push(dataBytes);
        byteLength += dataBytes.length;
        const footerBytes = encoder.encode('\nendstream\nendobj\n');
        parts.push(footerBytes);
        byteLength += footerBytes.length;
      } else {
        const chunk = `${object.id} 0 obj\n${content}\nendobj\n`;
        const bytes = encoder.encode(chunk);
        parts.push(bytes);
        byteLength += bytes.length;
      }
    });

    const xrefOffset = byteLength;
    const xrefLines = ['xref', `0 ${objects.length + 1}`, '0000000000 65535 f '];
    for (let i = 1; i <= objects.length; i += 1) {
      xrefLines.push(`${offsets[i].toString().padStart(10, '0')} 00000 n `);
    }
    const trailer = [
      'trailer',
      `<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>`,
      'startxref',
      `${xrefOffset}`,
      '%%EOF',
    ].join('\n');
    const xrefBytes = encoder.encode(`${xrefLines.join('\n')}\n${trailer}`);
    parts.push(xrefBytes);

    const totalSize = parts.reduce((sum, arr) => sum + arr.length, 0);
    const buffer = new Uint8Array(totalSize);
    let offset = 0;
    parts.forEach((arr) => {
      buffer.set(arr, offset);
      offset += arr.length;
    });
    return buffer;
  }

  function generatePDF(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid PDF data');
    }
    const {
      title = 'Document',
      metadata = [],
      content = [],
      qaItems = [],
      strings = {},
      branding = {},
      footer = {},
    } = data;

    const layout = createLayout();

    layout.addLine(title, 20, { bold: true, spacingAfter: 12 });

    metadata.forEach((entry) => {
      if (!entry || !entry.label) {
        return;
      }
      layout.addLine(`${entry.label} :`, 10, { bold: true });
      if (entry.value) {
        layout.addParagraph(entry.value, 10, { indent: 16, spacingAfter: 6 });
      } else {
        layout.addSpacer(6);
      }
    });

    if (metadata.length > 0) {
      layout.addSpacer(8);
    }

    content.forEach((block) => {
      if (!block || !block.text) {
        return;
      }
      if (block.type === 'heading') {
        const headingLevel = Math.min(Math.max(block.level || 1, 1), 4);
        const headingFontSizes = {
          1: 20,
          2: 14,
          3: 12,
          4: 10,
        };
        const fontSize = headingFontSizes[headingLevel] || 10;
        layout.addLine(block.text, fontSize, { bold: true, spacingAfter: 8 });
      } else if (block.type === 'list-item') {
        layout.addParagraph(block.text, 10, { indent: 12, bullet: true });
      } else {
        layout.addParagraph(block.text, 10);
      }
    });

    if (content.length > 0) {
      layout.addSpacer(12);
    }

    const sectionTitle = strings.sectionTitle || 'Questions & Réponses';
    layout.addLine(sectionTitle, 14, { bold: true, spacingAfter: 8 });

    if (!qaItems || qaItems.length === 0) {
      const noQuestionText = strings.noQuestionText || '';
      if (noQuestionText) {
        layout.addParagraph(noQuestionText, 10);
      }
    } else {
      const questionLabel = strings.questionLabel || 'Question';
      const answerLabel = strings.answerLabel || 'Réponse';
      qaItems.forEach((item, index) => {
        const questionTitle = `${questionLabel} ${index + 1}`;
        layout.addLine(questionTitle, 10, { bold: true });
        if (item.question) {
          layout.addLine(`${questionLabel} :`, 10, { bold: true });
          layout.addParagraph(item.question, 10, { indent: 14 });
        }
        if (item.answer) {
          layout.addLine(`${answerLabel} :`, 10, { bold: true });
          layout.addParagraph(item.answer, 10, { indent: 14 });
        }
        layout.addSpacer(10);
      });
    }

    const pages = layout.pages;
    if (pages.length === 0 || pages[0].length === 0) {
      const fallbackPage = pages.length === 0 ? [] : pages[0];
      if (pages.length === 0) {
        pages.push(fallbackPage);
      }
      fallbackPage.push(
        createTextItem(title, {
          fontSize: 14,
          bold: true,
          x: DEFAULT_MARGIN,
          y: PAGE_HEIGHT - DEFAULT_MARGIN - 40,
        })
      );
    }

    const footerData = {
      ...footer,
    };
    if (!footerData.title) {
      footerData.title = title;
    }

    decoratePagesWithBranding(pages, branding, footerData);

    const pdfBuffer = buildPDFDocument(pages);
    return new Blob([pdfBuffer], { type: 'application/pdf' });
  }

  global.ReactPDF = {
    generatePDF(data) {
      return generatePDF(data);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
