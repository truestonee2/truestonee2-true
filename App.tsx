import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import PromptOutput from './components/PromptOutput';
import GenerationOptions, { GenerationOptionsState, initialOptions } from './components/GenerationOptions';
import PromptHistory from './components/PromptHistory';
import { generateVideoPromptFromCode } from './services/geminiService';
import { useLocalization } from './hooks/useLocalization';

const App: React.FC = () => {
  const { language, setLanguage, t } = useLocalization();
  
  const [p5Code, setP5Code] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<GenerationOptionsState>(initialOptions);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  const handleGeneratePrompt = useCallback(async () => {
    if (!p5Code.trim()) {
      setError(t('error_code_empty'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const prompt = await generateVideoPromptFromCode(p5Code, options, {
        hasImage: !!imageFile,
        hasVideo: !!videoFile,
        hasAudio: !!audioFile,
      });
      setGeneratedPrompt(prompt);
      setPromptHistory(prev => [prompt, ...prev]);
    } catch (err) {
      console.error(err);
      setError(t('error_generation_failed'));
    } finally {
      setIsLoading(false);
    }
  }, [p5Code, options, imageFile, videoFile, audioFile, t]);

  const handleClearAll = useCallback(() => {
    setP5Code('');
    setGeneratedPrompt('');
    setOptions(initialOptions);
    setImageFile(null);
    setVideoFile(null);
    setAudioFile(null);
    setError(null);
    setPromptHistory([]);
  }, []);

  const handleClearCode = useCallback(() => {
    setP5Code('');
    setGeneratedPrompt('');
  }, []);
  
  const spinner = useMemo(() => (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {t('generating')}
    </>
  ), [t]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header language={language} setLanguage={setLanguage} t={t} />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8 flex-grow">
          <div className="lg:w-1/2 flex flex-col gap-6">
            <CodeInput 
              value={p5Code} 
              onChange={setP5Code} 
              onClearCode={handleClearCode}
              onClearAll={handleClearAll}
              t={t}
            />
            <GenerationOptions 
              options={options} 
              setOptions={setOptions} 
              p5Code={p5Code} 
              t={t}
            />
             {/* Desktop Generate Button */}
            <div className="hidden lg:block">
               <button
                  onClick={handleGeneratePrompt}
                  disabled={isLoading || !p5Code}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? spinner : t('generate_prompt_button')}
                </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col gap-6">
            <PromptOutput
              prompt={generatedPrompt}
              onPromptChange={setGeneratedPrompt}
              isLoading={isLoading}
              error={error}
              imageFile={imageFile}
              videoFile={videoFile}
              audioFile={audioFile}
              onImageFileChange={setImageFile}
              onVideoFileChange={setVideoFile}
              onAudioFileChange={setAudioFile}
              t={t}
            />
            <PromptHistory 
              history={promptHistory}
              onReuse={setGeneratedPrompt}
              onClearHistory={() => setPromptHistory([])}
              t={t}
            />
          </div>
        </div>
      </main>
      <footer className="w-full text-center p-4 text-gray-500 text-sm">
        <p>{t('footer_powered_by')}</p>
      </footer>

      {/* Sticky CTA for mobile */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 lg:hidden">
        <button
          onClick={handleGeneratePrompt}
          disabled={isLoading || !p5Code}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? spinner : t('generate_prompt_button')}
        </button>
      </div>
    </div>
  );
};

export default App;