import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import UserService from "../../services/UserService";

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
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class CreateBookshelfFormView extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            name: "",
            description: "",
            userloggedin: null,
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });
    };

    onSubmit = async (event) => {
        event.preventDefault();

        const userInput = {
            name: this.state.name,
            description: this.state.description,
            user: this.state.userloggedin,
        };

        try {
            const res = await axios.post(
                "http://localhost:5000/users/me/bookshelves/new",
                userInput
            );
            if (res.status === 201) {
                this.props.history.push("/dashboard");
            } else {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const user = await UserService.getCurrentUser();
            this.setState({
                userloggedin: user,
                loading: false,
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ minHeight: "100%", paddingTop: "5%" }}>
                <CssBaseline />
                <Paper elevation={2} className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Create a new bookshelf
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="name"
                            label="Give your new bookshelf a name"
                            name="name"
                            autoFocus
                            value={this.state.name}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            multiline
                            rows={3}
                            name="description"
                            label="Add a description of what your new bookshelf contains"
                            id="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create the new bookshelf
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default withStyles(useStyles)(CreateBookshelfFormView);
