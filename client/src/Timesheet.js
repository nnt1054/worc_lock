import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAlarmIcon from '@material-ui/icons/AddAlarm'

import Title from './Title';

// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

// const useStyles = makeStyles(theme => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));
const API = 'http://localhost:8000/api';
const TIMESHEET_QUERY = '/timesheet'


class Timesheet extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            timesheet: [],
        }
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
                    <Grid item>
                        <IconButton color={'primary'} className={classes.button} aria-label="delete">
                            <AddAlarmIcon />
                        </IconButton>
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
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                                    <TableCell>{start.toLocaleDateString()}</TableCell>
                                    <TableCell>{start.toLocaleTimeString()}</TableCell>
                                    <TableCell>{start.toLocaleTimeString()}</TableCell>
                                    <TableCell>{duration}</TableCell>
                                    <TableCell>{2}</TableCell>
                                    <TableCell>worc_lock</TableCell>
                                    <TableCell align="right">
                                        <IconButton color={'primary'} className={classes.button} aria-label="delete">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color={'secondary'} className={classes.button} aria-label="delete" onClick={() => this.sendDeleteRequest(row.rowid)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }   

}

// export default function Orders() {
//   const classes = useStyles();
//   return (
//     <React.Fragment>
//       <Title>Recent Orders</Title>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Date</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Ship To</TableCell>
//             <TableCell>Payment Method</TableCell>
//             <TableCell align="right">Sale Amount</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map(row => (
//             <TableRow key={row.id}>
//               <TableCell>{row.date}</TableCell>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.shipTo}</TableCell>
//               <TableCell>{row.paymentMethod}</TableCell>
//               <TableCell align="right">{row.amount}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div className={classes.seeMore}>
//         <Link color="primary" href="javascript:;">
//           See more orders
//         </Link>
//       </div>
//     </React.Fragment>
//   );
// }

export default Timesheet;
