const defaultCategories: Record<string, string> = {
  tomate: 'Fruits & Légumes',
  tomates: 'Fruits & Légumes',
  banane: 'Fruits & Légumes',
  lait: 'Laitier',
  fromage: 'Laitier',
  yaourt: 'Laitier',
  pain: 'Boulangerie',
  poulet: 'Boucherie',
  steak: 'Boucherie',
  riz: 'Épicerie',
  pâtes: 'Épicerie',
  oignon: 'Fruits & Légumes',
  pommes: 'Fruits & Légumes',
  oeufs: 'Épicerie',
  café: 'Épicerie'
};

export function guessCategory(name: string) {
  const key = name.normalize('NFD').replace(/[^\p{L}\p{N}]+/gu, '').toLowerCase();
  const entries = Object.entries(defaultCategories);
  for (const [word, category] of entries) {
    if (key.includes(word)) {
      return category;
    }
  }
  return 'Divers';
}
