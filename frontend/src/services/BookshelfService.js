import axios from "axios";

// TODO: make axios global to set this for each request - even in other services
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default class BookshelfService {
    static async getBookshelvesByUser(userid) {
        try {
            const res = await axios.get(`http://localhost:5000/users/me/bookshelves/${userid}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async addBookToBookshelf(bookshelfId, book) {
        try {
            const res = await axios.put(`http://localhost:5000/users/me/bookshelves/${bookshelfId}`, book);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getBookshelfById(bookshelfId) {
        try {
            const res = await axios.get(`http://localhost:5000/users/me/bookshelf/${bookshelfId}`);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    static async getBooksByBookshelfId(bookshelfId) {
        try {
            const res = await axios.get(`http://localhost:5000/users/me/bookshelf/books/${bookshelfId}`);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
 
}
