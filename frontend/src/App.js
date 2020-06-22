import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/loginsystem/Login";
import Register from "./components/loginsystem/Register";
import TableView from "./components/booklist/TableView";
import "./styling/App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#98ee99",
            main: "#66bb6a",
            dark: "#338a3e",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ee6d33",
            main: "#b53d00",
            dark: "#7f0100",
            contrastText: "#000",
        },
    },
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: true,
            authenticatedUser: {},
        };
    }

    render() {
        return (
            <Router>
                <ThemeProvider theme={theme}>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Dashboard}/>

                    <div className="App" style={appStyle.background}>
                        <Header/>
                        <div className="Content" style={contentStyle}>
                            {/*<Dashboard/>*/}
                            <TableView theme={theme}/>
                        </div>
                    </div>

                </ThemeProvider>
            </Router>
        );
    }
}

const appStyle = {
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#f5f5f5",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
};
const contentStyle = {
    marginLeft: theme.spacing(16),
    marginRight: theme.spacing(16),
};

export default App;
