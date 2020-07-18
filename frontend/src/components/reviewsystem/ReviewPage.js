import React, {Component} from 'react';
import axios from "axios";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class ReviewPage extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            accepted: false,
            notice: "",
            rating: 0,
            snackbaropen: false
        };
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({
            snackbaropen: false
        });
      };    

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

        this.setState({
            snackbaropen: true,
            accepted: false,
            notice: "",
            rating: 0
        })
    };

    componentDidMount() {}

    render() {
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
                <Snackbar open={this.state.snackbaropen} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity="success">
                        <Typography>Your review has been submitted!</Typography>
                    </Alert>
                </Snackbar>
            </div>
    );
    }
}

export default ReviewPage;
