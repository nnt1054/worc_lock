import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Title from './Title';
import WorkClock from './WorkClock';
import TimeSeriesChart from './TimeSeriesChart'
import Timesheet from './Timesheet';

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
    },
    toolbar: {
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: {
        ...theme.mixins.toolbar,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    button: {
        // margin: theme.spacing(1),
    },
    icon: {
        margin: theme.spacing(2),
    },
    textField: {
        // height: '32px',
    },
      MuiSelect: {
        // see https://github.com/mui-org/material-ui/issues/9826
        select: {
          padding: undefined,
          paddingRight: theme.spacing.unit * 4,
          height: undefined,
        },
        selectMenu: {
          lineHeight: undefined,
        },
      },
    
});


const API = 'http://localhost:8000/api';
const TIMER_QUERY = '/timer'
const STAT_QUERY = '/statistics'

class App extends Component {


    constructor(props) {
        super(props);
        
        this.state = {
            timerState: 'haha',
            weekHours: 0,
            chartData: [],
        };

    }

    componentDidMount() {
        this.interval = setInterval(() => fetch(API + TIMER_QUERY)
            .then(response => response.json())
            .then(data => {
                if (data.state !== this.state.timerState) {
                    this.setState({
                        timerState: data.state,
                    })
                }
            }), 1000);

        fetch(API + STAT_QUERY)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    weekHours: data.hours,
                    chartData: data.data,
                })
            })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const state = this.state.timerState;
        const { classes } = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return (
            <div className={ classes.root }>
                <CssBaseline />
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            ADD ME ON LINKEDIN
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Work Clock */ }
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <WorkClock />
                                </Paper>
                            </Grid>
                            {/* Time Series Chart*/}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <TimeSeriesChart data={this.state.chartData}/>
                                </Paper>
                            </Grid>
                            {/* Statistics */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <Typography component="h2" variant="h2" color="primary" align="left">
                                        { Math.round(this.state.weekHours * 100) / 100 }
                                    </Typography>
                                    <Title> Hours Worked <br/> This Week </Title>
                                </Paper>
                            </Grid>
                            {/* Timesheet */ }
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Timesheet classes={classes} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

// export default App;
export default withStyles(useStyles, { withTheme: true })(App);
    