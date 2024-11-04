import axios from 'axios';

export const calculateCalories = async (inputData) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/calculate', inputData);
        return {
            calories: response.data.calories,
            externalInfo: response.data.external_info,
        };
    } catch (error) {
        console.error('Error calculating calories:', error);
        return { calories: null, externalInfo: null };
    }
};
