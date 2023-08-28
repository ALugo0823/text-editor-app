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

// here we add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  // opens our db 'jate', ver. 1
  const jateDb = await openDB("jate", 1);
  // starts a transaction on the jate database by reading and writing data
  const txt = jateDb.transaction("jate", "readwrite");
  // this is where our data will be stored
  const store = txt.objectStore("jate");
  // creates a put request method
  const request = store.put({ id: id, content: content });
  // Creating a variable named result where our requested data is stored
  const result = await request;
};
// here we add logic for a method that gets all the content from the database
export const getDb = async () => {
  const indexedDb = await openDB("jate", 1);
  const txt = indexedDb.transaction("jate", "readonly");
  const store = txt.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  return result?.value;
};
initdb();
