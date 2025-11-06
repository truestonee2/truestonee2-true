import { GoogleGenAI, Type } from "@google/genai";
import { GenerationOptionsState } from "../components/GenerationOptions";
import { translations } from '../translations';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION_EN = `You are an expert P5.js developer and a creative prompt engineer for text-to-video AI models like Sora and Veo. Your task is to analyze P5.js code and generate a concise, vivid, and descriptive prompt that captures the essence of the animation. The prompt should be cinematic and evocative.`;
const SYSTEM_INSTRUCTION_KO = `당신은 전문 P5.js 개발자이자 Sora, Veo와 같은 텍스트-비디오 AI 모델을 위한 창의적인 프롬프트 엔지니어입니다. 당신의 임무는 P5.js 코드를 분석하고 애니메이션의 본질을 포착하는 간결하고 생생하며 서술적인 프롬프트를 생성하는 것입니다. 프롬프트는 영화 같고 감성을 자극해야 합니다.`;

const getSystemInstruction = (language: string) => {
    if (language === 'Korean') {
        return SYSTEM_INSTRUCTION_KO;
    }
    return SYSTEM_INSTRUCTION_EN;
};

interface MediaAssets {
    hasImage: boolean;
    hasVideo: boolean;
    hasAudio: boolean;
}

const CORE_INSTRUCTION_EN = `Analyze the following P5.js sketch code and generate a descriptive, detailed, and cinematic prompt for a text-to-video model like Sora or Veo. The prompt should describe the visual elements, their motion, the overall style, and the mood of the animation.

Focus on describing what is visually happening, not the code itself. For example, instead of "a loop draws 50 circles with random colors," say "Dozens of vibrant, multi-colored circles pop into existence, shimmering and dancing across a dark canvas."`;

const CORE_INSTRUCTION_KO = `다음 P5.js 스케치 코드를 분석하여 Sora 또는 Veo와 같은 텍스트-비디오 모델을 위한 서술적이고 상세하며 영화 같은 프롬프트를 생성하세요. 프롬프트는 시각적 요소, 움직임, 전반적인 스타일 및 애니메이션의 분위기를 묘사해야 합니다.

코드 자체가 아닌 시각적으로 일어나는 일을 설명하는 데 집중하세요. 예를 들어, "루프가 무작위 색상으로 50개의 원을 그립니다" 대신 "활기차고 다채로운 수십 개의 원이 나타나 어두운 캔버스 위에서 반짝이며 춤을 춥니다"라고 표현하세요.`;


const PROMPT_TEMPLATE = (code: string, options: GenerationOptionsState, assets: MediaAssets) => {
    const lang = options.promptLanguage === 'Korean' ? 'ko' : 'en';
    const t = (key: string) => translations[lang][key] || key;

    // Maps for translating option values from English state to translation keys
    const detailMap: { [key: string]: string } = { 'Low': 'detail_low', 'Medium': 'detail_medium', 'High': 'detail_high', 'Detailed': 'detail_detailed' };
    const angleMap: { [key: string]: string } = { 'Frontal': 'angle_frontal', 'Top-down': 'angle_top_down', 'Isometric': 'angle_isometric', "Worm's eye": 'angle_worms_eye', "Bird's eye": 'angle_birds_eye', 'Wide Shot': 'angle_wide_shot' };
    const musicMap: { [key: string]: string } = { 'Calm Piano': 'music_calm_piano', 'Smooth Jazz': 'music_smooth_jazz', 'Synthwave': 'music_synthwave', 'Chillhop': 'music_chillhop' };
    const paletteMap: { [key:string]: string } = { 'Pastel': 'palette_pastel', 'Monochromatic': 'palette_monochromatic', 'Vibrant': 'palette_vibrant', 'Earthy': 'palette_earthy' };

    let optionsString = t('prompt_constraints_header') + '\n';
    
    // Prompt Generation Options
    const generationOptions = [];
    if (options.extractShapesColors) generationOptions.push(t('analysis_shapes_colors'));
    if (options.detectAnimation) generationOptions.push(t('analysis_animation'));
    if (options.interpretFunctions) generationOptions.push(t('analysis_interpret_functions'));
    if (options.interpretCustomFunctions) generationOptions.push(t('analysis_interpret_custom_functions'));
    if (options.abstractAnimation) generationOptions.push(t('analysis_abstract'));
    if (options.geometricMusic) generationOptions.push(t('analysis_geometric_music'));
    if (options.organic) generationOptions.push(t('analysis_organic'));
    if (options.upbeatElectronic) generationOptions.push(t('analysis_upbeat'));

    if (generationOptions.length > 0) {
        optionsString += `- ${t('prompt_analysis_aspects')}: ${generationOptions.join(', ')}.\n`;
    }

    // Video Settings
    optionsString += `- ${t('prompt_video_duration')} ${options.videoDuration} ${t('prompt_seconds')}.\n`;
    optionsString += `- ${t('prompt_aspect_ratio')} ${options.aspectRatio}.\n`;
    optionsString += `- ${t('prompt_detail_level')} ${t(detailMap[options.promptDetail])}.\n`;
    optionsString += `- ${t('prompt_camera_angle')} ${t(angleMap[options.cameraAngle])}.\n`;
    if (options.enableDenoising) {
        optionsString += `- ${t('prompt_denoising')}.\n`;
    }

    // Style Suggestion
    if (!options.styleNone) {
        const styleSuggestions = [];
        if(options.relaxingAmbient) styleSuggestions.push(t('style_relaxing_ambient'));
        if(options.glitchySFX) styleSuggestions.push(t('style_glitchy_sfx'));
        
        if (styleSuggestions.length > 0) {
            optionsString += `- ${t('prompt_style_elements')}: ${styleSuggestions.join(', ')}.\n`;
        }
        optionsString += `- ${t('prompt_music_style')} '${t(musicMap[options.defaultMusic])}'.\n`;
        optionsString += `- ${t('prompt_palette_style')} '${t(paletteMap[options.defaultPalette])}'.\n`;
    } else {
        optionsString += `- ${t('prompt_no_style')}.\n`
    }

    // Media Assets Reference
    if (assets.hasImage || assets.hasVideo || assets.hasAudio) {
        optionsString += `\n${t('prompt_media_header')}:\n`;
        if (assets.hasImage) {
            optionsString += `- ${t('prompt_media_image')}.\n`;
        }
        if (assets.hasVideo) {
            optionsString += `- ${t('prompt_media_video')}.\n`;
        }
        if (assets.hasAudio) {
            optionsString += `- ${t('prompt_media_audio')}.\n`;
        }
    }

    const languageInstruction = lang === 'ko'
        ? `\n매우 중요: 최종 프롬프트는 반드시 한국어로만 작성해야 합니다. 다른 언어를 섞지 마세요.`
        : `\nCRITICAL: The final prompt must be written exclusively in English. Do not mix languages.`;

    const coreInstruction = lang === 'ko' ? CORE_INSTRUCTION_KO : CORE_INSTRUCTION_EN;

    return `
${coreInstruction}

${optionsString}

${t('prompt_output_format')}

${t('prompt_code_header')}:
\`\`\`javascript
${code}
\`\`\`

${languageInstruction}
`;
}


export const generateVideoPromptFromCode = async (
    code: string, 
    options: GenerationOptionsState,
    assets: MediaAssets
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: PROMPT_TEMPLATE(code, options, assets),
      config: {
        systemInstruction: getSystemInstruction(options.promptLanguage),
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate prompt from Gemini API.");
  }
};

export type RecommendationType = 'analysis' | 'video' | 'style';

export const getAiRecommendations = async (code: string, type: RecommendationType): Promise<Partial<GenerationOptionsState>> => {
    let prompt = '';
    let responseSchema: any = {};

    switch (type) {
        case 'analysis':
            prompt = `Analyze this P5.js code. Based on its complexity and content, suggest the most relevant analysis options to extract its essence for a video prompt. For example, if it's a simple geometric animation, 'extractShapesColors' and 'detectAnimation' might be enough. If it contains complex custom logic, 'interpretCustomFunctions' would be useful. Your response must be a JSON object matching the provided schema.`;
            responseSchema = {
                type: Type.OBJECT,
                properties: {
                    extractShapesColors: { type: Type.BOOLEAN },
                    detectAnimation: { type: Type.BOOLEAN },
                    interpretFunctions: { type: Type.BOOLEAN },
                    interpretCustomFunctions: { type: Type.BOOLEAN },
                    abstractAnimation: { type: Type.BOOLEAN },
                    geometricMusic: { type: Type.BOOLEAN },
                    organic: { type: Type.BOOLEAN },
                    upbeatElectronic: { type: Type.BOOLEAN },
                },
            };
            break;
        case 'video':
            prompt = `Analyze this P5.js code. Suggest optimal video settings for a cinematic representation. Consider the animation's style to recommend a suitable duration (an integer between 1 and 180 seconds), aspect ratio, level of detail, and camera angle. A fast, complex animation might benefit from a shorter duration and a 'Wide Shot', while a slow, detailed one might need more time. Also suggest a 'promptLanguage' ('English' or 'Korean'). Your response must be a JSON object matching the provided schema.`;
            responseSchema = {
                type: Type.OBJECT,
                properties: {
                    videoDuration: { type: Type.NUMBER, description: "Video duration in seconds, an integer between 1 and 180." },
                    aspectRatio: { type: Type.STRING, enum: ['16:9', '9:16', '1:1', '4:3'] },
                    promptDetail: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Detailed'] },
                    cameraAngle: { type: Type.STRING, enum: ['Frontal', 'Top-down', 'Isometric', "Worm's eye", "Bird's eye", 'Wide Shot'] },
                    enableDenoising: { type: Type.BOOLEAN },
                    promptLanguage: { type: Type.STRING, enum: ['English', 'Korean'] },
                },
            };
            break;
        case 'style':
            prompt = `Analyze this P5.js code. Suggest a creative style that complements the animation's mood. Recommend a music style, color palette, and other effects. A chaotic, glitchy animation might pair well with 'Synthwave' music and 'Glitchy SFX'. A calm, flowing animation might suit 'Calm Piano' and a 'Pastel' palette. If no specific style seems appropriate, set 'styleNone' to true. Your response must be a JSON object matching the provided schema.`;
            responseSchema = {
                type: Type.OBJECT,
                properties: {
                    defaultMusic: { type: Type.STRING, enum: ['Calm Piano', 'Smooth Jazz', 'Synthwave', 'Chillhop'] },
                    defaultPalette: { type: Type.STRING, enum: ['Pastel', 'Monochromatic', 'Vibrant', 'Earthy'] },
                    relaxingAmbient: { type: Type.BOOLEAN },
                    glitchySFX: { type: Type.BOOLEAN },
                    styleNone: { type: Type.BOOLEAN },
                },
            };
            break;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${prompt}\n\nP5.js code:\n\`\`\`javascript\n${code}\n\`\`\``,
            config: {
                systemInstruction: "You are an expert creative assistant. Your goal is to suggest the best settings based on the provided P5.js code. You must respond only with a valid JSON object that conforms to the provided schema.",
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as Partial<GenerationOptionsState>;
    } catch (error) {
        console.error(`Error getting AI recommendations for ${type}:`, error);
        throw new Error(`Failed to get AI recommendations for ${type}.`);
    }
};

export type CodeAssistType = 'refactor' | 'interactive' | 'creative' | 'explain';

export const getAiCodeAssistance = async (
    code: string, 
    assistType: CodeAssistType
): Promise<string> => {
    let instruction = '';
    switch(assistType) {
        case 'refactor':
            instruction = 'Refactor the following P5.js code to improve its readability, performance, and structure. Maintain the original functionality. Only output the raw code, without any explanation.';
            break;
        case 'interactive':
            instruction = 'Add mouse interaction (e.g., using mouseX, mouseY) to the following P5.js code to make it more dynamic and engaging. Maintain the core visual idea. Only output the raw code, without any explanation.';
            break;
        case 'creative':
            instruction = 'Take the following P5.js code and suggest a creative variation. This could involve changing colors, motion, shapes, or adding a new concept, while keeping the spirit of the original. Only output the raw code, without any explanation.';
            break;
        case 'explain':
            instruction = 'Explain the following P5.js code in a clear and concise way, as if you were explaining it to a beginner. Describe the setup() function and what happens in the draw() loop.';
            break;
    }

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: `${instruction}\n\nCode:\n\`\`\`javascript\n${code}\n\`\`\``,
        config: {
            systemInstruction: 'You are an expert P5.js developer and assistant. You provide helpful code modifications and explanations.',
            temperature: 0.5,
        }
    });
    return response.text.trim();
}

export type PromptVariationType = 'cinematic' | 'whimsical' | 'concise';

export const getPromptVariation = async (
    prompt: string,
    variationType: PromptVariationType,
    language: string
): Promise<string> => {
    let instruction = '';
    switch(variationType) {
        case 'cinematic':
            instruction = 'Rewrite the following video prompt to be more cinematic, focusing on camera angles, lighting, and dramatic motion.';
            break;
        case 'whimsical':
            instruction = 'Rewrite the following video prompt to be more whimsical and playful, using imaginative and fantastical language.';
            break;
        case 'concise':
            instruction = 'Rewrite the following video prompt to be more concise and punchy, capturing the essence in fewer words while remaining vivid.';
            break;
    }
    const langInstruction = language === 'Korean' ? 'The final output must be in Korean.' : 'The final output must be in English.';

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${instruction}\n\nOriginal Prompt: "${prompt}"\n\n${langInstruction}`,
        config: {
            systemInstruction: 'You are an expert creative prompt engineer for text-to-video AI models.',
            temperature: 0.9,
        }
    });

    return response.text.trim().replace(/^"|"$/g, ''); // Remove quotes from response
};
