import axios from '../../utils/axiosInstance';


export const getPublicItem = async () => {

    const response = await axios.get("/item/all");

    return response.data;
};
