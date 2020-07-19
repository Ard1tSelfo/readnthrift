import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { withStyles } from "@material-ui/core/styles";
import BookstoreService from "../../services/BookstoreService";

const useStyles = (theme) => ({
    map: {
        maxHeight: "83%",
        maxWidth: "53%",
    },
});

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarker: {},
            showingInfoWindow: false,
            selectedPlace: {},
            bookstores: [],
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    };

    async componentDidMount() {
        try {
            const bookstores = await BookstoreService.getAllBookstores();
            this.setState({
                bookstores: [...bookstores],
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Map
                className={classes.map}
                google={this.props.google}
                zoom={13}
                initialCenter={{
                    lat: 48.142603,
                    lng: 11.577373,
                }}
                onClick={this.onMapClicked}
            >
                {this.state.bookstores.map((bookstore, i) => (
                    <Marker
                        key={i}
                        title={bookstore.name}
                        id={bookstore.id}
                        name={bookstore.name}
                        position={bookstore.position}
                        information={bookstore.description}
                        onClick={this.onMarkerClick}
                    />
                ))}

                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                    <div>
                        <h4>{!!this.state.activeMarker && this.state.activeMarker.name}</h4>
                        <h5>{!!this.state.activeMarker && this.state.activeMarker.information}</h5>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default withStyles(useStyles)(
    GoogleApiWrapper({
        apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
    })(MapContainer)
);
