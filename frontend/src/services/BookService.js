import axios from "axios";

// TODO: make axios global to set this for each request - even in other services
axios.interceptors.request.use(config => {
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
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    static getBook(title) {
        try {
            axios.get(title).then(
                function (response) {console.log(response);
  })
        } catch (error) {
            console.log(error);
        }
    }
}