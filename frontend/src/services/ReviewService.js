import axios from "axios";
import UserService from "./UserService";

// TODO: make axios global to set this for each request - even in other services
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default class ReviewService {
    static async addReview(review) {
        try {
            const res = await axios.post(`http://localhost:5000/reviews`, review);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    static async getReviewsByBook(id) {
        try {
            const res = await axios.get(`http://localhost:5000/reviews/book/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}

