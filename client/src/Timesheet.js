import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

class Timesheet extends Component {

    render() {
        console.log(this.props.data); 


        return (
            <React.Fragment>
                <Title> Timesheet </Title>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell align="right">Task(s)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.data.map(row => {
                                var start = new Date(row.start);
                                var end = new Date(row.end);
                                var duration = end - start
                                var hours = Math.floor(duration / (1000 * 60 * 60) % 60);
                                var minutes = Math.floor(duration / (1000 * 60) % 60);
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
                                    <TableCell align="right">worc_lock</TableCell>
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
