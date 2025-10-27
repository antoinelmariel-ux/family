import { render, h, Fragment } from 'https://esm.sh/preact@10.19.4?target=es2019&dev=false';
import htm from 'https://esm.sh/htm@3.1.1?target=es2019&dev=false';

export { render, Fragment };
export const html = htm.bind(h);
