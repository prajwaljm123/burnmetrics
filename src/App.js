import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Result from './components/Result';
import { calculateCalories } from './utils/api';

const App = () => {
    const [calories, setCalories] = useState(null);
    const [externalInfo, setExternalInfo] = useState('');

    const handleCalculate = async (inputData) => {
        const data = await calculateCalories(inputData); // Await the API call
        setCalories(data.calories);
        setExternalInfo(data.externalInfo);
    };

    return (
        <div className="App">
            <h1>Calorie Burn Predictor</h1>
            <InputForm onCalculate={handleCalculate} />
            {calories !== null && <Result calories={calories} externalInfo={externalInfo} />}
        </div>
    );
};

export default App;
