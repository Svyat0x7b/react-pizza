import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
    <ContentLoader
        className="pizzaBlock"
        speed={2}
        width={280}
        height={456}
        viewBox="0 0 280 456"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="136" cy="135" r="130" />
        <rect x="-1" y="277" rx="7" ry="7" width="280" height="29" />
        <rect x="2" y="316" rx="8" ry="8" width="280" height="83" />
        <rect x="4" y="425" rx="2" ry="2" width="102" height="27" />
        <rect x="144" y="411" rx="26" ry="26" width="134" height="47" />
    </ContentLoader>
);

export default Skeleton;
