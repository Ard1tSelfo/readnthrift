import React, { Component } from "react";
import UserService from "../../services/UserService";
import OfferService from "../../services/OfferService";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const useStyles = (theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    deleteBookshelfModal: {
        marginTop: theme.spacing(16),
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "auto",
        width: "35%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "25px",
        spacing: 1
    },
    priceTag: {
        fontWeight: 600
    }
});

class SwapOffersList extends Component {
    constructor(props) {
        super(props);

        this.handleCreateNewSwapOffer = this.handleCreateNewSwapOffer.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);

        this.state = {
            user: null,
            swapoffers: [],
            error: null,
        };
    }

    handleListItemClick = (event, swapofferid) => {
        this.props.history.push(`/offers/${swapofferid}`);
    };

    handleCreateNewSwapOffer = (event) => {
        this.props.history.push('/choosebook')
    };

    async componentDidMount() {
        try {
            const user = await UserService.getCurrentUser();
            const swapoffers = await OfferService.getOffersByUser(user._id);

            this.setState({
                user: user,
                swapoffers: [...swapoffers],
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {!!this.state.swapoffers &&
                        this.state.swapoffers.map((offer, i) => (
                            <ListItem button key={i}                       >
                                <img
                                    alt=""
                                    style={{ height: 80, marginRight: 15 }}
                                    src={offer.thumbnail}
                                    onClick={(event) => this.handleListItemClick(event, offer._id)}
                                />
                                <ListItemText primary={offer.title} secondary={offer.condition} onClick={(event) => this.handleListItemClick(event, offer._id)}>
                                </ListItemText>
                                <span className={classes.priceTag}> ${offer.price} </span>

                            </ListItem>
                        ))}
                    <Divider style={{ marginTop: "10px", marginBottom: "10px" }} variant="middle" />
                    <ListItem button onClick={(event) => this.handleCreateNewSwapOffer(event)}>
                        <ListItemIcon>
                            <AddBoxOutlinedIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Create new Offer" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(SwapOffersList));
