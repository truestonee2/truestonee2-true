import React, { useState } from 'react';
import Accordion from './ui/Accordion';
import { HistoryIcon } from './icons/HistoryIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { ReuseIcon } from './icons/ReuseIcon';

interface PromptHistoryProps {
  history: string[];
  onReuse: (prompt: string) => void;
  onClearHistory: () => void;
  t: (key: string) => string;
}

const PromptHistory: React.FC<PromptHistoryProps> = ({ history, onReuse, onClearHistory, t }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const headerContent = history.length > 0 ? (
        <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent accordion from toggling
                if (window.confirm('Are you sure you want to clear the history?')) {
                     onClearHistory();
                }
            }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
            {t('clear_history_button')}
        </button>
    ) : undefined;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
       <Accordion title={t('prompt_history_title')} defaultOpen={false} headerContent={headerContent}>
            {history.length === 0 ? (
                <p className="text-gray-500 text-center py-4">{t('history_empty_placeholder')}</p>
            ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto p-1">
                    {history.map((prompt, index) => (
                        <li key={index} className="bg-gray-700/50 p-3 rounded-md group">
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                                {prompt}
                            </p>
                            <div className="flex items-center justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => handleCopy(prompt, index)}
                                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                                    title={t('copy_button')}
                                >
                                    <ClipboardIcon className="w-3.5 h-3.5" />
                                    {copiedIndex === index ? t('copied_button') : t('copy_button')}
                                </button>
                                <button 
                                    onClick={() => onReuse(prompt)}
                                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                                    title={t('reuse_button')}
                                >
                                    <ReuseIcon className="w-3.5 h-3.5" />
                                    {t('reuse_button')}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
       </Accordion>
    </div>
  );
};

export default PromptHistory;
