import React, { useState, useRef, useEffect } from 'react';
import { CodeIcon } from './icons/CodeIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import Modal from './ui/Modal';
import { getAiCodeAssistance, CodeAssistType } from '../services/geminiService';
import { SpinnerIcon } from './icons/SpinnerIcon';


interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onClearCode: () => void;
  onClearAll: () => void;
  t: (key: string) => string;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, onClearCode, onClearAll, t }) => {
  const [isAssistOpen, setIsAssistOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, content: string, type: CodeAssistType | null}>({title: '', content: '', type: null});
  const [isLoadingAssist, setIsLoadingAssist] = useState(false);
  const assistRef = useRef<HTMLDivElement>(null);

  const assistOptions: {labelKey: string, type: CodeAssistType}[] = [
      { labelKey: 'assist_refactor', type: 'refactor' },
      { labelKey: 'assist_interactive', type: 'interactive' },
      { labelKey: 'assist_creative', type: 'creative' },
      { labelKey: 'assist_explain', type: 'explain' },
  ];

  const handleAssistClick = async (type: CodeAssistType) => {
      setIsAssistOpen(false);
      setIsLoadingAssist(true);
      try {
          const result = await getAiCodeAssistance(value, type);
          const titleKey = type === 'explain' ? 'assist_explanation_title' : 'assist_new_code_title';
          setModalContent({ title: t(titleKey), content: result, type });
          setIsModalOpen(true);
      } catch (e) {
          alert(t('error_code_assist_failed'));
          console.error(e);
      } finally {
          setIsLoadingAssist(false);
      }
  }

  const applyCode = () => {
      if (modalContent.type !== 'explain' && modalContent.content) {
          const cleanedCode = modalContent.content.replace(/^```(javascript|js)?\n|```$/g, '').trim();
          onChange(cleanedCode);
      }
      setIsModalOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (assistRef.current && !assistRef.current.contains(event.target as Node)) {
            setIsAssistOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [assistRef]);


  return (
    <>
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-700 gap-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <CodeIcon className="w-6 h-6 text-cyan-400" />
          <h2 className="text-lg font-semibold text-gray-200">{t('code_input_title')}</h2>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <div className="relative" ref={assistRef}>
            <button
              onClick={() => setIsAssistOpen(prev => !prev)}
              disabled={!value || isLoadingAssist}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-cyan-600/50 text-cyan-200 hover:bg-cyan-600/80 disabled:bg-gray-600/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              title={t('ai_code_assist_tooltip')}
            >
              {isLoadingAssist ? <SpinnerIcon className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4" />}
              <span className="hidden sm:inline">{t('ai_code_assist_button')}</span>
            </button>
            {isAssistOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-700 rounded-md shadow-lg z-20 border border-gray-600/50">
                    <ul className="p-1">
                      {assistOptions.map(opt => (
                          <li key={opt.type}>
                            <button
                              onClick={(e) => { e.preventDefault(); handleAssistClick(opt.type); }}
                              className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-md transition-colors"
                            >
                                {t(opt.labelKey)}
                            </button>
                          </li>
                      ))}
                    </ul>
                </div>
            )}
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
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('assist_modal_title')}>
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-3">{modalContent.title}</h3>
        <div className="bg-gray-900 rounded-md p-4 max-h-[50vh] overflow-y-auto border border-gray-700">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words"><code>{modalContent.content}</code></pre>
        </div>
        <div className="flex justify-end mt-4 gap-2">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white font-semibold transition-colors">
              {t('assist_close')}
            </button>
            {modalContent.type !== 'explain' && (
                <button onClick={applyCode} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-semibold transition-colors">
                  {t('assist_apply_code')}
                </button>
            )}
        </div>
      </div>
    </Modal>
    </>
  );
};

export default CodeInput;
