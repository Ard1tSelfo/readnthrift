import React, { Component } from "react";
import MaterialTable from "material-table";
import { withStyles } from "@material-ui/core/styles";
import { forwardRef } from "react";
import { withRouter } from 'react-router-dom';
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import UserService from "../../services/UserService";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = (theme) => ({
    table: {
        marginBottom: theme.spacing(2),
    },
});

class BrowseOffersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: false,
            offer: null,
        };
    }

    handleRowClick = (event, rowData) => {
        this.props.history.push(`/offers/${rowData._id}`);
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });
 
        try {
            const user = await UserService.getCurrentUser();
            this.setState({
                user: user,
                loading: false,
            });
        } catch (error) {
            //TODO: error.message
            this.setState({
                error: error,
            });
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.table}>
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        {
                            title: ' ',
                            field: 'thumbnail',
                            render: rowData => (
                              <img
                                alt=""
                                style={{ height: 100 }}
                                src={rowData.thumbnail}
                              />
                            ),
                          },
                        { title: "Title", field: "title" },
                        { title: "Author", field: "author" },
                        { title: "Price, in $", field: "price"}
                    ]}
                    data={this.props.data}
                    onRowClick={this.handleRowClick}
                    title={!!this.props.tableTitle && this.props.tableTitle}
                    isLoading={this.props.loading}
                    options={{}}
                />
            </div> 
        );
    }
}

export default withRouter(withStyles(useStyles)(BrowseOffersTable));