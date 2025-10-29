const storage = {
  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (error) {
      console.error('Erreur de lecture du stockage', error);
      return fallback;
    }
  },
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde', error);
    }
  },
};

const AppVersion = 'v0.2.0';
document.getElementById('appVersion').textContent = AppVersion;

const groceriesKey = 'codex_groceries';
const categoriesKey = 'codex_categories';
const tasksKey = 'codex_task_lists';
const notesKey = 'codex_notes';
const themeKey = 'codex_theme';

const defaultCategories = [
  { id: crypto.randomUUID(), name: 'Fruits & Légumes' },
  { id: crypto.randomUUID(), name: 'Épicerie' },
  { id: crypto.randomUUID(), name: 'Produits Frais' },
  { id: crypto.randomUUID(), name: 'Hygiène & Maison' },
];

const categorySelect = document.getElementById('groceryCategory');
const groceryListEl = document.getElementById('groceryList');
const groceryForm = document.getElementById('groceryForm');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoryDialog = document.getElementById('categoryDialog');
const categoryForm = document.getElementById('categoryForm');

const taskListForm = document.getElementById('taskListForm');
const taskListsEl = document.getElementById('taskLists');
const taskListTemplate = document.getElementById('taskListTemplate');
const taskItemTemplate = document.getElementById('taskItemTemplate');

const noteForm = document.getElementById('noteForm');
const noteListEl = document.getElementById('noteList');
const noteListItemTemplate = document.getElementById('noteListItemTemplate');
const noteEditor = document.getElementById('noteEditor');
const noteEmptyState = document.getElementById('noteEmptyState');
const editorToolbar = document.getElementById('editorToolbar');

const tabs = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const themeToggle = document.getElementById('themeToggle');

const storedCategories = storage.load(categoriesKey, null);
let categories = Array.isArray(storedCategories) && storedCategories.length > 0 ? storedCategories : defaultCategories;
if (!storedCategories || storedCategories.length === 0) {
  storage.save(categoriesKey, categories);
}

let groceries = storage.load(groceriesKey, []);
let taskLists = storage.load(tasksKey, []);
let notes = storage.load(notesKey, []);
let activeNoteId = notes[0]?.id ?? null;

function saveCategories() {
  storage.save(categoriesKey, categories);
}

function saveGroceries() {
  storage.save(groceriesKey, groceries);
}

function saveTaskLists() {
  storage.save(tasksKey, taskLists);
}

function saveNotes() {
  storage.save(notesKey, notes);
}

function renderCategorySelect() {
  categorySelect.innerHTML = '';
  categories
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((category) => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
}

function renderGroceries() {
  groceryListEl.innerHTML = '';
  const grouped = categories.map((category) => ({
    category,
    items: groceries.filter((item) => item.categoryId === category.id),
  }));

  grouped
    .filter((group) => group.items.length > 0)
    .forEach((group) => {
      const section = document.createElement('section');
      section.className = 'category';

      const heading = document.createElement('h3');
      heading.textContent = group.category.name;
      section.appendChild(heading);

      const list = document.createElement('ul');
      group.items
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((item) => {
          const listItem = document.createElement('li');
          if (item.checked) listItem.classList.add('completed');

          const label = document.createElement('label');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = item.checked;
          checkbox.addEventListener('change', () => {
            item.checked = checkbox.checked;
            saveGroceries();
            renderGroceries();
          });

          const span = document.createElement('span');
          span.textContent = item.name;

          label.appendChild(checkbox);
          label.appendChild(span);

          const deleteBtn = document.createElement('button');
          deleteBtn.type = 'button';
          deleteBtn.className = 'icon-button';
          deleteBtn.textContent = '✕';
          deleteBtn.setAttribute('aria-label', `Supprimer ${item.name}`);
          deleteBtn.addEventListener('click', () => {
            groceries = groceries.filter((entry) => entry.id !== item.id);
            saveGroceries();
            renderGroceries();
          });

          listItem.appendChild(label);
          listItem.appendChild(deleteBtn);
          list.appendChild(listItem);
        });

      section.appendChild(list);
      groceryListEl.appendChild(section);
    });

  if (groceryListEl.children.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.innerHTML =
      "<p><strong>Votre liste est vide.</strong> Ajoutez des produits pour préparer votre prochaine sortie.</p>";
    groceryListEl.appendChild(empty);
  }
}

function renderTaskLists() {
  taskListsEl.innerHTML = '';
  taskLists.forEach((taskList) => {
    const node = taskListTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.listId = taskList.id;
    node.querySelector('h3').textContent = taskList.name;

    const form = node.querySelector('form');
    const input = form.querySelector('input[name="taskName"]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = input.value.trim();
      if (!name) return;
      taskList.tasks.push({ id: crypto.randomUUID(), name, done: false });
      saveTaskLists();
      input.value = '';
      renderTaskLists();
    });

    const list = node.querySelector('.task-items');
    taskList.tasks.forEach((task) => {
      const taskNode = taskItemTemplate.content.firstElementChild.cloneNode(true);
      taskNode.dataset.taskId = task.id;
      const checkbox = taskNode.querySelector('input[type="checkbox"]');
      const text = taskNode.querySelector('.task-text');
      text.textContent = task.name;
      if (task.done) text.classList.add('completed');
      checkbox.checked = task.done;

      checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
        saveTaskLists();
        text.classList.toggle('completed', task.done);
      });

      taskNode.querySelector('[data-action="delete-task"]').addEventListener('click', () => {
        taskList.tasks = taskList.tasks.filter((entry) => entry.id !== task.id);
        saveTaskLists();
        renderTaskLists();
      });

      list.appendChild(taskNode);
    });

    node.querySelector('[data-action="delete-list"]').addEventListener('click', () => {
      const confirmation = confirm(`Supprimer la liste « ${taskList.name} » ?`);
      if (!confirmation) return;
      taskLists = taskLists.filter((entry) => entry.id !== taskList.id);
      saveTaskLists();
      renderTaskLists();
    });

    taskListsEl.appendChild(node);
  });

  if (taskLists.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.innerHTML =
      "<p><strong>Aucune liste pour le moment.</strong> Créez une liste pour organiser vos actions.</p>";
    taskListsEl.appendChild(empty);
  }
}

function renderNotes() {
  noteListEl.innerHTML = '';
  noteEmptyState.classList.toggle('is-visible', !activeNoteId);
  if (!activeNoteId) {
    noteEditor.innerHTML = '';
  }
  notes.forEach((note) => {
    const node = noteListItemTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.noteId = note.id;
    node.querySelector('.note-title').textContent = note.title || 'Sans titre';
    node.querySelector('.note-preview').textContent = note.preview || 'Nouvelle note';

    node.querySelector('.note-button').addEventListener('click', () => {
      setActiveNote(note.id);
    });

    node.querySelector('[data-action="delete-note"]').addEventListener('click', (event) => {
      event.stopPropagation();
      const confirmation = confirm(`Supprimer la note « ${note.title || 'Sans titre'} » ?`);
      if (!confirmation) return;
      deleteNote(note.id);
    });

    const noteButton = node.querySelector('.note-button');
    if (note.id === activeNoteId) {
      node.classList.add('is-active');
      noteButton.setAttribute('aria-current', 'true');
    } else {
      noteButton.removeAttribute('aria-current');
    }

    noteListEl.appendChild(node);
  });

  if (notes.length === 0) {
    activeNoteId = null;
  }
}

function setActiveNote(noteId) {
  activeNoteId = noteId;
  const note = notes.find((entry) => entry.id === noteId);
  if (note) {
    noteEditor.innerHTML = note.content;
    noteEditor.dataset.noteId = noteId;
    noteEditor.setAttribute('data-placeholder', 'Commencez à écrire…');
    noteEmptyState.classList.remove('is-visible');
  } else {
    noteEditor.innerHTML = '';
    delete noteEditor.dataset.noteId;
    noteEmptyState.classList.add('is-visible');
  }
  renderNotes();
}

function deleteNote(noteId) {
  notes = notes.filter((entry) => entry.id !== noteId);
  saveNotes();
  if (noteId === activeNoteId) {
    activeNoteId = notes[0]?.id ?? null;
  }
  setActiveNote(activeNoteId);
}

function updateNoteContent() {
  if (!activeNoteId) return;
  const note = notes.find((entry) => entry.id === activeNoteId);
  if (!note) return;
  note.content = noteEditor.innerHTML;
  note.preview = noteEditor.textContent.trim().slice(0, 80);
  saveNotes();
  renderNotes();
}

function setupTabs() {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.classList.remove('is-active'));
      tab.classList.add('is-active');
      const target = tab.dataset.target;
      tabPanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.id === target);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function setupTheme() {
  const savedTheme = storage.load(themeKey, null);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.querySelector('.toggle-icon').textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.querySelector('.toggle-icon').textContent = isDark ? '☀️' : '🌙';
    storage.save(themeKey, isDark ? 'dark' : 'light');
  });
}

function init() {
  renderCategorySelect();
  renderGroceries();
  renderTaskLists();
  renderNotes();
  if (activeNoteId) {
    setActiveNote(activeNoteId);
  }
  setupTabs();
  setupTheme();

  groceryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('groceryName').value.trim();
    const categoryId = categorySelect.value;
    if (!name || !categoryId) return;
    groceries.push({ id: crypto.randomUUID(), name, categoryId, checked: false });
    saveGroceries();
    renderGroceries();
    groceryForm.reset();
    document.getElementById('groceryName').focus();
  });

  addCategoryBtn.addEventListener('click', () => {
    if (typeof categoryDialog.showModal === 'function') {
      categoryDialog.showModal();
    } else {
      const name = prompt('Nom de la nouvelle catégorie');
      if (!name) return;
      createCategory(name.trim());
    }
  });

  categoryForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  categoryDialog.addEventListener('close', () => {
    if (categoryDialog.returnValue === 'confirm') {
      const name = document.getElementById('newCategoryName').value.trim();
      if (!name) return;
      createCategory(name);
      document.getElementById('newCategoryName').value = '';
    }
  });

  taskListForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('taskListName').value.trim();
    if (!name) return;
    taskLists.push({ id: crypto.randomUUID(), name, tasks: [] });
    saveTaskLists();
    renderTaskLists();
    taskListForm.reset();
  });

  noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('noteTitle').value.trim();
    if (!title) return;
    const note = { id: crypto.randomUUID(), title, content: '', preview: '' };
    notes.unshift(note);
    saveNotes();
    noteForm.reset();
    renderNotes();
    setActiveNote(note.id);
  });

  noteEditor.addEventListener('input', () => {
    updateNoteContent();
  });

  editorToolbar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-command]');
    if (!button) return;
    const command = button.dataset.command;
    const value = button.dataset.value || null;
    noteEditor.focus();
    document.execCommand(command, false, value);
    updateNoteContent();
  });
}

function createCategory(name) {
  if (!name) return;
  const exists = categories.some((category) => category.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    alert('Cette catégorie existe déjà.');
    return;
  }
  const newCategory = { id: crypto.randomUUID(), name };
  categories.push(newCategory);
  saveCategories();
  renderCategorySelect();
  categorySelect.value = newCategory.id;
}

window.addEventListener('DOMContentLoaded', init);
