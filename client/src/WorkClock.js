import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const API = 'http://localhost:8000/api';
const TIMER_QUERY = '/timer'


class WorkClock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            state: 'IDLE',
            start: new Date(),
            duration: 0,
        }
        
        this.sendStartRequest = this.sendStartRequest.bind(this);
        this.sendEndRequest = this.sendEndRequest.bind(this);
    }

    componentDidMount() {
        this.watchState();
    }

    componentWillUnmount() {
        this.stopStopwatch();
        clearInterval(this.stateInterval);
    }


    watchState() {
        this.stateInterval = setInterval(() => {
            fetch(API + TIMER_QUERY)
                .then(response => response.json())
                .then(data => {
                    switch(data.state) {
                        case 'IDLE':
                            this.stopStopwatch();
                            this.setState({
                                state: data.state,
                            })
                            break;
                        case 'WORKING':
                            var startDate = new Date(data.start);
                            if (this.state.start !== startDate) {
                                this.setState({
                                    state: data.state,
                                    start: startDate,
                                });
                                this.startStopwatch();
                            }
                            break;
                        default:
                            console.log(data);
                    }
                })
        }, 1000)
    }

    sendStartRequest() {
        this.setState({
            state: 'WORKING',
            start: new Date(),
        })
        fetch(API + TIMER_QUERY + '?action=START', {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    sendEndRequest() {
        this.setState({
            state: 'IDLE',
        })
        fetch(API + TIMER_QUERY + '?action=END', {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
            })
    }

    startStopwatch() {
        clearInterval(this.stopwatchInterval);
        this.stopwatchInterval = setInterval(() => {
            var current = new Date();
            var duration = current - this.state.start;
            this.setState({
                duration: duration,
            })
        }, 100);
    }


    stopStopwatch() {
        clearInterval(this.stopwatchInterval);
    }

    render() {
        
        return (
            <React.Fragment>
                <Typography component="h1" variant="h1" color="primary" align="center">
                    {
                        function(ms) {
                            var hr = Math.floor(ms / (1000 * 60 * 60) % 60);
                            var min = Math.floor(ms / (1000 * 60) % 60);
                            var sec = Math.floor(ms / 1000 % 60);
                            hr = (hr < 10) ? '0' + hr : hr;
                            min = (min < 10) ? '0' + min : min;
                            sec = (sec < 10) ? '0' + sec : sec;
                            return hr + ':' + min + ':' + sec;
                        }(this.state.duration)
                    }
                </Typography>
                <Grid container spacing={3} justify='center' alignItems='center'>
                    <Grid item xs={6} sm={4} md={2} lg={2}>
                        <Button onClick={this.sendStartRequest} disabled={this.state.state === 'WORKING'} variant="outlined" color='primary' fullWidth>
                            Start Working
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2} lg={2}>
                        <Button onClick={this.sendEndRequest} disabled={this.state.state === 'IDLE'} variant="outlined" color='secondary' fullWidth>
                            End Session
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

// export default function WorkClock(props) {

//   return (
//     <React.Fragment>
//         <Typography component="h1" variant="h1" color="primary" align="center">
//             {props.children}
//         </Typography>
//         <Grid container spacing={3} justify='center' alignItems='center'>
//             <Grid item xs={6} sm={4} md={2} lg={2}>
//                 <Button variant="outlined" className={classes.button} color='primary' fullWidth>
//                     Start Working
//                 </Button>
//             </Grid>
//             <Grid item xs={6} sm={4} md={2} lg={2}>
//                 <Button variant="outlined" className={classes.button} color='secondary' fullWidth>
//                     End Session
//                 </Button>
//             </Grid>
//         </Grid>
//     </React.Fragment>
//   );
// }

// WorkClock.propTypes = {
//   children: PropTypes.node,
// };

export default WorkClock;