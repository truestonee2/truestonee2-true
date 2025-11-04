
import React, { useState } from 'react';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    headerContent?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = true, headerContent }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-700/80 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-gray-700/50 hover:bg-gray-700/80 transition-colors duration-200"
                aria-expanded={isOpen}
            >
                <h3 className="font-semibold text-gray-200">{title}</h3>
                <div className="flex items-center gap-2">
                    {headerContent}
                    <ChevronDownIcon
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    />
                </div>
            </button>
            {isOpen && (
                <div className="p-4 border-t border-gray-700/80">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
