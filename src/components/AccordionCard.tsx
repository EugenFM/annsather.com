import React from 'react';

interface AccordionCardProps {
    children: React.ReactNode;
}

const AccordionCard: React.FC<AccordionCardProps> = ({ children }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto mb-6">
            <div className="p-2 space-y-4 text-sm text-blue-900 leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default AccordionCard;
