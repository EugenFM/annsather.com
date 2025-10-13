import React from 'react';

interface AccordionCardProps {
    children: React.ReactNode;
}

const AccordionCard: React.FC<AccordionCardProps> = ({ children }) => {
    return (
        <div className="bg-[#EAE6D2] rounded-xl shadow-lg overflow-hidden max-w-7xl mx-auto mb-6">
            <div className="p-2 space-y-4 text-base text-[#330000] leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default AccordionCard;
