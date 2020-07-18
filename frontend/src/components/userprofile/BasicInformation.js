import React, { Component } from "react";
import UserService from "../../services/UserService";
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";


const useStyles = (theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        fontWeight: 600
    },
    avatar: {
        color: 'white',
        backgroundColor: '#66bb6a',
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    infoContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        textAlign: 'left',
        paddingLeft: '1rem'
    }
});

class BasicInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null
        };
    }

    async componentDidMount() {
        try {
            const user = await UserService.getCurrentUser();
            this.setState({
                user: user,
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    getNameAcronyms() {
        return `${this.state.user.firstname.charAt(0)}${this.state.user.lastname.charAt(0)}`;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrapper}>
                {!!this.state.user && <Avatar variant="square" className={classes.avatar}>{this.getNameAcronyms()}</Avatar>}
                <div className={classes.infoContainer}>
                    <Typography className={classes.label}>  {!!this.state.user ? ` Hello, ${this.state.user.firstname} ${this.state.user.lastname}` : ''} </Typography>
                    <Typography variant="body1"> {!!this.state.user && `You're logged in as a ${this.state.user.role}`}</Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(BasicInformation);
