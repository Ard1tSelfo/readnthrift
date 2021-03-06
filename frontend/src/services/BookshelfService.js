import axios from "axios";

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

    static async removeBookFromBookshelf(bookshelfId, book) {
        try {
            console.log(book)
            const res = await axios.put(`http://localhost:5000/users/me/bookshelf/deletebook/${bookshelfId}`, book);
            return res.data
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

    static async getRecommendationsForBookshelf(bookshelfId) {
        try {
            const res = await axios.get(`http://localhost:5000/recommendations/${bookshelfId}`);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteBookshelf(bookshelfId) {
        try {
            const res = await axios.delete(`http://localhost:5000/users/me/bookshelf/${bookshelfId}`);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
}
