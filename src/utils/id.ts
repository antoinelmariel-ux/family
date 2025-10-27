const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const alphabetLength = alphabet.length;

export function nanoid(size = 12): string {
  let id = '';
  const randomValues = crypto.getRandomValues(new Uint32Array(size));
  for (let i = 0; i < size; i += 1) {
    id += alphabet[randomValues[i] % alphabetLength];
  }
  return id;
}
