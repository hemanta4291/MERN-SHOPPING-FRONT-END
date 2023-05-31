import axios from '../../utils/axiosInstance';


export const getPdf = async () => {
    const response = await axios.post(`/item/pdf`);

    return response.data;
};
