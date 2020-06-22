import axios from "axios";

export default class BookService {
    
    static async getAllBooks() {
        try {
            const res = await axios.get("http://localhost:5000/books");
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
}