/**
 * @typedef {string} ID
 *
 * @typedef {Object} Tag
 * @property {ID} id
 * @property {string} name
 * @property {string} [color]
 *
 * @typedef {Object} Note
 * @property {ID} id
 * @property {string} title
 * @property {string} contentMD
 * @property {ID[]} tags
 * @property {number} createdAt
 * @property {number} updatedAt
 * @property {boolean} [pinned]
 *
 * @typedef {Object} Task
 * @property {ID} id
 * @property {string} title
 * @property {string} [note]
 * @property {string} [due]
 * @property {1|2|3} [priority]
 * @property {ID[]} tags
 * @property {string} [project]
 * @property {{ id: ID; title: string; done: boolean }[]} [subtasks]
 * @property {boolean} done
 * @property {number} createdAt
 * @property {number} updatedAt
 *
 * @typedef {Object} GroceryItem
 * @property {ID} id
 * @property {string} name
 * @property {string} [qty]
 * @property {string} [note]
 * @property {string} [category]
 * @property {ID} [storeId]
 * @property {boolean} checked
 * @property {number} [lastBoughtAt]
 *
 * @typedef {Object} Store
 * @property {ID} id
 * @property {string} name
 * @property {string[]} aisleOrder
 *
 * @typedef {'note' | 'task' | 'grocery'} ItemType
 */

export {};
