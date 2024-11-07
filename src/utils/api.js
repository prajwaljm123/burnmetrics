import axios from 'axios';

export const calculateCalories = async (inputData) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/calculate', inputData);
        return {
            calories: response.data.calories_burned,
            externalInfo: response.data.external_info,
            message: response.data.message,
        };
    } catch (error) {
        console.error('Error calculating calories:', error);
        if (error.response) {
            console.error('Server Response Data:', error.response.data); // Log detailed server error message
        }
        return { 
            calories: null, 
            externalInfo: null, 
            message: error.response?.data?.message || 'Error calculating calories' 
        };
    }
};
