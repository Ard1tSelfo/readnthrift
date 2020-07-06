import axios from "axios";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default class UserService {
    
    static async getCurrentUser() {
        try {
            const res = await axios.get("http://localhost:5000/users/me");
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error);
        } 
    }

    static isAuthenticated() {
        return !!window.localStorage['token'];
    }

}