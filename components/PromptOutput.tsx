import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import FileUploader from './FileUploader';
import { ImageIcon } from './icons/ImageIcon';
import { VideoIcon } from './icons/VideoIcon';
import { MusicIcon } from './icons/MusicIcon';

interface PromptOutputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  imageFile: File | null;
  videoFile: File | null;
  audioFile: File | null;
  onImageFileChange: (file: File | null) => void;
  onVideoFileChange: (file: File | null) => void;
  onAudioFileChange: (file: File | null) => void;
  t: (key: string) => string;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ 
    prompt, 
    onPromptChange, 
    isLoading, 
    error,
    imageFile,
    videoFile,
    audioFile,
    onImageFileChange,
    onVideoFileChange,
    onAudioFileChange,
    t
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (prompt) {
            navigator.clipboard.writeText(prompt);
            setCopied(true);
        }
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-indigo-400" />
          <h2 className="text-lg font-semibold text-gray-200">{t('prompt_output_title')}</h2>
        </div>
        {prompt && !isLoading && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ClipboardIcon className="w-4 h-4" />
            {copied ? t('copied_button') : t('copy_button')}
          </button>
        )}
      </div>
      <div className="p-4 flex-grow relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800/50 flex flex-col items-center justify-center rounded-b-lg z-10">
            <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-gray-300">{t('generating_prompt_message')}</p>
          </div>
        )}
        {error && (
            <div className="text-red-400 bg-red-900/50 p-4 rounded-md mb-4">
                <p className="font-semibold">{t('error_title')}</p>
                <p>{error}</p>
            </div>
        )}
        {!isLoading && !error && !prompt && (
            <div className="text-center text-gray-500 flex items-center justify-center h-full">
                <p>{t('prompt_output_placeholder')}</p>
            </div>
        )}
        <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            readOnly={isLoading || !!error}
            placeholder=""
            className="w-full h-full bg-transparent text-gray-200 resize-none focus:outline-none text-base leading-relaxed"
            style={{ minHeight: '200px' }}
        />
      </div>

      <div className="p-4 border-t border-gray-700">
        <h3 className="text-md font-semibold text-gray-300 mb-3">{t('prompt_assets_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FileUploader
            label={t('asset_image')}
            accept="image/*"
            file={imageFile}
            setFile={onImageFileChange}
            icon={<ImageIcon className="w-8 h-8 text-gray-500" />}
            t={t}
          />
          <FileUploader
            label={t('asset_video')}
            accept="video/*"
            file={videoFile}
            setFile={onVideoFileChange}
            icon={<VideoIcon className="w-8 h-8 text-gray-500" />}
            t={t}
          />
          <FileUploader
            label={t('asset_music')}
            accept="audio/*"
            file={audioFile}
            setFile={onAudioFileChange}
            icon={<MusicIcon className="w-8 h-8 text-gray-500" />}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptOutput;