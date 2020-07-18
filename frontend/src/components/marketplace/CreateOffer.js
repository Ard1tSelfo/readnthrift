import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import BookService from "../../services/BookService";
import UserService from "../../services/UserService";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";

const useStyles = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "60%"
    },
    button: {
        marginTop: theme.spacing(2),
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    pageButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    },
    typography: {
        marginBottom: theme.spacing(2),
    },
    formElement: {
        marginBottom: theme.spacing(2),
    },
});

class CreateOffer extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            loading: false,
            error: null,
            user: null,
            book: null,
            cover: null,
            condition: null,
            price: null,
            description: null,
            thumbnail: null,
            title: null,
            author: null,
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const offer = {
            user: this.state.user,
            book: this.state.book,
            cover: this.state.cover,
            condition: this.state.condition,
            price: this.state.price,
            description: this.state.description,
            open: true,
            thumbnail: this.state.book.thumbnail,
            title: this.state.book.title,
            author: this.state.book.author,
        };

        axios.post("http://localhost:5000/marketplace", offer).then((res) => {
            console.log(res.data);
            alert("Your offer has been created");
            this.props.history.push("/marketplace");
        });
    };

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const book = await BookService.getBookById(this.props.match.params.bookid);
            const user = await UserService.getCurrentUser();
            this.setState({
                user: user,
                book: book,
                loading: false,
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    handleInputChange = (event) => {
        this.setState({
            selectedBookshelf: {
                id: event.target.value,
                name: event.target.name,
            },
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper}>
                    <Typography className={classes.typography} component="h1" variant="h5">
                        Please provide some information about your book:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img
                                    className={classes.img}
                                    alt="Title"
                                    src={this.state.book ? this.state.book.thumbnail : ""}
                                />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="body1">
                                        {" "}
                                        {!!this.state.book && <text>{this.state.book.title}</text>}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Author:{" "}
                                        {!!this.state.book && <text>{this.state.book.author}</text>}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        ISBN:{" "}
                                        {!!this.state.book && <text>{this.state.book.isbn}</text>}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider style={{ marginTop: "15px", marginBottom: "15px" }} variant="middle" />
                    <Grid>
                        <form onSubmit={this.onSubmit}>
                            <Grid className={classes.formElement} item xs={12}>
                                <FormControl variant="outlined" style={{ width: "100%" }} required>
                                    <InputLabel required>Cover</InputLabel>
                                    <Select
                                        value={this.state.cover}
                                        onChange={(e) => this.setState({ cover: e.target.value })}
                                        label="Cover"
                                        required
                                        variant="outlined"
                                    >
                                        <MenuItem value={"Hardcover"}>Hardcover</MenuItem>
                                        <MenuItem value={"Softcover"}>Softcover</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid className={classes.formElement} item xs={12}>
                                <FormControl variant="outlined" style={{ width: "100%" }} required>
                                    <InputLabel required>Condition</InputLabel>
                                    <Select
                                        value={this.state.condition}
                                        onChange={(e) =>
                                            this.setState({ condition: e.target.value })
                                        }
                                        label="Condition"
                                        required
                                        variant="outlined"
                                    >
                                        <MenuItem value={"New"}>New</MenuItem>
                                        <MenuItem value={"Used, no traces of use"}>
                                            Used, no traces of use
                                        </MenuItem>
                                        <MenuItem value={"Used, medium traces of use"}>
                                            Used, medium traces of use
                                        </MenuItem>
                                        <MenuItem value={"Used, sever traces of use"}>
                                            Used, sever traces of use
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <FormControl
                                fullWidth
                                className={classes.margin}
                                variant="outlined"
                                className={classes.formElement}
                            >
                                <InputLabel required htmlFor="outlined-adornment-amount">
                                    Price
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    value={this.state.price}
                                    required
                                    onChange={(e) => this.setState({ price: e.target.value })}
                                    startAdornment={
                                        <InputAdornment position="start">$</InputAdornment>
                                    }
                                    labelWidth={60}
                                />
                            </FormControl>

                            <TextField
                                className={classes.formElement}
                                id="outlined-multiline-static"
                                label="Give a short description:"
                                multiline
                                rows={5}
                                fullWidth
                                defaultValue=""
                                variant="outlined"
                                value={this.state.description}
                                onChange={(e) => this.setState({ description: e.target.value })}
                            />

                            <Button
                                className={classes.pageButton}
                                variant="contained"
                                color="primary"
                                textAlign="left"
                                disableElevation
                                type="submit"
                            >
                                Place my offer
                            </Button>
                        </form>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(useStyles)(CreateOffer);
