import React from 'react';

const Result = ({ result }) => {
    if (!result) return null;

    const { calories, externalInfo, message } = result;

    return (
        <div>
            <h3>Calories Burned: {calories || 'Error calculating'}</h3>
            {message && <p>{message}</p>}
            {externalInfo && <p>External Info: {externalInfo.error || JSON.stringify(externalInfo)}</p>}
        </div>
    );
};

export default Result;
