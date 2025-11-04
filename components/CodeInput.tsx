import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onClearCode: () => void;
  onClearAll: () => void;
  t: (key: string) => string;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, onClearCode, onClearAll, t }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <CodeIcon className="w-6 h-6 text-cyan-400" />
          <h2 className="text-lg font-semibold text-gray-200">{t('code_input_title')}</h2>
        </div>
        {value && (
            <div className="flex items-center gap-2">
                 <button
                    onClick={onClearCode}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                    {t('clear_code_button')}
                </button>
                <button
                    onClick={onClearAll}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                    {t('reset_all_button')}
                </button>
            </div>
        )}
      </div>
      <div className="p-1 flex-grow">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('code_input_placeholder')}
          className="w-full h-full bg-transparent text-gray-300 font-mono resize-none focus:outline-none p-3 text-sm leading-relaxed"
          style={{ minHeight: '300px' }}
        />
      </div>
    </div>
  );
};

export default CodeInput;
