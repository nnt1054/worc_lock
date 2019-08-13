var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

db.serialize(function() {

    db.run("CREATE TABLE IF NOT EXISTS user (id INT, dt DATETIME)");

    // var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
    // for (var i = 0; i < 10; i++) {
  
    //     var d = new Date();
    //     var n = d.toISOString();
    //     stmt.run(i, d);
        
    // }

    // stmt.finalize();

    db.each("SELECT rowid, * FROM user", function(err, row) {
        var d = new Date(row.dt);
        // console.log(d, row.dt);
    });

    db.run("UPDATE user SET id = 1, dt = 1 WHERE rowid = 1")

    // db.run("INSERT INTO user VALUES ('hello', 420)")

    db.all("SELECT rowid, id, dt FROM user", function(err, rows) {
        console.log(rows);
    });
    

});

db.close();

// var sqlite3 = require('sqlite3').verbose();
// var file = "hr";
// var db = new sqlite3.Database(file);
// db.all("SELECT first_name,last_name FROM employees", function(err, rows) {
//         rows.forEach(function (row) {
//             console.log(row.first_name, row.last_name);
//         })
// 	});	
// db.close();