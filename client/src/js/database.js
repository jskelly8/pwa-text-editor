import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1); // DB connection and version
  const tx = db.transaction('jate', 'readwrite'); // New transaction with sepcified db and privileges
  const store = tx.objectStore('jate'); // Object store
  const result = await store.put({ id: 1, value: content }); // Add method on store, passing in content
  console.log('Data saved to the DB', result);
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll(); // GetAll method on store, getting all data in DB
  console.log('Data fetched from the DB', result);
  return result?.value;
}

initdb();
