import axios from '../../utils/axiosInstance';


export const getPublicItem = async (formData) => {
    const {search} = formData
    const response = await axios.get(`/item/all?search=${search}`);

    return response.data;
};
