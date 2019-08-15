import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';



import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

class EditableTableRow extends Component {

    constructor(props) {
        super(props);

        var date = new Date(this.props.row.start);
        var start = new Date(this.props.row.start);
        var end = new Date(this.props.row.end);

        this.state = {
            editing: this.props.editing,
            valid: {
                date: true,
                start: true,
                end: true,
            },
            date: date,
            start: start,
            end: end,
            rating: this.props.row.rating,
            tasks: this.props.row.tasks,
        }

        this.startEditing = this.startEditing.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.dateOnChange = this.dateOnChange.bind(this);
        this.startOnChange = this.startOnChange.bind(this);
        this.endOnChange = this.endOnChange.bind(this);
        this.updateRow = this.updateRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.ratingSelected = this.ratingSelected.bind(this);
        this.taskOnChange = this.taskOnChange.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.createTableRow = this.createTableRow.bind(this);
        this.createEditableTableRow = this.createEditableTableRow.bind(this);
    }

    startEditing() {
        this.setState({
            editing: true,
        })
    }

    stopEditing() {
        this.setState({
            editing: false,
        })
    }

    updateRow() {
        var rowid = this.props.row.rowid
        var { start, end, rating, tasks } = this.state;
        if (this.checkValidation()) {
            this.props.update(rowid, start.getTime(), end.getTime(), rating, tasks)
            this.stopEditing();
        }
    }

    checkValidation() {
        var { valid } = this.state;
        return (valid.date & valid.start & valid.end);
    }

    deleteRow() {
        this.props.delete(this.props.row.rowid)
    }

    ratingSelected = event => {
        this.setState({
            rating: event.target.value,
        })
    };

    ratingItems() {
        var items = ['', 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        return (
            items.map(option => {
                if (!option) {
                    return (
                        <MenuItem key={0} value={''}>
                            {''}
                        </MenuItem>    
                    )
                }
                return (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                )
            })
        )
    }

    taskOnChange = e => {
        this.setState({
            tasks: e.target.value,
        })
    };

    dateOnChange(e) {
        // var result = e.target.value;
        var newDate = e.target.valueAsDate;
        var valid = this.state.valid;
        if (!newDate) {
            valid.date = false;
            this.setState({
                valid: valid,
            })
            return;
        } else {
            valid.date = true;
        }
        var { start, end } = this.state;
        var startHour = start.getHours(), startMin = start.getMinutes(),
            endHour = end.getHours(), endMin = end.getMinutes();
        var newStart = new Date(newDate.getTime()),
            newEnd = new Date(newDate.getTime());
        newStart.setHours(startHour);
        newStart.setMinutes(startMin);
        newEnd.setHours(endHour);
        newEnd.setMinutes(endMin);
        this.setState({
            date: newDate,
            start: start,
            end: end,
            valid: valid,
        })
    }

    startOnChange(e) {
        var startString = e.target.value;
        var valid = this.state.valid;
        if (!startString) {
            valid.start = false;
            this.setState({
                valid: valid,
            })
            return;
        } else {
            valid.start = true;
        }
        var newStart = new Date(this.state.date.getTime());
        newStart.setHours(startString.slice(0,2));
        newStart.setMinutes(startString.slice(3,5));

        var end = this.state.end;
        while (end - newStart < 0) {
            end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
        }
        while (end - newStart > 24 * 60 * 60 * 1000) {
            end = new Date(end.getTime() - 24 * 60 * 60 * 1000)
        }
        this.setState({
            start: newStart,
            end: end,
            valid: valid,
        })
    }

    endOnChange(e) {
        var endString = e.target.value;
        var valid = this.state.valid;
        if (!endString) {
            valid.end = false;
            this.setState({
                valid: valid,
            })
            return;
        } else {
            valid.end = true;
        }
        var newEnd = new Date(this.state.date.getTime());
        newEnd.setHours(endString.slice(0,2));
        newEnd.setMinutes(endString.slice(3,5));

        var start = this.state.start;
        while (newEnd - start < 0) {
            newEnd =  new Date(newEnd.getTime() + 60 * 60 * 24 * 1000)
        }
        while (newEnd -start > 24 * 60 * 60 * 1000) {
            newEnd =  new Date(newEnd.getTime() - 60 * 60 * 24 * 1000)
        }
        this.setState({
            end: newEnd,
            valid: valid,
        })
    }

    getDuration(start, end) {
        var ms = end - start
        var hr = Math.floor(ms / (1000 * 60 * 60) % 60);
        var min = Math.floor(ms / (1000 * 60) % 60);
        if (hr) {
            return hr + ' hours and ' + min + ' minutes'
        } else {
            return min + ' minutes'
        }
    }

    formatTimeInput(date) {
        var hr = date.getHours();
        var min = date.getMinutes();
        hr = (hr < 10) ? '0' + hr : hr;
        min = (min < 10) ? '0' + min : min;
        return hr + ':' + min;
    }

    formatTime(date) {
        var hr = date.getHours();
        var min = date.getMinutes();
        min = (min < 10) ? '0' + min : min;
        if (hr > 12) {
            hr = hr % 12;
            hr = (hr < 10) ? '0' + hr : hr;
            return hr + ':' + min + ' PM';
        } else {
            return hr + ':' + min + ' AM';
        }
    }

    actionButtons(editing, classes) {
        if (editing) {
            return (
                <React.Fragment>
                    <IconButton color={'primary'} className={classes.button} aria-label="delete" onClick={this.updateRow}>
                        <SaveIcon />
                    </IconButton>
                    <IconButton color={'secondary'} className={classes.button} aria-label="delete" onClick={this.deleteRow}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton color={'default'} className={classes.button} aria-label="delete" onClick={this.stopEditing}>
                        <CancelIcon />
                    </IconButton>
                </React.Fragment>
            )
        } else {
            return (
                <IconButton color={'primary'} className={classes.button} aria-label="delete" onClick={this.startEditing}>
                    <EditIcon />
                </IconButton>
            )
        }
    }


    createTableRow(rowid, date, start, end, rating, tasks, classes) {
        var duration = this.getDuration(start, end)
        var startTime = this.formatTime(start);
        var endTime = this.formatTime(end)

        return (
            <TableRow key={rowid}>
                <TableCell>{date.toLocaleDateString()}</TableCell>
                <TableCell>{startTime}</TableCell>
                <TableCell>{endTime}</TableCell>
                <TableCell>{duration}</TableCell>
                <TableCell>{rating}</TableCell>
                <TableCell>{tasks}</TableCell>
                <TableCell align="right">
                    { this.actionButtons(false, this.props.classes) }
                </TableCell>
            </TableRow>
        )
    }

    createEditableTableRow(rowid, date, start, end, rating, tasks, classes) {
        var duration = this.getDuration(start, end)
        var startTime = this.formatTimeInput(start);
        var endTime = this.formatTimeInput(end)

        return (
            <TableRow key={rowid}>
                <TableCell>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={start.toJSON().slice(0,10)}
                        onChange={this.dateOnChange}
                        className={classes.textField}
                    />
                </TableCell>
                <TableCell>
                {
                    <TextField
                        id="start"
                        type="time"
                        defaultValue={startTime}
                        onChange={this.startOnChange}
                        className={classes.textField}
                        inputProps={{
                            step: 60,
                        }}
                    />
                }
                </TableCell>
                <TableCell>
                {
                    <TextField
                        id="time"
                        type="time"
                        defaultValue={endTime}
                        onChange={this.endOnChange}
                        className={classes.textField}
                        inputProps={{
                            step: 60,
                        }}
                    />
                }
                </TableCell>
                <TableCell>
                    <TextField
                        disabled
                        id="standard-disabled"
                        value={duration}
                        className={classes.textField}
                        margin="normal"
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        id="standard-number"
                        type="number"
                        value={this.state.rating}
                        onChange={this.ratingSelected}
                        className={classes.textField}
                        margin="normal"
                        autoWidth
                        select
                    >
                        {this.ratingItems()}
                    </TextField>
                </TableCell>
                <TableCell>
                    <TextField
                        id="row-tasks"
                        className={classes.textField}
                        placeholder="task1, task2, task3"
                        defaultValue={this.state.tasks}
                        onChange={this.taskOnChange}
                        margin="normal"
                    />
                </TableCell>
                <TableCell align="right">
                    { this.actionButtons(this.state.editing, this.props.classes) }
                </TableCell>
            </TableRow>
        )
    }

    render() {

        var { classes } = this.props;
        var { editing, date, start, end, rating, tasks } = this.state;
        var rowid = this.props.row.rowid;

        return (
            (() => {
                if (editing) {
                    return this.createEditableTableRow(rowid, date, start, end, rating, tasks, classes);
                } else {
                    return this.createTableRow(rowid, date, start, end, rating, tasks, classes);
                }
            })()
        )
    }   
}

export default EditableTableRow;