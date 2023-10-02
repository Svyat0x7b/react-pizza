import React from 'react';

const NotFoundBlock: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', paddingBottom: '150px', marginTop: '200px' }}>
            <h1>Not Found :{'('}</h1>
            <span style={{ fontSize: '67px', fontWeight: 'bold' }}>404</span>
            <p>Unfortunately this page doesn`t exist in our website</p>
        </div>
    );
};

export default NotFoundBlock;
