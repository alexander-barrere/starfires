// LabelInputContainer.js
import React from 'react';

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            {children}
        </div>
    );
};

export default LabelInputContainer;