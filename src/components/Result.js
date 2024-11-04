import React from 'react';

const Result = ({ calories, externalInfo }) => {
    return (
        <div>
            <h3>Calories Burned: {calories}</h3>
            {externalInfo && (
                <div>
                    <h4>Additional Information:</h4>
                    <pre>{JSON.stringify(externalInfo, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Result;
