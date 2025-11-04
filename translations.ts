export const translations = {
  ko: {
    // Header
    header_title: 'Kinetic Prompt',
    header_subtitle: 'P5.js 스케치 코드를 붙여넣어 당신의 애니메이션을 위한 영화 같은 비디오 프롬프트를 생성하세요.',
    toggle_language_title: '언어 변경',

    // Code Input
    code_input_title: 'P5.js 스케치 코드',
    clear_code_button: '코드 지우기',
    reset_all_button: '전체 초기화',
    code_input_placeholder: `// P5.js 스케치 코드를 여기에 붙여넣으세요...\n\nfunction setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  ellipse(50, 50, 80, 80);\n}`,

    // Generation Options
    generation_options_title: '생성 옵션',
    ai_recommendation_button: 'AI 추천',
    ai_recommendation_tooltip: 'AI로 추천받기',
    
    // Analysis Options
    options_analysis_title: '프롬프트 분석',
    analysis_shapes_colors: '도형 및 색상 추출',
    analysis_animation: '애니메이션 감지',
    analysis_interpret_functions: '함수/변수 해석',
    analysis_interpret_custom_functions: '사용자 정의 함수/변수 해석',
    analysis_abstract: '추상적인 애니메이션',
    analysis_geometric_music: '기하학적 음악',
    analysis_organic: '유기적인',
    analysis_upbeat: '경쾌한 전자음악 풍',

    // Video Options
    options_video_title: '비디오 설정',
    video_duration_label: '비디오 길이 (초)',
    video_aspect_ratio_label: '화면 비율',
    aspect_ratio_16_9: '16:9 (가로)',
    aspect_ratio_9_16: '9:16 (세로)',
    aspect_ratio_1_1: '1:1 (정방형)',
    aspect_ratio_4_3: '4:3 (표준)',
    video_prompt_detail_label: '프롬프트 상세도',
    video_camera_angle_label: '카메라 앵글',
    video_prompt_language_label: '프롬프트 언어',
    video_denoising_label: '노이즈 제거 활성화',
    
    // Style Options
    options_style_title: '스타일 제안',
    style_music_label: '기본 음악',
    style_palette_label: '기본 팔레트',
    style_relaxing_ambient: '편안한 앰비언트',
    style_glitchy_sfx: '글리치 효과음',
    style_none: '스타일 제안 없음',
    
    // Main Buttons
    generate_prompt_button: '비디오 프롬프트 생성',
    generating: '생성 중...',

    // Prompt Output
    prompt_output_title: '생성된 비디오 프롬프트',
    copy_button: '복사',
    copied_button: '복사됨!',
    generating_prompt_message: '프롬프트 생성 중...',
    prompt_output_placeholder: '생성된 비디오 프롬프트가 여기에 표시됩니다.',
    
    // Prompt Assets
    prompt_assets_title: '프롬프트 에셋',
    asset_image: '이미지',
    asset_video: '비디오',
    asset_music: '음악',

    // File Uploader
    file_uploader_instruction: '파일을 드래그하거나 클릭하여 업로드',
    remove_file_tooltip: '파일 제거',
    
    // Prompt History
    prompt_history_title: '생성 기록',
    history_empty_placeholder: '아직 생성된 기록이 없습니다.',
    reuse_button: '재사용',
    clear_history_button: '기록 지우기',

    // Footer
    footer_powered_by: 'Gemini 제공',

    // Errors
    error_title: '오류',
    error_code_empty: 'P5.js 코드는 비워둘 수 없습니다.',
    error_generation_failed: '프롬프트 생성에 실패했습니다. API 키와 네트워크 연결을 확인해주세요.',
    error_ai_recommendation: 'AI 추천을 받아오는 데 실패했습니다: ',
    error_invalid_file_type: '잘못된 파일 형식입니다. 다음 형식만 허용됩니다:',

    // Prompt Template translations
    prompt_constraints_header: "프롬프트 생성 시 다음 제약 조건을 준수해 주세요:",
    prompt_analysis_aspects: "다음 분석 측면에 집중하세요",
    prompt_video_duration: "최종 비디오 길이는 약",
    prompt_seconds: "초여야 합니다",
    prompt_aspect_ratio: "화면 비율은",
    prompt_detail_level: "프롬프트의 상세 수준은",
    prompt_camera_angle: "카메라 앵글은",
    prompt_denoising: "최종 비디오는 깨끗하고 노이즈가 없는 모습이어야 합니다",
    prompt_style_elements: "다음 스타일 요소를 통합하세요",
    prompt_music_style: "음악은",
    prompt_palette_style: "색상 팔레트는",
    prompt_no_style: "특정 스타일, 음악 또는 색상 팔레트 제안을 포함하지 마세요",
    prompt_media_header: "사용자가 다음 미디어 에셋도 제공했습니다. 프롬프트에 이를 통합하고 참조해야 합니다",
    prompt_media_image: "이미지 파일. 이 이미지를 스타일 참조, 배경 또는 시작 프레임으로 사용하는 방법을 설명하세요",
    prompt_media_video: "비디오 파일. 이 비디오의 움직임, 스타일 또는 콘텐츠가 생성될 애니메이션에 어떻게 영향을 미칠 수 있는지 설명하세요",
    prompt_media_audio: "오디오 파일. 제공된 음악의 리듬, 분위기 또는 특정 사운드 큐에 애니메이션을 어떻게 동기화해야 하는지 설명하세요",
    prompt_output_format: "출력은 텍스트-비디오 모델에서 바로 사용할 수 있는 단일하고 응집력 있는 단락이어야 합니다.",
    prompt_code_header: "P5.js 코드는 다음과 같습니다",

    // Option value translations
    detail_low: '낮음',
    detail_medium: '중간',
    detail_high: '높음',
    detail_detailed: '상세함',
    angle_frontal: '정면',
    angle_top_down: '탑다운',
    angle_isometric: '아이소메트릭',
    angle_worms_eye: "웜즈 아이",
    angle_birds_eye: "버드 아이",
    angle_wide_shot: '와이드 샷',
    music_calm_piano: '잔잔한 피아노',
    music_smooth_jazz: '부드러운 재즈',
    music_synthwave: '신스웨이브',
    music_chillhop: '칠합',
    palette_pastel: '파스텔',
    palette_monochromatic: '단색',
    palette_vibrant: '생생한',
    palette_earthy: '얼씨',
  },
  en: {
    // Header
    header_title: 'Kinetic Prompt',
    header_subtitle: 'Paste your P5.js sketch code to generate cinematic video prompts for your animations.',
    toggle_language_title: 'Change language',

    // Code Input
    code_input_title: 'P5.js Sketch Code',
    clear_code_button: 'Clear Code',
    reset_all_button: 'Reset All',
    code_input_placeholder: `// Paste your P5.js sketch code here...\n\nfunction setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  ellipse(50, 50, 80, 80);\n}`,

    // Generation Options
    generation_options_title: 'Generation Options',
    ai_recommendation_button: 'AI Suggest',
    ai_recommendation_tooltip: 'Get AI recommendations',
    
    // Analysis Options
    options_analysis_title: 'Prompt Analysis',
    analysis_shapes_colors: 'Extract Shapes & Colors',
    analysis_animation: 'Detect Animation',
    analysis_interpret_functions: 'Interpret Functions/Variables',
    analysis_interpret_custom_functions: 'Interpret Custom Functions/Variables',
    analysis_abstract: 'Abstract Animation',
    analysis_geometric_music: 'Geometric Music',
    analysis_organic: 'Organic',
    analysis_upbeat: 'Upbeat Electronic Shot',

    // Video Options
    options_video_title: 'Video Settings',
    video_duration_label: 'Video Duration (sec)',
    video_aspect_ratio_label: 'Aspect Ratio',
    aspect_ratio_16_9: '16:9 (Landscape)',
    aspect_ratio_9_16: '9:16 (Portrait)',
    aspect_ratio_1_1: '1:1 (Square)',
    aspect_ratio_4_3: '4:3 (Standard)',
    video_prompt_detail_label: 'Prompt Detail',
    video_camera_angle_label: 'Camera Angle',
    video_prompt_language_label: 'Prompt Language',
    video_denoising_label: 'Enable Denoising',

    // Style Options
    options_style_title: 'Style Suggestion',
    style_music_label: 'Default Music',
    style_palette_label: 'Default Palette',
    style_relaxing_ambient: 'Relaxing Ambient',
    style_glitchy_sfx: 'Glitchy SFX',
    style_none: 'None (No style suggestion)',
    
    // Main Buttons
    generate_prompt_button: 'Generate Video Prompt',
    generating: 'Generating...',

    // Prompt Output
    prompt_output_title: 'Generated Video Prompt',
    copy_button: 'Copy',
    copied_button: 'Copied!',
    generating_prompt_message: 'Generating prompt...',
    prompt_output_placeholder: 'Your generated video prompt will appear here.',
    
    // Prompt Assets
    prompt_assets_title: 'Prompt Assets',
    asset_image: 'Image',
    asset_video: 'Video',
    asset_music: 'Music',

    // File Uploader
    file_uploader_instruction: 'Drag & drop or click to upload',
    remove_file_tooltip: 'Remove file',
    
    // Prompt History
    prompt_history_title: 'Generation History',
    history_empty_placeholder: 'No generation history yet.',
    reuse_button: 'Reuse',
    clear_history_button: 'Clear History',

    // Footer
    footer_powered_by: 'Powered by Gemini',

    // Errors
    error_title: 'Error',
    error_code_empty: 'P5.js code cannot be empty.',
    error_generation_failed: 'Failed to generate prompt. Please check your API key and network connection.',
    error_ai_recommendation: 'Failed to get AI recommendations: ',
    error_invalid_file_type: 'Invalid file type. Only the following formats are allowed:',

    // Prompt Template translations
    prompt_constraints_header: "Please adhere to the following constraints when generating the prompt:",
    prompt_analysis_aspects: "Focus on these analysis aspects",
    prompt_video_duration: "The final video should be approximately",
    prompt_seconds: "seconds long",
    prompt_aspect_ratio: "The aspect ratio should be",
    prompt_detail_level: "The level of detail in the prompt should be",
    prompt_camera_angle: "The camera angle should be",
    prompt_denoising: "The final video should have a clean, denoised look",
    prompt_style_elements: "Incorporate the following style elements",
    prompt_music_style: "The music should fit a",
    prompt_palette_style: "The color palette should be based on a",
    prompt_no_style: "Do not include any specific style, music, or color palette suggestions",
    prompt_media_header: "The user has also provided the following media assets. Your prompt should incorporate and reference them",
    prompt_media_image: "An image file. Describe how this image can be used as a style reference, background, or starting frame",
    prompt_media_video: "A video file. Describe how this video's motion, style, or content can influence the generated animation",
    prompt_media_audio: "An audio file. Describe how the animation should sync with the provided music's rhythm, mood, or specific sound cues",
    prompt_output_format: "The output should be a single, cohesive paragraph, ready to be used in a text-to-video model.",
    prompt_code_header: "Here is the P5.js code",

    // Option value translations
    detail_low: 'Low',
    detail_medium: 'Medium',
    detail_high: 'High',
    detail_detailed: 'Detailed',
    angle_frontal: 'Frontal',
    angle_top_down: 'Top-down',
    angle_isometric: 'Isometric',
    angle_worms_eye: "Worm's eye",
    angle_birds_eye: "Bird's eye",
    angle_wide_shot: 'Wide Shot',
    music_calm_piano: 'Calm Piano',
    music_smooth_jazz: 'Smooth Jazz',
    music_synthwave: 'Synthwave',
    music_chillhop: 'Chillhop',
    palette_pastel: 'Pastel',
    palette_monochromatic: 'Monochromatic',
    palette_vibrant: 'Vibrant',
    palette_earthy: 'Earthy',
  }
};