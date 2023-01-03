// Migrate from MySQL to MongoDB

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'myjournal'
});

const db = require('monk')('localhost/myjournal')
const note = db.get('Note')

connection.connect();
 
connection.query('SELECT id, date, text FROM notes', function (error, results, fields) {
  if (error) throw error;
  results.forEach(data => {
    note.insert({
      body: data.text,
      created_at: data.date
    })
    console.log(data.id)
  })
});
 
connection.end();

return;