<IconButton color={'secondary'} className={classes.button} aria-label="delete" onClick={() => this.sendDeleteRequest(row.rowid)}>
    <DeleteIcon />
</IconButton>

<IconButton color={'secondary'} className={classes.button} aria-label="delete" onClick={() => this.sendDeleteRequest(row.rowid)}>
    <DeleteIcon />
</IconButton>
{
    (() => {
        if (row.rowid === 5) {
            return (
            <IconButton color={'secondary'} className={classes.button} aria-label="delete" onClick={() => this.sendDeleteRequest(row.rowid)}>
                <DeleteIcon />
            </IconButton>
            )
        }
    })()
}


                        {
                            this.state.timesheet.map(row => {
                                var start = new Date(row.start);
                                var end = new Date(row.end);
                                var duration = (function(start, end) {
                                    var ms = end - start
                                    var hr = Math.floor(ms / (1000 * 60 * 60) % 60);
                                    var min = Math.floor(ms / (1000 * 60) % 60);
                                    if (hr) {
                                        return hr + ' hours and ' + min + ' minutes'
                                    } else {
                                        return min + ' minutes'
                                    }
                                }(start, end));
                                
                                return (
                                    <TableRow key={row.rowid}>
                                    {console.log(row.rowid)}
                                    <TableCell>{start.toLocaleDateString()}</TableCell>
                                    <TableCell>{start.toLocaleTimeString()}</TableCell>
                                    <TableCell>{start.toLocaleTimeString()}</TableCell>
                                    <TableCell>{duration}</TableCell>
                                    <TableCell>
                                        {2}
                                    </TableCell>
                                    <TableCell>worc_lock</TableCell>
                                    <TableCell align="right">
                                        { this.actionButtons(false, classes) }
                                    </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        
                        
      <TextField
        id="standard-number"
        label="Number"
        value={values.age}
        onChange={handleChange('age')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />



                // <TextField
                //     disabled
                //     id="standard-disabled"
                //     value={duration}
                //     className={classes.textField}
                //     margin="normal"
                // />






{
"result":1,
"rows":[
{"rowid":5,
"start":"Wed Aug 14 2019 04:00:50 GMT-0700 (Pacific Daylight Time)stop=Wed Aug 14 2019 04:20:50 GMT-0700 (Pacific Daylight Time)rating=nulltasks=null",
"end":null,
"tasks":null,
"rating":null}, 



{"rowid":4,"start":1565780005986,"end":1565780093006,"tasks":null,"rating":null},{"rowid":3,"start":1565686397654,"end":1565688968352,"tasks":null,"rating":null}]}