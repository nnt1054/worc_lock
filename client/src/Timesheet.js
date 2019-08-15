import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import AddAlarmIcon from '@material-ui/icons/AddAlarm'

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
        this.sendUpdateRequest = this.sendUpdateRequest.bind(this);
        this.sendCreateRequest = this.sendCreateRequest.bind(this);
        this.refreshTimesheet = this.refreshTimesheet.bind(this);
    }

    componentDidMount() {
        this.refreshInterval = setInterval(this.refreshTimesheet, 500);
        this.refreshTimesheet();
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
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

    sendUpdateRequest(rowid, start, end, rating, tasks) {
        if ( !start || !end ) {
            console.log('invalid!')
            return;
        }
        fetch(API + TIMESHEET_QUERY + '/' + rowid + '?'
            + 'start=' + encodeURIComponent(start) + '&'
            + 'end=' + encodeURIComponent(end) + '&'
            + 'rating=' + encodeURIComponent(rating) + '&'
            + 'tasks=' + encodeURIComponent(tasks)
        , {
            method: 'post'
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === 1) {
                    this.refreshTimesheet();
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
                    this.refreshTimesheet();
                }
            })
    }

    sendCreateRequest() {
        var start = new Date(), end = new Date();
        fetch(API + TIMESHEET_QUERY + '?'
            + 'start=' + encodeURIComponent(start) + '&'
            + 'end=' + encodeURIComponent(end) + '&'
            + 'rating=' + encodeURIComponent('') + '&'
            + 'tasks=' + encodeURIComponent('')
        , {
            method: 'post'
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === 1) {
                    this.refreshTimesheet();
                }
            })
    }

    refresh() {
        this.setState({
            refresh: !this.state.refresh,
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid container spacing={3} justify='space-between' alignItems='center'>
                    <Grid item>
                        <Title> Timesheet </Title>
                    </Grid>
                </Grid>

                <Table size="large" onClick={this.tableClick}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Task(s)</TableCell>
                            <TableCell align="right">
                                <IconButton color={'primary'} className={classes.button} aria-label="delete" onClick={this.sendCreateRequest}>
                                    <AddAlarmIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.timesheet.map(row => {
                                return (
                                    <EditableTableRow key={row.rowid} row={row} classes={classes} delete={this.sendDeleteRequest} update={this.sendUpdateRequest} />
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
