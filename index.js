const express = require('express');
const path = require('path');

// var counter = 1;
// function myFunc(arg) {
//   counter++;
//   console.log(`counter is now ` + counter);
// }
// setInterval(myFunc, 1000);

const states = {
    IDLE: {
        START: 'idle.start'
    },
    WORKING: {
        END: 'working.end'
    },
}
var state = states.IDLE;
timer = null;

function timerHandler(action) {


    switch(state[action]) {
        case states.IDLE.START:
            // Start the work timer
            timer = new Date();
            state = states.WORKING;
            break;

        case states.WORKING.END:
            // End the work timer and log new entry
            db.run("INSERT INTO timesheet VALUES ($start, $end, $tasks, $rating)", {
                $start: timer,
                $end: new Date(),
                $tasks: null,
                $rating: null,
            }, function(err) {
                if (err) {
                    console.log(err);
                    return -1;
                } else {
                    state = states.IDLE;
                    timer = null;
                }
            })
            break;
        
        default:
            console.log('failed');
            return -1
    }
    return 1;
}

// Idle.start
// Working.stop




// Connect to the database here!
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS timesheet (start DATETIME, end DATETIME, tasks TEXT, rating INT)");
});


var insertStatement = db.prepare("INSERT INTO timesheet VALUES (?,?,?,?)");
var updateStatement = db.prepare("UPDATE timesheet SET start = ?, end = ?, tasks = ?, rating = ? WHERE rowid = ?");
var deleteStatement = db.prepare("DELETE FROM timesheet WHERE rowid = ?");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.route('/timer')
    .get(function(req, res) {
        switch(state) {
            case states.IDLE:
                res.json({state: 'IDLE'});
                break;
            case states.WORKING:
                res.json({state: 'WORKING', start: timer})
                break;
        }
    })
    .put(function(req, res) {
        var action = req.query.action;
        // need to somehow convert action into the state action?
        
        var result = timerHandler(action);
        switch(result) {    
            case -1:
                res.send(action + ' failed!');
            case 1:
                res.send(action + ' successful!');
        }
    })


app.route('/api/timesheet')
    .get(function (req, res) {
        db.all("SELECT rowid, * FROM timesheet", (err, rows) => {
            res.json({result: 1, rows: rows});
        })
    })
    .post(function (req, res) {
        var data = req.query;
        db.run("INSERT INTO timesheet VALUES ($start, $end, $tasks, $rating)", {
            $start: data.start,
            $end: data.end,
            $tasks: data.tasks,
            $rating: data.rating,
        }, function(err) {
            if (err) {
                res.send({result: -1, error: err});
            } else {
                db.get("SELECT rowid, * FROM timesheet WHERE rowid = $rowid", {
                    $rowid: this.lastID,
                }, function(err, row) {
                    if (err) {
                        res.send({result: -1, error: err});
                    } else {
                        res.send({result: 1, row: row});
                    }
                })
            }
        })
    })


app.route('/api/timesheet/:rowid([0-9])')
    .get(function (req, res) {
        var rowid = req.params.rowid;
        db.get("SELECT rowid, * FROM timesheet WHERE rowid = $rowid", {
            $rowid: rowid,
        }, function(err, row) {
            if (err) {
                res.send({result: -1, error: err});
            } else {
                res.send({result: 1, row: row});
            }
        })
    })

    .post(function (req, res) {
        var data = req.query, rowid = req.params.rowid
        db.run("UPDATE timesheet SET start=$start,end=$end,tasks=$tasks,rating=$rating WHERE rowid=$rowid", {
            $start: data.start,
            $end: data.end,
            $tasks: data.tasks,
            $rating: data.rating,
            $rowid: rowid,
        }, function(err) {
            if (err) {
                res.send({result: -1, error: err});
            } else {
                db.get("SELECT rowid, * FROM timesheet WHERE rowid = $rowid", {
                    $rowid: rowid,
                }, function(err, row) {
                    if (err) {
                        res.send({result: -1, error: err});
                    } else {
                        res.send({result: 1, row: row});
                    }
                })
            }
        })
    })

    .delete(function (req, res) {
        var rowid = req.params.rowid;
        db.run("DELETE FROM timesheet WHERE rowid=$rowid", {
            $rowid: rowid,
        }, function(err) {
            if (err) {
                res.send({result: -1, error: err});
            } else {
                res.send({result: 1});
            }
        })
    })

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 8000;
app.listen(port);

console.log('App is listening on port ' + port);