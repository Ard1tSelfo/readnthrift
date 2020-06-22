"use strict";
import axios from "axios";

export default class BookService {
    constructor(){
    }
    
    static async getAllBooks() {
        try {
            const res = await axios.get("http://localhost:5000/books");
            return res.data
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
}