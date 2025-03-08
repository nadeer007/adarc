import React from 'react';

interface WrapperProps {
    children: React.ReactNode;
    className?: string; 
}

const Wrapper: React.FC<WrapperProps> = ({ children, className = '' }) => {
    return <div className={`px-[48px] max-lg:px-[30px] max-md:px-5 wr pt-[177px]  max-w-[1600px] items-center w-[100%] mx-auto my-0 ${className}`}>{children}</div>;
};

export default Wrapper;

