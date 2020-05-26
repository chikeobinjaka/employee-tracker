const mysql = require("mysql");

// https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class MySqlDatabase {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

// **** Example usage ******
// const database = new MySqlDatabase(config);
// database
//   .query("SELECT * FROM some_table")
//   .then((rows) => database.query("SELECT * FROM other_table"))
//   .then((rows) => database.close());

// let someRows, otherRows;
// database
//   .query("SELECT * FROM some_table")
//   .then((rows) => {
//     someRows = rows;
//     return database.query("SELECT * FROM other_table");
//   })
//   .then((rows) => {
//     otherRows = rows;
//     return database.close();
//   })
//   .then(() => {
//     // do something with someRows and otherRows
//   });
