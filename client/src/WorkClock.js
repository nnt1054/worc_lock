import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    // margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function WorkClock(props) {

  const classes = useStyles();

  return (
    <React.Fragment>
        <Typography component="h1" variant="h1" color="primary" align="center">
          {props.children}
        </Typography>
        <Grid container spacing={3} justify='center' alignItems='center'>
            <Grid item xs={3}>
                <Button variant="outlined" className={classes.button} color='primary' fullWidth='true'>
                    Start Working
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined" className={classes.button} color='secondary' fullWidth='true'>
                    End Session
                </Button>
            </Grid>
        </Grid>
    </React.Fragment>
  );
}

WorkClock.propTypes = {
  children: PropTypes.node,
};