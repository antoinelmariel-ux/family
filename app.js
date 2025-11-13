import { LFB_LOGO_BASE64 } from './assets/images/lfb-logo-base64.js';

const LANGUAGE_STORAGE_KEY = 'procedureBuilderLanguage';
const DEFAULT_LANGUAGE = 'fr';
const SUPPORTED_LANGUAGES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' }
];

const TEXT = {
  'language.aria': {
    fr: 'Langue de l’interface',
    en: 'Interface language',
    es: 'Idioma de la interfaz'
  },
  'language.option.fr': { fr: 'FR', en: 'FR', es: 'FR' },
  'language.option.en': { fr: 'EN', en: 'EN', es: 'EN' },
  'language.option.es': { fr: 'ES', en: 'ES', es: 'ES' },
  'page.title': {
    fr: 'Éditeur de Procédures IA Friendly',
    en: 'AI-Friendly Procedure Editor',
    es: 'Editor de Procedimientos compatible con la IA'
  },
  'header.title': {
    fr: 'Studio de Procédures IA Friendly',
    en: 'AI-Friendly Procedure Studio',
    es: 'Estudio de Procedimientos compatible con la IA'
  },
  'header.import': { fr: 'Importer un Markdown', en: 'Import Markdown', es: 'Importar Markdown' },
  'header.backoffice': { fr: 'Gérer le backoffice', en: 'Manage back office', es: 'Gestionar el backoffice' },
  'header.glossary': { fr: 'Consulter les acronymes', en: 'Browse acronyms', es: 'Consultar acrónimos' },
  'header.newProcedure': { fr: 'Nouvelle procédure', en: 'New procedure', es: 'Nuevo procedimiento' },
  'startInfo.title': { fr: 'Démarrer une nouvelle procédure', en: 'Start a new procedure', es: 'Iniciar un nuevo procedimiento' },
  'startInfo.description': {
    fr: "Pour créer un nouveau document, cliquez sur le bouton « Nouvelle procédure » situé dans l'entête. Un canevas vierge sera automatiquement préparé pour vous permettre de renseigner chaque section.",
    en: 'To create a new document, click the “New procedure” button located in the header. A blank template will be prepared automatically so you can fill out each section.',
    es: 'Para crear un nuevo documento, haz clic en el botón «Nuevo procedimiento» situado en el encabezado. Se preparará automáticamente un lienzo en blanco para que completes cada sección.'
  },
  'startInfo.bullet1': {
    fr: 'Complétez les métadonnées pour contextualiser la procédure.',
    en: 'Fill in the metadata to put the procedure into context.',
    es: 'Completa los metadatos para contextualizar el procedimiento.'
  },
  'startInfo.bullet2': {
    fr: "Rédigez le contenu opérationnel à l'aide de l'éditeur enrichi.",
    en: 'Write the operational content using the rich text editor.',
    es: 'Redacta el contenido operativo con el editor enriquecido.'
  },
  'startInfo.bullet3': {
    fr: 'Finalisez par la session de Questions & Réponses avant l’export.',
    en: 'Wrap up with the Questions & Answers session before exporting.',
    es: 'Finaliza con la sesión de Preguntas y Respuestas antes de exportar.'
  },
  'sections.metadata': { fr: '1. Métadonnées', en: '1. Metadata', es: '1. Metadatos' },
  'sections.editor': { fr: '2. Contenu de la procédure', en: '2. Procedure content', es: '2. Contenido del procedimiento' },
  'sections.qa': { fr: '3. Questions & Réponses', en: '3. Questions & Answers', es: '3. Preguntas y respuestas' },
  'sections.export': { fr: 'Aperçu & Export', en: 'Preview & Export', es: 'Vista previa y exportación' },
  'toolbar.heading2': { fr: 'Sous-titre', en: 'Subtitle', es: 'Subtítulo' },
  'toolbar.heading3': { fr: 'Section', en: 'Section', es: 'Sección' },
  'toolbar.heading4': { fr: 'Sous-section', en: 'Subsection', es: 'Subsección' },
  'toolbar.bold': { fr: 'Gras', en: 'Bold', es: 'Negrita' },
  'toolbar.italic': { fr: 'Italique', en: 'Italic', es: 'Cursiva' },
  'toolbar.rational': { fr: 'Rationnel', en: 'Rationale', es: 'Racional' },
  'toolbar.unorderedList': { fr: 'Liste à puces', en: 'Bulleted list', es: 'Lista con viñetas' },
  'toolbar.orderedList': { fr: 'Liste numérotée', en: 'Numbered list', es: 'Lista numerada' },
  'editor.title.placeholder': {
    fr: 'Titre de la procédure',
    en: 'Procedure title',
    es: 'Título del procedimiento'
  },
  'editor.ariaLabel': {
    fr: "Zone d'édition du contenu",
    en: 'Content editing area',
    es: 'Área de edición de contenido'
  },
  'qa.description': {
    fr: 'Structurez la session de questions-réponses qui conclura la procédure.',
    en: 'Structure the Q&A session that closes the procedure.',
    es: 'Estructura la sesión de preguntas y respuestas que cierra el procedimiento.'
  },
  'qa.addQuestion': { fr: 'Ajouter une question', en: 'Add a question', es: 'Agregar una pregunta' },
  'qa.questionLabel': { fr: 'Question', en: 'Question', es: 'Pregunta' },
  'qa.questionPlaceholder': {
    fr: 'Formulez la question de manière explicite',
    en: 'Write the question explicitly',
    es: 'Formula la pregunta de manera explícita'
  },
  'qa.answerLabel': { fr: 'Réponse', en: 'Answer', es: 'Respuesta' },
  'qa.answerPlaceholder': {
    fr: 'Fournissez une réponse précise et contextualisée',
    en: 'Provide a precise, contextualized answer',
    es: 'Ofrece una respuesta precisa y contextualizada'
  },
  'qa.remove': { fr: 'Retirer', en: 'Remove', es: 'Eliminar' },
  'qa.reorder': {
    fr: 'Réorganiser la question',
    en: 'Reorder question',
    es: 'Reordenar la pregunta'
  },
  'export.warning': {
    fr: '⚠️ Export impossible tant que les points suivants ne sont pas corrigés :',
    en: '⚠️ Export is not possible until the following points are resolved:',
    es: '⚠️ La exportación es imposible mientras no se corrijan los siguientes puntos:'
  },
  'export.preview': { fr: 'Prévisualiser le Markdown', en: 'Preview Markdown', es: 'Vista previa de Markdown' },
  'export.markdown': { fr: 'Exporter en Markdown', en: 'Export as Markdown', es: 'Exportar en Markdown' },
  'export.pdf': { fr: 'Exporter en PDF', en: 'Export as PDF', es: 'Exportar en PDF' },
  'export.pdfInProgress': {
    fr: 'Export PDF en cours…',
    en: 'PDF export in progress…',
    es: 'Exportación PDF en curso…'
  },
  'guidelines.title': { fr: 'Guidelines IA Friendly', en: 'AI-friendly guidelines', es: 'Guías compatibles con la IA' },
  'guidelines.empty': {
    fr: 'Commencez votre rédaction pour recevoir des recommandations.',
    en: 'Start writing to receive recommendations.',
    es: 'Comienza tu redacción para recibir recomendaciones.'
  },
  'guidelines.anchorFallback': { fr: 'Texte', en: 'Text', es: 'Texto' },
  'guidelines.headingFallback': {
    fr: '(titre sans texte)',
    en: '(untitled heading)',
    es: '(título sin texto)'
  },
  'guidelines.headingMessage': {
    fr: 'Commencez la section par un résumé bref et concis.',
    en: 'Start the section with a brief, concise summary.',
    es: 'Comienza la sección con un resumen breve y conciso.'
  },
  'guidelines.listTransitionMessage': {
    fr: 'Reliez la liste par une transition claire entre les étapes.',
    en: 'Link the list with a clear transition between steps.',
    es: 'Enlaza la lista con una transición clara entre los pasos.'
  },
  'guidelines.listIntroMessage': {
    fr: 'Ajoutez une phrase introductive se terminant par un deux-points avant la liste.',
    en: 'Add an introductory sentence ending with a colon before the list.',
    es: 'Añade una frase introductoria que termine con dos puntos antes de la lista.'
  },
  'guidelines.pronounMessage': {
    fr: 'Précisez le référent du pronom pour éviter toute ambiguïté.',
    en: 'Clarify the pronoun reference to avoid ambiguity.',
    es: 'Aclara el referente del pronombre para evitar ambigüedades.'
  },
  'guidelines.acronymMessage': {
    fr: "Documentez l'acronyme ou ajoutez-le à la base des acronymes.",
    en: 'Document the acronym or add it to the acronym repository.',
    es: 'Documenta el acrónimo o añádelo a la base de acrónimos.'
  },
  'guidelines.definitionCheck': {
    fr: 'Vérifiez que ce terme est défini dans la section « Définition ».',
    en: 'Make sure this term is defined in the “Definition” section.',
    es: 'Asegúrese de que este término esté definido en la sección «Definición».'
  },
  'guidelines.category.heading': {
    fr: 'Titre de section',
    en: 'Section heading',
    es: 'Título de sección'
  },
  'guidelines.category.listTransition': {
    fr: 'Transition de liste',
    en: 'List transition',
    es: 'Transición de lista'
  },
  'guidelines.category.listIntro': {
    fr: 'Introduction de liste',
    en: 'List introduction',
    es: 'Introducción de lista'
  },
  'guidelines.category.pronoun': {
    fr: 'Pronom ambigu',
    en: 'Ambiguous pronoun',
    es: 'Pronombre ambiguo'
  },
  'guidelines.category.acronym': {
    fr: 'Acronyme non documenté',
    en: 'Undocumented acronym',
    es: 'Acrónimo sin documentar'
  },
  'guidelines.category.definitionCheck': {
    fr: 'Terme non défini',
    en: 'Term not defined',
    es: 'Término no definido'
  },
  'guidelines.toggleComment': {
    fr: 'Afficher ou masquer le commentaire',
    en: 'Show or hide the comment',
    es: 'Mostrar u ocultar el comentario'
  },
  'guidelines.hideEntry': {
    fr: 'Masquer cette recommandation',
    en: 'Hide this recommendation',
    es: 'Ocultar esta recomendación'
  },
  'guidelines.restoreEntry': {
    fr: 'Réafficher cette recommandation',
    en: 'Show this recommendation again',
    es: 'Mostrar de nuevo esta recomendación'
  },
  'guidelines.hiddenToggle.show': {
    fr: 'Afficher les recommandations masquées ({{count}})',
    en: 'Show hidden recommendations ({{count}})',
    es: 'Mostrar las recomendaciones ocultas ({{count}})'
  },
  'guidelines.hiddenToggle.hide': {
    fr: 'Masquer les recommandations cachées',
    en: 'Hide hidden recommendations',
    es: 'Ocultar las recomendaciones ocultas'
  },
  'guidelines.hiddenEmpty': {
    fr: 'Toutes les recommandations sont masquées.',
    en: 'All recommendations are hidden.',
    es: 'Todas las recomendaciones están ocultas.'
  },
  'guidelines.lineLabel': {
    fr: 'Ligne {{line}}',
    en: 'Line {{line}}',
    es: 'Línea {{line}}'
  },
  'guidelines.markerLabel': {
    fr: '⚠️',
    en: '⚠️',
    es: '⚠️'
  },
  'guidelines.markerAria': {
    fr: 'Afficher le commentaire d’optimisation {{index}} pour « {{anchor}} »',
    en: 'Show optimization comment {{index}} for “{{anchor}}”',
    es: 'Mostrar el comentario de optimización {{index}} para «{{anchor}}»'
  },
  'guidelines.bulletListLabel': { fr: 'Liste à puces', en: 'Bulleted list', es: 'Lista con viñetas' },
  'guidelines.numberedListLabel': { fr: 'Liste numérotée', en: 'Numbered list', es: 'Lista numerada' },
  'glossary.title': {
    fr: 'Liste des acronymes',
    en: 'Acronym list',
    es: 'Lista de acrónimos'
  },
  'glossary.description': {
    fr: 'Consultez la base des acronymes partagés pour assurer une terminologie cohérente.',
    en: 'Review the shared acronym repository to keep terminology consistent.',
    es: 'Consulta la base de acrónimos compartida para mantener una terminología coherente.'
  },
  'glossary.downloadJson': {
    fr: 'Télécharger (JSON)',
    en: 'Download (JSON)',
    es: 'Descargar (JSON)'
  },
  'glossary.form.title': {
    fr: 'Ajouter un acronyme',
    en: 'Add an acronym',
    es: 'Agregar un acrónimo'
  },
  'glossary.form.termLabel': { fr: 'Acronyme', en: 'Acronym', es: 'Acrónimo' },
  'glossary.form.termPlaceholder': {
    fr: 'Ex. LFB',
    en: 'e.g. LFB',
    es: 'Ej. LFB'
  },
  'glossary.form.definitionLabel': {
    fr: 'Définition',
    en: 'Definition',
    es: 'Definición'
  },
  'glossary.form.definitionPlaceholder': {
    fr: "Décrivez la signification de l'acronyme",
    en: 'Describe what the acronym stands for',
    es: 'Describe el significado del acrónimo'
  },
  'glossary.form.submit': { fr: 'Ajouter', en: 'Add', es: 'Agregar' },
  'glossary.form.error.missing': {
    fr: 'Renseignez un acronyme et sa définition.',
    en: 'Provide an acronym and its definition.',
    es: 'Indica un acrónimo y su definición.'
  },
  'glossary.form.error.duplicate': {
    fr: 'Cet acronyme existe déjà : {{term}}.',
    en: 'This acronym already exists: {{term}}.',
    es: 'Este acrónimo ya existe: {{term}}.'
  },
  'insights.tabs.aria': {
    fr: 'Onglets des ressources complémentaires',
    en: 'Complementary resources tabs',
    es: 'Pestañas de recursos complementarios'
  },
  'glossary.loading': {
    fr: 'Chargement de la liste des acronymes…',
    en: 'Loading acronym list…',
    es: 'Cargando la lista de acrónimos…'
  },
  'glossary.empty': { fr: 'Aucune entrée disponible.', en: 'No entry available.', es: 'No hay entradas disponibles.' },
  'glossary.error': {
    fr: "La liste des acronymes n'a pas pu être chargée.",
    en: 'The acronym list could not be loaded.',
    es: 'No se pudo cargar la lista de acrónimos.'
  },
  'glossary.close': { fr: 'Fermer', en: 'Close', es: 'Cerrar' },
  'preview.title': { fr: 'Aperçu Markdown', en: 'Markdown preview', es: 'Vista previa de Markdown' },
  'preview.close': { fr: 'Fermer', en: 'Close', es: 'Cerrar' },
  'backoffice.title': {
    fr: 'Backoffice — Options des champs',
    en: 'Back office — Field options',
    es: 'Backoffice — Opciones de los campos'
  },
  'backoffice.close': { fr: 'Fermer', en: 'Close', es: 'Cerrar' },
  'backoffice.description': {
    fr: 'Personnalisez les listes de choix proposées dans les menus déroulants et le contenu inséré par défaut.',
    en: 'Customize the dropdown choice lists and the default content inserted in the editor.',
    es: 'Personaliza las listas de opciones de los desplegables y el contenido predeterminado del editor.'
  },
  'backoffice.reset': { fr: 'Réinitialiser', en: 'Reset', es: 'Restablecer' },
  'backoffice.addOptionLabel': { fr: 'Ajouter une option', en: 'Add an option', es: 'Agregar una opción' },
  'backoffice.newOptionPlaceholder': { fr: 'Nouvelle option', en: 'New option', es: 'Nueva opción' },
  'backoffice.addOption': { fr: 'Ajouter', en: 'Add', es: 'Agregar' },
  'backoffice.emptyOptions': {
    fr: 'Aucune option enregistrée pour le moment.',
    en: 'No option saved yet.',
    es: 'Todavía no hay opciones guardadas.'
  },
  'backoffice.removeOptionLabel': {
    fr: "Supprimer l'option {{option}}",
    en: 'Remove option {{option}}',
    es: 'Eliminar la opción {{option}}'
  },
  'backoffice.exportConfig': {
    fr: 'Exporter la configuration JSON',
    en: 'Export JSON configuration',
    es: 'Exportar la configuración JSON'
  },
  'backoffice.fieldKeyHint': {
    fr: 'Clé technique : {{key}}',
    en: 'Technical key: {{key}}',
    es: 'Clave técnica: {{key}}'
  },
  'backoffice.optionKeyHint': {
    fr: 'Liste partagée : {{key}}',
    en: 'Shared list: {{key}}',
    es: 'Lista compartida: {{key}}'
  },
  'backoffice.template.title': {
    fr: 'Modèle de contenu par défaut',
    en: 'Default content template',
    es: 'Plantilla de contenido predeterminada'
  },
  'backoffice.template.description': {
    fr: 'Personnalisez le canevas inséré automatiquement dans l’éditeur lors de la création d’une nouvelle procédure.',
    en: 'Customize the canvas automatically inserted in the editor when a new procedure is created.',
    es: 'Personaliza el contenido insertado automáticamente en el editor al crear un nuevo procedimiento.'
  },
  'backoffice.template.languageLabel': {
    fr: 'Langue du modèle',
    en: 'Template language',
    es: 'Idioma de la plantilla'
  },
  'backoffice.template.inputLabel': {
    fr: 'Contenu HTML inséré par défaut',
    en: 'Default inserted HTML content',
    es: 'Contenido HTML insertado por defecto'
  },
  'backoffice.template.save': { fr: 'Enregistrer', en: 'Save', es: 'Guardar' },
  'keywords.empty': {
    fr: 'Ajoutez un mot clef puis validez avec Entrée.',
    en: 'Add a keyword then validate with Enter.',
    es: 'Añade una palabra clave y valídala con Enter.'
  },
  'keywords.removeLabel': {
    fr: 'Retirer le mot clef {{keyword}}',
    en: 'Remove keyword {{keyword}}',
    es: 'Eliminar la palabra clave {{keyword}}'
  },
  'select.placeholder': { fr: 'Sélectionnez une option', en: 'Select an option', es: 'Selecciona una opción' },
  'pdf.sectionTitle': {
    fr: 'Questions & Réponses',
    en: 'Questions & Answers',
    es: 'Preguntas y respuestas'
  },
  'pdf.noQuestions': {
    fr: 'Aucune question enregistrée.',
    en: 'No question recorded.',
    es: 'No hay preguntas registradas.'
  },
  'pdf.footer.titleLabel': { fr: 'Titre', en: 'Title', es: 'Título' },
  'pdf.footer.referenceLabel': { fr: 'Réf.', en: 'Ref.', es: 'Ref.' },
  'pdf.footer.effectiveDateLabel': {
    fr: "Date d'entrée en vigueur",
    en: 'Effective date',
    es: 'Fecha de entrada en vigor'
  },
  'pdf.footer.pageLabel': { fr: 'Page', en: 'Page', es: 'Página' },
  'pdf.footer.confidential': {
    fr: 'Confidential - LFB Proprietary - Reproduction prohibited',
    en: 'Confidential - LFB Proprietary - Reproduction prohibited',
    es: 'Confidential - LFB Proprietary - Reproduction prohibited'
  },
  'pdf.printWindowError': {
    fr: 'Impossible d’ouvrir la fenêtre d’impression.',
    en: 'The print window could not be opened.',
    es: 'No se pudo abrir la ventana de impresión.'
  },
  'pdf.exportError': {
    fr: "Le PDF n'a pas pu être préparé. Veuillez réessayer.",
    en: 'The PDF could not be prepared. Please try again.',
    es: 'No se pudo preparar el PDF. Vuelve a intentarlo.'
  },
  'pdf.fallbackTitle': { fr: 'Procédure', en: 'Procedure', es: 'Procedimiento' },
  'confirm.newProcedure': {
    fr: 'Voulez-vous vraiment démarrer une nouvelle procédure ? Les informations en cours seront effacées.',
    en: 'Do you really want to start a new procedure? Current information will be cleared.',
    es: '¿Seguro que quieres iniciar un nuevo procedimiento? La información actual se borrará.'
  },
  'import.error': {
    fr: "Le fichier Markdown n'a pas pu être importé. Vérifiez son format et réessayez.",
    en: 'The Markdown file could not be imported. Check its format and try again.',
    es: 'No se pudo importar el archivo Markdown. Comprueba su formato e inténtalo de nuevo.'
  },
  'export.configError': {
    fr: "L'export de la configuration a échoué. Veuillez réessayer.",
    en: 'Configuration export failed. Please try again.',
    es: 'La exportación de la configuración ha fallado. Vuelve a intentarlo.'
  },
  'blocking.emoji': {
    fr: 'Retirez les émojis pour respecter la charte éditoriale.',
    en: 'Remove emojis to comply with the editorial guidelines.',
    es: 'Elimina los emojis para respetar la guía editorial.'
  },
  'blocking.images': {
    fr: 'Les images ne sont pas autorisées dans la procédure.',
    en: 'Images are not allowed in the procedure.',
    es: 'No se permiten imágenes en el procedimiento.'
  },
  'blocking.links': {
    fr: 'Les liens URL doivent être retirés avant export.',
    en: 'URL links must be removed before export.',
    es: 'Los enlaces URL deben retirarse antes de exportar.'
  },
  'blocking.tables': {
    fr: 'Les tableaux ne peuvent pas être exportés dans ce format.',
    en: 'Tables cannot be exported in this format.',
    es: 'No es posible exportar tablas en este formato.'
  },
  'blocking.lists': {
    fr: 'Convertissez toutes les listes en listes formatées via la barre d’édition.',
    en: 'Convert all lists using the editor toolbar formatting.',
    es: 'Convierte todas las listas usando el formato de la barra del editor.'
  },
  'rational.title': { fr: 'Rationnel', en: 'Rationale', es: 'Racional' },
  'rational.description': {
    fr: 'Expliquez ici le rationnel associé à cette section.',
    en: 'Explain the rationale associated with this section.',
    es: 'Explica aquí el razonamiento asociado a esta sección.'
  },
  'version.label': { fr: 'Version', en: 'Version', es: 'Versión' },
  'metadata.group.identification.title': {
    fr: 'Identification',
    en: 'Identification',
    es: 'Identificación'
  },
  'metadata.group.identification.description': {
    fr: 'Renseignez les éléments essentiels pour retrouver et suivre cette procédure.',
    en: 'Provide the key elements required to find and track this procedure.',
    es: 'Indica los elementos esenciales para encontrar y seguir este procedimiento.'
  },
  'metadata.group.contexte.title': { fr: 'Contexte', en: 'Context', es: 'Contexto' },
  'metadata.group.contexte.description': {
    fr: 'Situez la procédure au sein de votre dispositif documentaire.',
    en: 'Place the procedure within your documentation system.',
    es: 'Sitúa el procedimiento dentro de tu sistema documental.'
  },
  'metadata.group.diffusion.title': { fr: 'Diffusion', en: 'Distribution', es: 'Difusión' },
  'metadata.group.diffusion.description': {
    fr: 'Précisez à qui s’adresse la procédure et dans quelles zones elle s’applique.',
    en: 'Specify who the procedure is for and where it applies.',
    es: 'Indica a quién va dirigido el procedimiento y en qué zonas se aplica.'
  },
  'metadata.field.title.label': { fr: 'Titre', en: 'Title', es: 'Título' },
  'metadata.field.title.placeholder': {
    fr: 'Titre de la procédure',
    en: 'Procedure title',
    es: 'Título del procedimiento'
  },
  'metadata.field.title.hint': {
    fr: 'Nom tel qu’il apparaîtra dans les exports et la base documentaire.',
    en: 'Name as it will appear in exports and the document repository.',
    es: 'Nombre tal como aparecerá en las exportaciones y en la base documental.'
  },
  'metadata.field.reference.label': { fr: 'Référence', en: 'Reference', es: 'Referencia' },
  'metadata.field.reference.placeholder': {
    fr: 'Référence interne',
    en: 'Internal reference',
    es: 'Referencia interna'
  },
  'metadata.field.reference.hint': {
    fr: 'Identifiant unique ou code interne facilitant le suivi des versions.',
    en: 'Unique identifier or internal code that helps track versions.',
    es: 'Identificador único o código interno que facilita el seguimiento de versiones.'
  },
  'metadata.field.author.label': { fr: 'Auteur', en: 'Author', es: 'Autor' },
  'metadata.field.author.placeholder': {
    fr: 'Nom complet',
    en: 'Full name',
    es: 'Nombre completo'
  },
  'metadata.field.author.hint': {
    fr: 'Indiquez la personne responsable de la rédaction ou de la validation.',
    en: 'Indicate who is responsible for drafting or approving the procedure.',
    es: 'Indica quién es responsable de la redacción o de la validación.'
  },
  'metadata.field.procedureLanguage.label': {
    fr: 'Langue de la procédure',
    en: 'Procedure language',
    es: 'Idioma del procedimiento'
  },
  'metadata.field.procedureLanguage.hint': {
    fr: 'Sélectionnez la langue principale dans laquelle la procédure est rédigée.',
    en: 'Select the main language in which the procedure is written.',
    es: 'Selecciona el idioma principal en el que está redactado el procedimiento.'
  },
  'metadata.field.effectiveDate.label': {
    fr: "Date d'entrée en vigueur",
    en: 'Effective date',
    es: 'Fecha de entrada en vigor'
  },
  'metadata.field.effectiveDate.hint': {
    fr: 'Date à laquelle la procédure devient applicable.',
    en: 'Date when the procedure becomes applicable.',
    es: 'Fecha en la que el procedimiento entra en vigor.'
  },
  'metadata.field.summary.label': { fr: 'Résumé', en: 'Summary', es: 'Resumen' },
  'metadata.field.summary.placeholder': {
    fr: 'Résumé exécutif de la procédure',
    en: 'Executive summary of the procedure',
    es: 'Resumen ejecutivo del procedimiento'
  },
  'metadata.field.summary.hint': {
    fr: 'Présentez l’objectif et les points clés en quelques phrases.',
    en: 'Present the objective and key points in a few sentences.',
    es: 'Presenta el objetivo y los puntos clave en unas pocas frases.'
  },
  'metadata.field.parentProcedure.label': {
    fr: 'Procédure mère',
    en: 'Parent procedure',
    es: 'Procedimiento padre'
  },
  'metadata.field.parentProcedure.placeholder': {
    fr: 'Référence ou titre',
    en: 'Reference or title',
    es: 'Referencia o título'
  },
  'metadata.field.parentProcedure.hint': {
    fr: 'Mentionnez la procédure qui encadre ou complète celle-ci, si applicable.',
    en: 'Mention the procedure that frames or complements this one, if applicable.',
    es: 'Menciona el procedimiento que enmarca o complementa este, si procede.'
  },
  'metadata.field.changeHistory.label': {
    fr: 'Historique des modifications',
    en: 'Change history',
    es: 'Historial de cambios'
  },
  'metadata.field.changeHistory.placeholder': {
    fr: 'Consignez les évolutions majeures et leurs dates',
    en: 'Record major updates and their dates',
    es: 'Registra las principales evoluciones y sus fechas.'
  },
  'metadata.field.changeHistory.hint': {
    fr: 'Décrivez les principales modifications apportées et leur contexte.',
    en: 'Describe the main changes made and their context.',
    es: 'Describe los principales cambios realizados y su contexto.'
  },
  'metadata.field.businessScope.label': {
    fr: 'Périmètre métier',
    en: 'Business scope',
    es: 'Ámbito empresarial'
  },
  'metadata.field.businessScope.hint': {
    fr: 'Sélectionnez un ou plusieurs domaines métiers concernés.',
    en: 'Select one or more business domains involved.',
    es: 'Selecciona uno o varios ámbitos de negocio implicados.'
  },
  'metadata.field.companyScope.label': {
    fr: 'Périmètre société',
    en: 'Company scope',
    es: 'Ámbito de la empresa'
  },
  'metadata.field.companyScope.hint': {
    fr: 'Choisissez une ou plusieurs entités juridiques ou filiales de diffusion.',
    en: 'Choose one or more legal entities or subsidiaries where it applies.',
    es: 'Elige una o varias entidades jurídicas o filiales de difusión.'
  },
  'metadata.field.geoScope.label': {
    fr: 'Périmètre géographique',
    en: 'Geographical scope',
    es: 'Ámbito geográfico'
  },
  'metadata.field.geoScope.hint': {
    fr: 'Sélectionnez une ou plusieurs zones géographiques de validité.',
    en: 'Select one or more geographical areas where it is valid.',
    es: 'Selecciona una o varias zonas geográficas de validez.'
  },
  'metadata.field.keywords.label': { fr: 'Mots clefs', en: 'Keywords', es: 'Palabras clave' },
  'metadata.field.keywords.placeholder': {
    fr: 'Appuyez sur Entrée pour ajouter un mot clef',
    en: 'Press Enter to add a keyword',
    es: 'Pulsa Enter para añadir una palabra clave'
  },
  'metadata.field.keywords.hint': {
    fr: 'Utilisez la touche Entrée pour valider chaque mot clef.',
    en: 'Use the Enter key to validate each keyword.',
    es: 'Utiliza la tecla Enter para validar cada palabra clave.'
  }
};

const SELECT_OPTION_LABELS = {
  procedureLanguage: {
    English: { fr: 'Anglais', en: 'English', es: 'Inglés' },
    French: { fr: 'Français', en: 'French', es: 'Francés' },
    Spanish: { fr: 'Espagnol', en: 'Spanish', es: 'Español' }
  },
  businessScope: {
    'Médical': { fr: 'Médical', en: 'Medical', es: 'Médico' },
    'Commercial': { fr: 'Commercial', en: 'Commercial', es: 'Comercial' },
    'Neutre': { fr: 'Neutre', en: 'Neutral', es: 'Neutro' }
  },
  companyScope: {
    'LFB Bio Médicament': { fr: 'LFB Bio Médicament', en: 'LFB Bio Médicament', es: 'LFB Bio Médicament' },
    'LFB Biomanufacturing': { fr: 'LFB Biomanufacturing', en: 'LFB Biomanufacturing', es: 'LFB Biomanufacturing' }
  },
  geoScope: {
    'Monde': { fr: 'Monde', en: 'Worldwide', es: 'Mundo' },
    'France': { fr: 'France', en: 'France', es: 'Francia' },
    'Europe hors France': {
      fr: 'Europe hors France',
      en: 'Europe (excluding France)',
      es: 'Europa (sin Francia)'
    },
    'USA': { fr: 'USA', en: 'USA', es: 'EE. UU.' },
    'Mexique': { fr: 'Mexique', en: 'Mexico', es: 'México' }
  }
};

const KEYWORD_COLOR_PALETTE = [
  { background: 'rgba(47, 79, 159, 0.15)', color: '#2f4f9f', border: 'rgba(47, 79, 159, 0.35)' },
  { background: 'rgba(32, 137, 94, 0.15)', color: '#20895e', border: 'rgba(32, 137, 94, 0.35)' },
  { background: 'rgba(214, 69, 69, 0.15)', color: '#d64545', border: 'rgba(214, 69, 69, 0.35)' },
  { background: 'rgba(237, 180, 52, 0.18)', color: '#8a5a00', border: 'rgba(237, 180, 52, 0.4)' },
  { background: 'rgba(103, 64, 152, 0.15)', color: '#5d3a92', border: 'rgba(103, 64, 152, 0.35)' }
];

const METADATA_GROUP_TEMPLATES = [
  {
    key: 'identification',
    titleKey: 'metadata.group.identification.title',
    descriptionKey: 'metadata.group.identification.description',
    fields: [
      {
        key: 'title',
        type: 'text',
        labelKey: 'metadata.field.title.label',
        placeholderKey: 'metadata.field.title.placeholder',
        hintKey: 'metadata.field.title.hint'
      },
      {
        key: 'reference',
        type: 'text',
        labelKey: 'metadata.field.reference.label',
        placeholderKey: 'metadata.field.reference.placeholder',
        hintKey: 'metadata.field.reference.hint'
      },
      {
        key: 'author',
        type: 'text',
        labelKey: 'metadata.field.author.label',
        placeholderKey: 'metadata.field.author.placeholder',
        hintKey: 'metadata.field.author.hint'
      },
      {
        key: 'procedureLanguage',
        type: 'select',
        optionsKey: 'procedureLanguage',
        defaultOptions: ['English', 'French', 'Spanish'],
        labelKey: 'metadata.field.procedureLanguage.label',
        hintKey: 'metadata.field.procedureLanguage.hint'
      },
      {
        key: 'effectiveDate',
        type: 'date',
        labelKey: 'metadata.field.effectiveDate.label',
        hintKey: 'metadata.field.effectiveDate.hint'
      }
    ]
  },
  {
    key: 'contexte',
    titleKey: 'metadata.group.contexte.title',
    descriptionKey: 'metadata.group.contexte.description',
    fields: [
      {
        key: 'summary',
        type: 'textarea',
        labelKey: 'metadata.field.summary.label',
        placeholderKey: 'metadata.field.summary.placeholder',
        hintKey: 'metadata.field.summary.hint'
      },
      {
        key: 'parentProcedure',
        type: 'text',
        labelKey: 'metadata.field.parentProcedure.label',
        placeholderKey: 'metadata.field.parentProcedure.placeholder',
        hintKey: 'metadata.field.parentProcedure.hint'
      },
      {
        key: 'changeHistory',
        type: 'textarea',
        labelKey: 'metadata.field.changeHistory.label',
        placeholderKey: 'metadata.field.changeHistory.placeholder',
        hintKey: 'metadata.field.changeHistory.hint'
      }
    ]
  },
  {
    key: 'diffusion',
    titleKey: 'metadata.group.diffusion.title',
    descriptionKey: 'metadata.group.diffusion.description',
    fields: [
      {
        key: 'businessScope',
        type: 'select',
        multiple: true,
        optionsKey: 'businessScope',
        defaultOptions: ['Médical', 'Commercial', 'Neutre'],
        labelKey: 'metadata.field.businessScope.label',
        hintKey: 'metadata.field.businessScope.hint'
      },
      {
        key: 'companyScope',
        type: 'select',
        multiple: true,
        optionsKey: 'companyScope',
        defaultOptions: ['LFB Bio Médicament', 'LFB Biomanufacturing'],
        labelKey: 'metadata.field.companyScope.label',
        hintKey: 'metadata.field.companyScope.hint'
      },
      {
        key: 'geoScope',
        type: 'select',
        multiple: true,
        optionsKey: 'geoScope',
        defaultOptions: ['Monde', 'France', 'Europe hors France', 'USA', 'Mexique'],
        labelKey: 'metadata.field.geoScope.label',
        hintKey: 'metadata.field.geoScope.hint'
      },
      {
        key: 'keywords',
        type: 'text',
        labelKey: 'metadata.field.keywords.label',
        placeholderKey: 'metadata.field.keywords.placeholder',
        hintKey: 'metadata.field.keywords.hint'
      }
    ]
  }
];

const METADATA_FIELD_SCHEMAS = METADATA_GROUP_TEMPLATES.flatMap((group) => group.fields);
const MULTI_SELECT_FIELD_SCHEMAS = METADATA_FIELD_SCHEMAS.filter(
  (field) => field.type === 'select' && field.multiple
);
const MULTI_SELECT_METADATA_KEYS = MULTI_SELECT_FIELD_SCHEMAS.map((field) => field.key);

const SELECT_FIELD_SCHEMAS = METADATA_FIELD_SCHEMAS.filter((field) => field.type === 'select');
const SELECT_FIELD_KEYS = Array.from(new Set(SELECT_FIELD_SCHEMAS.map((field) => field.optionsKey || field.key)));
const DEFAULT_SELECT_OPTIONS = SELECT_FIELD_SCHEMAS.reduce((acc, field) => {
  const key = field.optionsKey || field.key;
  acc[key] = field.defaultOptions ? [...field.defaultOptions] : [];
  return acc;
}, {});
const SELECT_OPTION_STORAGE_KEY = 'procedureBuilderSelectOptions';
const APP_VERSION = '1.2.23';

function createInitialMetadata() {
  return METADATA_FIELD_SCHEMAS.reduce((acc, field) => {
    if (field.type === 'select' && field.multiple) {
      acc[field.key] = [];
    } else {
      acc[field.key] = '';
    }
    return acc;
  }, {});
}

let currentLanguage = DEFAULT_LANGUAGE;

function getTranslationValue(key, language = currentLanguage) {
  const entry = TEXT[key];
  if (!entry) {
    if (language !== DEFAULT_LANGUAGE) {
      return getTranslationValue(key, DEFAULT_LANGUAGE);
    }
    return undefined;
  }
  const value = entry[language];
  if (value !== undefined) {
    return value;
  }
  if (language !== DEFAULT_LANGUAGE) {
    return entry[DEFAULT_LANGUAGE];
  }
  return undefined;
}

function formatTranslation(value, params = {}) {
  if (typeof value !== 'string') {
    return value;
  }
  return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      return params[key];
    }
    return '';
  });
}

function translate(key, params = {}, fallback = '', language = currentLanguage) {
  const value = getTranslationValue(key, language);
  if (value === undefined) {
    return fallback !== undefined ? fallback : key;
  }
  if (typeof value === 'string') {
    return formatTranslation(value, params);
  }
  return value;
}

function translateArray(key, language = currentLanguage) {
  const value = getTranslationValue(key, language);
  if (Array.isArray(value)) {
    return value;
  }
  if (value !== undefined) {
    return [value];
  }
  return [];
}

function getSelectOptionLabel(optionsKey, optionValue, language = currentLanguage) {
  const options = SELECT_OPTION_LABELS[optionsKey];
  if (!options || !options[optionValue]) {
    return optionValue;
  }
  return options[optionValue][language] || options[optionValue][DEFAULT_LANGUAGE] || optionValue;
}

function loadInitialLanguage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_LANGUAGE;
  }
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.some((entry) => entry.code === stored)) {
      return stored;
    }
  } catch (error) {
    console.warn("Impossible de charger la langue enregistrée :", error);
  }
  return DEFAULT_LANGUAGE;
}

function saveLanguagePreference(language) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn("Impossible de sauvegarder la langue :", error);
  }
}

const initialLanguage = loadInitialLanguage();
currentLanguage = initialLanguage;

function normalizeSelectOptions(options, baseOptions = DEFAULT_SELECT_OPTIONS) {
  const normalized = {};
  SELECT_FIELD_KEYS.forEach((key) => {
    const baseValues = baseOptions && Array.isArray(baseOptions[key]) ? baseOptions[key] : DEFAULT_SELECT_OPTIONS[key] || [];
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

function resolveMetadataGroups(language = currentLanguage) {
  return METADATA_GROUP_TEMPLATES.map((group) => ({
    key: group.key,
    title: translate(group.titleKey, {}, group.titleKey, language),
    description: group.descriptionKey ? translate(group.descriptionKey, {}, '', language) : '',
    fields: group.fields.map((field) => ({
      ...field,
      label: translate(field.labelKey, {}, field.labelKey, language),
      placeholder: field.placeholderKey ? translate(field.placeholderKey, {}, '', language) : '',
      hint: field.hintKey ? translate(field.hintKey, {}, '', language) : ''
    }))
  }));
}

function createResolvedMetadataGroups(selectOptions, baseOptions = DEFAULT_SELECT_OPTIONS, language = currentLanguage) {
  const normalizedOptions = normalizeSelectOptions(selectOptions, baseOptions);
  const groups = resolveMetadataGroups(language);
  return groups.map((group) => ({
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

const LFB_LOGO_URL = './assets/images/lfb-ethical-commitment-quadri.jpg';

async function readImageDimensionsFromBlob(blob) {
  return new Promise((resolve, reject) => {
    if (!blob) {
      resolve({ width: 0, height: 0 });
      return;
    }
    const objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const width = image.naturalWidth || image.width || 0;
      const height = image.naturalHeight || image.height || 0;
      URL.revokeObjectURL(objectUrl);
      resolve({ width, height });
    };
    image.onerror = (event) => {
      URL.revokeObjectURL(objectUrl);
      reject(event?.error || new Error('Impossible de charger les dimensions du logo.'));
    };
    image.src = objectUrl;
  });
}

function decodeBase64ToUint8Array(base64) {
  if (typeof base64 !== 'string') {
    return null;
  }
  const normalized = base64.replace(/\s/g, '');
  if (!normalized) {
    return null;
  }
  let binaryString;
  try {
    binaryString = window.atob(normalized);
  } catch (error) {
    console.warn('Impossible de décoder le logo LFB encodé en base64 :', error);
    return null;
  }
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let index = 0; index < length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index);
  }
  return bytes;
}

async function createLogoImageFromBase64(base64, key = 'lfb-logo') {
  const bytes = decodeBase64ToUint8Array(base64);
  if (!bytes) {
    return null;
  }
  const blob = new Blob([bytes], { type: 'image/jpeg' });
  const { width, height } = await readImageDimensionsFromBlob(blob);
  return {
    key,
    bytes,
    width,
    height,
    format: 'image/jpeg',
  };
}

async function loadLogoImage(url, key = 'lfb-logo') {
  if (!url) {
    return null;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Impossible de récupérer le logo (${response.status})`);
  }
  const blob = await response.blob();
  const { width, height } = await readImageDimensionsFromBlob(blob);
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const format = (blob.type || 'image/jpeg').toLowerCase();
  return {
    key,
    bytes,
    width,
    height,
    format,
  };
}

async function loadLogoImageSafely(url, key) {
  try {
    return await loadLogoImage(url, key);
  } catch (error) {
    console.warn('Impossible de charger le logo LFB pour le PDF :', error);
    try {
      return await createLogoImageFromBase64(LFB_LOGO_BASE64, key);
    } catch (fallbackError) {
      console.warn('Impossible de charger le logo LFB intégré au fallback :', fallbackError);
      return null;
    }
  }
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

const PRONOUNS_BY_LANGUAGE = {
  fr: ['il', 'elle', 'ils', 'elles', 'on'],
  en: ['he', 'she', 'they', 'one'],
  es: ['él', 'ella', 'ellos', 'ellas', 'uno']
};

function getPronounsForLanguage(language) {
  const fallback = PRONOUNS_BY_LANGUAGE[DEFAULT_LANGUAGE] || [];
  return PRONOUNS_BY_LANGUAGE[language] || fallback;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeDefinitionTerm(value) {
  if (typeof value !== 'string') {
    return '';
  }
  const normalized = typeof value.normalize === 'function' ? value.normalize('NFKC') : value;
  return normalized
    .replace(/[\s\u00A0]+/g, ' ')
    .replace(/^[\s:;,.()\[\]{}«»"'“”‘’]+|[\s:;,.()\[\]{}«»"'“”‘’]+$/gu, '')
    .trim()
    .toLowerCase();
}

function extractDefinitionContext(doc, language = currentLanguage) {
  const title = (DEFINITION_TITLES[language] || DEFINITION_TITLES[DEFAULT_LANGUAGE] || '').trim();
  if (!title) {
    return { nodes: [], terms: new Set() };
  }

  const titleLower = title.toLowerCase();
  const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const targetHeading = headings.find((heading) => heading.textContent.trim().toLowerCase() === titleLower);
  if (!targetHeading) {
    return { nodes: [], terms: new Set() };
  }

  const nodes = [];
  let sibling = targetHeading.nextElementSibling;
  while (sibling && !/^H[1-6]$/i.test(sibling.tagName)) {
    nodes.push(sibling);
    sibling = sibling.nextElementSibling;
  }

  const terms = new Set();
  const registerTerm = (value) => {
    const normalized = normalizeDefinitionTerm(value);
    if (normalized) {
      terms.add(normalized);
    }
  };

  nodes.forEach((node) => {
    node.querySelectorAll('strong, b').forEach((element) => registerTerm(element.textContent));
    node.querySelectorAll('dt').forEach((element) => registerTerm(element.textContent));

    const candidates = [];
    if (node.matches && node.matches('p, li')) {
      candidates.push(node);
    }
    node.querySelectorAll('p, li').forEach((element) => candidates.push(element));
    candidates.forEach((element) => {
      const text = element.textContent || '';
      const colonIndex = text.indexOf(':');
      if (colonIndex > -1) {
        registerTerm(text.slice(0, colonIndex));
      }
    });
  });

  return { nodes, terms };
}

function formatSelection(command, value = null) {
  document.execCommand(command, false, value);
}

function sanitizeHTML(html) {
  return html.replace(/\s+style="[^"]*"/g, '');
}

const DEFINITION_TITLES = {
  fr: 'Définition',
  en: 'Definition',
  es: 'Definición'
};

const PROCEDURE_TEMPLATES = {
  fr: `
<h2>Définition</h2>
<p>Recensez les termes clés et précisez leur signification.</p>

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
`,
  en: `
<h2>Definition</h2>
<p>List the key terms and describe their meaning.</p>

<h2>Objective</h2>
<p>State the purpose of the procedure and the expected outcome.</p>

<h2>Scope</h2>
<p>Describe the coverage: departments, teams, and situations involved.</p>

<h2>Prerequisites</h2>
<ul>
  <li>List the necessary conditions (documents, access, equipment, skills).</li>
  <li>Add any essential preliminary information.</li>
</ul>

<h2>Roles and responsibilities</h2>
<ul>
  <li><strong>Primary actor:</strong> Describe their key role.</li>
  <li><strong>Contributors:</strong> Mention supporting roles and their actions.</li>
  <li><strong>Point of contact:</strong> Indicate who to reach out to with questions.</li>
</ul>

<h2>Detailed steps</h2>
<ol>
  <li><strong>Step 1:</strong> Describe the first action precisely.</li>
  <li><strong>Step 2:</strong> Explain the next step, including control points.</li>
  <li><strong>Step 3:</strong> Complete with the remaining actions up to closure.</li>
</ol>

<h2>Control points &amp; indicators</h2>
<p>Specify the checks to perform and how to assess compliance.</p>

<h2>Deviation management</h2>
<p>Explain what to do in case of non-compliance or unexpected situations.</p>

<h2>Appendices &amp; related documents</h2>
<p>Reference forms, templates, or additional resources.</p>
`,
  es: `
<h2>Definición</h2>
<p>Enumera los términos clave y detalla su significado.</p>

<h2>Objetivo</h2>
<p>Indica la finalidad del procedimiento y el resultado esperado.</p>

<h2>Alcance</h2>
<p>Describe el perímetro cubierto: áreas, equipos y situaciones implicadas.</p>

<h2>Requisitos previos</h2>
<ul>
  <li>Enumera las condiciones necesarias (documentos, accesos, materiales, competencias).</li>
  <li>Añade cualquier información previa indispensable.</li>
</ul>

<h2>Roles y responsabilidades</h2>
<ul>
  <li><strong>Actor principal:</strong> Describe su rol clave.</li>
  <li><strong>Colaboradores:</strong> Menciona los apoyos y sus acciones.</li>
  <li><strong>Persona de contacto:</strong> Indica a quién recurrir en caso de dudas.</li>
</ul>

<h2>Pasos detallados</h2>
<ol>
  <li><strong>Paso 1:</strong> Describe con precisión la primera acción a realizar.</li>
  <li><strong>Paso 2:</strong> Explica el siguiente paso indicando los puntos de control.</li>
  <li><strong>Paso 3:</strong> Completa con las acciones restantes hasta finalizar.</li>
</ol>

<h2>Puntos de control e indicadores</h2>
<p>Detalla las verificaciones a realizar y cómo evaluar la conformidad.</p>

<h2>Gestión de desviaciones</h2>
<p>Describe el procedimiento en caso de no conformidad o situaciones imprevistas.</p>

<h2>Anexos y documentos asociados</h2>
<p>Referencia formularios, plantillas o recursos complementarios.</p>
`
};

function sanitizeTemplateContent(value) {
  if (typeof value !== 'string') {
    return '';
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return '';
  }
  return sanitizeHTML(trimmed);
}

function normalizeTemplateConfiguration(templates, fallbackTemplates = PROCEDURE_TEMPLATES) {
  const normalized = {};
  const fallback = fallbackTemplates && typeof fallbackTemplates === 'object' ? fallbackTemplates : {};
  SUPPORTED_LANGUAGES.forEach(({ code }) => {
    const defaultTemplate = sanitizeTemplateContent(fallback[code] || PROCEDURE_TEMPLATES[code] || '');
    const sanitized = sanitizeTemplateContent(templates && templates[code]);
    normalized[code] = sanitized || defaultTemplate || '';
  });
  return normalized;
}

let procedureTemplateDefaults = normalizeTemplateConfiguration(PROCEDURE_TEMPLATES);

const PROCEDURE_TEMPLATE_STORAGE_KEY = 'procedureBuilderTemplates';

function loadCustomTemplates() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(PROCEDURE_TEMPLATE_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return {};
    }
    return Object.entries(parsed).reduce((acc, [language, value]) => {
      const sanitized = sanitizeTemplateContent(value);
      if (sanitized) {
        acc[language] = sanitized;
      }
      return acc;
    }, {});
  } catch (error) {
    console.warn('Impossible de charger les modèles personnalisés :', error);
    return {};
  }
}

function persistCustomTemplates(templates) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    const sanitized = Object.entries(templates).reduce((acc, [language, value]) => {
      const normalized = sanitizeTemplateContent(value);
      if (normalized) {
        acc[language] = normalized;
      }
      return acc;
    }, {});
    window.localStorage.setItem(PROCEDURE_TEMPLATE_STORAGE_KEY, JSON.stringify(sanitized));
  } catch (error) {
    console.warn('Impossible de sauvegarder les modèles personnalisés :', error);
  }
}

let customProcedureTemplates = loadCustomTemplates();

function getInitialContentHTML(language = currentLanguage) {
  const override = customProcedureTemplates[language];
  const baseTemplate = procedureTemplateDefaults[language]
    || procedureTemplateDefaults[DEFAULT_LANGUAGE]
    || '';
  const sanitizedOverride = sanitizeTemplateContent(override);
  return sanitizedOverride || baseTemplate || '';
}

function createInitialTemplateDrafts() {
  const drafts = {};
  SUPPORTED_LANGUAGES.forEach(({ code }) => {
    drafts[code] = getInitialContentHTML(code);
  });
  return drafts;
}

function normalizeForComparison(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value
    .replace(/[\s\u00A0]+/g, ' ')
    .trim()
    .toLowerCase();
}

function stripMarkdownFormatting(line) {
  if (typeof line !== 'string') {
    return '';
  }
  return line
    .replace(/`[^`]*`/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1')
    .replace(/^>+\s*/, '')
    .replace(/^#{1,6}\s+/, '')
    .replace(/^[-*+]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\\([*_`])/g, '$1')
    .replace(/[\s\u00A0]+/g, ' ')
    .trim();
}

function detectMarkdownLineType(line) {
  if (typeof line !== 'string') {
    return 'text';
  }
  if (/^#{1,6}\s+/.test(line)) {
    return 'heading';
  }
  if (/^[-*+]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
    return 'list';
  }
  if (/^>+\s*/.test(line)) {
    return 'blockquote';
  }
  return 'text';
}

function buildLineLookup(entries) {
  const lookup = new Map();
  entries.forEach((entry) => {
    if (!entry || typeof entry.normalized !== 'string' || !entry.normalized) {
      return;
    }
    const values = lookup.get(entry.normalized) || [];
    values.push(entry.lineNumber);
    lookup.set(entry.normalized, values);
  });
  return lookup;
}

function takeLineFromLookup(lookup, value) {
  if (!lookup || typeof value !== 'string') {
    return null;
  }
  const normalized = normalizeForComparison(value);
  if (!normalized || !lookup.has(normalized)) {
    return null;
  }
  const values = lookup.get(normalized);
  if (!values || values.length === 0) {
    return null;
  }
  const lineNumber = values.shift();
  if (values.length === 0) {
    lookup.delete(normalized);
  } else {
    lookup.set(normalized, values);
  }
  return typeof lineNumber === 'number' ? lineNumber : null;
}

function buildMarkdownLineData(html, language = currentLanguage) {
  const markdown = htmlToMarkdown(html || '', language);
  if (typeof markdown !== 'string' || markdown.trim().length === 0) {
    return {
      entries: [],
      headingLookup: new Map(),
      listLookup: new Map(),
      textLookup: new Map()
    };
  }
  const lines = markdown.split('\n');
  const entries = lines.map((line, index) => {
    const plainText = stripMarkdownFormatting(line);
    return {
      lineNumber: index + 1,
      raw: line,
      plainText,
      normalized: normalizeForComparison(plainText),
      type: detectMarkdownLineType(line)
    };
  });
  return {
    entries,
    headingLookup: buildLineLookup(entries.filter((entry) => entry.type === 'heading')),
    listLookup: buildLineLookup(entries.filter((entry) => entry.type === 'list')),
    textLookup: buildLineLookup(entries.filter((entry) => entry.normalized))
  };
}

function computeGuidelines(html, acronymDB = {}, language = currentLanguage) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const guidelines = [];

  const { entries: markdownEntries, headingLookup, listLookup, textLookup } = buildMarkdownLineData(html, language);

  const { nodes: definitionNodes, terms: definitionTerms } = extractDefinitionContext(doc, language);
  const headingMessage = translate('guidelines.headingMessage', {}, '', language);
  const bulletLabel = translate('guidelines.bulletListLabel', {}, 'List', language);
  const numberedLabel = translate('guidelines.numberedListLabel', {}, 'List', language);
  const listTransitionMessage = translate('guidelines.listTransitionMessage', {}, '', language);
  const listIntroMessage = translate('guidelines.listIntroMessage', {}, '', language);
  const pronounMessage = translate('guidelines.pronounMessage', {}, '', language);
  const acronymMessage = translate('guidelines.acronymMessage', {}, '', language);
  const headingFallback = translate('guidelines.headingFallback', {}, '(untitled)', language);
  const definitionMessage = translate('guidelines.definitionCheck', {}, '', language);

  let guidelineOrder = 0;
  const addGuideline = (payload) => {
    guidelines.push({ ...payload, order: guidelineOrder++ });
  };

  doc.querySelectorAll('h1, h2, h3, h4').forEach((heading) => {
    const text = heading.textContent.trim() || headingFallback;
    const lineNumber = takeLineFromLookup(headingLookup, text) ?? takeLineFromLookup(textLookup, text);
    addGuideline({
      type: 'heading',
      anchor: text,
      message: headingMessage,
      line: lineNumber
    });
  });

  doc.querySelectorAll('ul, ol').forEach((list) => {
    const label = list.tagName === 'UL' ? bulletLabel : numberedLabel;
    let listLineNumber = null;
    const firstItem = list.querySelector('li');
    if (firstItem) {
      const firstText = (firstItem.textContent || '').replace(/[\s\u00A0]+/g, ' ').trim();
      if (firstText) {
        listLineNumber =
          takeLineFromLookup(listLookup, firstText) ?? takeLineFromLookup(textLookup, firstText) ?? null;
      }
    }

    addGuideline({
      type: 'list-transition',
      anchor: label,
      message: listTransitionMessage,
      line: listLineNumber
    });
    const previous = list.previousElementSibling;
    const hasIntro = previous && previous.textContent.trim().length > 0 && previous.textContent.trim().endsWith(':');
    if (!hasIntro) {
      addGuideline({
        type: 'list-intro',
        anchor: label,
        message: listIntroMessage,
        line: listLineNumber
      });
    }
  });

  const pronouns = getPronounsForLanguage(language);
  const pronounPattern =
    pronouns.length > 0 ? `\\b(?:${pronouns.map(escapeRegExp).join('|')})\\b` : null;
  markdownEntries.forEach(({ lineNumber, plainText }) => {
    if (!plainText || !pronounPattern) {
      return;
    }
    const pronounRegex = new RegExp(pronounPattern, 'gi');
    const pronounSeen = new Set();
    let pronounMatch;
    while ((pronounMatch = pronounRegex.exec(plainText)) !== null) {
      const value = pronounMatch[0];
      const normalized = normalizeForComparison(value);
      if (pronounSeen.has(normalized)) {
        continue;
      }
      pronounSeen.add(normalized);
      addGuideline({
        type: 'pronoun',
        anchor: value,
        message: pronounMessage,
        line: lineNumber
      });
    }

    const acronymRegex = /\b[A-Z]{2,}\b/g;
    const acronymSeen = new Set();
    let acronymMatch;
    while ((acronymMatch = acronymRegex.exec(plainText)) !== null) {
      const acronym = acronymMatch[0];
      const normalizedAcronym = acronym.toUpperCase();
      if (acronymSeen.has(normalizedAcronym)) {
        continue;
      }
      acronymSeen.add(normalizedAcronym);
      if (!acronymDB[normalizedAcronym]) {
        addGuideline({
          type: 'acronym',
          anchor: acronym,
          message: acronymMessage,
          line: lineNumber
        });
      }
    }
  });

  if (definitionMessage) {
    const italicSeen = new Set();
    const italicElements = Array.from(doc.querySelectorAll('em, i'));
    italicElements.forEach((element) => {
      const text = element.textContent || '';
      const normalized = normalizeDefinitionTerm(text);
      if (definitionNodes.some((node) => node.contains(element))) {
        return;
      }

      if (definitionTerms.has(normalized)) {
        return;
      }

      const trimmed = text.replace(/[\s\u00A0]+/g, ' ').trim();
      const anchor = trimmed || translate('guidelines.anchorFallback', {}, 'Texte', language);
      const lineNumber = trimmed ? takeLineFromLookup(textLookup, trimmed) : null;
      const dedupKey = lineNumber !== null ? `${normalized}::${lineNumber}` : normalized;
      if (!normalized || italicSeen.has(dedupKey)) {
        return;
      }
      italicSeen.add(dedupKey);

      addGuideline({
        type: 'definition-check',
        anchor,
        message: definitionMessage,
        line: lineNumber
      });
    });
  }

  return guidelines
    .sort((a, b) => {
      const lineA = typeof a.line === 'number' ? a.line : Number.POSITIVE_INFINITY;
      const lineB = typeof b.line === 'number' ? b.line : Number.POSITIVE_INFINITY;
      if (lineA !== lineB) {
        return lineA - lineB;
      }
      return a.order - b.order;
    })
    .map(({ order, ...rest }) => rest);
}

function detectBlockingIssues(html, qaItems) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const textContent = doc.body.textContent || '';
  const qaText = qaItems.map((item) => `${item.question} ${item.answer}`).join(' ');

  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}]/u;
  const warnings = [];

  if (emojiRegex.test(textContent) || emojiRegex.test(qaText)) {
    warnings.push(translate('blocking.emoji'));
  }

  if (doc.querySelector('img')) {
    warnings.push(translate('blocking.images'));
  }

  if (doc.querySelector('a[href]')) {
    warnings.push(translate('blocking.links'));
  }

  if (doc.querySelector('table')) {
    warnings.push(translate('blocking.tables'));
  }

  const rawText = sanitizeHTML(html).replace(/<[^>]+>/g, '\n');
  const hasUnformattedList = /^\s*[-*]\s+.+/m.test(rawText);
  if (hasUnformattedList) {
    warnings.push(translate('blocking.lists'));
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

function convertList(node, ordered = false, language = (state && state.language) || currentLanguage) {
  const items = [];
  let index = 1;
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toUpperCase() === 'LI') {
      const inlineParts = [];
      const nestedBlocks = [];
      child.childNodes.forEach((liChild) => {
        if (liChild.nodeType === Node.ELEMENT_NODE && (liChild.tagName.toUpperCase() === 'UL' || liChild.tagName.toUpperCase() === 'OL')) {
          nestedBlocks.push(convertList(liChild, liChild.tagName.toUpperCase() === 'OL', language));
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

function convertBlock(node, language = (state && state.language) || currentLanguage) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    return text;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }
  const tag = node.tagName.toUpperCase();
  if (node.classList && node.classList.contains('rational-block')) {
    const fallbackTitle = translate('rational.title', {}, 'Rationnel', language);
    const title = (node.querySelector('.rational-block-title') || { textContent: fallbackTitle }).textContent.trim() || fallbackTitle;
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
      return convertList(node, false, language);
    case 'OL':
      return convertList(node, true, language);
    case 'BLOCKQUOTE':
      return node.textContent
        .split(/\r?\n/)
        .map((line) => `> ${line.trim()}`)
        .join('\n');
    case 'HR':
      return '---';
    default:
      return Array.from(node.childNodes)
        .map((child) => convertBlock(child, language))
        .filter(Boolean)
        .join('\n');
  }
}

function htmlToMarkdown(html, language = (state && state.language) || currentLanguage) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const blocks = [];
  container.childNodes.forEach((node) => {
    const block = convertBlock(node, language);
    if (block && block.trim().length > 0) {
      blocks.push(block.trim());
    }
  });
  return blocks.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

function buildMarkdown(metadata, contentHTML, qaItems) {
  const activeLanguage = (state && state.language) || currentLanguage;
  const contentMarkdown = htmlToMarkdown(contentHTML || '', activeLanguage);
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
function parseMarkdownProcedure(markdown, language) {
  const activeLanguage = language || (state && state.language) || currentLanguage;
  const defaultContent = getInitialContentHTML(activeLanguage);
  const normalizedMetadata = createInitialMetadata();
  if (typeof markdown !== 'string') {
    return {
      metadata: normalizedMetadata,
      contentHTML: defaultContent,
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

function normalizeGlossaryEntries(source) {
  if (!source) {
    return {};
  }

  const normalized = {};

  const registerEntry = (term, definition) => {
    if (typeof term !== 'string' || typeof definition !== 'string') {
      return;
    }
    const normalizedTerm = term.trim().toUpperCase();
    if (!normalizedTerm) {
      return;
    }
    const normalizedDefinition = definition.replace(/\s+/g, ' ').trim();
    if (!normalizedDefinition) {
      return;
    }
    normalized[normalizedTerm] = normalizedDefinition;
  };

  if (Array.isArray(source)) {
    source.forEach((entry) => {
      if (entry && typeof entry === 'object') {
        registerEntry(entry.term, entry.definition);
      }
    });
    return normalized;
  }

  if (typeof source === 'object') {
    if (Array.isArray(source.acronyms)) {
      return normalizeGlossaryEntries(source.acronyms);
    }
    Object.entries(source).forEach(([term, definition]) => {
      registerEntry(term, definition);
    });
  }

  return normalized;
}

async function loadFieldConfigurationFromFile() {
  const fallback = {
    selectOptions: DEFAULT_SELECT_OPTIONS,
    templates: PROCEDURE_TEMPLATES,
    acronyms: {},
  };
  try {
    const response = await fetch('./field-config.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data || typeof data !== 'object') {
      return fallback;
    }

    const hasSelectOptions = data.selectOptions && typeof data.selectOptions === 'object' && !Array.isArray(data.selectOptions);
    const selectOptions = hasSelectOptions ? data.selectOptions : data;
    const templates = data.templates && typeof data.templates === 'object' ? data.templates : {};
    const acronymsSource = data.acronyms || data.glossary || null;
    const acronyms = normalizeGlossaryEntries(acronymsSource);

    return { selectOptions, templates, acronyms };
  } catch (error) {
    console.warn('Impossible de charger la configuration des champs :', error);
    return fallback;
  }
}

async function loadGlossaryData(fallbackAcronyms = null) {
  const fallbackNormalized = normalizeGlossaryEntries(fallbackAcronyms);
  try {
    const response = await fetch('./glossary.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const normalized = normalizeGlossaryEntries(data);
    if (Object.keys(normalized).length === 0) {
      return fallbackNormalized;
    }
    return normalized;
  } catch (error) {
    console.error('Erreur lors du chargement de la liste des acronymes :', error);
    if (Object.keys(fallbackNormalized).length > 0) {
      return fallbackNormalized;
    }
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
const initialQAItems = createInitialQAItems();
const initialContentHTML = getInitialContentHTML(initialLanguage);
const initialTemplateDrafts = createInitialTemplateDrafts();

const state = {
  language: initialLanguage,
  metadata: createInitialMetadata(),
  contentHTML: initialContentHTML,
  initialContentHTML,
  qaItems: initialQAItems,
  guidelines: computeGuidelines(initialContentHTML, {}, initialLanguage),
  blockingWarnings: detectBlockingIssues(initialContentHTML, initialQAItems),
  hasStarted: false,
  selectOptions: normalizeSelectOptions(DEFAULT_SELECT_OPTIONS),
  selectOptionDrafts: createEmptyOptionDrafts(),
  configDefaults: DEFAULT_SELECT_OPTIONS,
  templateDrafts: initialTemplateDrafts,
  templateEditorLanguage: initialLanguage,
  glossary: {},
  glossaryError: null,
  isGlossaryLoading: true,
  isGlossaryOpen: false,
  glossaryForm: { term: '', definition: '' },
  glossaryFormErrorKey: null,
  glossaryFormErrorParams: null,
  keywordInput: '',
  isBackofficeOpen: false,
  isPreviewOpen: false,
  previewMarkdown: '',
  isExportingPDF: false,
  activeGuidelineId: null,
  hiddenGuidelineIds: new Set(),
  showHiddenGuidelines: false,
  logoImageData: null
};

const elements = {
  startInfo: document.getElementById('start-info'),
  startInfoTitle: document.getElementById('start-info-title'),
  startInfoDescription: document.getElementById('start-info-description'),
  startInfoList: document.getElementById('start-info-list'),
  metadataGroups: document.getElementById('metadata-groups'),
  editor: document.getElementById('procedure-editor'),
  editorPane: document.querySelector('.editor-pane'),
  editorMarkerLayer: document.getElementById('editor-guideline-layer'),
  toolbar: document.getElementById('editor-toolbar'),
  procedureTitleDisplay: document.getElementById('procedure-title-display'),
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
  backofficeDescription: document.querySelector('.backoffice-description'),
  backofficeTitle: document.getElementById('backoffice-title'),
  closeBackofficeButton: document.getElementById('close-backoffice-btn'),
  backofficeButton: document.getElementById('backoffice-btn'),
  glossaryButton: document.getElementById('glossary-btn'),
  newProcedureButton: document.getElementById('new-procedure-btn'),
  importButton: document.getElementById('import-btn'),
  importInput: document.getElementById('import-input'),
  guidelinesList: document.getElementById('guidelines-list'),
  guidelinesEmpty: document.getElementById('guidelines-empty'),
  guidelinesHiddenToggle: document.getElementById('guidelines-hidden-toggle'),
  glossaryOverlay: document.getElementById('glossary-overlay'),
  glossaryList: document.getElementById('glossary-list'),
  glossaryLoading: document.getElementById('glossary-loading'),
  glossaryError: document.getElementById('glossary-error'),
  glossaryDescription: document.getElementById('glossary-description'),
  downloadGlossaryJsonButton: document.getElementById('download-glossary-json-btn'),
  glossaryFormContainer: document.getElementById('glossary-form-container'),
  glossaryForm: document.getElementById('glossary-form'),
  glossaryFormTitle: document.getElementById('glossary-form-title'),
  glossaryTermLabel: document.getElementById('glossary-term-label'),
  glossaryDefinitionLabel: document.getElementById('glossary-definition-label'),
  glossaryTermInput: document.getElementById('glossary-term'),
  glossaryDefinitionInput: document.getElementById('glossary-definition'),
  addGlossaryEntryButton: document.getElementById('add-glossary-entry-btn'),
  glossaryFormError: document.getElementById('glossary-form-error'),
  closeGlossaryButton: document.getElementById('close-glossary-btn'),
  exportConfigButton: document.getElementById('export-config-btn'),
  languageSelect: document.getElementById('language-select'),
  headerTitle: document.getElementById('header-title'),
  metadataCardTitle: document.getElementById('metadata-card-title'),
  editorCardTitle: document.getElementById('editor-card-title'),
  qaCardTitle: document.getElementById('qa-card-title'),
  qaCardDescription: document.getElementById('qa-card-description'),
  exportCardTitle: document.getElementById('export-card-title'),
  blockingWarningText: document.getElementById('blocking-warning-text'),
  guidelinesTitle: document.getElementById('guidelines-title'),
  glossaryTitle: document.getElementById('glossary-title'),
  previewTitle: document.getElementById('preview-title'),
  appVersion: document.getElementById('app-version')
};

let draggingQAIndex = null;

function focusQAHandleAfterRender(index) {
  const focusTask = () => {
    if (!elements.qaList) {
      return;
    }
    const selector = `.qa-item[data-index="${index}"] .qa-drag-handle`;
    const handle = elements.qaList.querySelector(selector);
    if (handle && typeof handle.focus === 'function') {
      handle.focus();
    }
  };
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(focusTask);
  } else {
    setTimeout(focusTask, 0);
  }
}

function reorderQAItems(fromIndex, toIndex, { focusIndex = toIndex } = {}) {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= state.qaItems.length ||
    toIndex >= state.qaItems.length
  ) {
    return;
  }
  const updated = [...state.qaItems];
  const [moved] = updated.splice(fromIndex, 1);
  updated.splice(toIndex, 0, moved);
  state.qaItems = updated;
  state.hasStarted = true;
  updateGuidelinesAndWarnings();
  renderAll();
  if (typeof focusIndex === 'number') {
    focusQAHandleAfterRender(focusIndex);
  }
}

function handleQADragStart(event) {
  const currentTarget = event.currentTarget;
  if (!(currentTarget instanceof HTMLElement)) {
    return;
  }
  const qaItem = currentTarget.classList.contains('qa-item')
    ? currentTarget
    : currentTarget.closest('.qa-item');
  if (!(qaItem instanceof HTMLElement)) {
    return;
  }
  const index = Number.parseInt(qaItem.dataset.index || '', 10);
  if (Number.isNaN(index)) {
    return;
  }
  draggingQAIndex = index;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    try {
      event.dataTransfer.setData('text/plain', String(index));
    } catch (error) {
      console.warn('Impossible de définir les données de glisser-déposer :', error);
    }
    if (typeof event.dataTransfer.setDragImage === 'function') {
      event.dataTransfer.setDragImage(qaItem, 16, 16);
    }
  }
  qaItem.classList.add('dragging');
}

function handleQADragOver(event) {
  event.preventDefault();
  const qaItem = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
  if (!qaItem) {
    return;
  }
  const rect = qaItem.getBoundingClientRect();
  const offsetY = event.clientY - rect.top;
  const position = offsetY < rect.height / 2 ? 'before' : 'after';
  qaItem.dataset.dropPosition = position;
  qaItem.classList.toggle('drag-over-before', position === 'before');
  qaItem.classList.toggle('drag-over-after', position === 'after');
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
}

function handleQADragLeave(event) {
  const qaItem = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
  if (!qaItem) {
    return;
  }
  qaItem.classList.remove('drag-over-before', 'drag-over-after');
  delete qaItem.dataset.dropPosition;
}

function handleQADragEnd(event) {
  const currentTarget = event.currentTarget;
  const qaItem = currentTarget instanceof HTMLElement
    ? (currentTarget.classList.contains('qa-item') ? currentTarget : currentTarget.closest('.qa-item'))
    : null;
  if (qaItem) {
    qaItem.classList.remove('dragging', 'drag-over-before', 'drag-over-after');
    delete qaItem.dataset.dropPosition;
  }
  draggingQAIndex = null;
}

function handleQADrop(event) {
  event.preventDefault();
  const qaItem = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
  if (!qaItem) {
    return;
  }
  const dropPosition = qaItem.dataset.dropPosition || 'before';
  let destinationIndex = Number.parseInt(qaItem.dataset.index || '', 10);
  if (Number.isNaN(destinationIndex)) {
    return;
  }
  let sourceIndex = draggingQAIndex;
  if (sourceIndex === null && event.dataTransfer) {
    const raw = event.dataTransfer.getData('text/plain');
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isNaN(parsed)) {
      sourceIndex = parsed;
    }
  }
  qaItem.classList.remove('drag-over-before', 'drag-over-after');
  delete qaItem.dataset.dropPosition;
  if (sourceIndex === null) {
    return;
  }
  if (dropPosition === 'after') {
    destinationIndex += 1;
  }
  if (sourceIndex < destinationIndex) {
    destinationIndex -= 1;
  }
  if (sourceIndex !== destinationIndex) {
    reorderQAItems(sourceIndex, destinationIndex);
  }
  draggingQAIndex = null;
}

function setLabelText(element, text) {
  if (!element) {
    return;
  }
  const label = element.querySelector('.label-text');
  if (label) {
    label.textContent = text;
  } else {
    element.textContent = text;
  }
}
function synchronizeMetadataWithSelectOptions() {
  const nextMetadata = { ...state.metadata };
  let changed = false;
  SELECT_FIELD_SCHEMAS.forEach((field) => {
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
  const referenceContent = (state.initialContentHTML || '').trim();
  const isDefaultContent = state.contentHTML.trim() === referenceContent;
  const contentFilled = !isDefaultContent && state.contentHTML
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim().length > 0;
  const qaFilled = state.qaItems.some((item) => item.question.trim().length > 0 || item.answer.trim().length > 0);
  return metadataFilled || contentFilled || qaFilled;
}

function renderHeader() {
  setLabelText(elements.headerTitle, translate('header.title'));
  setLabelText(elements.importButton, translate('header.import'));
  setLabelText(elements.backofficeButton, translate('header.backoffice'));
  setLabelText(elements.glossaryButton, translate('header.glossary'));
  setLabelText(elements.newProcedureButton, translate('header.newProcedure'));
  if (elements.languageSelect) {
    elements.languageSelect.setAttribute('aria-label', translate('language.aria'));
    Array.from(elements.languageSelect.options).forEach((option) => {
      const optionKey = `language.option.${option.value}`;
      const fallback = SUPPORTED_LANGUAGES.find((entry) => entry.code === option.value)?.label
        || option.textContent;
      option.textContent = translate(optionKey, {}, fallback);
    });
    if (elements.languageSelect.value !== state.language) {
      elements.languageSelect.value = state.language;
    }
  }
  if (typeof document !== 'undefined') {
    document.title = translate('page.title');
    if (document.documentElement) {
      document.documentElement.lang = state.language;
    }
  }
  if (elements.appVersion) {
    elements.appVersion.textContent = `${translate('version.label')} ${APP_VERSION}`;
  }
}

function renderSectionTitles() {
  setLabelText(elements.metadataCardTitle, translate('sections.metadata'));
  setLabelText(elements.editorCardTitle, translate('sections.editor'));
  setLabelText(elements.qaCardTitle, translate('sections.qa'));
  setLabelText(elements.qaCardDescription, translate('qa.description'));
  setLabelText(elements.addQaButton, translate('qa.addQuestion'));
  setLabelText(elements.exportCardTitle, translate('sections.export'));
  setLabelText(elements.blockingWarningText, translate('export.warning'));
  setLabelText(elements.guidelinesTitle, translate('guidelines.title'));
  setLabelText(elements.glossaryTitle, translate('glossary.title'));
  if (elements.glossaryDescription) {
    elements.glossaryDescription.textContent = translate('glossary.description');
  }
  setLabelText(elements.downloadGlossaryJsonButton, translate('glossary.downloadJson'));
  setLabelText(elements.closeGlossaryButton, translate('glossary.close'));
  setLabelText(elements.previewTitle, translate('preview.title'));
  setLabelText(elements.closePreviewButton, translate('preview.close'));
}

function renderProcedureTitleDisplay() {
  if (!elements.procedureTitleDisplay) {
    return;
  }
  const rawTitle = (state.metadata && state.metadata.title) || '';
  const trimmedTitle = rawTitle.trim();
  const placeholder = translate(
    'editor.title.placeholder',
    {},
    translate('metadata.field.title.placeholder', {}, 'Titre de la procédure')
  );
  const displayText = trimmedTitle || placeholder;
  elements.procedureTitleDisplay.textContent = displayText;
  elements.procedureTitleDisplay.setAttribute('title', displayText);
  if (trimmedTitle) {
    elements.procedureTitleDisplay.classList.remove('procedure-title-display--placeholder');
  } else {
    elements.procedureTitleDisplay.classList.add('procedure-title-display--placeholder');
  }
}

function renderStartInfo() {
  if (!elements.startInfo) {
    return;
  }
  elements.startInfo.hidden = state.hasStarted;
  setLabelText(elements.startInfoTitle, translate('startInfo.title'));
  if (elements.startInfoDescription) {
    elements.startInfoDescription.textContent = translate('startInfo.description');
  }
  if (elements.startInfoList) {
    const bullets = [
      translate('startInfo.bullet1'),
      translate('startInfo.bullet2'),
      translate('startInfo.bullet3')
    ];
    elements.startInfoList.innerHTML = '';
    bullets.forEach((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      elements.startInfoList.appendChild(item);
    });
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
    empty.textContent = translate('keywords.empty');
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
      remove.setAttribute('aria-label', translate('keywords.removeLabel', { keyword }));
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
  const groups = createResolvedMetadataGroups(state.selectOptions, state.configDefaults, state.language);
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
          placeholderOption.textContent = translate('select.placeholder');
          select.appendChild(placeholderOption);
        }
        availableOptions.forEach((option) => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = getSelectOptionLabel(field.optionsKey || field.key, option, state.language);
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
    qaItem.dataset.index = String(index);
    qaItem.draggable = true;
    qaItem.addEventListener('dragstart', handleQADragStart);
    qaItem.addEventListener('dragend', handleQADragEnd);
    qaItem.addEventListener('dragover', handleQADragOver);
    qaItem.addEventListener('dragleave', handleQADragLeave);
    qaItem.addEventListener('drop', handleQADrop);

    const header = document.createElement('div');
    header.className = 'qa-item-header';

    const dragHandle = document.createElement('button');
    dragHandle.type = 'button';
    dragHandle.className = 'qa-drag-handle';
    dragHandle.setAttribute('aria-label', translate('qa.reorder'));
    dragHandle.title = translate('qa.reorder');
    dragHandle.innerHTML = '<span aria-hidden="true" class="qa-drag-handle-icon">⠿</span>';
    dragHandle.draggable = true;
    dragHandle.addEventListener('dragstart', handleQADragStart);
    dragHandle.addEventListener('dragend', handleQADragEnd);
    dragHandle.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
        return;
      }
      event.preventDefault();
      const direction = event.key === 'ArrowUp' ? -1 : 1;
      const targetIndex = index + direction;
      if (targetIndex >= 0 && targetIndex < state.qaItems.length) {
        reorderQAItems(index, targetIndex, { focusIndex: targetIndex });
      }
    });
    header.appendChild(dragHandle);

    const questionWrapper = document.createElement('div');
    const questionLabel = document.createElement('label');
    questionLabel.htmlFor = `question-${index}`;
    questionLabel.textContent = translate('qa.questionLabel');
    const questionTextarea = document.createElement('textarea');
    questionTextarea.id = `question-${index}`;
    questionTextarea.placeholder = translate('qa.questionPlaceholder');
    questionTextarea.value = item.question;
    questionTextarea.addEventListener('input', (event) => handleQAChange(index, 'question', event.target.value));
    questionTextarea.addEventListener('dragstart', (event) => event.preventDefault());
    questionWrapper.appendChild(questionLabel);
    questionWrapper.appendChild(questionTextarea);

    const answerWrapper = document.createElement('div');
    const answerLabel = document.createElement('label');
    answerLabel.htmlFor = `answer-${index}`;
    answerLabel.textContent = translate('qa.answerLabel');
    const answerTextarea = document.createElement('textarea');
    answerTextarea.id = `answer-${index}`;
    answerTextarea.placeholder = translate('qa.answerPlaceholder');
    answerTextarea.value = item.answer;
    answerTextarea.addEventListener('input', (event) => handleQAChange(index, 'answer', event.target.value));
    answerTextarea.addEventListener('dragstart', (event) => event.preventDefault());
    answerWrapper.appendChild(answerLabel);
    answerWrapper.appendChild(answerTextarea);

    const actions = document.createElement('div');
    actions.className = 'qa-actions';
    if (state.qaItems.length > 1) {
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'remove-btn';
      removeButton.textContent = translate('qa.remove');
      removeButton.addEventListener('click', () => removeQAItem(index));
      actions.appendChild(removeButton);
    }

    if (actions.childNodes.length > 0) {
      header.appendChild(actions);
    }

    qaItem.appendChild(header);
    qaItem.appendChild(questionWrapper);
    qaItem.appendChild(answerWrapper);

    elements.qaList.appendChild(qaItem);
  });
}

function getGuidelineId(item) {
  if (!item) {
    return '';
  }
  const linePart = typeof item.line === 'number' ? item.line : 'none';
  return `${linePart}-${item.order}`;
}

function ensureHiddenGuidelineSet() {
  if (!(state.hiddenGuidelineIds instanceof Set)) {
    const previous = Array.isArray(state.hiddenGuidelineIds) ? state.hiddenGuidelineIds : [];
    state.hiddenGuidelineIds = new Set(previous);
  }
  return state.hiddenGuidelineIds;
}

function pruneHiddenGuidelines() {
  const hiddenSet = ensureHiddenGuidelineSet();
  const availableIds = new Set((state.guidelines || []).map((item) => getGuidelineId(item)));
  const nextHidden = new Set();
  hiddenSet.forEach((id) => {
    if (availableIds.has(id)) {
      nextHidden.add(id);
    }
  });
  state.hiddenGuidelineIds = nextHidden;
  if (!availableIds.has(state.activeGuidelineId)) {
    state.activeGuidelineId = null;
  }
  if (state.hiddenGuidelineIds.size === 0) {
    state.showHiddenGuidelines = false;
  }
}

function renderGuidelines() {
  if (!elements.guidelinesList || !elements.guidelinesEmpty) {
    return;
  }
  const hiddenSet = ensureHiddenGuidelineSet();
  const shouldShowHidden = Boolean(state.showHiddenGuidelines);
  if (!shouldShowHidden && state.activeGuidelineId && hiddenSet.has(state.activeGuidelineId)) {
    state.activeGuidelineId = null;
  }
  const itemsToRender = (state.guidelines || []).filter((item) => {
    const itemId = getGuidelineId(item);
    return shouldShowHidden || !hiddenSet.has(itemId);
  });
  const hiddenCount = hiddenSet.size;
  const hasGuidelines = Array.isArray(state.guidelines) && state.guidelines.length > 0;
  const hasVisibleItems = itemsToRender.length > 0;
  if (!hasGuidelines) {
    state.activeGuidelineId = null;
  }

  if (elements.guidelinesHiddenToggle) {
    if (hiddenCount === 0) {
      elements.guidelinesHiddenToggle.hidden = true;
      elements.guidelinesHiddenToggle.setAttribute('aria-pressed', 'false');
    } else {
      elements.guidelinesHiddenToggle.hidden = false;
      elements.guidelinesHiddenToggle.setAttribute('aria-pressed', String(shouldShowHidden));
      const toggleKey = shouldShowHidden ? 'guidelines.hiddenToggle.hide' : 'guidelines.hiddenToggle.show';
      const toggleParams = shouldShowHidden ? {} : { count: hiddenCount };
      const toggleFallback = shouldShowHidden
        ? 'Hide hidden recommendations'
        : `Show hidden recommendations (${hiddenCount})`;
      elements.guidelinesHiddenToggle.textContent = translate(toggleKey, toggleParams, toggleFallback);
    }
  }

  elements.guidelinesList.innerHTML = '';
  elements.guidelinesList.hidden = !hasVisibleItems;
  if (!hasVisibleItems) {
    const emptyKey = hasGuidelines ? 'guidelines.hiddenEmpty' : 'guidelines.empty';
    const fallback = hasGuidelines
      ? 'All recommendations are hidden.'
      : 'Start writing to receive recommendations.';
    elements.guidelinesEmpty.hidden = false;
    elements.guidelinesEmpty.textContent = translate(emptyKey, {}, fallback);
  } else {
    elements.guidelinesEmpty.hidden = true;
  }

  const categoryTranslationKeys = {
    heading: 'guidelines.category.heading',
    'list-transition': 'guidelines.category.listTransition',
    'list-intro': 'guidelines.category.listIntro',
    pronoun: 'guidelines.category.pronoun',
    acronym: 'guidelines.category.acronym',
    'definition-check': 'guidelines.category.definitionCheck'
  };
  const formatCategoryFallback = (type) => {
    if (!type) {
      return 'Guideline';
    }
    return type
      .split(/[-_]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };
  if (hasVisibleItems) {
    itemsToRender.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'guideline-entry';
      const itemId = getGuidelineId(item);
      listItem.dataset.guidelineId = itemId;
      listItem.classList.toggle('is-active', state.activeGuidelineId === itemId);
      const isHidden = hiddenSet.has(itemId);
      listItem.classList.toggle('is-hidden', isHidden);
      if (item.line != null) {
        listItem.dataset.lineNumber = String(item.line);
      }

      const header = document.createElement('div');
      header.className = 'guideline-entry-header';

      const lineBadge = document.createElement('span');
      lineBadge.className = 'comment-line';
      const categoryKey = categoryTranslationKeys[item.type];
      const fallbackCategory = formatCategoryFallback(item.type);
      lineBadge.textContent = categoryKey ? translate(categoryKey, {}, fallbackCategory) : fallbackCategory;
      if (typeof item.line === 'number' && Number.isFinite(item.line)) {
        lineBadge.setAttribute(
          'aria-label',
          translate('guidelines.lineLabel', { line: item.line }, `Ligne ${item.line}`)
        );
        lineBadge.title = translate('guidelines.lineLabel', { line: item.line }, `Ligne ${item.line}`);
      }
      header.appendChild(lineBadge);

      const messageId = `guideline-comment-${itemId}`;

      const lineButton = document.createElement('button');
      lineButton.type = 'button';
      lineButton.className = 'guideline-line-text';
      lineButton.textContent = item.anchor || translate('guidelines.anchorFallback');
      lineButton.setAttribute('aria-expanded', String(state.activeGuidelineId === itemId));
      lineButton.setAttribute('aria-controls', messageId);
      lineButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = state.activeGuidelineId === itemId;
        state.activeGuidelineId = isOpen ? null : itemId;
        renderGuidelines();
      });
      header.appendChild(lineButton);

      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.className = 'guideline-comment-toggle';
      const hideKey = isHidden ? 'guidelines.restoreEntry' : 'guidelines.hideEntry';
      const hideFallback = isHidden
        ? 'Show this recommendation again'
        : 'Hide this recommendation';
      const hideLabel = translate(hideKey, {}, hideFallback);
      toggleButton.setAttribute('aria-label', hideLabel);
      toggleButton.title = hideLabel;
      toggleButton.setAttribute('aria-pressed', String(isHidden));
      const eyeIcon = document.createElement('span');
      eyeIcon.className = `icon-eye${isHidden ? '' : ' is-off'}`;
      eyeIcon.setAttribute('aria-hidden', 'true');
      const eyePupil = document.createElement('span');
      eyePupil.className = 'icon-eye__pupil';
      eyeIcon.appendChild(eyePupil);
      toggleButton.appendChild(eyeIcon);
      toggleButton.addEventListener('click', () => {
        const currentHiddenSet = ensureHiddenGuidelineSet();
        const nextHiddenSet = new Set(currentHiddenSet);
        const currentlyHidden = currentHiddenSet.has(itemId);
        if (currentlyHidden) {
          nextHiddenSet.delete(itemId);
        } else {
          nextHiddenSet.add(itemId);
        }
        state.hiddenGuidelineIds = nextHiddenSet;
        if (!state.showHiddenGuidelines && !currentlyHidden && state.activeGuidelineId === itemId) {
          state.activeGuidelineId = null;
        }
        if (state.hiddenGuidelineIds.size === 0) {
          state.showHiddenGuidelines = false;
        }
        renderGuidelines();
      });
      toggleButton.addEventListener('click', (event) => {
        event.stopPropagation();
      });
      header.appendChild(toggleButton);

      header.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.closest('.guideline-line-text')) {
          return;
        }
        if (event.target instanceof HTMLElement && event.target.closest('.guideline-comment-toggle')) {
          return;
        }
        const isOpen = state.activeGuidelineId === itemId;
        state.activeGuidelineId = isOpen ? null : itemId;
        renderGuidelines();
      });

      const message = document.createElement('div');
      message.className = 'guideline-comment-panel';
      message.id = messageId;
      message.textContent = item.message;
      message.hidden = state.activeGuidelineId !== itemId;

      listItem.appendChild(header);
      listItem.appendChild(message);
      elements.guidelinesList.appendChild(listItem);
    });
  }
  renderGuidelineMarkers();
}

function buildEditorBlockMap() {
  if (!elements.editor) {
    return [];
  }
  const blocks = [];
  const language = state.language;
  let currentLine = 1;
  Array.from(elements.editor.childNodes).forEach((node) => {
    const markdown = convertBlock(node, language);
    if (!markdown || markdown.trim().length === 0) {
      return;
    }
    const blockLines = markdown.split('\n');
    const startLine = currentLine;
    const endLine = currentLine + blockLines.length - 1;
    const elementNode = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    if (elementNode instanceof HTMLElement) {
      blocks.push({ node: elementNode, startLine, endLine });
    }
    currentLine = endLine + 2;
  });
  return blocks;
}

function renderGuidelineMarkers() {
  if (!elements.editor || !elements.editorMarkerLayer || !elements.editorPane) {
    return;
  }
  const overlay = elements.editorMarkerLayer;
  overlay.innerHTML = '';
  const hiddenSet = ensureHiddenGuidelineSet();
  const shouldShowHidden = Boolean(state.showHiddenGuidelines);
  const markerGuidelines = (state.guidelines || []).filter((item) => {
    const itemId = getGuidelineId(item);
    return shouldShowHidden || !hiddenSet.has(itemId);
  });
  if (markerGuidelines.length === 0) {
    overlay.hidden = true;
    return;
  }
  overlay.hidden = false;
  const blocks = buildEditorBlockMap();
  const editorRect = elements.editor.getBoundingClientRect();
  const overlayTop = elements.editor.offsetTop || 0;
  const overlayLeft = elements.editor.offsetLeft || 0;
  overlay.style.top = `${overlayTop}px`;
  overlay.style.left = `${overlayLeft}px`;
  overlay.style.width = `${elements.editor.offsetWidth}px`;
  overlay.style.height = `${elements.editor.offsetHeight}px`;

  const informationalGuidelineTypes = new Set(['heading', 'list-transition']);

  markerGuidelines.forEach((item, index) => {
    if (typeof item.line !== 'number' || !Number.isFinite(item.line)) {
      return;
    }
    const target = blocks.find((entry) => item.line >= entry.startLine && item.line <= entry.endLine);
    const blockElement = target?.node;
    if (!(blockElement instanceof HTMLElement)) {
      return;
    }
    const blockRect = blockElement.getBoundingClientRect();
    const relativeTop = blockRect.top - editorRect.top + blockRect.height / 2;
    if (!Number.isFinite(relativeTop)) {
      return;
    }
    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'guideline-marker';
    const markerId = getGuidelineId(item);
    marker.dataset.guidelineId = markerId;
    marker.classList.toggle('is-active', state.activeGuidelineId === markerId);
    const isHidden = hiddenSet.has(markerId);
    marker.classList.toggle('is-hidden', isHidden);
    const markerDefault = translate('guidelines.markerLabel', { index: index + 1 }, '⚠️');
    const markerText = informationalGuidelineTypes.has(item.type) ? '💡' : markerDefault;
    const anchorLabel = item.anchor || translate('guidelines.anchorFallback');
    marker.textContent = markerText;
    marker.setAttribute(
      'aria-label',
      translate('guidelines.markerAria', { index: index + 1, anchor: anchorLabel }, markerText)
    );
    marker.style.top = `${relativeTop}px`;
    marker.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = state.activeGuidelineId === markerId;
      state.activeGuidelineId = isOpen ? null : markerId;
      renderGuidelines();
      const entries = Array.from(elements.guidelinesList?.children || []);
      const targetEntry = entries.find((entry) => entry.dataset.guidelineId === markerId);
      if (targetEntry && typeof targetEntry.scrollIntoView === 'function') {
        targetEntry.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
    overlay.appendChild(marker);
  });
}

function renderGlossary() {
  if (!elements.glossaryList) {
    return;
  }
  const isOpen = state.isGlossaryOpen;
  if (elements.glossaryOverlay) {
    elements.glossaryOverlay.hidden = !isOpen;
    elements.glossaryOverlay.classList.toggle('open', isOpen);
    elements.glossaryOverlay.setAttribute('aria-hidden', String(!isOpen));
  }
  const formState = state.glossaryForm || { term: '', definition: '' };
  if (elements.glossaryFormTitle) {
    elements.glossaryFormTitle.textContent = translate('glossary.form.title');
  }
  if (elements.glossaryTermLabel) {
    elements.glossaryTermLabel.textContent = translate('glossary.form.termLabel');
  }
  if (elements.glossaryDefinitionLabel) {
    elements.glossaryDefinitionLabel.textContent = translate('glossary.form.definitionLabel');
  }
  if (elements.glossaryTermInput) {
    const placeholder = translate(
      'glossary.form.termPlaceholder',
      {},
      elements.glossaryTermInput.placeholder || ''
    );
    elements.glossaryTermInput.placeholder = placeholder;
    elements.glossaryTermInput.value = formState.term || '';
    elements.glossaryTermInput.disabled = Boolean(state.isGlossaryLoading);
  }
  if (elements.glossaryDefinitionInput) {
    const placeholder = translate(
      'glossary.form.definitionPlaceholder',
      {},
      elements.glossaryDefinitionInput.placeholder || ''
    );
    elements.glossaryDefinitionInput.placeholder = placeholder;
    elements.glossaryDefinitionInput.value = formState.definition || '';
    elements.glossaryDefinitionInput.disabled = Boolean(state.isGlossaryLoading);
  }
  if (elements.addGlossaryEntryButton) {
    setLabelText(elements.addGlossaryEntryButton, translate('glossary.form.submit'));
    elements.addGlossaryEntryButton.disabled = Boolean(state.isGlossaryLoading);
  }
  if (elements.downloadGlossaryJsonButton) {
    setLabelText(elements.downloadGlossaryJsonButton, translate('glossary.downloadJson'));
    elements.downloadGlossaryJsonButton.disabled = Boolean(state.isGlossaryLoading);
  }
  if (elements.glossaryFormError) {
    if (state.glossaryFormErrorKey) {
      const message = translate(
        state.glossaryFormErrorKey,
        state.glossaryFormErrorParams || {},
        ''
      );
      elements.glossaryFormError.textContent = message;
      elements.glossaryFormError.hidden = !message;
    } else {
      elements.glossaryFormError.hidden = true;
      elements.glossaryFormError.textContent = '';
    }
  }
  if (elements.glossaryFormContainer) {
    elements.glossaryFormContainer.setAttribute('aria-busy', String(Boolean(state.isGlossaryLoading)));
  }
  elements.glossaryList.innerHTML = '';
  if (elements.glossaryLoading) {
    elements.glossaryLoading.textContent = translate('glossary.loading');
    elements.glossaryLoading.hidden = !state.isGlossaryLoading;
  }
  if (elements.glossaryError) {
    elements.glossaryError.hidden = true;
  }
  if (state.isGlossaryLoading) {
    return;
  }
  if (elements.glossaryError) {
    elements.glossaryError.hidden = !state.glossaryError;
    if (state.glossaryError) {
      elements.glossaryError.textContent = state.glossaryError;
    }
  }
  const sortLocale = state.language || DEFAULT_LANGUAGE;
  const entries = Object.entries(state.glossary).sort(([termA], [termB]) => (
    termA.localeCompare(termB, sortLocale, { sensitivity: 'base' })
  ));
  if (entries.length === 0) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--muted)';
    empty.style.margin = '0';
    empty.textContent = translate('glossary.empty');
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
  if (elements.previewModal.setAttribute) {
    elements.previewModal.setAttribute('aria-hidden', String(!state.isPreviewOpen));
  }
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
  if (state.isBackofficeOpen) {
    elements.backofficeOverlay.classList.add('open');
  } else {
    elements.backofficeOverlay.classList.remove('open');
  }
  elements.backofficeSections.innerHTML = '';
  setLabelText(elements.backofficeTitle, translate('backoffice.title'));
  setLabelText(elements.closeBackofficeButton, translate('backoffice.close'));
  setLabelText(elements.backofficeDescription, translate('backoffice.description'));
  setLabelText(elements.exportConfigButton, translate('backoffice.exportConfig'));
  if (!state.isBackofficeOpen) {
    return;
  }
  const editorLanguage = state.templateEditorLanguage || state.language;

  const templateSection = document.createElement('div');
  templateSection.className = 'backoffice-section backoffice-template-section';

  const templateHeader = document.createElement('div');
  templateHeader.className = 'backoffice-section-header';

  const templateInfo = document.createElement('div');
  templateInfo.className = 'backoffice-section-info';

  const templateTitle = document.createElement('h3');
  templateTitle.textContent = translate('backoffice.template.title');
  templateInfo.appendChild(templateTitle);
  templateHeader.appendChild(templateInfo);

  const templateResetButton = document.createElement('button');
  templateResetButton.type = 'button';
  templateResetButton.className = 'backoffice-reset-btn';
  templateResetButton.textContent = translate('backoffice.reset');
  templateResetButton.addEventListener('click', () => handleTemplateReset(editorLanguage));
  templateHeader.appendChild(templateResetButton);

  templateSection.appendChild(templateHeader);

  const templateDescription = document.createElement('p');
  templateDescription.className = 'backoffice-template-description';
  templateDescription.textContent = translate('backoffice.template.description');
  templateSection.appendChild(templateDescription);

  const languageField = document.createElement('div');
  languageField.className = 'backoffice-template-language';

  const languageLabel = document.createElement('label');
  languageLabel.htmlFor = 'backoffice-template-language';
  languageLabel.textContent = translate('backoffice.template.languageLabel');
  languageField.appendChild(languageLabel);

  const languageSelect = document.createElement('select');
  languageSelect.id = 'backoffice-template-language';
  SUPPORTED_LANGUAGES.forEach((entry) => {
    const option = document.createElement('option');
    option.value = entry.code;
    const optionKey = `language.option.${entry.code}`;
    option.textContent = translate(optionKey, {}, entry.label);
    languageSelect.appendChild(option);
  });
  languageSelect.value = editorLanguage;
  languageSelect.addEventListener('change', (event) => handleTemplateEditorLanguageChange(event.target.value));
  languageField.appendChild(languageSelect);
  templateSection.appendChild(languageField);

  const templateLabel = document.createElement('label');
  templateLabel.htmlFor = 'backoffice-template-content';
  templateLabel.textContent = translate('backoffice.template.inputLabel');
  templateSection.appendChild(templateLabel);

  const templateInput = document.createElement('textarea');
  templateInput.id = 'backoffice-template-content';
  templateInput.className = 'backoffice-template-input';
  templateInput.value = state.templateDrafts[editorLanguage] || '';
  templateInput.addEventListener('input', (event) => handleTemplateDraftChange(editorLanguage, event.target.value));
  templateSection.appendChild(templateInput);

  const templateActions = document.createElement('div');
  templateActions.className = 'backoffice-template-actions';

  const templateSaveButton = document.createElement('button');
  templateSaveButton.type = 'button';
  templateSaveButton.className = 'backoffice-add-btn';
  templateSaveButton.textContent = translate('backoffice.template.save');
  templateSaveButton.addEventListener('click', () => handleTemplateSave(editorLanguage));
  templateActions.appendChild(templateSaveButton);

  templateSection.appendChild(templateActions);
  elements.backofficeSections.appendChild(templateSection);

  SELECT_FIELD_SCHEMAS.forEach((field) => {
    const section = document.createElement('div');
    section.className = 'backoffice-section';

    const header = document.createElement('div');
    header.className = 'backoffice-section-header';
    const optionsKey = field.optionsKey || field.key;
    const info = document.createElement('div');
    info.className = 'backoffice-section-info';
    const title = document.createElement('h3');
    const fieldLabel = field.labelKey
      ? translate(field.labelKey, {}, field.label || field.key)
      : (field.label || field.key);
    title.textContent = fieldLabel;
    info.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'backoffice-field-meta';
    const fieldKeyChip = document.createElement('span');
    fieldKeyChip.className = 'backoffice-field-chip';
    fieldKeyChip.textContent = translate('backoffice.fieldKeyHint', { key: field.key });
    meta.appendChild(fieldKeyChip);
    if (field.optionsKey && field.optionsKey !== field.key) {
      const optionChip = document.createElement('span');
      optionChip.className = 'backoffice-field-chip';
      optionChip.textContent = translate('backoffice.optionKeyHint', { key: field.optionsKey });
      meta.appendChild(optionChip);
    }
    if (meta.childElementCount > 0) {
      info.appendChild(meta);
    }
    header.appendChild(info);

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'backoffice-reset-btn';
    resetButton.textContent = translate('backoffice.reset');
    resetButton.addEventListener('click', () => handleResetSelectOptions(field.key));
    header.appendChild(resetButton);

    section.appendChild(header);

    const label = document.createElement('label');
    label.htmlFor = `${field.key}-new-option`;
    label.textContent = translate('backoffice.addOptionLabel');
    section.appendChild(label);

    const controls = document.createElement('div');
    controls.className = 'backoffice-controls';

    const input = document.createElement('input');
    input.id = `${field.key}-new-option`;
    input.type = 'text';
    input.placeholder = translate('backoffice.newOptionPlaceholder');
    input.value = state.selectOptionDrafts[optionsKey] || '';
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
    addButton.textContent = translate('backoffice.addOption');
    addButton.addEventListener('click', () => handleAddSelectOption(field.key));
    controls.appendChild(addButton);

    section.appendChild(controls);

    const options = state.selectOptions[optionsKey] || [];
    const optionList = document.createElement('div');
    optionList.className = 'option-list';
    optionList.setAttribute('aria-live', 'polite');

    if (options.length === 0) {
      const empty = document.createElement('span');
      empty.className = 'option-empty';
      empty.textContent = translate('backoffice.emptyOptions');
      optionList.appendChild(empty);
    } else {
      options.forEach((option) => {
        const pill = document.createElement('span');
        pill.className = 'option-pill';

        const labelSpan = document.createElement('span');
        labelSpan.textContent = getSelectOptionLabel(optionsKey, option, state.language);
        pill.appendChild(labelSpan);

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'option-pill-remove';
        remove.setAttribute('aria-label', translate('backoffice.removeOptionLabel', { option }));
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
  const heading2Button = elements.toolbar.querySelector('button[data-value="H2"]');
  if (heading2Button) {
    heading2Button.textContent = translate('toolbar.heading2');
  }
  const heading3Button = elements.toolbar.querySelector('button[data-value="H3"]');
  if (heading3Button) {
    heading3Button.textContent = translate('toolbar.heading3');
  }
  const heading4Button = elements.toolbar.querySelector('button[data-value="H4"]');
  if (heading4Button) {
    heading4Button.textContent = translate('toolbar.heading4');
  }
  const boldButton = elements.toolbar.querySelector('button[data-command="bold"]');
  if (boldButton) {
    boldButton.textContent = translate('toolbar.bold');
  }
  const italicButton = elements.toolbar.querySelector('button[data-command="italic"]');
  if (italicButton) {
    italicButton.textContent = translate('toolbar.italic');
  }
  const unorderedButton = elements.toolbar.querySelector('button[data-command="insertUnorderedList"]');
  if (unorderedButton) {
    unorderedButton.textContent = translate('toolbar.unorderedList');
  }
  const orderedButton = elements.toolbar.querySelector('button[data-command="insertOrderedList"]');
  if (orderedButton) {
    orderedButton.textContent = translate('toolbar.orderedList');
  }
  if (elements.insertRationalButton) {
    elements.insertRationalButton.textContent = translate('toolbar.rational');
  }
}

function renderExportActions() {
  setLabelText(elements.previewButton, translate('export.preview'));
  if (elements.exportMarkdownButton) {
    elements.exportMarkdownButton.disabled = state.blockingWarnings.length > 0;
    setLabelText(elements.exportMarkdownButton, translate('export.markdown'));
  }
  if (elements.exportPDFButton) {
    elements.exportPDFButton.disabled = state.blockingWarnings.length > 0 || state.isExportingPDF;
    setLabelText(
      elements.exportPDFButton,
      state.isExportingPDF ? translate('export.pdfInProgress') : translate('export.pdf')
    );
  }
}

function renderAll() {
  renderHeader();
  renderSectionTitles();
  renderStartInfo();
  renderMetadataGroups();
  renderProcedureTitleDisplay();
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
  const previousActive = state.activeGuidelineId;
  state.guidelines = computeGuidelines(state.contentHTML, state.glossary, state.language);
  pruneHiddenGuidelines();
  if (previousActive) {
    const stillExists = state.guidelines.some((item) => getGuidelineId(item) === previousActive);
    state.activeGuidelineId = stillExists ? previousActive : null;
  }
  state.blockingWarnings = detectBlockingIssues(state.contentHTML, state.qaItems);
}

function setLanguage(languageCode) {
  const supported = SUPPORTED_LANGUAGES.some((entry) => entry.code === languageCode);
  const targetLanguage = supported ? languageCode : DEFAULT_LANGUAGE;
  if (state.language === targetLanguage) {
    return;
  }
  state.language = targetLanguage;
  currentLanguage = targetLanguage;
  state.templateEditorLanguage = targetLanguage;
  saveLanguagePreference(targetLanguage);
  if (elements.languageSelect && elements.languageSelect.value !== targetLanguage) {
    elements.languageSelect.value = targetLanguage;
  }
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.lang = targetLanguage;
  }
  if (state.glossaryError) {
    state.glossaryError = translate('glossary.error');
  }
  const previousTemplate = (state.initialContentHTML || '').trim();
  const newTemplate = getInitialContentHTML(targetLanguage);
  if (!state.hasStarted || state.contentHTML.trim() === previousTemplate) {
    state.contentHTML = newTemplate;
    state.initialContentHTML = newTemplate;
    if (elements.editor) {
      elements.editor.innerHTML = newTemplate;
    }
  } else {
    state.initialContentHTML = newTemplate;
  }
  state.guidelines = computeGuidelines(state.contentHTML, state.glossary, targetLanguage);
  pruneHiddenGuidelines();
  state.activeGuidelineId = null;
  state.blockingWarnings = detectBlockingIssues(state.contentHTML, state.qaItems);
  renderAll();
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

function clearGlossaryFormError() {
  state.glossaryFormErrorKey = null;
  state.glossaryFormErrorParams = null;
}

function hasGlossaryEntry(term) {
  const normalized = (term || '').toUpperCase();
  return Object.keys(state.glossary || {}).some((key) => key.toUpperCase() === normalized);
}

function handleGlossaryTermInput(event) {
  const inputValue = event?.target?.value ?? '';
  const nextValue = inputValue.toUpperCase();
  if (event?.target && event.target.value !== nextValue) {
    event.target.value = nextValue;
  }
  state.glossaryForm = { ...(state.glossaryForm || {}), term: nextValue };
  if (state.glossaryFormErrorKey) {
    clearGlossaryFormError();
    renderGlossary();
  }
}

function handleGlossaryDefinitionInput(event) {
  const nextValue = event?.target?.value ?? '';
  state.glossaryForm = { ...(state.glossaryForm || {}), definition: nextValue };
  if (state.glossaryFormErrorKey) {
    clearGlossaryFormError();
    renderGlossary();
  }
}

function handleGlossaryFormSubmit(event) {
  if (event) {
    event.preventDefault();
  }
  if (state.isGlossaryLoading) {
    return;
  }
  const formState = state.glossaryForm || { term: '', definition: '' };
  const rawTerm = (formState.term || '').trim();
  const rawDefinition = (formState.definition || '').trim();
  if (!rawTerm || !rawDefinition) {
    state.glossaryFormErrorKey = 'glossary.form.error.missing';
    state.glossaryFormErrorParams = null;
    renderGlossary();
    return;
  }
  const normalizedTerm = rawTerm.toUpperCase();
  if (hasGlossaryEntry(normalizedTerm)) {
    state.glossaryFormErrorKey = 'glossary.form.error.duplicate';
    state.glossaryFormErrorParams = { term: normalizedTerm };
    renderGlossary();
    return;
  }
  const sanitizedDefinition = rawDefinition.replace(/\s+/g, ' ').trim();
  state.glossary = { ...state.glossary, [normalizedTerm]: sanitizedDefinition };
  state.glossaryForm = { term: '', definition: '' };
  clearGlossaryFormError();
  state.guidelines = computeGuidelines(state.contentHTML, state.glossary, state.language);
  pruneHiddenGuidelines();
  renderGlossary();
  renderGuidelines();
  if (elements.glossaryTermInput && typeof elements.glossaryTermInput.focus === 'function') {
    elements.glossaryTermInput.focus();
  }
}

function getSortedAcronymEntries(locale = DEFAULT_LANGUAGE) {
  const sortLocale = locale || DEFAULT_LANGUAGE;
  return Object.entries(state.glossary || {})
    .sort(([termA], [termB]) => termA.localeCompare(termB, sortLocale, { sensitivity: 'base' }))
    .map(([term, definition]) => ({ term, definition }));
}

function handleDownloadGlossaryJSON() {
  if (!elements.downloadGlossaryJsonButton) {
    return;
  }
  const entries = getSortedAcronymEntries(state.language);
  const payload = { acronyms: entries };
  const jsonString = `${JSON.stringify(payload, null, 2)}\n`;
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'acronyms.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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
  const title = translate('rational.title');
  const description = translate('rational.description');
  const rationalHTML = `
<section class="rational-block" data-block-type="rationnel">
  <div class="rational-block-title">${title}</div>
  <p>${description}</p>
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

function formatMetadataValueForPDF(field, value, language = currentLanguage) {
  if (!field) {
    return '';
  }
  if (field.key === 'keywords') {
    const keywords = Array.isArray(value) ? value : parseKeywords(value || '');
    return keywords.join(', ');
  }
  if (field.type === 'select') {
    const optionsKey = field.optionsKey || field.key;
    if (field.multiple) {
      const values = Array.isArray(value) ? value : [];
      return values
        .map((item) => getSelectOptionLabel(optionsKey, item, language))
        .filter(Boolean)
        .join(', ');
    }
    if (typeof value === 'string' && value.trim() !== '') {
      return getSelectOptionLabel(optionsKey, value, language);
    }
    return '';
  }
  return formatMetadataValue(value);
}

function buildPDFMetadataEntries(metadata, selectOptions, configDefaults, language = currentLanguage) {
  if (!metadata) {
    return [];
  }
  const groups = createResolvedMetadataGroups(selectOptions, configDefaults, language);
  const entries = [];
  groups.forEach((group) => {
    group.fields.forEach((field) => {
      if (!field || !field.label) {
        return;
      }
      const rawValue = metadata[field.key];
      if (field.key === 'keywords') {
        const keywords = parseKeywords(rawValue || '');
        if (keywords.length > 0) {
          entries.push({ label: field.label, value: keywords.join(', ') });
        }
        return;
      }
      const value = formatMetadataValueForPDF(field, rawValue, language);
      if (value) {
        entries.push({ label: field.label, value });
      }
    });
  });
  return entries;
}

function extractPDFContentBlocks(html) {
  if (!html) {
    return [];
  }
  const container = document.createElement('div');
  container.innerHTML = html;
  const blocks = [];
  const headingTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

  const visit = (node) => {
    if (!node) {
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toUpperCase();
      if (headingTags.has(tag)) {
        const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
        if (text) {
          const level = parseInt(tag.slice(1), 10) || 1;
          blocks.push({ type: 'heading', level, text });
        }
        return;
      }
      if (tag === 'P') {
        const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
        if (text) {
          blocks.push({ type: 'paragraph', text });
        }
        return;
      }
      if (tag === 'LI') {
        const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
        if (text) {
          blocks.push({ type: 'list-item', text });
        }
        return;
      }
      if (tag === 'BR') {
        blocks.push({ type: 'break' });
        return;
      }
      if (tag === 'UL' || tag === 'OL') {
        let index = 1;
        node.childNodes.forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toUpperCase() === 'LI') {
            const text = (child.textContent || '').replace(/\s+/g, ' ').trim();
            if (text) {
              blocks.push({ type: 'list-item', text, index: tag === 'OL' ? index : null });
            }
            index += 1;
          }
        });
        blocks.push({ type: 'break' });
        return;
      }
      node.childNodes.forEach(visit);
      return;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.replace(/\s+/g, ' ').trim();
      if (text) {
        blocks.push({ type: 'paragraph', text });
      }
    }
  };

  container.childNodes.forEach((child) => visit(child));

  const cleaned = [];
  blocks.forEach((block) => {
    if (block.type === 'break') {
      if (cleaned.length === 0 || cleaned[cleaned.length - 1].type === 'break') {
        return;
      }
    }
    cleaned.push(block);
  });
  if (cleaned.length > 0 && cleaned[cleaned.length - 1].type === 'break') {
    cleaned.pop();
  }
  return cleaned;
}

function normalizePDFQAItems(qaItems = []) {
  return qaItems
    .map((item) => ({
      question: ((item && item.question) || '').trim(),
      answer: ((item && item.answer) || '').trim(),
    }))
    .filter((item) => item.question || item.answer);
}

function createPDFFileName(title, fallbackTitle) {
  const raw = (title && title.trim()) || fallbackTitle || 'document';
  let normalized = raw;
  if (normalized && typeof normalized.normalize === 'function') {
    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  const sanitized = normalized
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');
  const base = sanitized || 'document';
  return `${base}.pdf`;
}

async function handleExportPDF() {
  if (state.blockingWarnings.length > 0) {
    return;
  }
  try {
    state.isExportingPDF = true;
    renderExportActions();
    if (!window.ReactPDF || typeof window.ReactPDF.generatePDF !== 'function') {
      throw new Error('ReactPDF library unavailable');
    }
    if (!state.logoImageData) {
      state.logoImageData = await loadLogoImageSafely(LFB_LOGO_URL, 'lfb-logo');
    }
    const language = state.language || currentLanguage;
    const fallbackTitle = translate('pdf.fallbackTitle', {}, 'Procédure', language);
    const selectOptions = state.selectOptions || DEFAULT_SELECT_OPTIONS;
    const configDefaults = state.configDefaults || DEFAULT_SELECT_OPTIONS;
    const metadataEntries = buildPDFMetadataEntries(state.metadata, selectOptions, configDefaults, language);
    const contentBlocks = extractPDFContentBlocks(state.contentHTML);
    const qaItems = normalizePDFQAItems(state.qaItems);
    const resolvedGroups = createResolvedMetadataGroups(selectOptions, configDefaults, language);
    const metadataFieldsByKey = resolvedGroups.reduce((acc, group) => {
      group.fields.forEach((field) => {
        if (field && field.key) {
          acc[field.key] = field;
        }
      });
      return acc;
    }, {});
    const footerTitle = (state.metadata.title && state.metadata.title.trim()) || fallbackTitle;
    const footerReference =
      formatMetadataValueForPDF(metadataFieldsByKey.reference, state.metadata.reference, language) || '';
    const footerEffectiveDate =
      formatMetadataValueForPDF(
        metadataFieldsByKey.effectiveDate,
        state.metadata.effectiveDate,
        language
      ) || '';
    const footerLabels = {
      titleLabel: translate('pdf.footer.titleLabel', {}, 'Titre', language),
      referenceLabel: translate('pdf.footer.referenceLabel', {}, 'Réf.', language),
      effectiveDateLabel: translate(
        'pdf.footer.effectiveDateLabel',
        {},
        "Date d'entrée en vigueur",
        language
      ),
      pageLabel: translate('pdf.footer.pageLabel', {}, 'Page', language),
    };
    const footerConfidential = translate(
      'pdf.footer.confidential',
      {},
      'Confidential - LFB Proprietary - Reproduction prohibited',
      language
    );
    const pdfData = {
      title: (state.metadata.title && state.metadata.title.trim()) || fallbackTitle,
      metadata: metadataEntries,
      content: contentBlocks,
      qaItems,
      strings: {
        sectionTitle: translate('pdf.sectionTitle', {}, 'Questions & Réponses', language),
        noQuestionText: translate('pdf.noQuestions', {}, 'Aucune question enregistrée.', language),
        questionLabel: translate('qa.questionLabel', {}, 'Question', language),
        answerLabel: translate('qa.answerLabel', {}, 'Réponse', language),
      },
      branding: {
        showLogo: true,
        logoImage: state.logoImageData,
      },
      footer: {
        title: footerTitle,
        reference: footerReference,
        effectiveDate: footerEffectiveDate,
        labels: footerLabels,
        confidentialityText: footerConfidential,
      },
    };
    const blob = await Promise.resolve(window.ReactPDF.generatePDF(pdfData));
    if (!(blob instanceof Blob)) {
      throw new Error('Invalid PDF blob');
    }
    const fileName = createPDFFileName(state.metadata.title, fallbackTitle);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erreur lors de la préparation du PDF :', error);
    window.alert(translate('pdf.exportError'));
  } finally {
    state.isExportingPDF = false;
    renderExportActions();
  }
}
function handleNewProcedure() {
  if (getIsFormDirty()) {
    const confirmReset = window.confirm(translate('confirm.newProcedure'));
    if (!confirmReset) {
      return;
    }
  }

  const initialQAItems = createInitialQAItems();
  const template = getInitialContentHTML(state.language);
  state.metadata = createInitialMetadata();
  state.qaItems = initialQAItems;
  state.contentHTML = template;
  state.initialContentHTML = template;
  state.guidelines = computeGuidelines(template, state.glossary, state.language);
  pruneHiddenGuidelines();
  state.activeGuidelineId = null;
  state.blockingWarnings = detectBlockingIssues(template, initialQAItems);
  state.previewMarkdown = '';
  state.isPreviewOpen = false;
  state.hasStarted = true;
  state.keywordInput = '';

  if (elements.editor) {
    elements.editor.innerHTML = template;
    const firstField = document.getElementById(METADATA_FIELD_SCHEMAS[0].key);
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
    const { metadata, contentHTML, qaItems } = parseMarkdownProcedure(text, state.language);
    state.metadata = metadata;
    state.contentHTML = contentHTML;
    state.qaItems = qaItems;
    state.guidelines = computeGuidelines(contentHTML, state.glossary);
    pruneHiddenGuidelines();
    state.activeGuidelineId = null;
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
    window.alert(translate('import.error'));
  } finally {
    if (input) {
      input.value = '';
    }
  }
}

function handleAddSelectOption(fieldKey) {
  const optionsKey = SELECT_FIELD_SCHEMAS.find((field) => field.key === fieldKey)?.optionsKey || fieldKey;
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
  const optionsKey = SELECT_FIELD_SCHEMAS.find((field) => field.key === fieldKey)?.optionsKey || fieldKey;
  const options = state.selectOptions[optionsKey] || [];
  const updatedOptions = options.filter((value) => value !== option);
  const next = { ...state.selectOptions, [optionsKey]: updatedOptions };
  state.selectOptions = next;
  persistSelectOptions(next);
  synchronizeMetadataWithSelectOptions();
  renderAll();
}

function handleResetSelectOptions(fieldKey) {
  const fieldDefinition = SELECT_FIELD_SCHEMAS.find((field) => field.key === fieldKey);
  const optionsKey = fieldDefinition?.optionsKey || fieldKey;
  const baseOptions = state.configDefaults[optionsKey] || DEFAULT_SELECT_OPTIONS[optionsKey] || [];
  const next = { ...state.selectOptions, [optionsKey]: [...baseOptions] };
  state.selectOptions = next;
  persistSelectOptions(next);
  synchronizeMetadataWithSelectOptions();
  renderAll();
}

function handleSelectOptionDraftChange(fieldKey, value) {
  const optionsKey = SELECT_FIELD_SCHEMAS.find((field) => field.key === fieldKey)?.optionsKey || fieldKey;
  state.selectOptionDrafts = { ...state.selectOptionDrafts, [optionsKey]: value };
}

function handleTemplateEditorLanguageChange(languageCode) {
  const supported = SUPPORTED_LANGUAGES.some((entry) => entry.code === languageCode);
  const targetLanguage = supported ? languageCode : DEFAULT_LANGUAGE;
  if (state.templateEditorLanguage === targetLanguage) {
    return;
  }
  state.templateEditorLanguage = targetLanguage;
  renderBackoffice();
}

function handleTemplateDraftChange(languageCode, value) {
  state.templateDrafts = { ...state.templateDrafts, [languageCode]: value };
}

function applyTemplateUpdate(languageCode) {
  const nextTemplate = getInitialContentHTML(languageCode);
  state.templateDrafts = { ...state.templateDrafts, [languageCode]: nextTemplate };
  if (languageCode === state.language) {
    const previousTemplate = (state.initialContentHTML || '').trim();
    if (!state.hasStarted || state.contentHTML.trim() === previousTemplate) {
      state.contentHTML = nextTemplate;
      state.initialContentHTML = nextTemplate;
      if (elements.editor) {
        elements.editor.innerHTML = nextTemplate;
      }
      state.guidelines = computeGuidelines(nextTemplate, state.glossary, state.language);
      pruneHiddenGuidelines();
      state.activeGuidelineId = null;
      state.blockingWarnings = detectBlockingIssues(nextTemplate, state.qaItems);
    } else {
      state.initialContentHTML = nextTemplate;
    }
  }
}

function handleTemplateSave(languageCode) {
  const draft = state.templateDrafts[languageCode] || '';
  const trimmed = draft.trim();
  const nextTemplates = { ...customProcedureTemplates };
  if (trimmed.length === 0) {
    delete nextTemplates[languageCode];
  } else {
    nextTemplates[languageCode] = sanitizeTemplateContent(trimmed);
  }
  customProcedureTemplates = nextTemplates;
  persistCustomTemplates(customProcedureTemplates);
  applyTemplateUpdate(languageCode);
  renderAll();
}

function handleTemplateReset(languageCode) {
  if (customProcedureTemplates[languageCode]) {
    const nextTemplates = { ...customProcedureTemplates };
    delete nextTemplates[languageCode];
    customProcedureTemplates = nextTemplates;
    persistCustomTemplates(customProcedureTemplates);
  }
  applyTemplateUpdate(languageCode);
  renderAll();
}

function handleExportConfig() {
  try {
    const selectOptions = normalizeSelectOptions(state.selectOptions, state.configDefaults);
    const templates = normalizeTemplateConfiguration(state.templateDrafts, procedureTemplateDefaults);
    const acronyms = getSortedAcronymEntries(DEFAULT_LANGUAGE);
    const exportData = { selectOptions, templates, acronyms };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
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
    window.alert(translate('export.configError'));
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

function openGlossary() {
  state.isGlossaryOpen = true;
  renderGlossary();
  if (elements.glossaryTermInput && typeof elements.glossaryTermInput.focus === 'function') {
    elements.glossaryTermInput.focus();
  }
}

function closeGlossary() {
  state.isGlossaryOpen = false;
  renderGlossary();
}

function handleGlossaryOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeGlossary();
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
    elements.editor.addEventListener('scroll', renderGuidelineMarkers);
    elements.editor.innerHTML = state.contentHTML;
  }
  if (elements.languageSelect) {
    elements.languageSelect.value = state.language;
    elements.languageSelect.addEventListener('change', (event) => setLanguage(event.target.value));
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
  if (elements.guidelinesHiddenToggle) {
    elements.guidelinesHiddenToggle.addEventListener('click', () => {
      state.showHiddenGuidelines = !state.showHiddenGuidelines;
      renderGuidelines();
    });
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
  if (elements.glossaryButton) {
    elements.glossaryButton.addEventListener('click', openGlossary);
  }
  if (elements.closeGlossaryButton) {
    elements.closeGlossaryButton.addEventListener('click', closeGlossary);
  }
  if (elements.glossaryOverlay) {
    elements.glossaryOverlay.addEventListener('click', handleGlossaryOverlayClick);
  }
  if (elements.glossaryForm) {
    elements.glossaryForm.addEventListener('submit', handleGlossaryFormSubmit);
  }
  if (elements.downloadGlossaryJsonButton) {
    elements.downloadGlossaryJsonButton.addEventListener('click', handleDownloadGlossaryJSON);
  }
  if (elements.glossaryTermInput) {
    elements.glossaryTermInput.addEventListener('input', handleGlossaryTermInput);
  }
  if (elements.glossaryDefinitionInput) {
    elements.glossaryDefinitionInput.addEventListener('input', handleGlossaryDefinitionInput);
  }
  if (elements.exportConfigButton) {
    elements.exportConfigButton.addEventListener('click', handleExportConfig);
  }

  window.addEventListener('resize', renderGuidelineMarkers);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (state.isBackofficeOpen) {
        closeBackoffice();
      }
      if (state.isPreviewOpen) {
        closePreview();
      }
      if (state.isGlossaryOpen) {
        closeGlossary();
      }
    }
  });
}

async function bootstrap() {
  try {
    const [configuration, logoImage] = await Promise.all([
      loadFieldConfigurationFromFile(),
      loadLogoImageSafely(LFB_LOGO_URL, 'lfb-logo'),
    ]);
    const configurationAcronyms = normalizeGlossaryEntries(configuration.acronyms);
    const normalizedSelectDefaults = normalizeSelectOptions(
      configuration.selectOptions,
      configuration.selectOptions
    );
    const normalizedTemplateDefaults = normalizeTemplateConfiguration(
      configuration.templates,
      PROCEDURE_TEMPLATES
    );

    procedureTemplateDefaults = normalizedTemplateDefaults;

    const previousInitialContent = state.initialContentHTML;
    const previousContent = state.contentHTML;

    state.configDefaults = normalizedSelectDefaults;
    state.selectOptions = loadInitialSelectOptions(normalizedSelectDefaults);
    state.selectOptionDrafts = createEmptyOptionDrafts();
    state.templateDrafts = createInitialTemplateDrafts();
    state.glossary = configurationAcronyms;

    const nextInitialContent = getInitialContentHTML(state.language);
    state.initialContentHTML = nextInitialContent;
    if (!state.hasStarted || normalizeForComparison(previousContent) === normalizeForComparison(previousInitialContent)) {
      state.contentHTML = nextInitialContent;
      if (elements.editor) {
        elements.editor.innerHTML = nextInitialContent;
      }
    }

    state.guidelines = computeGuidelines(state.contentHTML, state.glossary, state.language);
    state.blockingWarnings = detectBlockingIssues(state.contentHTML, state.qaItems);
    state.logoImageData = logoImage;
    synchronizeMetadataWithSelectOptions();
    renderAll();
    registerEventListeners();
    try {
      const glossaryData = await loadGlossaryData(configuration.acronyms);
      state.glossary = glossaryData;
      state.glossaryError = null;
    } catch (error) {
      state.glossaryError = translate('glossary.error');
    } finally {
      state.isGlossaryLoading = false;
      const previousActive = state.activeGuidelineId;
      state.guidelines = computeGuidelines(state.contentHTML, state.glossary, state.language);
      pruneHiddenGuidelines();
      if (previousActive) {
        const stillExists = state.guidelines.some((item) => getGuidelineId(item) === previousActive);
        state.activeGuidelineId = stillExists ? previousActive : null;
      }
      renderAll();
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de l'application :", error);
  }
}

bootstrap();
