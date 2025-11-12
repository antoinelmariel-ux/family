(function (global) {
  if (global.ReactPDF && typeof global.ReactPDF.generatePDF === 'function') {
    return;
  }

  const PAGE_WIDTH = 595.28; // A4 width in points
  const PAGE_HEIGHT = 841.89; // A4 height in points
  const DEFAULT_MARGIN = 48;
  const REGULAR_FONT = 'F1';
  const BOLD_FONT = 'F2';

  const encoder = new TextEncoder();

  function toFixedNumber(value) {
    return Number.isFinite(value) ? value.toFixed(2) : '0';
  }

  function textToHex(text) {
    const parts = ['FEFF'];
    for (let i = 0; i < text.length; i += 1) {
      const code = text.charCodeAt(i);
      parts.push(code.toString(16).padStart(4, '0'));
    }
    return parts.join('').toUpperCase();
  }

  function createLine(text, options = {}) {
    const {
      fontSize = 12,
      bold = false,
      x = DEFAULT_MARGIN,
      y = DEFAULT_MARGIN,
    } = options;
    return {
      text,
      fontSize,
      fontName: bold ? BOLD_FONT : REGULAR_FONT,
      x,
      y,
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

  function createLayout() {
    const pages = [[]];
    let currentPage = pages[0];
    let currentY = PAGE_HEIGHT - DEFAULT_MARGIN;

    function startNewPage() {
      currentPage = [];
      pages.push(currentPage);
      currentY = PAGE_HEIGHT - DEFAULT_MARGIN;
    }

    function ensureSpace(height) {
      if (currentY - height < DEFAULT_MARGIN) {
        startNewPage();
      }
    }

    function addLine(text, fontSize, options = {}) {
      const { bold = false, indent = 0, spacingAfter = 0 } = options;
      const lineHeight = fontSize + (options.extraSpacing || 4);
      ensureSpace(lineHeight);
      currentY -= lineHeight;
      const line = createLine(text, {
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

  function buildContentStream(lines) {
    const parts = ['BT'];
    lines.forEach((line) => {
      parts.push(`/${line.fontName} ${toFixedNumber(line.fontSize)} Tf`);
      parts.push(`1 0 0 1 ${toFixedNumber(line.x)} ${toFixedNumber(line.y)} Tm`);
      parts.push(`<${textToHex(line.text)}> Tj`);
    });
    parts.push('ET');
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

    for (let i = 0; i < pageCount; i += 1) {
      contentObjectIds.push(nextId);
      nextId += 1;
      pageObjectIds.push(nextId);
      nextId += 1;
    }

    const catalogId = nextId;
    const objects = [
      { id: fontRegularId, content: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>' },
      { id: fontBoldId, content: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>' },
    ];

    const kids = pageObjectIds.map((id) => `${id} 0 R`).join(' ');
    objects.push({ id: pagesObjectId, content: `<< /Type /Pages /Kids [${kids}] /Count ${pageCount} >>` });

    for (let i = 0; i < pageCount; i += 1) {
      const lines = pages[i] || [];
      const contentId = contentObjectIds[i];
      const pageId = pageObjectIds[i];
      const stream = buildContentStream(lines);
      objects.push({ id: contentId, content: stream });
      const pageContent = [
        '<< /Type /Page',
        `/Parent ${pagesObjectId} 0 R`,
        `/Resources << /Font << /${REGULAR_FONT} ${fontRegularId} 0 R /${BOLD_FONT} ${fontBoldId} 0 R >> >>`,
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
      const chunk = `${object.id} 0 obj\n${object.content}\nendobj\n`;
      offsets[object.id] = byteLength;
      const bytes = encoder.encode(chunk);
      parts.push(bytes);
      byteLength += bytes.length;
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
    } = data;

    const layout = createLayout();

    layout.addLine(title, 20, { bold: true, spacingAfter: 12 });

    metadata.forEach((entry) => {
      if (!entry || !entry.label) {
        return;
      }
      layout.addLine(`${entry.label} :`, 11, { bold: true });
      if (entry.value) {
        layout.addParagraph(entry.value, 11, { indent: 16, spacingAfter: 6 });
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
        const fontSize = Math.max(14, 22 - (block.level || 1) * 2);
        layout.addLine(block.text, fontSize, { bold: true, spacingAfter: 8 });
      } else if (block.type === 'list-item') {
        layout.addParagraph(block.text, 12, { indent: 12, bullet: true });
      } else {
        layout.addParagraph(block.text, 12);
      }
    });

    if (content.length > 0) {
      layout.addSpacer(12);
    }

    const sectionTitle = strings.sectionTitle || 'Questions & Réponses';
    layout.addLine(sectionTitle, 16, { bold: true, spacingAfter: 8 });

    if (!qaItems || qaItems.length === 0) {
      const noQuestionText = strings.noQuestionText || '';
      if (noQuestionText) {
        layout.addParagraph(noQuestionText, 12);
      }
    } else {
      const questionLabel = strings.questionLabel || 'Question';
      const answerLabel = strings.answerLabel || 'Réponse';
      qaItems.forEach((item, index) => {
        const questionTitle = `${questionLabel} ${index + 1}`;
        layout.addLine(questionTitle, 13, { bold: true });
        if (item.question) {
          layout.addLine(`${questionLabel} :`, 11, { bold: true });
          layout.addParagraph(item.question, 11, { indent: 14 });
        }
        if (item.answer) {
          layout.addLine(`${answerLabel} :`, 11, { bold: true });
          layout.addParagraph(item.answer, 11, { indent: 14 });
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
        createLine(title, {
          fontSize: 16,
          bold: true,
          x: DEFAULT_MARGIN,
          y: PAGE_HEIGHT - DEFAULT_MARGIN - 40,
        })
      );
    }

    const pdfBuffer = buildPDFDocument(pages);
    return new Blob([pdfBuffer], { type: 'application/pdf' });
  }

  global.ReactPDF = {
    generatePDF(data) {
      return generatePDF(data);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
