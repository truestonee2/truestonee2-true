import React, { useState } from 'react';
import Accordion from './ui/Accordion';
import { getAiRecommendations, RecommendationType } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';


// State and initial values can be exported to be used in App.tsx
export interface GenerationOptionsState {
  // Prompt Generation Options
  extractShapesColors: boolean;
  detectAnimation: boolean;
  interpretFunctions: boolean;
  interpretCustomFunctions: boolean;
  abstractAnimation: boolean;
  geometricMusic: boolean;
  organic: boolean;
  upbeatElectronic: boolean;

  // Video Settings
  enableDenoising: boolean;
  videoDuration: string;
  promptDetail: string;
  cameraAngle: string;
  aspectRatio: string;
  promptLanguage: string;

  // Style Suggestion
  relaxingAmbient: boolean;
  defaultMusic: string;
  glitchySFX: boolean;
  defaultPalette: string;
  styleNone: boolean;
}

export const initialOptions: GenerationOptionsState = {
  extractShapesColors: true,
  detectAnimation: true,
  interpretFunctions: false,
  interpretCustomFunctions: false,
  abstractAnimation: false,
  geometricMusic: false,
  organic: false,
  upbeatElectronic: false,

  enableDenoising: false,
  videoDuration: '10',
  promptDetail: 'Medium',
  cameraAngle: 'Frontal',
  aspectRatio: '16:9',
  promptLanguage: 'English',
  
  relaxingAmbient: false,
  defaultMusic: 'Calm Piano',
  glitchySFX: false,
  defaultPalette: 'Pastel',
  styleNone: false,
};

interface GenerationOptionsProps {
    options: GenerationOptionsState;
    setOptions: React.Dispatch<React.SetStateAction<GenerationOptionsState>>;
    p5Code: string;
    t: (key: string) => string;
}

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; disabled?: boolean; }> = ({ label, checked, onChange, disabled }) => (
  <label className={`flex items-center space-x-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
    <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="form-checkbox h-5 w-5 text-indigo-500 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-offset-gray-800" />
    <span className="text-gray-300">{label}</span>
  </label>
);

const Select: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; disabled?: boolean; children: React.ReactNode }> = ({ label, value, onChange, disabled, children }) => (
  <div className="flex flex-col space-y-1">
    <label className={`text-sm font-medium ${disabled ? 'text-gray-500' : 'text-gray-400'}`}>{label}</label>
    <select value={value} onChange={onChange} disabled={disabled} className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
      {children}
    </select>
  </div>
);

const AiSuggestButton: React.FC<{ onClick: () => void; isLoading: boolean; disabled: boolean; t: (key: string) => string; }> = ({ onClick, isLoading, disabled, t }) => (
    <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="flex items-center gap-1.5 text-sm px-2 py-1 rounded-md bg-indigo-600/50 text-indigo-200 hover:bg-indigo-600/80 disabled:bg-gray-600/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        title={t('ai_recommendation_tooltip')}
    >
        {isLoading ? <SpinnerIcon className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4" />}
        <span className="hidden sm:inline">{t('ai_recommendation_button')}</span>
    </button>
);


const GenerationOptions: React.FC<GenerationOptionsProps> = ({ options, setOptions, p5Code, t }) => {
    const [aiLoading, setAiLoading] = useState({ analysis: false, video: false, style: false });
    
    const handleChange = (field: keyof GenerationOptionsState, value: string | boolean) => {
        setOptions(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field: keyof GenerationOptionsState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(field, e.target.checked);
    };

    const handleSelectChange = (field: keyof GenerationOptionsState) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange(field, e.target.value);
    };

    const handleInputChange = (field: keyof GenerationOptionsState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(field, e.target.value);
    };

    const handleAiSuggest = async (type: RecommendationType) => {
        setAiLoading(prev => ({ ...prev, [type]: true }));
        try {
            const recommendations = await getAiRecommendations(p5Code, type);
            if (type === 'video' && recommendations.videoDuration) {
                recommendations.videoDuration = String(recommendations.videoDuration);
            }
            setOptions(prev => ({ ...prev, ...recommendations }));
        } catch (err) {
            console.error(`Failed to get AI recommendations for ${type}:`, err);
            alert(t('error_ai_recommendation') + type);
        } finally {
            setAiLoading(prev => ({ ...prev, [type]: false }));
        }
    };

    const isCodeEmpty = !p5Code.trim();

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-gray-200">{t('generation_options_title')}</h2>
            </div>
            <div className="p-4 space-y-4">
                <Accordion 
                    title={t('options_analysis_title')}
                    headerContent={
                        <AiSuggestButton 
                            onClick={() => handleAiSuggest('analysis')} 
                            isLoading={aiLoading.analysis} 
                            disabled={isCodeEmpty} 
                            t={t}
                        />
                    }
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                        <Checkbox label={t('analysis_shapes_colors')} checked={options.extractShapesColors} onChange={handleCheckboxChange('extractShapesColors')} />
                        <Checkbox label={t('analysis_animation')} checked={options.detectAnimation} onChange={handleCheckboxChange('detectAnimation')} />
                        <Checkbox label={t('analysis_interpret_functions')} checked={options.interpretFunctions} onChange={handleCheckboxChange('interpretFunctions')} />
                        <Checkbox label={t('analysis_interpret_custom_functions')} checked={options.interpretCustomFunctions} onChange={handleCheckboxChange('interpretCustomFunctions')} />
                        <Checkbox label={t('analysis_abstract')} checked={options.abstractAnimation} onChange={handleCheckboxChange('abstractAnimation')} />
                        <Checkbox label={t('analysis_geometric_music')} checked={options.geometricMusic} onChange={handleCheckboxChange('geometricMusic')} />
                        <Checkbox label={t('analysis_organic')} checked={options.organic} onChange={handleCheckboxChange('organic')} />
                        <Checkbox label={t('analysis_upbeat')} checked={options.upbeatElectronic} onChange={handleCheckboxChange('upbeatElectronic')} />
                    </div>
                </Accordion>
                <Accordion 
                    title={t('options_video_title')}
                    headerContent={
                        <AiSuggestButton 
                            onClick={() => handleAiSuggest('video')} 
                            isLoading={aiLoading.video} 
                            disabled={isCodeEmpty} 
                            t={t}
                        />
                    }
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium text-gray-400">{t('video_duration_label')}</label>
                            <input
                                type="number"
                                value={options.videoDuration}
                                onChange={handleInputChange('videoDuration')}
                                min="1"
                                max="180"
                                className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            />
                        </div>
                         <Select label={t('video_aspect_ratio_label')} value={options.aspectRatio} onChange={handleSelectChange('aspectRatio')}>
                            <option value="16:9">{t('aspect_ratio_16_9')}</option>
                            <option value="9:16">{t('aspect_ratio_9_16')}</option>
                            <option value="1:1">{t('aspect_ratio_1_1')}</option>
                            <option value="4:3">{t('aspect_ratio_4_3')}</option>
                        </Select>
                        <Select label={t('video_prompt_detail_label')} value={options.promptDetail} onChange={handleSelectChange('promptDetail')}>
                            {['Low', 'Medium', 'High', 'Detailed'].map(d => <option key={d} value={d}>{d}</option>)}
                        </Select>
                        <Select label={t('video_camera_angle_label')} value={options.cameraAngle} onChange={handleSelectChange('cameraAngle')}>
                            {['Frontal', 'Top-down', 'Isometric', "Worm's eye", "Bird's eye", 'Wide Shot'].map(a => <option key={a} value={a}>{a}</option>)}
                        </Select>
                         <Select label={t('video_prompt_language_label')} value={options.promptLanguage} onChange={handleSelectChange('promptLanguage')}>
                            <option value="English">English</option>
                            <option value="Korean">한국어</option>
                        </Select>
                        <div className="flex items-center pt-2">
                             <Checkbox label={t('video_denoising_label')} checked={options.enableDenoising} onChange={handleCheckboxChange('enableDenoising')} />
                        </div>
                    </div>
                </Accordion>
                <Accordion 
                    title={t('options_style_title')}
                    headerContent={
                        <AiSuggestButton 
                            onClick={() => handleAiSuggest('style')} 
                            isLoading={aiLoading.style} 
                            disabled={isCodeEmpty} 
                            t={t}
                        />
                    }
                >
                    <div className="space-y-4 pt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select label={t('style_music_label')} value={options.defaultMusic} onChange={handleSelectChange('defaultMusic')} disabled={options.styleNone}>
                                {['Calm Piano', 'Smooth Jazz', 'Synthwave', 'Chillhop'].map(m => <option key={m} value={m}>{m}</option>)}
                            </Select>
                             <Select label={t('style_palette_label')} value={options.defaultPalette} onChange={handleSelectChange('defaultPalette')} disabled={options.styleNone}>
                                {['Pastel', 'Monochromatic', 'Vibrant', 'Earthy'].map(p => <option key={p} value={p}>{p}</option>)}
                            </Select>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Checkbox label={t('style_relaxing_ambient')} checked={options.relaxingAmbient} onChange={handleCheckboxChange('relaxingAmbient')} disabled={options.styleNone} />
                            <Checkbox label={t('style_glitchy_sfx')} checked={options.glitchySFX} onChange={handleCheckboxChange('glitchySFX')} disabled={options.styleNone} />
                         </div>
                         <div className="pt-2 border-t border-gray-700/50">
                            <Checkbox label={t('style_none')} checked={options.styleNone} onChange={handleCheckboxChange('styleNone')} />
                         </div>
                    </div>
                </Accordion>
            </div>
        </div>
    );
};

export default GenerationOptions;