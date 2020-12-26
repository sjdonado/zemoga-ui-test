'use strict';

const databaseName = 'ruleOfThumb';
const objectStoreName = 'publicFigures';

const dbSeed = [
  {
    url: 'assets/images/kanye.jpg',
    name: 'Kanye West',
    date: '1 month ago',
    category: 'Entertainment',
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Voluptate, suscipit.`,
    score: {
      thumbsUp: 64,
      thumbsDown: 36,
    },
  },
  {
    url: 'assets/images/mark.jpg',
    name: 'Mark Zuckerberg',
    date: '1 month ago',
    category: 'Business',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit',
    score: {
      thumbsUp: 36,
      thumbsDown: 64,
    },
  },
  {
    url: 'assets/images/cristina.jpg',
    name: 'Cristina Fernández de Kirchner',
    date: '1 month ago',
    category: 'Politics',
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Voluptate, suscipit.`,
    score: {
      thumbsUp: 36,
      thumbsDown: 64,
    },
  },
  {
    url: 'assets/images/malala.jpg',
    name: 'Malala Yousafzai',
    date: '1 month ago',
    category: 'Entertainment',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit',
    score: {
      thumbsUp: 64,
      thumbsDown: 36,
    },
  },
];

/**
 * Dummy data seed
 * @param {IDBDatabase} db
 * @param {Function} callback
 */
function runSeed(db, callback) {
  const tx = db.transaction([objectStoreName], 'readwrite');
  const store = tx.objectStore(objectStoreName);

  for (let data of dbSeed) {
    store.add({ ...data, timestamp: Date.now() });
  }

  tx.oncomplete = function () {
    console.log('seed ran');
    callback(null, true);
  };

  tx.onerror = function (event) {
    console.log('error running seed ' + event.target.errorCode);
    callback(event.target.errorCode);
  };
}

/**
 * Get all public figures
 * @param {IDBDatabase} db
 * @param {Function} callback
 */
function getAllPublicFigures(db, callback) {
  const tx = db.transaction([objectStoreName], 'readonly');
  const store = tx.objectStore(objectStoreName);

  const req = store.openCursor();
  const publicFigures = [];

  req.onsuccess = function (event) {
    let cursor = event.target.result;
    if (cursor != null) {
      publicFigures.push(cursor.value);
      cursor.continue();
    } else {
      callback(null, publicFigures);
    }
  };
  req.onerror = function (event) {
    console.log('error in cursor request' + event.target.errorCode);
    callback(event.target.errorCode);
  };
}

/**
 * Update public figure score
 * @param {IDBDatabase} db
 * @param {Number} id - Record id
 * @param {String} scoreName
 * @param {Number} value
 * @param {Function} callback
 */
function udpatePublicFigureScore(db, id, scoreName, value, callback) {
  const tx = db.transaction([objectStoreName], 'readwrite');
  const store = tx.objectStore(objectStoreName);

  const req = store.openCursor();

  req.onsuccess = function (event) {
    let cursor = event.target.result;
    if (cursor != null) {
      if (cursor.value.id === id) {
        const updateData = cursor.value;
        updateData.score[scoreName] = value;
        const updateReq = cursor.update(updateData);
        updateReq.onsuccess = function () {
          callback(null, true);
        };
        updateReq.onerror = function (event) {
          console.log('error in cursor update' + event.target.errorCode);
          callback(event.target.errorCode);
        };
      }
      cursor.continue();
    } else {
      callback(null, false);
    }
  };
  req.onerror = function (event) {
    console.log('error in cursor request' + event.target.errorCode);
    callback(event.target.errorCode);
  };
}

/**
 * Init database
 * @param {Function} callback
 */
function initDB(callback) {
  const dbReq = indexedDB.open('ruleOfThumb', 1);

  dbReq.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore(objectStoreName, {
      keyPath: 'id',
      autoIncrement: true,
    });
    window.db = db;
    if (callback) callback(db);
  };

  dbReq.onsuccess = function (event) {
    const db = event.target.result;
    if (callback) callback(db);
  };

  dbReq.onerror = function (event) {
    console.log('error opening database ' + event.target.errorCode);
  };
}

initDB();
