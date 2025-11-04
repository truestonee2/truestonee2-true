import React, { useRef, useState, useEffect, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface FileUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  accept: string;
  icon: React.ReactNode;
  label: string;
  t: (key: string) => string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ file, setFile, accept, icon, label, t }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (file) {
      objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // Check if the dropped file type is accepted
        const droppedFile = e.dataTransfer.files[0];
        const acceptedTypes = accept.split(',').map(t => t.trim());
        const isTypeAccepted = acceptedTypes.some(type => {
            if (type.endsWith('/*')) {
                return droppedFile.type.startsWith(type.slice(0, -1));
            }
            return droppedFile.type === type;
        });

        if(isTypeAccepted) {
            setFile(droppedFile);
        } else {
            alert(`${t('error_invalid_file_type')} ${accept}`);
        }
    }
  }, [accept, setFile, t]);

  const renderPreview = () => {
    if (!previewUrl || !file) return null;
    const fileType = file.type.split('/')[0];

    switch (fileType) {
      case 'image':
        return <img src={previewUrl} alt="Preview" className="max-h-24 w-auto object-contain rounded-md" />;
      case 'video':
        return <video src={previewUrl} controls className="max-h-24 w-full object-contain rounded-md" />;
      case 'audio':
        return <audio src={previewUrl} controls className="w-full" />;
      default:
        return <p className="text-sm text-gray-400 break-all">{file.name}</p>;
    }
  };

  return (
    <div
      className={`relative group bg-gray-700/50 border-2 border-dashed ${isDragging ? 'border-indigo-500 bg-indigo-900/30' : 'border-gray-600'} rounded-lg p-4 flex flex-col items-center justify-center text-center transition-colors duration-200 h-48`}
      onClick={() => !file && inputRef.current?.click()}
      onDragEnter={handleDragEvents}
      onDragOver={handleDragEvents}
      onDragLeave={handleDragEvents}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      {file && previewUrl ? (
        <div className="flex flex-col items-center justify-between h-full w-full">
          {renderPreview()}
          <p className="text-xs text-gray-400 mt-2 break-all w-full truncate" title={file.name}>{file.name}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-1 right-1 p-1.5 bg-gray-800/70 text-gray-300 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500/80 hover:text-white transition-all duration-200"
            title={t('remove_file_tooltip')}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {icon}
          <p className="mt-2 text-sm font-semibold text-gray-300">{label}</p>
          <p className="text-xs text-gray-500 mt-1">{t('file_uploader_instruction')}</p>
        </>
      )}
    </div>
  );
};

export default FileUploader;