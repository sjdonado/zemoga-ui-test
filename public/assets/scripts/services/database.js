import { DB_SEED } from '../utils/constants.js';

const databaseName = 'ruleOfThumb';
const objectStoreName = 'publicFigures';

/**
 * Dummy data seed
 * @param {IDBDatabase} db
 * @param {Function} callback
 */
export const runSeed = (db, callback) => {
  const tx = db.transaction([objectStoreName], 'readwrite');
  const store = tx.objectStore(objectStoreName);

  for (let i = 0; i < DB_SEED.length; i += 1) {
    store.add({ ...DB_SEED[i], timestamp: Date.now() });
  }

  tx.oncomplete = () => {
    console.warn('[indexedDB]: seed ran');
    callback(null, true);
  };

  tx.onerror = ({ target }) => {
    console.error(`[indexedDB]: error running seed ${target.errorCode}`);
    callback(target.errorCode);
  };
};

/**
 * Get all public figures
 * @param {IDBDatabase} db
 * @param {Function} callback
 */
export const getAllPublicFigures = (db, callback) => {
  const tx = db.transaction([objectStoreName], 'readonly');
  const store = tx.objectStore(objectStoreName);

  const req = store.openCursor();
  const publicFigures = [];

  req.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor != null) {
      publicFigures.push(cursor.value);
      cursor.continue();
    } else {
      callback(null, publicFigures);
    }
  };
  req.onerror = ({ target }) => {
    console.error(`[indexedDB]: error in cursor request${target.errorCode}`);
    callback(target.errorCode);
  };
};

/**
 * Update public figure score
 * @param {IDBDatabase} db
 * @param {Number} id - Record id
 * @param {String} scoreName
 * @param {Number} value
 * @param {Function} callback
 */
export const udpatePublicFigureScore = (db, id, scoreName, value, callback) => {
  const tx = db.transaction([objectStoreName], 'readwrite');
  const store = tx.objectStore(objectStoreName);

  const req = store.openCursor();

  req.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor != null) {
      if (cursor.value.id === id) {
        const updateData = cursor.value;
        updateData.score[scoreName] = value;
        const updateReq = cursor.update(updateData);
        updateReq.onsuccess = () => {
          callback(null, true);
        };
        updateReq.onerror = ({ target }) => {
          console.error(
            `[indexedDB]: error in cursor update${target.errorCode}`,
          );
          callback(target.errorCode);
        };
      }
      cursor.continue();
    } else {
      callback(null, false);
    }
  };
  req.onerror = ({ target }) => {
    console.error(`[indexedDB]: error in cursor request${target.errorCode}`);
    callback(target.errorCode);
  };
};

/**
 * Init database
 * @param {Function} callback
 */
export const initDB = (callback) => {
  const dbReq = indexedDB.open(databaseName, 1);

  dbReq.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore(objectStoreName, {
      keyPath: 'id',
      autoIncrement: true,
    });
  };

  dbReq.onsuccess = (event) => {
    window.db = event.target.result;
    if (callback) callback();
  };

  dbReq.onerror = ({ target }) => {
    console.error(`[indexedDB]: error in cursor request${target.errorCode}`);
  };
};
