import React, {Component} from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
//import StarBorderIcon from '@material-ui/icons/StarBorder';
//import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

class CrearteOffer extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: null,
            book: null,
            rating: 0
        };
    }

    onSubmit = (e) => {};

    componentDidMount() {}

    render() {
        const { classes } = this.props;
        return (
            <div style = {{height:"100vh"}}>
                <br />
                <Grid container style={{margin:0,width:"100%"}}>
                <Grid item alignItems="stretch" xs={6} >
                    <Paper elevation={2} style={{height:"100%"}}>
                        <h4>Fragen</h4>
                    </Paper>
                </Grid>
                <Grid item xs={6} direction="row" >
                    <Paper elevation={2} style={{height:"100%"}}>
                        <h4>Antworten</h4>



                        <form>
                   <Box component="fieldset" mb={3} borderColor="transparent">
                   <div className='row'>
                       <SearchIcon/>
                        <TextField
                        label="Name of the book or its author"
                        fullWidth
                        />
                    </div>
                    </Box>
                    <br />

                    <FormControl>
                    <Box>
                    
                    <NativeSelect
                    id="demo-customized-select-native"
                    //value={age}
                    //onChange={handleChange}
                    //input={<BootstrapInput />}
                    fullWidth
                    >
                    <option aria-label="None" value="" />
                    <option value={1}>Hardcover</option>
                    <option value={2}>Softcover</option>
                    </NativeSelect>
                    </Box>
                    <br/><br/>

                    <Box>
                    
                    <NativeSelect
                    id="demo-customized-select-native"
                    //value={age}
                    //onChange={handleChange}
                    //input={<BootstrapInput />}
                    fullWidth
                    >
                    <option aria-label="None" value="" />
                    <option value={1}>New</option>
                    <option value={2}>Used, no traces of use</option>
                    <option value={3}>Used, medium traces of use</option>
                    <option value={3}>Used, sever traces of use</option>
                    </NativeSelect>
                    </Box>
                </FormControl>
                    <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => this.onSubmit(e)}
                >
                    Submit
                </Button>
                </form>



              s
                    </Paper>
                </Grid>
            </Grid> 
            </div>
    );
    }


}

export default CrearteOffer;




/*                 <form>
                   <Box component="fieldset" mb={3} borderColor="transparent">
                   <div className='row'>
                       <SearchIcon/>
                        <TextField
                        label="Name of the book or its author"
                        fullWidth
                        />
                    </div>
                    </Box>
                    <br />

                    <FormControl>
                    <InputLabel htmlFor="demo-customized-select-native">Cover</InputLabel>
                    <NativeSelect
                    id="demo-customized-select-native"
                    //value={age}
                    //onChange={handleChange}
                    //input={<BootstrapInput />}
                    fullWidth
                    >
                    <option aria-label="None" value="" />
                    <option value={1}>Hardcover</option>
                    <option value={2}>Softcover</option>
                    </NativeSelect>
                </FormControl>
                    <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => this.onSubmit(e)}
                >
                    Submit
                </Button>
                </form>

                */