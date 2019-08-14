import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAlarmIcon from '@material-ui/icons/AddAlarm'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'



import Title from './Title';

const API = 'http://localhost:8000/api';
const TIMESHEET_QUERY = '/timesheet'


class EditableTableRow extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            editing: false,
            rating: this.props.row.rating,
            tasks: this.props.row.tasks,
        }
        
        this.startEditing = this.startEditing.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.ratingSelected = this.ratingSelected.bind(this);
        this.taskOnChange = this.taskOnChange.bind(this);
    }

    componentDidMount() {
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

    deleteRow(rowid) {
        this.props.delete(rowid)
        this.stopEditing();
    }

    ratingSelected = event => {
        this.setState({
            rating: event.target.value,
        })
    };

    taskOnChange = event => {
        this.setState({
            tasks: event.target.value,
        })
    };

    actionButtons(editing, classes) {
        if (editing) {
            return (
                <React.Fragment>
                    <IconButton color={'primary'} className={classes.button} aria-label="delete">
                        <SaveIcon />
                    </IconButton>
                    <IconButton color={'secondary'} className={classes.button} aria-label="delete" onClick={() => this.deleteRow(this.props.row.rowid)}>
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

    render() {

        var { classes } = this.props;
        var row = this.props.row;
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
                    {[null,1,2,3,4,5,6,7,8,9,10].map(option => {
                        return (
                            <MenuItem key={option} value={option} p={2}>
                                {option}
                            </MenuItem>
                        )
                    })}
                </TextField>
            </TableCell>
            <TableCell>
                <TextField
                    id="row-tasks"
                    className={classes.textField}
                    placeholder="task1, task2, task3"
                    value={this.state.tasks}
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
}

export default EditableTableRow;
