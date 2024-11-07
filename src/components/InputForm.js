import React, { useState } from 'react';
import { calculateCalories } from '../utils/api';

const InputForm = ({ onResult }) => {
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState('');
    const [weight, setWeight] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputData = { activity, duration, intensity, weight };
        const result = await calculateCalories(inputData);
        onResult(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={activity} 
                onChange={(e) => setActivity(e.target.value)} 
                placeholder="Activity" 
                required 
            />
            <input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
                placeholder="Duration (minutes)" 
                required 
            />
            <input 
                type="text" 
                value={intensity} 
                onChange={(e) => setIntensity(e.target.value)} 
                placeholder="Intensity (light/moderate/high)" 
                required 
            />
            <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                placeholder="Weight (kg)" 
                required 
            />
            <button type="submit">Calculate</button>
        </form>
    );
};

export default InputForm;
