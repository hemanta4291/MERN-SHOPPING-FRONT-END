import axios from "../../utils/axiosInstance";


export const createUser = async (formData) => {
    try {

        const response = await axios.post("/user/register",formData);
        return response.data;
        
    } catch (error) {
            throw error.response.data
    }
};
