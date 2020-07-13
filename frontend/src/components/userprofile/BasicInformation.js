import React, { Component } from "react";
import UserService from "../../services/UserService";
import {Typography } from "@material-ui/core";

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

    render() {
        return (
            <div>
                <Typography variant="body1">First Name: {!!this.state.user && this.state.user.firstname}</Typography>
                <Typography variant="body1">Last Name: {!!this.state.user && this.state.user.lastname}</Typography>
                <Typography variant="body1">Email: {!!this.state.user && this.state.user.email}</Typography>
                <Typography variant="body1">Role: {!!this.state.user && this.state.user.role}</Typography>
            </div>
        );
    }
}

export default BasicInformation;
