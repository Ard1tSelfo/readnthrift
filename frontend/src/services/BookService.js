import axios from "axios";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default class BookService {
    static async getAllBooks() {
        try {
            const res = await axios.get("http://localhost:5000/books");
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getBookById(id) {
        try {
            const res = await axios.get(`http://localhost:5000/books/${id}`);
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}
