import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    bookshelfModal: {
        marginTop: theme.spacing(16),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "auto",
        width: "35%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "25px",
    },
});

class AddBookToBookshelfModal extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Modal open={this.state.bookshelfModalOpen} onClose={this.handleCloseBookshelfModal}>
                <div className={classes.bookshelfModal}>
                    <Paper className={classes.bookshelfModalPaper}>
                        <Typography id="selectBookshelf">
                            Which bookshelf would you like to add the book to?
                        </Typography>
                        <Select
                            id="select-bookshelf"
                            value={
                                !this.state.selectedBookshelf.id
                                    ? "default"
                                    : this.state.selectedBookshelf.id
                            }
                            onChange={this.handleInputChange}
                            label="Select bookshelf"
                            name={this.state.selectedBookshelf.name}
                            required
                            variant="outlined"
                            style={{ width: "100%" }}
                        >
                            {!!this.state.bookshelves &&
                                this.state.bookshelves.map((booksh, i) => (
                                    <MenuItem key={i} value={booksh._id} name={booksh.name}>
                                        {booksh.name}
                                    </MenuItem>
                                ))}
                        </Select>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={this.handleAddBookSubmit}
                        >
                            Add book
                        </Button>
                    </Paper>
                </div>
            </Modal>
        );
    }
}

export default AddBookToBookshelfModal;
