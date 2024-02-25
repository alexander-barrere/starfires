import React from 'react';

function Header() {
    return (
        <div className="header">
            <img src={`${process.env.PUBLIC_URL}/images/starfires_header.jpeg`} alt="Starfires Astrological Services" style={{ width: '100%', height: 'auto' }} />
        </div>
    );
}

export default Header;
