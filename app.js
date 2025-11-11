const LFB_LOGO_URL = './assets/images/lfb-logo.svg';

const KEYWORD_COLOR_PALETTE = [
  { background: 'rgba(47, 79, 159, 0.15)', color: '#2f4f9f', border: 'rgba(47, 79, 159, 0.35)' },
  { background: 'rgba(32, 137, 94, 0.15)', color: '#20895e', border: 'rgba(32, 137, 94, 0.35)' },
  { background: 'rgba(214, 69, 69, 0.15)', color: '#d64545', border: 'rgba(214, 69, 69, 0.35)' },
  { background: 'rgba(237, 180, 52, 0.18)', color: '#8a5a00', border: 'rgba(237, 180, 52, 0.4)' },
  { background: 'rgba(103, 64, 152, 0.15)', color: '#5d3a92', border: 'rgba(103, 64, 152, 0.35)' }
];

const METADATA_GROUP_DEFINITIONS = [
  {
    key: 'identification',
    title: 'Identification',
    description: 'Renseignez les éléments essentiels pour retrouver et suivre cette procédure.',
    fields: [
      {
        key: 'title',
        label: 'Titre',
        type: 'text',
        placeholder: 'Titre de la procédure',
        hint: 'Nom tel qu’il apparaîtra dans les exports et la base documentaire.'
      },
      {
        key: 'reference',
        label: 'Référence',
        type: 'text',
        placeholder: 'Référence interne',
        hint: 'Identifiant unique ou code interne facilitant le suivi des versions.'
      },
      {
        key: 'author',
        label: 'Auteur',
        type: 'text',
        placeholder: 'Nom complet',
        hint: 'Indiquez la personne responsable de la rédaction ou de la validation.'
      },
      {
        key: 'procedureLanguage',
        label: 'Langue de la procédure',
        type: 'select',
        optionsKey: 'procedureLanguage',
        defaultOptions: ['English', 'French', 'Spanish'],
        hint: 'Sélectionnez la langue principale dans laquelle la procédure est rédigée.'
      },
      {
        key: 'effectiveDate',
        label: "Date d'entrée en vigueur",
        type: 'date',
        hint: 'Date à laquelle la procédure devient applicable.'
      }
    ]
  },
  {
    key: 'contexte',
    title: 'Contexte',
    description: 'Situez la procédure au sein de votre dispositif documentaire.',
    fields: [
      {
        key: 'summary',
        label: 'Résumé',
        type: 'textarea',
        placeholder: 'Résumé exécutif de la procédure',
        hint: 'Présentez l’objectif et les points clés en quelques phrases.'
      },
      {
        key: 'parentProcedure',
        label: 'Procédure mère',
        type: 'text',
        placeholder: 'Référence ou titre',
        hint: 'Mentionnez la procédure qui encadre ou complète celle-ci, si applicable.'
      },
      {
        key: 'changeHistory',
        label: 'Historique des modifications',
        type: 'textarea',
        placeholder: 'Consignez les évolutions majeures et leurs dates',
        hint: 'Décrivez les principales modifications apportées et leur contexte.'
      }
    ]
  },
  {
    key: 'diffusion',
    title: 'Diffusion',
    description: 'Précisez à qui s’adresse la procédure et dans quelles zones elle s’applique.',
    fields: [
      {
        key: 'businessScope',
        label: 'Périmètre métier',
        type: 'select',
        multiple: true,
        optionsKey: 'businessScope',
        defaultOptions: ['Médical', 'Commercial', 'Neutre'],
        hint: 'Sélectionnez un ou plusieurs domaines métiers concernés.'
      },
      {
        key: 'companyScope',
        label: 'Périmètre société',
        type: 'select',
        multiple: true,
        optionsKey: 'companyScope',
        defaultOptions: ['LFB Bio Médicament', 'LFB Biomanufacturing'],
        hint: 'Choisissez une ou plusieurs entités juridiques ou filiales de diffusion.'
      },
      {
        key: 'geoScope',
        label: 'Périmètre géographique',
        type: 'select',
        multiple: true,
        optionsKey: 'geoScope',
        defaultOptions: ['Monde', 'France', 'Europe hors France', 'USA', 'Mexique'],
        hint: 'Sélectionnez une ou plusieurs zones géographiques de validité.'
      },
      {
        key: 'keywords',
        label: 'Mots clefs',
        type: 'text',
        placeholder: 'Appuyez sur Entrée pour ajouter un mot clef',
        hint: 'Utilisez la touche Entrée pour valider chaque mot clef.'
      }
    ]
  }
];

const METADATA_FIELD_DEFINITIONS = METADATA_GROUP_DEFINITIONS.flatMap((group) => group.fields);
const MULTI_SELECT_FIELD_DEFINITIONS = METADATA_FIELD_DEFINITIONS.filter(
  (field) => field.type === 'select' && field.multiple
);
const MULTI_SELECT_METADATA_KEYS = MULTI_SELECT_FIELD_DEFINITIONS.map((field) => field.key);

function createInitialMetadata() {
  return METADATA_FIELD_DEFINITIONS.reduce((acc, field) => {
    if (field.type === 'select' && field.multiple) {
      acc[field.key] = [];
    } else {
      acc[field.key] = '';
    }
    return acc;
  }, {});
}

const SELECT_FIELD_DEFINITIONS = METADATA_FIELD_DEFINITIONS.filter((field) => field.type === 'select');
const SELECT_FIELD_KEYS = Array.from(
  new Set(SELECT_FIELD_DEFINITIONS.map((field) => field.optionsKey || field.key))
);
const DEFAULT_SELECT_OPTIONS = SELECT_FIELD_DEFINITIONS.reduce((acc, field) => {
  const key = field.optionsKey || field.key;
  acc[key] = field.defaultOptions ? [...field.defaultOptions] : [];
  return acc;
}, {});
const SELECT_OPTION_STORAGE_KEY = 'procedureBuilderSelectOptions';

function normalizeSelectOptions(options, baseOptions = DEFAULT_SELECT_OPTIONS) {
  const normalized = {};
  SELECT_FIELD_KEYS.forEach((key) => {
    const baseValues = baseOptions && Array.isArray(baseOptions[key])
      ? baseOptions[key]
      : DEFAULT_SELECT_OPTIONS[key] || [];
    const rawValues = options && Array.isArray(options[key]) ? options[key] : baseValues;
    const sanitized = rawValues
      .map((value) => (typeof value === 'string' ? value : String(value)))
      .map((value) => value.trim())
      .filter((value) => value.length > 0);

    const unique = [];
    sanitized.forEach((value) => {
      if (!unique.some((existing) => existing.toLowerCase() === value.toLowerCase())) {
        unique.push(value);
      }
    });

    normalized[key] = unique.length > 0 ? unique : [...baseValues];
  });
  return normalized;
}

function createResolvedMetadataGroups(selectOptions, baseOptions = DEFAULT_SELECT_OPTIONS) {
  const normalizedOptions = normalizeSelectOptions(selectOptions, baseOptions);
  return METADATA_GROUP_DEFINITIONS.map((group) => ({
    ...group,
    fields: group.fields.map((field) => {
      if (field.type !== 'select') {
        return field;
      }
      const optionsKey = field.optionsKey || field.key;
      return {
        ...field,
        options: normalizedOptions[optionsKey] || field.defaultOptions || []
      };
    })
  }));
}

function loadInitialSelectOptions(configOptions = DEFAULT_SELECT_OPTIONS) {
  const fallback = normalizeSelectOptions(configOptions, configOptions);
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(SELECT_OPTION_STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    return normalizeSelectOptions({ ...configOptions, ...parsed }, configOptions);
  } catch (error) {
    console.warn('Impossible de charger les options personnalisées :', error);
    return fallback;
  }
}

function createEmptyOptionDrafts() {
  return SELECT_FIELD_KEYS.reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});
}

const createInitialQAItems = () => [{ question: '', answer: '' }];

const pronouns = ['il', 'elle', 'ils', 'elles', 'lui', 'leur', 'leurs', 'son', 'sa', 'ses', 'eux'];

function formatSelection(command, value = null) {
  document.execCommand(command, false, value);
}

function sanitizeHTML(html) {
  return html.replace(/\s+style="[^"]*"/g, '');
}

const PROCEDURE_TEMPLATE = `
<h2>Objectif</h2>
<p>Précisez ici la finalité de la procédure et le résultat attendu.</p>

<h2>Champ d'application</h2>
<p>Décrivez le périmètre couvert : services, équipes, situations concernées.</p>

<h2>Pré-requis</h2>
<ul>
  <li>Listez les conditions nécessaires (documents, accès, matériels, compétences).</li>
  <li>Ajoutez toute information préalable indispensable.</li>
</ul>

<h2>Rôles et responsabilités</h2>
<ul>
  <li><strong>Acteur principal :</strong> Décrivez son rôle clé.</li>
  <li><strong>Contributeurs :</strong> Mentionnez les soutiens et leurs actions.</li>
  <li><strong>Référent :</strong> Indiquez la personne à contacter en cas de question.</li>
</ul>

<h2>Étapes détaillées</h2>
<ol>
  <li><strong>Étape 1 :</strong> Décrivez précisément la première action à mener.</li>
  <li><strong>Étape 2 :</strong> Indiquez la suite logique en précisant les points de contrôle.</li>
  <li><strong>Étape 3 :</strong> Complétez avec les actions restantes jusqu'à la finalisation.</li>
</ol>

<h2>Points de contrôle &amp; indicateurs</h2>
<p>Précisez les vérifications à réaliser et la manière d'évaluer la conformité.</p>

<h2>Gestion des écarts</h2>
<p>Décrivez la marche à suivre en cas de non-conformité ou de situation imprévue.</p>

<h2>Annexes &amp; documents associés</h2>
<p>Référencez les formulaires, modèles ou ressources complémentaires.</p>
`;

const INITIAL_CONTENT_HTML = sanitizeHTML(PROCEDURE_TEMPLATE);
function computeGuidelines(html, acronymDB = {}) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const guidelines = [];

  doc.querySelectorAll('h1, h2, h3, h4').forEach((heading) => {
    const text = heading.textContent.trim() || '(titre sans texte)';
    guidelines.push({
      type: 'heading',
      anchor: text,
      message: 'Commencez la section par un résumé bref et concis.'
    });
  });

  doc.querySelectorAll('ul, ol').forEach((list) => {
    const label = list.tagName === 'UL' ? 'Liste à puces' : 'Liste numérotée';
    guidelines.push({
      type: 'list-transition',
      anchor: label,
      message: 'Reliez la liste par une transition claire entre les étapes.'
    });
    const previous = list.previousElementSibling;
    const hasIntro = previous && previous.textContent.trim().length > 0 && previous.textContent.trim().endsWith(':');
    if (!hasIntro) {
      guidelines.push({
        type: 'list-intro',
        anchor: label,
        message: 'Ajoutez une phrase introductive se terminant par un deux-points avant la liste.'
      });
    }
  });

  const textContent = doc.body.textContent || '';
  const pronounMatches = Array.from(
    new Set(textContent.match(/\b(?:il|elle|ils|elles|lui|leur|leurs|son|sa|ses|eux)\b/gi) || [])
  );
  pronounMatches.forEach((item) => {
    guidelines.push({
      type: 'pronoun',
      anchor: item,
      message: 'Précisez le référent du pronom pour éviter toute ambiguïté.'
    });
  });

  const acronymMatches = Array.from(new Set(textContent.match(/\b[A-Z]{2,}\b/g))) || [];
  acronymMatches.forEach((acronym) => {
    if (!acronymDB[acronym]) {
      guidelines.push({
        type: 'acronym',
        anchor: acronym,
        message: "Documentez l'acronyme ou ajoutez-le à la base des acronymes."
      });
    }
  });

  return guidelines;
}

function detectBlockingIssues(html, qaItems) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const textContent = doc.body.textContent || '';
  const qaText = qaItems.map((item) => `${item.question} ${item.answer}`).join(' ');

  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}]/u;
  const warnings = [];

  if (emojiRegex.test(textContent) || emojiRegex.test(qaText)) {
    warnings.push('Retirez les émojis pour respecter la charte éditoriale.');
  }

  if (doc.querySelector('img')) {
    warnings.push('Les images ne sont pas autorisées dans la procédure.');
  }

  if (doc.querySelector('a[href]')) {
    warnings.push('Les liens URL doivent être retirés avant export.');
  }

  if (doc.querySelector('table')) {
    warnings.push('Les tableaux ne peuvent pas être exportés dans ce format.');
  }

  const rawText = sanitizeHTML(html).replace(/<[^>]+>/g, '\n');
  const hasUnformattedList = /^\s*[-*]\s+.+/m.test(rawText);
  if (hasUnformattedList) {
    warnings.push('Convertissez toutes les listes en listes formatées via la barre d’édition.');
  }

  return warnings;
}

function parseKeywords(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatMetadataValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  return value || '';
}
function convertInlineNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent.replace(/\s+/g, ' ');
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }
  const tag = node.tagName.toUpperCase();
  if (tag === 'STRONG' || tag === 'B') {
    return `**${Array.from(node.childNodes).map(convertInlineNodes).join('')}**`;
  }
  if (tag === 'EM' || tag === 'I') {
    return `_${Array.from(node.childNodes).map(convertInlineNodes).join('')}_`;
  }
  if (tag === 'BR') {
    return '  \n';
  }
  if (tag === 'A') {
    const href = node.getAttribute('href') || '';
    const label = Array.from(node.childNodes).map(convertInlineNodes).join('');
    return href ? `[${label}](${href})` : label;
  }
  return Array.from(node.childNodes).map(convertInlineNodes).join('');
}

function convertList(node, ordered = false) {
  const items = [];
  let index = 1;
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toUpperCase() === 'LI') {
      const inlineParts = [];
      const nestedBlocks = [];
      child.childNodes.forEach((liChild) => {
        if (liChild.nodeType === Node.ELEMENT_NODE && (liChild.tagName.toUpperCase() === 'UL' || liChild.tagName.toUpperCase() === 'OL')) {
          nestedBlocks.push(convertList(liChild, liChild.tagName.toUpperCase() === 'OL'));
        } else {
          inlineParts.push(convertInlineNodes(liChild));
        }
      });
      const marker = ordered ? `${index}. ` : '- ';
      const mainLine = `${marker}${inlineParts.join('').trim()}`;
      const nestedText = nestedBlocks
        .filter(Boolean)
        .map((block) => block.replace(/^/gm, '  '))
        .join('\n');
      items.push(nestedText ? `${mainLine}\n${nestedText}` : mainLine);
      index += 1;
    }
  });
  return items.join('\n');
}

function convertBlock(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    return text;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }
  const tag = node.tagName.toUpperCase();
  if (node.classList && node.classList.contains('rational-block')) {
    const title = (node.querySelector('.rational-block-title') || { textContent: 'Rationnel' }).textContent.trim() || 'Rationnel';
    const paragraphs = Array.from(node.querySelectorAll('p'))
      .map((p) => convertInlineNodes(p).trim())
      .filter(Boolean);
    const lines = [`> **${title}**`];
    paragraphs.forEach((para) => {
      lines.push(`> ${para}`);
    });
    if (paragraphs.length === 0) {
      lines.push('>');
    }
    return lines.join('\n');
  }
  switch (tag) {
    case 'H1':
      return `# ${convertInlineNodes(node).trim()}`;
    case 'H2':
      return `## ${convertInlineNodes(node).trim()}`;
    case 'H3':
      return `### ${convertInlineNodes(node).trim()}`;
    case 'H4':
      return `#### ${convertInlineNodes(node).trim()}`;
    case 'P':
      return convertInlineNodes(node).trim();
    case 'UL':
      return convertList(node, false);
    case 'OL':
      return convertList(node, true);
    case 'BLOCKQUOTE':
      return node.textContent
        .split(/\r?\n/)
        .map((line) => `> ${line.trim()}`)
        .join('\n');
    case 'HR':
      return '---';
    default:
      return Array.from(node.childNodes)
        .map((child) => convertBlock(child))
        .filter(Boolean)
        .join('\n');
  }
}

function htmlToMarkdown(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const blocks = [];
  container.childNodes.forEach((node) => {
    const block = convertBlock(node);
    if (block && block.trim().length > 0) {
      blocks.push(block.trim());
    }
  });
  return blocks.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

function buildMarkdown(metadata, contentHTML, qaItems) {
  const contentMarkdown = htmlToMarkdown(contentHTML || '');
  const cleanContent = contentMarkdown
    .replace(/[ \t]+/g, ' ')
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const lines = [
    '---',
    `Titre: ${formatMetadataValue(metadata.title)}`,
    `Référence: ${formatMetadataValue(metadata.reference)}`,
    `Auteur: ${formatMetadataValue(metadata.author)}`,
    `Périmètre métier: ${formatMetadataValue(metadata.businessScope)}`,
    `Périmètre société: ${formatMetadataValue(metadata.companyScope)}`,
    `Périmètre géographique: ${formatMetadataValue(metadata.geoScope)}`,
    `Mots clefs: ${formatMetadataValue(metadata.keywords)}`,
    `Résumé: ${formatMetadataValue(metadata.summary)}`,
    `Procédure mère: ${formatMetadataValue(metadata.parentProcedure)}`,
    `Historique des modifications: ${formatMetadataValue(metadata.changeHistory)}`,
    `Date d'entrée en vigueur: ${formatMetadataValue(metadata.effectiveDate)}`,
    '---',
    '',
    cleanContent
  ];

  if (qaItems.length > 0) {
    lines.push('', '## Questions & Réponses');
    qaItems.forEach((item, index) => {
      const question = (item.question || '').trim().replace(/[ \t]+/g, ' ');
      const answer = (item.answer || '').trim().replace(/[ \t]+/g, ' ');
      lines.push('', `### Question ${index + 1}`, `**Question :** ${question}`, `**Réponse :** ${answer}`);
    });
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

const FRONTMATTER_KEY_MAP = {
  Titre: 'title',
  'Référence': 'reference',
  Auteur: 'author',
  'Périmètre métier': 'businessScope',
  'Périmètre société': 'companyScope',
  'Périmètre géographique': 'geoScope',
  'Mots clefs': 'keywords',
  'Résumé': 'summary',
  'Procédure mère': 'parentProcedure',
  'Historique des modifications': 'changeHistory',
  "Date d'entrée en vigueur": 'effectiveDate'
};

function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseInlineMarkdown(text) {
  const escaped = escapeHTML(text);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}

function parseBlockquoteLines(lines) {
  if (lines.length === 0) {
    return '';
  }
  const [first, ...rest] = lines;
  const titleMatch = first.match(/^\*\*(.+?)\*\*/);
  if (titleMatch) {
    const title = titleMatch[1];
    const body = rest
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `<p>${parseInlineMarkdown(line)}</p>`)
      .join('');
    return `<section class="rational-block" data-block-type="rationnel"><div class="rational-block-title">${escapeHTML(title)}</div>${body || '<p></p>'}</section>`;
  }
  const content = lines.map((line) => line.trim()).filter(Boolean).join(' ');
  return content ? `<blockquote><p>${parseInlineMarkdown(content)}</p></blockquote>` : '';
}

function markdownToHTML(markdown) {
  if (typeof markdown !== 'string' || markdown.trim().length === 0) {
    return '';
  }
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (/^#{1,4}\s+/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#{1,4}\s+/, '');
      blocks.push(`<h${level}>${parseInlineMarkdown(text)}</h${level}>`);
      index += 1;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(parseBlockquoteLines(quoteLines));
      continue;
    }
    if (/^[-*+]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^[-*+]\s+/.test(lines[index])) {
        const itemLine = lines[index].replace(/^[-*+]\s+/, '');
        items.push(`<li>${parseInlineMarkdown(itemLine)}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        const itemLine = lines[index].replace(/^\d+\.\s+/, '');
        items.push(`<li>${parseInlineMarkdown(itemLine)}</li>`);
        index += 1;
      }
      blocks.push(`<ol>${items.join('')}</ol>`);
      continue;
    }
    if (line.trim().length === 0) {
      index += 1;
      continue;
    }
    const paragraphLines = [];
    while (
      index < lines.length &&
      lines[index].trim().length > 0 &&
      !/^#{1,4}\s+/.test(lines[index]) &&
      !/^>\s?/.test(lines[index]) &&
      !/^[-*+]\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index])
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }
    const paragraph = paragraphLines.join(' ').trim();
    if (paragraph.length > 0) {
      blocks.push(`<p>${parseInlineMarkdown(paragraph)}</p>`);
    }
  }
  return blocks.join('');
}
function parseMarkdownProcedure(markdown) {
  const normalizedMetadata = createInitialMetadata();
  if (typeof markdown !== 'string') {
    return {
      metadata: normalizedMetadata,
      contentHTML: INITIAL_CONTENT_HTML,
      qaItems: createInitialQAItems()
    };
  }

  let body = markdown;
  const frontMatterMatch = markdown.match(/^---\s*([\s\S]*?)\s*---\s*/);

  if (frontMatterMatch) {
    const frontMatterContent = frontMatterMatch[1];
    body = markdown.slice(frontMatterMatch[0].length);

    frontMatterContent.split(/\r?\n/).forEach((line) => {
      if (!line.includes(':')) {
        return;
      }

      const [rawKey, ...rawValueParts] = line.split(':');
      if (!rawKey || rawValueParts.length === 0) {
        return;
      }

      const key = rawKey.trim();
      const value = rawValueParts.join(':').trim();
      const metadataKey = FRONTMATTER_KEY_MAP[key];

      if (metadataKey) {
        if (MULTI_SELECT_METADATA_KEYS.includes(metadataKey)) {
          const values = value
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);
          normalizedMetadata[metadataKey] = values;
        } else {
          normalizedMetadata[metadataKey] = value;
        }
      }
    });
  }

  let qaMarkdown = '';
  const qaHeadingRegex = /##\s+Questions\s*&\s*Réponses/i;
  const qaIndex = body.search(qaHeadingRegex);

  if (qaIndex !== -1) {
    qaMarkdown = body.slice(qaIndex);
    body = body.slice(0, qaIndex);
  }

  const qaItems = [];
  if (qaMarkdown) {
    const qaItemRegex = /###\s+Question\s+\d+\s*[\r\n]+(?:\*\*Question\s*:\*\*\s*)([\s\S]*?)(?:\r?\n)+(?:\*\*Réponse\s*:\*\*\s*)([\s\S]*?)(?=(?:\r?\n###\s+Question|\r?\n##\s+|$))/gi;
    let match;

    while ((match = qaItemRegex.exec(qaMarkdown)) !== null) {
      const question = (match[1] || '').replace(/\r\n/g, '\n').trim();
      const answer = (match[2] || '').replace(/\r\n/g, '\n').trim();
      qaItems.push({ question, answer });
    }
  }

  const contentMarkdown = body.trim();
  let htmlContent = contentMarkdown ? markdownToHTML(contentMarkdown) : '';
  if (typeof htmlContent !== 'string' || htmlContent.trim().length === 0) {
    htmlContent = '<p></p>';
  }

  const sanitizedHTML = sanitizeHTML(htmlContent);
  const normalizedQAItems = qaItems.length > 0 ? qaItems : createInitialQAItems();

  return {
    metadata: normalizedMetadata,
    contentHTML: sanitizedHTML,
    qaItems: normalizedQAItems
  };
}

async function loadFieldConfigurationFromFile() {
  try {
    const response = await fetch('./field-config.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data || typeof data !== 'object') {
      return DEFAULT_SELECT_OPTIONS;
    }

    return data;
  } catch (error) {
    console.warn('Impossible de charger la configuration des champs :', error);
    return DEFAULT_SELECT_OPTIONS;
  }
}

async function loadGlossaryData() {
  try {
    const response = await fetch('./glossary.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      return {};
    }
    if (Array.isArray(data)) {
      return data.reduce((acc, entry) => {
        if (entry && typeof entry.term === 'string' && typeof entry.definition === 'string') {
          acc[entry.term] = entry.definition;
        }
        return acc;
      }, {});
    }
    if (Array.isArray(data.acronyms)) {
      return data.acronyms.reduce((acc, entry) => {
        if (entry && typeof entry.term === 'string' && typeof entry.definition === 'string') {
          acc[entry.term] = entry.definition;
        }
        return acc;
      }, {});
    }
    if (typeof data === 'object') {
      return Object.entries(data).reduce((acc, [key, value]) => {
        if (typeof key === 'string' && typeof value === 'string') {
          acc[key] = value;
        }
        return acc;
      }, {});
    }
    return {};
  } catch (error) {
    console.error('Erreur lors du chargement du glossaire :', error);
    throw error;
  }
}

function persistSelectOptions(options) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(SELECT_OPTION_STORAGE_KEY, JSON.stringify(options));
  } catch (error) {
    console.warn('Impossible de sauvegarder les options personnalisées :', error);
  }
}
const state = {
  metadata: createInitialMetadata(),
  contentHTML: INITIAL_CONTENT_HTML,
  qaItems: createInitialQAItems(),
  guidelines: [],
  blockingWarnings: [],
  hasStarted: false,
  selectOptions: normalizeSelectOptions(DEFAULT_SELECT_OPTIONS),
  selectOptionDrafts: createEmptyOptionDrafts(),
  configDefaults: DEFAULT_SELECT_OPTIONS,
  glossary: {},
  glossaryError: null,
  isGlossaryLoading: true,
  keywordInput: '',
  isBackofficeOpen: false,
  isPreviewOpen: false,
  previewMarkdown: '',
  isExportingPDF: false
};

const elements = {
  startInfo: document.getElementById('start-info'),
  metadataGroups: document.getElementById('metadata-groups'),
  editor: document.getElementById('procedure-editor'),
  toolbar: document.getElementById('editor-toolbar'),
  insertRationalButton: document.getElementById('insert-rational-btn'),
  qaList: document.getElementById('qa-list'),
  addQaButton: document.getElementById('add-qa-btn'),
  blockingWarning: document.getElementById('blocking-warning'),
  blockingWarningList: document.getElementById('blocking-warning-list'),
  previewButton: document.getElementById('preview-btn'),
  exportMarkdownButton: document.getElementById('export-md-btn'),
  exportPDFButton: document.getElementById('export-pdf-btn'),
  previewModal: document.getElementById('preview-modal'),
  previewBody: document.getElementById('preview-body'),
  closePreviewButton: document.getElementById('close-preview-btn'),
  backofficeOverlay: document.getElementById('backoffice-overlay'),
  backofficePanel: document.querySelector('.backoffice-panel'),
  backofficeSections: document.getElementById('backoffice-sections'),
  closeBackofficeButton: document.getElementById('close-backoffice-btn'),
  backofficeButton: document.getElementById('backoffice-btn'),
  newProcedureButton: document.getElementById('new-procedure-btn'),
  importButton: document.getElementById('import-btn'),
  importInput: document.getElementById('import-input'),
  guidelinesList: document.getElementById('guidelines-list'),
  guidelinesEmpty: document.getElementById('guidelines-empty'),
  glossaryList: document.getElementById('glossary-list'),
  glossaryLoading: document.getElementById('glossary-loading'),
  glossaryError: document.getElementById('glossary-error'),
  exportConfigButton: document.getElementById('export-config-btn')
};
function synchronizeMetadataWithSelectOptions() {
  const nextMetadata = { ...state.metadata };
  let changed = false;
  SELECT_FIELD_DEFINITIONS.forEach((field) => {
    const optionsKey = field.optionsKey || field.key;
    const allowed = state.selectOptions[optionsKey] || [];
    const currentValue = nextMetadata[field.key];
    if (field.multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      const filtered = currentArray.filter((value) => allowed.includes(value));
      if (filtered.length !== currentArray.length) {
        nextMetadata[field.key] = filtered;
        changed = true;
      }
    } else if (currentValue && !allowed.includes(currentValue)) {
      nextMetadata[field.key] = '';
      changed = true;
    }
  });
  if (changed) {
    state.metadata = nextMetadata;
  }
}

function getKeywordList() {
  return parseKeywords(state.metadata.keywords);
}

function getIsFormDirty() {
  const metadataFilled = Object.values(state.metadata).some((value) => `${value || ''}`.trim().length > 0);
  const isDefaultContent = state.contentHTML.trim() === INITIAL_CONTENT_HTML.trim();
  const contentFilled = !isDefaultContent && state.contentHTML
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim().length > 0;
  const qaFilled = state.qaItems.some((item) => item.question.trim().length > 0 || item.answer.trim().length > 0);
  return metadataFilled || contentFilled || qaFilled;
}

function renderStartInfo() {
  if (elements.startInfo) {
    elements.startInfo.hidden = state.hasStarted;
  }
}

function createHintParagraph(text) {
  if (!text) {
    return null;
  }
  const p = document.createElement('p');
  p.className = 'field-hint';
  p.textContent = text;
  return p;
}

function renderKeywordField(field, container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'keyword-input-wrapper';

  const input = document.createElement('input');
  input.id = field.key;
  input.type = 'text';
  input.placeholder = field.placeholder || '';
  input.value = state.keywordInput;
  input.addEventListener('input', (event) => {
    state.keywordInput = event.target.value;
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleKeywordAdd(state.keywordInput);
    } else if (event.key === 'Backspace' && state.keywordInput === '') {
      const keywords = getKeywordList();
      if (keywords.length > 0) {
        event.preventDefault();
        handleKeywordRemove(keywords.length - 1);
      }
    }
  });
  wrapper.appendChild(input);

  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'keyword-tags';
  tagsContainer.setAttribute('aria-live', 'polite');
  const keywords = getKeywordList();
  if (keywords.length === 0) {
    const empty = document.createElement('span');
    empty.className = 'keyword-empty';
    empty.textContent = 'Ajoutez un mot clef puis validez avec Entrée.';
    tagsContainer.appendChild(empty);
  } else {
    keywords.forEach((keyword, index) => {
      const palette = KEYWORD_COLOR_PALETTE[index % KEYWORD_COLOR_PALETTE.length];
      const tag = document.createElement('span');
      tag.className = 'keyword-tag';
      tag.style.background = palette.background;
      tag.style.color = palette.color;
      tag.style.borderColor = palette.border;

      const label = document.createElement('span');
      label.textContent = keyword;
      tag.appendChild(label);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'keyword-remove';
      remove.setAttribute('aria-label', `Retirer le mot clef ${keyword}`);
      remove.textContent = '×';
      remove.addEventListener('click', () => handleKeywordRemove(index));
      tag.appendChild(remove);

      tagsContainer.appendChild(tag);
    });
  }
  wrapper.appendChild(tagsContainer);

  if (field.hint) {
    const hint = createHintParagraph(field.hint);
    if (hint) {
      wrapper.appendChild(hint);
    }
  }

  container.appendChild(wrapper);
}

function renderMetadataGroups() {
  if (!elements.metadataGroups) {
    return;
  }
  elements.metadataGroups.innerHTML = '';
  const groups = createResolvedMetadataGroups(state.selectOptions, state.configDefaults);
  groups.forEach((group) => {
    const section = document.createElement('section');
    section.className = 'metadata-group';

    const header = document.createElement('div');
    header.className = 'metadata-group-header';
    const title = document.createElement('h3');
    title.textContent = group.title;
    header.appendChild(title);
    if (group.description) {
      const desc = document.createElement('p');
      desc.textContent = group.description;
      header.appendChild(desc);
    }
    section.appendChild(header);

    const fieldsWrapper = document.createElement('div');
    fieldsWrapper.className = 'metadata-group-fields';

    group.fields.forEach((field) => {
      const fieldContainer = document.createElement('div');
      const label = document.createElement('label');
      label.htmlFor = field.key;
      label.textContent = field.label;
      fieldContainer.appendChild(label);

      if (field.type === 'select') {
        const availableOptions = state.selectOptions[field.optionsKey || field.key] || field.options || [];
        const select = document.createElement('select');
        select.id = field.key;
        if (field.multiple) {
          select.multiple = true;
          const size = Math.min(6, Math.max(3, availableOptions.length));
          select.size = size;
        }
        const currentValue = state.metadata[field.key];
        if (!field.multiple) {
          const placeholderOption = document.createElement('option');
          placeholderOption.value = '';
          placeholderOption.textContent = 'Sélectionnez une option';
          select.appendChild(placeholderOption);
        }
        availableOptions.forEach((option) => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          if (field.multiple && Array.isArray(currentValue) && currentValue.includes(option)) {
            optionElement.selected = true;
          }
          if (!field.multiple && currentValue === option) {
            optionElement.selected = true;
          }
          select.appendChild(optionElement);
        });
        select.addEventListener('change', (event) => {
          if (field.multiple) {
            const selectedValues = Array.from(event.target.selectedOptions)
              .map((option) => option.value)
              .filter((value) => value !== '');
            handleMetadataChange(field.key, selectedValues);
          } else {
            handleMetadataChange(field.key, event.target.value);
          }
        });
        fieldContainer.appendChild(select);
        const hint = createHintParagraph(field.hint);
        if (hint) {
          fieldContainer.appendChild(hint);
        }
      } else if (field.key === 'keywords') {
        renderKeywordField(field, fieldContainer);
      } else if (field.type === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.id = field.key;
        textarea.placeholder = field.placeholder || '';
        textarea.value = state.metadata[field.key] || '';
        textarea.addEventListener('input', (event) => handleMetadataChange(field.key, event.target.value));
        fieldContainer.appendChild(textarea);
        const hint = createHintParagraph(field.hint);
        if (hint) {
          fieldContainer.appendChild(hint);
        }
      } else {
        const input = document.createElement('input');
        input.id = field.key;
        input.type = field.type;
        input.placeholder = field.placeholder || '';
        input.value = state.metadata[field.key] || '';
        input.addEventListener('input', (event) => handleMetadataChange(field.key, event.target.value));
        fieldContainer.appendChild(input);
        const hint = createHintParagraph(field.hint);
        if (hint) {
          fieldContainer.appendChild(hint);
        }
      }

      fieldsWrapper.appendChild(fieldContainer);
    });

    section.appendChild(fieldsWrapper);
    elements.metadataGroups.appendChild(section);
  });
}
function renderQAList() {
  if (!elements.qaList) {
    return;
  }
  elements.qaList.innerHTML = '';
  state.qaItems.forEach((item, index) => {
    const qaItem = document.createElement('div');
    qaItem.className = 'qa-item';

    const questionWrapper = document.createElement('div');
    const questionLabel = document.createElement('label');
    questionLabel.htmlFor = `question-${index}`;
    questionLabel.textContent = 'Question';
    const questionTextarea = document.createElement('textarea');
    questionTextarea.id = `question-${index}`;
    questionTextarea.placeholder = 'Formulez la question de manière explicite';
    questionTextarea.value = item.question;
    questionTextarea.addEventListener('input', (event) => handleQAChange(index, 'question', event.target.value));
    questionWrapper.appendChild(questionLabel);
    questionWrapper.appendChild(questionTextarea);

    const answerWrapper = document.createElement('div');
    const answerLabel = document.createElement('label');
    answerLabel.htmlFor = `answer-${index}`;
    answerLabel.textContent = 'Réponse';
    const answerTextarea = document.createElement('textarea');
    answerTextarea.id = `answer-${index}`;
    answerTextarea.placeholder = 'Fournissez une réponse précise et contextualisée';
    answerTextarea.value = item.answer;
    answerTextarea.addEventListener('input', (event) => handleQAChange(index, 'answer', event.target.value));
    answerWrapper.appendChild(answerLabel);
    answerWrapper.appendChild(answerTextarea);

    const actions = document.createElement('div');
    actions.className = 'qa-actions';
    if (state.qaItems.length > 1) {
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'remove-btn';
      removeButton.textContent = 'Retirer';
      removeButton.addEventListener('click', () => removeQAItem(index));
      actions.appendChild(removeButton);
    }

    qaItem.appendChild(questionWrapper);
    qaItem.appendChild(answerWrapper);
    qaItem.appendChild(actions);

    elements.qaList.appendChild(qaItem);
  });
}

function renderGuidelines() {
  if (!elements.guidelinesList || !elements.guidelinesEmpty) {
    return;
  }
  elements.guidelinesList.innerHTML = '';
  if (state.guidelines.length === 0) {
    elements.guidelinesEmpty.hidden = false;
  } else {
    elements.guidelinesEmpty.hidden = true;
    state.guidelines.forEach((item) => {
      const listItem = document.createElement('li');
      const wrapper = document.createElement('div');
      wrapper.className = 'insight-comment';

      const anchor = document.createElement('span');
      anchor.className = 'comment-anchor';
      anchor.textContent = item.anchor || 'Texte';
      wrapper.appendChild(anchor);

      const message = document.createElement('span');
      message.className = 'comment-message';
      message.textContent = item.message;
      wrapper.appendChild(message);

      listItem.appendChild(wrapper);
      elements.guidelinesList.appendChild(listItem);
    });
  }
}

function renderGlossary() {
  if (!elements.glossaryList) {
    return;
  }
  elements.glossaryList.innerHTML = '';
  if (state.isGlossaryLoading) {
    if (elements.glossaryLoading) {
      elements.glossaryLoading.hidden = false;
    }
    if (elements.glossaryError) {
      elements.glossaryError.hidden = true;
    }
    return;
  }
  if (elements.glossaryLoading) {
    elements.glossaryLoading.hidden = true;
  }
  if (elements.glossaryError) {
    elements.glossaryError.hidden = !state.glossaryError;
    if (state.glossaryError) {
      elements.glossaryError.textContent = state.glossaryError;
    }
  }
  const entries = Object.entries(state.glossary);
  if (entries.length === 0) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--muted)';
    empty.style.margin = '0';
    empty.textContent = 'Aucune entrée disponible.';
    elements.glossaryList.appendChild(empty);
    return;
  }
  entries.forEach(([term, definition]) => {
    const item = document.createElement('li');
    const title = document.createElement('strong');
    title.textContent = term;
    item.appendChild(title);
    const paragraph = document.createElement('p');
    paragraph.textContent = definition;
    item.appendChild(paragraph);
    elements.glossaryList.appendChild(item);
  });
}

function renderBlockingWarnings() {
  if (!elements.blockingWarning || !elements.blockingWarningList) {
    return;
  }
  if (state.blockingWarnings.length === 0) {
    elements.blockingWarning.hidden = true;
    elements.blockingWarningList.innerHTML = '';
  } else {
    elements.blockingWarning.hidden = false;
    elements.blockingWarningList.innerHTML = '';
    state.blockingWarnings.forEach((warning) => {
      const li = document.createElement('li');
      li.textContent = warning;
      elements.blockingWarningList.appendChild(li);
    });
  }
}

function renderPreview() {
  if (!elements.previewModal || !elements.previewBody) {
    return;
  }
  elements.previewModal.hidden = !state.isPreviewOpen;
  if (state.isPreviewOpen) {
    elements.previewBody.textContent = state.previewMarkdown;
  } else {
    elements.previewBody.textContent = '';
  }
}

function renderBackoffice() {
  if (!elements.backofficeOverlay || !elements.backofficeSections) {
    return;
  }
  elements.backofficeOverlay.hidden = !state.isBackofficeOpen;
  elements.backofficeSections.innerHTML = '';
  if (!state.isBackofficeOpen) {
    return;
  }
  SELECT_FIELD_DEFINITIONS.forEach((field) => {
    const section = document.createElement('div');
    section.className = 'backoffice-section';

    const header = document.createElement('div');
    header.className = 'backoffice-section-header';
    const title = document.createElement('h3');
    title.textContent = field.label;
    header.appendChild(title);

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'backoffice-reset-btn';
    resetButton.textContent = 'Réinitialiser';
    resetButton.addEventListener('click', () => handleResetSelectOptions(field.key));
    header.appendChild(resetButton);

    section.appendChild(header);

    const label = document.createElement('label');
    label.htmlFor = `${field.key}-new-option`;
    label.textContent = 'Ajouter une option';
    section.appendChild(label);

    const controls = document.createElement('div');
    controls.className = 'backoffice-controls';

    const input = document.createElement('input');
    input.id = `${field.key}-new-option`;
    input.type = 'text';
    input.placeholder = 'Nouvelle option';
    input.value = state.selectOptionDrafts[field.optionsKey || field.key] || '';
    input.addEventListener('input', (event) => handleSelectOptionDraftChange(field.key, event.target.value));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAddSelectOption(field.key);
      }
    });
    controls.appendChild(input);

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'backoffice-add-btn';
    addButton.textContent = 'Ajouter';
    addButton.addEventListener('click', () => handleAddSelectOption(field.key));
    controls.appendChild(addButton);

    section.appendChild(controls);

    const options = state.selectOptions[field.optionsKey || field.key] || [];
    const optionList = document.createElement('div');
    optionList.className = 'option-list';
    optionList.setAttribute('aria-live', 'polite');

    if (options.length === 0) {
      const empty = document.createElement('span');
      empty.className = 'option-empty';
      empty.textContent = 'Aucune option enregistrée pour le moment.';
      optionList.appendChild(empty);
    } else {
      options.forEach((option) => {
        const pill = document.createElement('span');
        pill.className = 'option-pill';

        const labelSpan = document.createElement('span');
        labelSpan.textContent = option;
        pill.appendChild(labelSpan);

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'option-pill-remove';
        remove.setAttribute('aria-label', `Supprimer l'option ${option}`);
        remove.textContent = '×';
        remove.addEventListener('click', () => handleRemoveSelectOption(field.key, option));
        pill.appendChild(remove);

        optionList.appendChild(pill);
      });
    }

    section.appendChild(optionList);
    elements.backofficeSections.appendChild(section);
  });

  setTimeout(() => {
    if (state.isBackofficeOpen && elements.backofficePanel) {
      elements.backofficePanel.focus();
    }
  }, 0);
}

function renderToolbar() {
  if (!elements.toolbar) {
    return;
  }
  const buttons = elements.toolbar.querySelectorAll('button[data-command]');
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function renderExportActions() {
  if (elements.exportMarkdownButton) {
    elements.exportMarkdownButton.disabled = state.blockingWarnings.length > 0;
  }
  if (elements.exportPDFButton) {
    elements.exportPDFButton.disabled = state.blockingWarnings.length > 0 || state.isExportingPDF;
    elements.exportPDFButton.textContent = state.isExportingPDF ? 'Export PDF en cours…' : 'Exporter en PDF';
  }
}

function renderAll() {
  renderStartInfo();
  renderMetadataGroups();
  renderQAList();
  renderGuidelines();
  renderGlossary();
  renderBlockingWarnings();
  renderPreview();
  renderBackoffice();
  renderToolbar();
  renderExportActions();
}

function updateGuidelinesAndWarnings() {
  state.guidelines = computeGuidelines(state.contentHTML, state.glossary);
  state.blockingWarnings = detectBlockingIssues(state.contentHTML, state.qaItems);
}
function handleMetadataChange(fieldKey, value) {
  state.metadata = { ...state.metadata, [fieldKey]: value };
  if (fieldKey === 'keywords') {
    state.keywordInput = '';
  }
  state.hasStarted = true;
  renderAll();
}

function handleKeywordAdd(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) {
    state.keywordInput = '';
    renderAll();
    return;
  }
  const keywords = getKeywordList();
  if (keywords.includes(trimmed)) {
    state.keywordInput = '';
    renderAll();
    return;
  }
  const updated = [...keywords, trimmed];
  state.metadata = { ...state.metadata, keywords: updated.join(', ') };
  state.keywordInput = '';
  state.hasStarted = true;
  renderAll();
}

function handleKeywordRemove(index) {
  const keywords = getKeywordList();
  const updated = keywords.filter((_, i) => i !== index);
  state.metadata = { ...state.metadata, keywords: updated.join(', ') };
  state.hasStarted = true;
  renderAll();
}

function handleQAChange(index, field, value) {
  const nextItems = state.qaItems.map((item, idx) => (idx === index ? { ...item, [field]: value } : item));
  state.qaItems = nextItems;
  state.hasStarted = true;
  updateGuidelinesAndWarnings();
  renderAll();
}

function addQAItem() {
  state.qaItems = [...state.qaItems, { question: '', answer: '' }];
  state.hasStarted = true;
  renderAll();
}

function removeQAItem(index) {
  state.qaItems = state.qaItems.filter((_, i) => i !== index);
  updateGuidelinesAndWarnings();
  renderAll();
}

function updateContent(html) {
  const sanitized = sanitizeHTML(html);
  state.contentHTML = sanitized;
  updateGuidelinesAndWarnings();
}

function handleEditorInput(event) {
  state.hasStarted = true;
  updateContent(event.currentTarget.innerHTML);
  renderAll();
}

function insertRationalBlock() {
  if (!elements.editor) {
    return;
  }
  elements.editor.focus();
  const rationalHTML = `
<section class="rational-block" data-block-type="rationnel">
  <div class="rational-block-title">Rationnel</div>
  <p>Expliquez ici le rationnel associé à cette section.</p>
</section><p></p>`;
  document.execCommand('insertHTML', false, rationalHTML);
  state.hasStarted = true;
  updateContent(elements.editor.innerHTML);
  renderAll();
}

function handlePreview() {
  state.previewMarkdown = buildMarkdown(state.metadata, state.contentHTML, state.qaItems);
  state.isPreviewOpen = true;
  renderPreview();
}

function closePreview() {
  state.isPreviewOpen = false;
  state.previewMarkdown = '';
  renderPreview();
}

function handleExportMarkdown() {
  const markdown = buildMarkdown(state.metadata, state.contentHTML, state.qaItems);
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${state.metadata.reference || 'procedure'}.md`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function buildPrintableHTML(metadata, contentHTML, qaItems) {
  const metadataEntries = [
    ['Titre', metadata.title],
    ['Référence', metadata.reference],
    ['Auteur', metadata.author],
    ['Périmètre métier', formatMetadataValue(metadata.businessScope)],
    ['Périmètre société', formatMetadataValue(metadata.companyScope)],
    ['Périmètre géographique', formatMetadataValue(metadata.geoScope)],
    ['Mots clefs', formatMetadataValue(metadata.keywords)],
    ['Résumé', metadata.summary],
    ['Procédure mère', metadata.parentProcedure],
    ['Historique des modifications', metadata.changeHistory],
    ["Date d'entrée en vigueur", metadata.effectiveDate]
  ];
  const metadataRows = metadataEntries
    .map(([label, value]) => `<tr><th>${escapeHTML(label)}</th><td>${escapeHTML(String(value || ''))}</td></tr>`)
    .join('');
  const qaSections = qaItems
    .map(
      (item, index) => `
        <section class="print-qa">
          <h3>Question ${index + 1}</h3>
          <p><strong>Question :</strong> ${escapeHTML(item.question || '')}</p>
          <p><strong>Réponse :</strong> ${escapeHTML(item.answer || '')}</p>
        </section>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Export PDF</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; color: #1c2240; }
    h1 { margin-top: 0; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
    th { text-align: left; padding: 6px 12px; background: #f0f2ff; width: 220px; }
    td { padding: 6px 12px; border-bottom: 1px solid #dce0f3; }
    .content { margin-bottom: 32px; }
    .print-qa { margin-bottom: 20px; }
    .print-qa h3 { margin-bottom: 8px; }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHTML(metadata.title || 'Procédure')}</h1>
    <table>${metadataRows}</table>
  </header>
  <section class="content">${contentHTML}</section>
  <section class="qa-section">
    <h2>Questions &amp; Réponses</h2>
    ${qaSections || '<p>Aucune question enregistrée.</p>'}
  </section>
  <script>
    window.addEventListener('load', () => {
      window.focus();
      window.print();
    });
    window.addEventListener('afterprint', () => {
      window.close();
    });
  </script>
</body>
</html>`;
}

function handleExportPDF() {
  if (state.blockingWarnings.length > 0) {
    return;
  }
  try {
    state.isExportingPDF = true;
    renderExportActions();
    const printable = buildPrintableHTML(state.metadata, state.contentHTML, state.qaItems);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Impossible d’ouvrir la fenêtre d’impression.');
    }
    printWindow.document.open();
    printWindow.document.write(printable);
    printWindow.document.close();
  } catch (error) {
    console.error('Erreur lors de la préparation du PDF :', error);
    window.alert("Le PDF n'a pas pu être préparé. Veuillez réessayer.");
  } finally {
    state.isExportingPDF = false;
    renderExportActions();
  }
}
function handleNewProcedure() {
  if (getIsFormDirty()) {
    const confirmReset = window.confirm(
      'Voulez-vous vraiment démarrer une nouvelle procédure ? Les informations en cours seront effacées.'
    );
    if (!confirmReset) {
      return;
    }
  }

  const initialQAItems = createInitialQAItems();
  state.metadata = createInitialMetadata();
  state.qaItems = initialQAItems;
  state.contentHTML = INITIAL_CONTENT_HTML;
  state.guidelines = computeGuidelines(INITIAL_CONTENT_HTML, state.glossary);
  state.blockingWarnings = detectBlockingIssues(INITIAL_CONTENT_HTML, initialQAItems);
  state.previewMarkdown = '';
  state.isPreviewOpen = false;
  state.hasStarted = true;
  state.keywordInput = '';

  if (elements.editor) {
    elements.editor.innerHTML = INITIAL_CONTENT_HTML;
    const firstField = document.getElementById(METADATA_FIELD_DEFINITIONS[0].key);
    if (firstField) {
      firstField.focus();
    }
  }

  renderAll();
}

function handleImportClick() {
  if (!elements.importInput) {
    return;
  }
  elements.importInput.value = '';
  elements.importInput.click();
}

async function handleImportMarkdown(event) {
  const input = event.target;
  const file = input && input.files ? input.files[0] : null;
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const { metadata, contentHTML, qaItems } = parseMarkdownProcedure(text);
    state.metadata = metadata;
    state.contentHTML = contentHTML;
    state.qaItems = qaItems;
    state.guidelines = computeGuidelines(contentHTML, state.glossary);
    state.blockingWarnings = detectBlockingIssues(contentHTML, qaItems);
    state.previewMarkdown = '';
    state.isPreviewOpen = false;
    state.hasStarted = true;
    state.keywordInput = '';
    if (elements.editor) {
      elements.editor.innerHTML = contentHTML;
    }
    renderAll();
  } catch (error) {
    console.error("Erreur lors de l'import Markdown :", error);
    window.alert("Le fichier Markdown n'a pas pu être importé. Vérifiez son format et réessayez.");
  } finally {
    if (input) {
      input.value = '';
    }
  }
}

function handleAddSelectOption(fieldKey) {
  const optionsKey = SELECT_FIELD_DEFINITIONS.find((field) => field.key === fieldKey)?.optionsKey || fieldKey;
  const draft = state.selectOptionDrafts[optionsKey] || '';
  const trimmed = draft.trim();
  if (!trimmed) {
    return;
  }
  const options = state.selectOptions[optionsKey] || [];
  if (options.some((value) => value.toLowerCase() === trimmed.toLowerCase())) {
    state.selectOptionDrafts = { ...state.selectOptionDrafts, [optionsKey]: '' };
    renderBackoffice();
    return;
  }
  const updatedOptions = { ...state.selectOptions, [optionsKey]: [...options, trimmed] };
  state.selectOptions = updatedOptions;
  state.selectOptionDrafts = { ...state.selectOptionDrafts, [optionsKey]: '' };
  persistSelectOptions(updatedOptions);
  synchronizeMetadataWithSelectOptions();
  renderAll();
}

function handleRemoveSelectOption(fieldKey, option) {
  const optionsKey = SELECT_FIELD_DEFINITIONS.find((field) => field.key === fieldKey)?.optionsKey || fieldKey;
  const options = state.selectOptions[optionsKey] || [];
  const updatedOptions = options.filter((value) => value !== option);
  const next = { ...state.selectOptions, [optionsKey]: updatedOptions };
  state.selectOptions = next;
  persistSelectOptions(next);
  synchronizeMetadataWithSelectOptions();
  renderAll();
}

function handleResetSelectOptions(fieldKey) {
  const fieldDefinition = SELECT_FIELD_DEFINITIONS.find((field) => field.key === fieldKey);
  const optionsKey = fieldDefinition?.optionsKey || fieldKey;
  const baseOptions = state.configDefaults[optionsKey] || DEFAULT_SELECT_OPTIONS[optionsKey] || [];
  const next = { ...state.selectOptions, [optionsKey]: [...baseOptions] };
  state.selectOptions = next;
  persistSelectOptions(next);
  synchronizeMetadataWithSelectOptions();
  renderAll();
}

function handleSelectOptionDraftChange(fieldKey, value) {
  const optionsKey = SELECT_FIELD_DEFINITIONS.find((field) => field.key === fieldKey)?.optionsKey || fieldKey;
  state.selectOptionDrafts = { ...state.selectOptionDrafts, [optionsKey]: value };
}

function handleExportConfig() {
  try {
    const data = normalizeSelectOptions(state.selectOptions, state.configDefaults);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'field-config.json';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur lors de l'export de la configuration :", error);
    window.alert("L'export de la configuration a échoué. Veuillez réessayer.");
  }
}

function openBackoffice() {
  state.isBackofficeOpen = true;
  renderBackoffice();
}

function closeBackoffice() {
  state.isBackofficeOpen = false;
  renderBackoffice();
}

function handleBackofficeOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeBackoffice();
  }
}
function registerEventListeners() {
  if (elements.toolbar) {
    elements.toolbar.querySelectorAll('button[data-command]').forEach((button) => {
      button.addEventListener('click', () => {
        const command = button.getAttribute('data-command');
        const value = button.getAttribute('data-value');
        formatSelection(command, value);
        if (elements.editor) {
          updateContent(elements.editor.innerHTML);
          renderAll();
        }
      });
    });
  }
  if (elements.insertRationalButton) {
    elements.insertRationalButton.addEventListener('click', insertRationalBlock);
  }
  if (elements.editor) {
    elements.editor.addEventListener('input', handleEditorInput);
    elements.editor.innerHTML = INITIAL_CONTENT_HTML;
  }
  if (elements.addQaButton) {
    elements.addQaButton.addEventListener('click', addQAItem);
  }
  if (elements.previewButton) {
    elements.previewButton.addEventListener('click', handlePreview);
  }
  if (elements.closePreviewButton) {
    elements.closePreviewButton.addEventListener('click', closePreview);
  }
  if (elements.previewModal) {
    elements.previewModal.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        closePreview();
      }
    });
  }
  if (elements.exportMarkdownButton) {
    elements.exportMarkdownButton.addEventListener('click', handleExportMarkdown);
  }
  if (elements.exportPDFButton) {
    elements.exportPDFButton.addEventListener('click', handleExportPDF);
  }
  if (elements.newProcedureButton) {
    elements.newProcedureButton.addEventListener('click', handleNewProcedure);
  }
  if (elements.importButton) {
    elements.importButton.addEventListener('click', handleImportClick);
  }
  if (elements.importInput) {
    elements.importInput.addEventListener('change', handleImportMarkdown);
  }
  if (elements.backofficeButton) {
    elements.backofficeButton.addEventListener('click', openBackoffice);
  }
  if (elements.closeBackofficeButton) {
    elements.closeBackofficeButton.addEventListener('click', closeBackoffice);
  }
  if (elements.backofficeOverlay) {
    elements.backofficeOverlay.addEventListener('click', handleBackofficeOverlayClick);
  }
  if (elements.exportConfigButton) {
    elements.exportConfigButton.addEventListener('click', handleExportConfig);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (state.isBackofficeOpen) {
        closeBackoffice();
      }
      if (state.isPreviewOpen) {
        closePreview();
      }
    }
  });
}

async function bootstrap() {
  try {
    const configuration = await loadFieldConfigurationFromFile();
    const normalizedConfiguration = normalizeSelectOptions(configuration, configuration);
    state.configDefaults = normalizedConfiguration;
    state.selectOptions = loadInitialSelectOptions(normalizedConfiguration);
    state.selectOptionDrafts = createEmptyOptionDrafts();
    synchronizeMetadataWithSelectOptions();
    renderAll();
    registerEventListeners();
    try {
      const glossaryData = await loadGlossaryData();
      state.glossary = glossaryData;
      state.glossaryError = null;
    } catch (error) {
      state.glossary = {};
      state.glossaryError = "Le glossaire n'a pas pu être chargé.";
    } finally {
      state.isGlossaryLoading = false;
      renderGlossary();
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de l'application :", error);
  }
}

bootstrap();
