let db;

const request = indexDB.open("transactions", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("new_transactions", { autoIncrment: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.online) {
    //
  }
};

request.error = function (event) {
  console.log(event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["new_transaction"], "readWrite");
  const transactionObjectStore = transaction.objectStore("new_transaction");
  transactionObjectStore.add(record);
}
