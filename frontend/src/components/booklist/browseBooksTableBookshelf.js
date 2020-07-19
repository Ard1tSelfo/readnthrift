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
import Modal from "@material-ui/core/Modal";
import UserService from "../../services/UserService";
import BookshelfService from "../../services/BookshelfService";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
 
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
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    deleteBookFromBookshelfPaper: {
        padding: theme.spacing(2),
        width: "100%"
    },
    deleteBookFromBookshelfModal: {
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
    button: {
        marginTop: theme.spacing(2)
    }
});
 
class BrowseBooksTableBookshelf extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteBookFromBookshelf = this.handleDeleteBookFromBookshelf.bind(this);

        this.state = {
            loading: false,
            deleteBookFromBookshelfModalOpen: false,
            selectedBook: null,
            bookshelves: null
        };
    }
 
    handleRowClick = (event, rowData) => {
        this.props.history.push(`/books/${rowData._id}`);
    }
 
    async componentDidMount() {
        this.setState({
            loading: true,
        });
 
        try {
            const user = await UserService.getCurrentUser();
            const bookshelves = await BookshelfService.getBookshelvesByUser(user._id);
            this.setState({
                user: user,
                loading: false,
                bookshelves: bookshelves
            });
        } catch (error) {
            //error.message
            this.setState({
                error: error,
            });
        }
    }
 
    handleOpenDeleteBookFromBookshelfModal = (bookid) => {
        this.setState({
            deleteBookFromBookshelfModalOpen: true,
            selectedBook: bookid
        });
    };
 
    handleCloseDeleteBookFromBookshelfModal = () => {
        this.setState({
            deleteBookFromBookshelfModalOpen: false,
        });
    };

    handleDeleteBookFromBookshelf = async (event) => {
        event.preventDefault();
        const requestBody = {
            books: this.state.selectedBook
        };
        try {
            await BookshelfService.removeBookFromBookshelf(this.props.bookshelf, requestBody);
            this.handleCloseDeleteBookFromBookshelfModal();
            window.location.reload(false);
        } catch (error) {
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
                            title: 'Cover',
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
                        { title: "Genre", field: "genre" },
                        { title: "Publisher", field: "publisher" },
                        { title: "ISBN", field: "isbn" },
                        { title: "# Pages", field: "pages", type: "numeric" },
                        { title: "Publication year", field: "publication", type: "numeric" },
                    ]}
                    data={this.props.data}
                    onRowClick={this.handleRowClick}
                    title={!!this.props.tablename ? this.props.tablename : "All books"}
                    isLoading={this.props.loading}
                    options={{}}
                    actions={[
                        {
                            title: "",
                            icon: tableIcons.Delete,
                            tooltip: "Remove from bookshelf",
                            onClick: (event, rowData) =>
                                this.handleOpenDeleteBookFromBookshelfModal(rowData._id)
                        },
                    ]}
                />
                <Modal open={this.state.deleteBookFromBookshelfModalOpen} onClose={this.handleCloseDeleteBookFromBookshelfModal}>
                    <div className={classes.deleteBookFromBookshelfModal}>
                        <Paper className={classes.deleteBookFromBookshelfPaper}>
                            <Typography id="confirmdeletebookshelftext">
                                Do your really want to delete the book {!!this.state.book && <text>{this.state.book.title}</text>} from this bookshelf?
                            </Typography>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                disableElevation
                                m={2}
                                onClick={this.handleDeleteBookFromBookshelf}
                            >
                                Yes, please delete this book
                            </Button>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                disableElevation
                                m={2}
                                onClick={this.handleCloseDeleteBookFromBookshelfModal}
                            >
                                No, I don't want to progress
                            </Button>
                        </Paper>
                    </div>
                </Modal>
            </div>
        );
    }
}
 
export default withRouter(withStyles(useStyles)(BrowseBooksTableBookshelf));
