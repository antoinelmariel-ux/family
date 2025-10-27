export function formatDate(date) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short'
  });
}

export function isToday(date) {
  if (!date) return false;
  const today = new Date();
  const candidate = new Date(date);
  return (
    today.getFullYear() === candidate.getFullYear() &&
    today.getMonth() === candidate.getMonth() &&
    today.getDate() === candidate.getDate()
  );
}

export function isPast(date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const candidate = new Date(date);
  return candidate < today;
}
