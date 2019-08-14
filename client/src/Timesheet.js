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
import EditableTableRow from './EditableTableRow';



const API = 'http://localhost:8000/api';
const TIMESHEET_QUERY = '/timesheet'


class Timesheet extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            timesheet: [],
        }
        
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    }

    componentDidMount() {
        this.refreshTimesheet();
    }

    refreshTimesheet() {
        fetch(API + TIMESHEET_QUERY)
            .then(response => response.json())
            .then(data => {
                if (data.result === 1) {
                    this.setState({
                        timesheet: data.rows,
                    })
                }
            })
    }

    sendDeleteRequest(rowid) {
        fetch(API + TIMESHEET_QUERY + '/' + rowid, {
            method: 'delete',
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === 1) {
                    this.refreshTimesheet()
                }
            })
    }

    tableClick(row,column,event) {
        // console.log(row, column, event);
    }

    actionButtons(editing, classes) {
        if (editing) {
            return (
                <React.Fragment>
                    <IconButton color={'primary'} className={classes.button} aria-label="delete">
                        <SaveIcon />
                    </IconButton>
                    <IconButton color={'secondary'} className={classes.button} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton color={'default'} className={classes.button} aria-label="delete">
                        <CancelIcon />
                    </IconButton>
                </React.Fragment>
            )
        } else {
            return (
                <IconButton color={'primary'} className={classes.button} aria-label="delete">
                    <EditIcon />
                </IconButton>
            )
        }
    }

    render() {

        if (this.props.refresh) {
            this.refreshTimesheet();            
        }

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid container spacing={3} justify='space-between' alignItems='center'>
                    <Grid item>
                        <Title> Timesheet </Title>
                    </Grid>
                </Grid>

                <Table size="medium" onClick={this.tableClick}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Task(s)</TableCell>
                            <TableCell align="right">
                                <IconButton color={'primary'} className={classes.button} aria-label="delete">
                                    <AddAlarmIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.timesheet.map(row => {
                                return (
                                    <EditableTableRow row={row} classes={classes} delete={this.sendDeleteRequest}/>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }   
}

export default Timesheet;
