import axios from "axios";

// TODO: make axios global to set this for each request - even in other services
/*axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});*/

export default class BookstoreService {
    static async getBookstore(userid) {
        try {
            const res = await axios.get(`http://localhost:5000/users/me/bookshelves/${userid}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async addBookToBookstore(bookstoreId, book) {
        try {
            const res = await axios.put(`http://localhost:5000/bookstores/${bookstoreId}`, book);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async removeBookFromBookstore(bookstoreId, book) {
        try {
            console.log(book)
            const res = await axios.put(`http://localhost:5000/bookstores/deletebook/${bookstoreId}`, book);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    static async getBooksByBookstoreId(bookstoreId) {
        try {
            const res = await axios.get(`http://localhost:5000/bookstore/books/${bookstoreId}`);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
}
