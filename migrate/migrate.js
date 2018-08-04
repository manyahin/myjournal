// Migrate from MySQL to MongoDB

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'diary'
});

const db = require('monk')('localhost/diary')
const notes = db.get('notes')

connection.connect();
 
connection.query('SELECT id, date, text FROM Note', function (error, results, fields) {
  if (error) throw error;
  results.forEach(data => {
    notes.insert({
      body: data.text,
      created_at: data.date
    })
    console.log(data.id)
  })
});
 
connection.end();

return;