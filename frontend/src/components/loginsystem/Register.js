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
import { Paper, InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import BackgroundImage from "../../assets/images/background.jpg";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit">Read 'n' Thrift</Link> {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

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
        marginTop: theme.spacing(3),
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

// eslint-disable-next-line
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

class Register extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: "",
            lastTouchedElement: null
        };
    }

    validateForm = (value, name) => {
        if (value === "" && this.state.lastTouchedElement === name) {
            return "This field is required";
        }

        if (name === 'password' && value.length < 6 && this.state.lastTouchedElement === name) {
            return "Password should be at least 6 characters long";
        }

        if (name === 'email' && !emailPattern.test(value) && this.state.lastTouchedElement === name) {
            return "Not a valid E-Mail address"
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
            lastTouchedElement: name
        });
    };

    onSubmit = async (event) => {
        event.preventDefault();

        const userInput = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
        };

        try {
            await axios.post("http://localhost:5000/users", userInput);
            alert("User successfully registered. You can log in with your credentials.")
            this.props.history.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() { }

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
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!!this.validateForm(this.state.firstname, "firstname")}
                                    helperText={this.validateForm(this.state.firstname, "firstname")}
                                    name="firstname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                    value={this.state.firstname}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!!this.validateForm(this.state.lastname, "lastname")}
                                    helperText={this.validateForm(this.state.lastname, "lastname")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!this.validateForm(this.state.email, "email")}
                                    helperText={this.validateForm(this.state.email, "email")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!this.validateForm(this.state.password, "password")}
                                    helperText={this.validateForm(this.state.password, "password")}
                                    variant="outlined"
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
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" style={{ width: "100%" }} required>
                                    <InputLabel id="select-role" required>
                                        Role
                                    </InputLabel>
                                    <Select
                                        labelId="select-role-label"
                                        id="select-role"
                                        value={this.state.role}
                                        onChange={this.handleInputChange}
                                        label="Role"
                                        name="role"
                                        required
                                        variant="outlined"
                                    >
                                        <MenuItem value={"Reader"}>Reader</MenuItem>
                                        <MenuItem value={"Local Bookstore"}>
                                            Local Bookstore
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={
                                this.state.firstname === "" ||
                                this.state.lastname === "" ||
                                this.state.password === "" ||
                                this.state.role === "" ||
                                this.state.email === ""
                            }
                        >
                            Register
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="../login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Paper>
            </div>
        );
    }
}

export default withStyles(useStyles)(Register);
