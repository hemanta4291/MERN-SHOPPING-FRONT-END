import axios from "../../utils/axiosInstance";


export const signInUser = async (formData) => {

    try{
        const response = await axios.post("/user/login",formData);

        return response.data;

    }
    catch (error) {
        throw error.response.data
    }
};
