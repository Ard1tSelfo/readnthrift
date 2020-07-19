import React, { Component } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import BackgroundImage from "../../assets/images/background.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4),
        width: "35%",
        marginLeft: "auto",
        marginRight: "auto",
        opacity: "95%",
        borderRadius: "25px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// eslint-disable-next-line
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

class Login extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAlertClick = this.handleAlertClick.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);

        this.state = {
            email: "",
            password: "",
            lastTouchedElement: null,
            alertOpen: false
        };
    }

    handleAlertClick = () => {
        this.setState({
            alertOpen: true
        })
    };

    handleAlertClose = (event) => {
        this.setState({
            alertOpen: false
        })
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
            lastTouchedElement: name
        });
    };

    validateForm = (value, name) => {

        if (value === "" && this.state.lastTouchedElement === name) {
            return "This field is required";
        }

        if (name === 'email' && !emailPattern.test(value) && this.state.lastTouchedElement === name) {
            return "Not a valid E-Mail address"
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const userInput = {
            email: this.state.email,
            password: this.state.password,
        };

        try {
            const res = await axios.post("http://localhost:5000/users/login", userInput);
            localStorage.setItem("token", res.data.token);
            this.props.history.push("/dashboard");
        } catch (error) {
            this.handleAlertClick()
            console.log(error);
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.background} style={{ minHeight: "100%", paddingTop: "5%" }}>
                <CssBaseline />
                <Paper elevation={2} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <TextField
                            error={!!this.validateForm(this.state.email, "email")}
                            helperText={this.validateForm(this.state.email, "email")}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            type="email"
                        />
                        <TextField
                            error={!!this.validateForm(this.state.password, "password")}
                            helperText={this.validateForm(this.state.password, "password")}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={this.state.email === "" || this.state.password === ""}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link href="../register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>

                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Paper>
                <Snackbar open={this.state.alertOpen} autoHideDuration={3000} onClose={this.handleAlertClose}>
                    <Alert onClose={this.handleAlertClose} onClick={this.handleAlertClose} severity="error">
                        Oops! False credentials!
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit">Read 'n' Thrift</Link> {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default withStyles(useStyles)(Login);
