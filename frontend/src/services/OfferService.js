import axios from "axios";

// TODO: make axios global to set this for each request - even in other services
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default class OfferService {
    static async getAllOffers() {
        try {
            const res = await axios.get("http://localhost:5000/marketplace");
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getOfferById(id) {
        try {
            const res = await axios.get(`http://localhost:5000/marketplace/${id}`);
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getOffersByUser(userid) {
        try {
            const res =  await axios.get(`http://localhost:5000/marketplace/myoffers/:userid/${userid}`);
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}
