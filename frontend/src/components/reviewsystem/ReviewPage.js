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
import SendIcon from '@material-ui/icons/Send';


class ReviewPage extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            accepted: false,
            notice: "",
            rating: 0
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        const review = {
            accepted: this.state.accepted,
            notice: this.state.notice,
            rating: this.state.rating,
        };

        axios.post("http://localhost:5000/reviews", review)
            .then((res) =>{
                console.log(res.data)
            });

        alert("Your review has been submitted for the further proceedings")

        this.setState({
            accepted: false,
            notice: "",
            rating: 0
        })
    };

    componentDidMount() {}

    render() {
        const { classes } = this.props;
        return (
            <div style = {{height:"100vh"}}>
                <br />
                <form>
                   <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Write review and give a rating for [Booktitle]</Typography>
                        <Rating name="customized-10"
                                defaultValue={0}
                                max={10} 
                                value={this.state.rating} onChange={e => this.setState({ rating: Number(e.target.value)})}
                        />
                    </Box>
                    <TextField
                    id="outlined-multiline-static"
                    label="Write your review here."
                    multiline
                    rows={20}
                    fullWidth
                    defaultValue=""
                    variant="outlined"
                    value={this.state.notice} onChange={e => this.setState({ notice: e.target.value})}
                    />
                    <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => this.onSubmit(e)}
                    endIcon={<SendIcon>send</SendIcon>}
                >
                    Submit
                </Button>
                </form>
            </div>
    );
    }
}

export default ReviewPage;
