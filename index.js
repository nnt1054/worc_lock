const express = require('express');
const path = require('path');

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
                $start: timer.getTime(),
                $end: new Date().getTime(),
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


// Connect to the database here!
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS timesheet (start DATETIME, end DATETIME, tasks TEXT, rating INT)");
});

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", ["http://localhost:3000"]);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/test', function(req, res) {
    res.send('pepega');
})

app.route('/api/timer')
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
                res.json({result: result});
            case 1:
                res.json({result: result});
        }
    })

app.route('/api/timesheet')
    .get(function (req, res) {
        db.all("SELECT rowid, * FROM timesheet ORDER BY start DESC", (err, rows) => {
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

app.route('/api/timesheet/:rowid([0-9]+)')
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

app.get('/api/statistics', (req,res) => {
    var today = new Date();
    today.setHours(0); today.setMinutes(0);
    var week = 7 * 24 * 60 * 60 * 1000;
    var lastMonday = new Date(today.getTime() - week);
    while (lastMonday.getDay() != 1) {
        lastMonday = new Date(lastMonday.getTime() + 24 * 60 * 60 * 1000);
    }
    db.all("SELECT rowid, * FROM timesheet WHERE start > $lastMonday ORDER BY start DESC", {
        $lastMonday: lastMonday,
    }, (err, rows) => {
        var duration = 0;
        var data = {}
        rows.map(row => {
            duration = duration + (row.end - row.start);
            var day = new Date(row.start);
            var dayKey = day.toDateString();
            if (dayKey in data) {
                data[dayKey] += duration;
            } else {
                data[dayKey] = duration;
            }
        })
        var hours = duration / (60 * 60 * 1000);
        res.json({result: 1, hours: hours, duration: duration, rows: rows, data: data});
    })
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 8000;
app.listen(port);

console.log('App is listening on port ' + port);