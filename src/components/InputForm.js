import React, { useState } from 'react';
import { calculateCalories } from '../utils/api';

const InputForm = ({ onCalculate }) => {
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState('light');
    const [weight, setWeight] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputData = { activity, duration, intensity, weight };
        const calories = await calculateCalories(inputData);
        onCalculate(calories);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Activity:</label>
                <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} required />
            </div>
            <div>
                <label>Duration (minutes):</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
            </div>
            <div>
                <label>Intensity:</label>
                <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="vigorous">Vigorous</option>
                </select>
            </div>
            <div>
                <label>Weight (kg):</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
            <button type="submit">Calculate</button>
        </form>
    );
};

export default InputForm;
