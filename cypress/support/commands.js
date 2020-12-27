Cypress.Commands.add('clearIndexedDB', async () => {
  const databases = await window.indexedDB.databases();

  await Promise.all(
    databases.map(
      ({ name }) => new Promise((resolve, reject) => {
        const request = window.indexedDB.deleteDatabase(name);

        request.addEventListener('success', resolve);
        request.addEventListener('blocked', resolve);
        request.addEventListener('error', reject);
      }),
    ),
  );
});
