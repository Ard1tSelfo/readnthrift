import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/loginsystem/Login";
import Register from "./components/loginsystem/Register";
import TableView from "./components/booklist/TableView";
import UserProfile from "./components/userprofile/UserProfile";
import "./styling/App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import BookView from "./components/BookPage/BookView";
import Review from "./components/reviewsystem/ReviewPage";
import CreateBookshelf from "./components/bookshelf/CreateBookshelfFormView";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            !!localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login" }} />
            )
        }
    />
);

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#98ee99",
            main: "#66bb6a",
            dark: "#338a3e",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ffad42",
            main: "#f57c00",
            dark: "#bb4d00",
            contrastText: "#000",
        },
    },
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            authenticatedUser: null,
        };
    }

    render() {
        return (
            <Router>
                <ThemeProvider theme={theme}>
                    <div className="App" style={appStyle.background}>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Header />
                        </Switch>
                        <div className="Content" style={contentStyle}>
                            <Switch>
                                <ProtectedRoute path="/dashboard" component={Dashboard} />
                                <ProtectedRoute
                                    theme={theme}
                                    path="/browsebooks"
                                    component={TableView}
                                />
                                <ProtectedRoute
                                    theme={theme}
                                    path="/userprofile"
                                    component={UserProfile}
                                />
                                <Route path="/review" component={Review} />
                                <ProtectedRoute path="/bookshelves/newbookshelf" component={CreateBookshelf} />
                                <ProtectedRoute path="/books/:bookid" component={BookView} />
                            </Switch>
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
        minHeight: "100%",
        height: "auto",
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
