import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import BookService from "../../services/BookService";
import UserService from "../../services/UserService";
import BookshelfService from "../../services/BookshelfService";
import ReviewService from "../../services/ReviewService";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import NativeSelect from '@material-ui/core/NativeSelect';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2)
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
        marginBottom: theme.spacing(2)
    },
    pageButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    }
});

class CreateOffer extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            loading: false,
            book: null,
            error: null,
            user: null,
            price: 0,
            cover: null,
            condition: null,
            description: null
        };
    }

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
                name: event.target.name
            }
        });
    };

    render() {
        const { classes } = this.props;
        const { router, params, location, routes } = this.props;
        return (
            <div>
               <h1>Please give us some information about your book:</h1>
                <Paper className={classes.paper}>
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
                    <Divider style={{marginTop: "15px", marginBottom: "15px"}} variant="middle" />
                    <Grid>
                        <form>
                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                <InputLabel id="coverselect">What type of cover does your book have?</InputLabel>
                                <Select labelId="coverselect" id="coverselect"
                                //value={cover} onChange={handleChange}
                                >
                                    <MenuItem value={'Hardcover'}>Hardcover</MenuItem>
                                    <MenuItem value={'Softcover'}>Softcover</MenuItem>
                                </Select>
                            </FormControl>

                            <br/><br/>

                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                <InputLabel id="conditionselect">What is the condition of your book?</InputLabel>
                                <Select labelId="conditionselect" id="conditionselect"
                                //value={condition} onChange={handleChange}
                                >
                                    <MenuItem value={'New'}>New</MenuItem>
                                    <MenuItem value={'Used, no traces of use'}>Used, no traces of use</MenuItem>
                                    <MenuItem value={'Used, medium traces of use'}>Used, medium traces of use</MenuItem>
                                    <MenuItem value={'Used, sever traces of use'}>Used, sever traces of use</MenuItem>
                                </Select>
                            </FormControl>

                            <br/><br/>

                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-amount"
                                  type="number"
                                  //value={values.amount}
                                  //onChange={handleChange('amount')}
                                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                  labelWidth={60}
                                />
                            </FormControl>

                            <br/><br/>

                            <TextField
                              id="outlined-multiline-static"
                              label="Give a short description:"
                              multiline
                              rows={5}
                              fullWidth
                              defaultValue=""
                              variant="outlined"
                              value={this.state.notice} onChange={e => this.setState({ notice: e.target.value})}
                              />
                             

                        </form>
                    </Grid>
                </Paper>
                

                <Button
                    className={classes.pageButton}
                    variant="contained"
                    color="primary"
                    textAlign="left"
                    disableElevation
                    //onClick={this.handleOpenBookshelfModal}
                >
                    Place my offer
                </Button>
            </div>
        );
    }
}

export default withStyles(useStyles)(CreateOffer);