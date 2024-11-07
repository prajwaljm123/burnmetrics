import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Result from './components/Result';

function App() {
    const [result, setResult] = useState(null);

    const handleResult = (result) => {
        setResult(result);
    };

    return (
        <div>
            <h1>BurnMetrics: Calories Burned Calculator</h1>
            <InputForm onResult={handleResult} />
            <Result result={result} />
        </div>
    );
}

export default App;
