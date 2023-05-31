import axios from "../../utils/axiosInstance";


export const getUser = async () => {

    try{
        const response = await axios.get("/user/get-users");

        return response.data;

    }
    catch (error) {
        throw error.response.data
    }
};

export const editUser = async (id) => {

    try{
        const response = await axios.get(`/user/single/${id}`);

        return response.data;

    }
    catch (error) {
        throw error.response.data
    }
};


export const updateUser = async (data) => {

    try{
        const {id,name,role} = data
        const response = await axios.put(`/user/update/${id}`,{name,role});

        return response.data;

    }
    catch (error) {
        throw error.response.data
    }
};


export const deleteUser = async (id) => {

    try{
        const response = await axios.delete(`/user/delete/${id}`);

        return response.data;

    }
    catch (error) {
        throw error.response.data
    }
};