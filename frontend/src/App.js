import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/loginsystem/Login";
import Register from "./components/loginsystem/Register";
import "./styling/App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#98ee99",
            main: "#66bb6a",
            dark: "#338a3e",
            contrastText: "#fff"
        },
        secondary: {
            light: "#4c8c4a",
            main: "#1b5e20",
            dark: "#003300",
            contrastText: "#000"
        }
    }
});

class App extends Component {

    constructor(){
        super();
        this.state = {
            isLoggedIn: true
        }
    }
    render() {
        return (
            <Router>
                <ThemeProvider theme={theme}>
                    <div className="App" style={appStyle}>
                        {/*<Route path="/users/login" exact component={Login}/>*/}
                        <Header/>
                        <div className="Content" style={contentStyle}>
                            <Dashboard/>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        );
    }
}

const appStyle = {
    background: "#f5f5f5"
};
const contentStyle = {
    marginLeft: theme.spacing(16),
    marginRight: theme.spacing(16)
};

export default App;
