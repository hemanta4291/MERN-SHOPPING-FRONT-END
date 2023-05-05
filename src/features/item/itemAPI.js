import axios from '../../utils/axiosInstance';



// show items
export const getItemAPI = async (formData) => {
    try{
        const {search} = formData
        const response = await axios.get(`/item/single-all?search=${search}`);
        return response.data;
    }
    catch (error) {
        throw error.response.data
}
};

export const signInUser = async (formData) => {

    const response = await sendRequest(post,"/user/login",formData);

    return response.data;
};

// create item
export const createItemAPI = async (item) => {
    try {
        const response = await axios.post("/item/create",item);

        return response.data;
    } catch (error) {
        throw error.response.data
    }
};

// update item
export const updateItemAPI = async ({id,name}) => {
    
    try{
        const response = await axios.put(`/item/update/${id}`,{name});
        return response.data;
    }
    catch (error) {
        throw error.response.data
    }
};


export const deleteItemAPI = async (id) => {

    try{
        const response = await axios.delete(`/item/delete/${id}`);

        return response.data;
    }
    catch (error) {
        throw error.response.data
    }
   
};