import React from 'react';

interface AccordionCardProps {
    children: React.ReactNode;
}

const AccordionCard: React.FC<AccordionCardProps> = ({ children }) => {
    return (
        <div className="striped-bg shadow-lg overflow-hidden max-w-4xl mx-auto mb-6">
            <div className="p-2 space-y-4 text-base text-[#601f1f] leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default AccordionCard;
