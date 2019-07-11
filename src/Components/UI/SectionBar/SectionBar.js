import React from 'react';

const SectionBar = ({sectionName, style}) => {
    return (
        <div style={{...style}}>
            {sectionName}
        </div>
    );
};

export default SectionBar;