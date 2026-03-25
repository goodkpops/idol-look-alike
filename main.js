'use strict';

/* ===================================================================
   K-POP IDOL LOOK-ALIKE FINDER
   =================================================================== */

const MODEL_URL = './models';

/* ===================================================================
   IDOL DATABASE
   =================================================================== */
const IDOLS = [
  // ── BLACKPINK ──────────────────────────────────────────────────
  {
    id: 'jennie',
    name: 'Jennie',
    nameKr: '제니',
    group: 'BLACKPINK',
    groupColor: '#ff2d78',
    gender: 'female',
    typicalAge: 28,
    emoji: '👑',
    bgGradient: 'linear-gradient(135deg, #ff2d78, #a855f7)',
    description: 'Known for her bold charisma, luxe fashion sense, and effortlessly cool stage presence.',
    descriptionKr: '대담한 카리스마와 럭셔리한 패션 센스로 유명한 솔로이스트.',
    traits: ['Bold', 'Charismatic', 'Fashion Icon', 'Fierce'],
    expressionWeights: { neutral: 0.9, happy: 0.5, sad: 0.2, angry: 0.5, surprised: 0.2, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [22, 30],
  },
  {
    id: 'lisa',
    name: 'Lisa',
    nameKr: '리사',
    group: 'BLACKPINK',
    groupColor: '#ff2d78',
    gender: 'female',
    typicalAge: 27,
    emoji: '💎',
    bgGradient: 'linear-gradient(135deg, #f59e0b, #ec4899)',
    description: 'Main dancer with exotic features, expressive performances, and an infectious smile.',
    descriptionKr: '이국적인 외모와 폭발적인 댄스 실력을 가진 메인댄서.',
    traits: ['Energetic', 'Playful', 'Expressive', 'Dancer'],
    expressionWeights: { neutral: 0.4, happy: 0.9, sad: 0.1, angry: 0.2, surprised: 0.7, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [21, 29],
  },
  {
    id: 'jisoo',
    name: 'Jisoo',
    nameKr: '지수',
    group: 'BLACKPINK',
    groupColor: '#ff2d78',
    gender: 'female',
    typicalAge: 29,
    emoji: '🌸',
    bgGradient: 'linear-gradient(135deg, #f472b6, #fbbf24)',
    description: 'Classic Korean beauty with a warm, bright smile and natural elegance.',
    descriptionKr: '클래식한 한국적 미모와 따뜻한 미소를 가진 비주얼 담당.',
    traits: ['Classic Beauty', 'Warm', 'Elegant', 'Natural'],
    expressionWeights: { neutral: 0.6, happy: 0.8, sad: 0.2, angry: 0.1, surprised: 0.4, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [23, 31],
  },
  {
    id: 'rose',
    name: 'Rosé',
    nameKr: '로제',
    group: 'BLACKPINK',
    groupColor: '#ff2d78',
    gender: 'female',
    typicalAge: 27,
    emoji: '🌹',
    bgGradient: 'linear-gradient(135deg, #fb7185, #a78bfa)',
    description: 'Ethereal visuals, slender figure, and a uniquely emotional vocal tone.',
    descriptionKr: '몽환적인 비주얼과 독특한 음색을 가진 보컬리스트.',
    traits: ['Ethereal', 'Emotional', 'Artistic', 'Graceful'],
    expressionWeights: { neutral: 0.5, happy: 0.6, sad: 0.5, angry: 0.1, surprised: 0.3, fearful: 0.2, disgusted: 0.1 },
    ageWeight: [22, 30],
  },
  // ── aespa ──────────────────────────────────────────────────────
  {
    id: 'karina',
    name: 'Karina',
    nameKr: '카리나',
    group: 'aespa',
    groupColor: '#a855f7',
    gender: 'female',
    typicalAge: 24,
    emoji: '🤖',
    bgGradient: 'linear-gradient(135deg, #a855f7, #22d3ee)',
    description: 'Sharp, doll-like features with a powerful stage command and polished visuals.',
    descriptionKr: '인형 같은 외모와 강력한 무대 장악력을 가진 센터.',
    traits: ['Sharp', 'Polished', 'Powerful', 'Doll-Like'],
    expressionWeights: { neutral: 0.8, happy: 0.5, sad: 0.2, angry: 0.4, surprised: 0.3, fearful: 0.1, disgusted: 0.2 },
    ageWeight: [19, 26],
  },
  {
    id: 'winter',
    name: 'Winter',
    nameKr: '윈터',
    group: 'aespa',
    groupColor: '#a855f7',
    gender: 'female',
    typicalAge: 23,
    emoji: '❄️',
    bgGradient: 'linear-gradient(135deg, #60a5fa, #a5f3fc)',
    description: 'Icy, pale beauty with soft features and a cool, reserved charm.',
    descriptionKr: '청초하고 차가운 매력의 아이시한 비주얼.',
    traits: ['Cool', 'Pure', 'Soft', 'Reserved'],
    expressionWeights: { neutral: 0.9, happy: 0.4, sad: 0.3, angry: 0.2, surprised: 0.3, fearful: 0.2, disgusted: 0.1 },
    ageWeight: [19, 25],
  },
  {
    id: 'ningning',
    name: 'NingNing',
    nameKr: '닝닝',
    group: 'aespa',
    groupColor: '#a855f7',
    gender: 'female',
    typicalAge: 21,
    emoji: '🌟',
    bgGradient: 'linear-gradient(135deg, #fbbf24, #f472b6)',
    description: 'Expressive eyes, bright smile, and powerful vocal performances.',
    descriptionKr: '표현력 넘치는 눈매와 밝은 미소의 파워풀한 보컬.',
    traits: ['Bright', 'Expressive', 'Powerful', 'Cheerful'],
    expressionWeights: { neutral: 0.3, happy: 0.9, sad: 0.2, angry: 0.1, surprised: 0.6, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [18, 24],
  },
  // ── NewJeans ───────────────────────────────────────────────────
  {
    id: 'minji',
    name: 'Minji',
    nameKr: '민지',
    group: 'NewJeans',
    groupColor: '#22d3ee',
    gender: 'female',
    typicalAge: 20,
    emoji: '🐰',
    bgGradient: 'linear-gradient(135deg, #22d3ee, #818cf8)',
    description: 'Tall, distinguished features with a mature yet fresh, youthful vibe.',
    descriptionKr: '성숙하면서도 청량한 매력을 가진 리더.',
    traits: ['Mature', 'Fresh', 'Elegant', 'Leader'],
    expressionWeights: { neutral: 0.7, happy: 0.6, sad: 0.2, angry: 0.1, surprised: 0.4, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [17, 23],
  },
  {
    id: 'hanni',
    name: 'Hanni',
    nameKr: '하니',
    group: 'NewJeans',
    groupColor: '#22d3ee',
    gender: 'female',
    typicalAge: 20,
    emoji: '🐱',
    bgGradient: 'linear-gradient(135deg, #f0abfc, #818cf8)',
    description: 'Cat-like eyes, bubbly personality, and a uniquely charming mixed look.',
    descriptionKr: '고양이 같은 눈매와 밝고 사랑스러운 매력의 멤버.',
    traits: ['Cute', 'Bubbly', 'Cat-Like', 'Charming'],
    expressionWeights: { neutral: 0.4, happy: 0.9, sad: 0.1, angry: 0.1, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [17, 23],
  },
  // ── IVE ────────────────────────────────────────────────────────
  {
    id: 'wonyoung',
    name: 'Wonyoung',
    nameKr: '원영',
    group: 'IVE',
    groupColor: '#fbbf24',
    gender: 'female',
    typicalAge: 20,
    emoji: '👸',
    bgGradient: 'linear-gradient(135deg, #fbbf24, #f472b6)',
    description: 'Statuesque proportions, princess-like visuals, and effortless poise.',
    descriptionKr: '완벽한 비율과 공주 같은 외모를 가진 센터.',
    traits: ['Princess', 'Tall', 'Poised', 'Visual'],
    expressionWeights: { neutral: 0.6, happy: 0.7, sad: 0.1, angry: 0.1, surprised: 0.4, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [17, 23],
  },
  {
    id: 'rei',
    name: 'Rei',
    nameKr: '레이',
    group: 'IVE',
    groupColor: '#fbbf24',
    gender: 'female',
    typicalAge: 19,
    emoji: '🦋',
    bgGradient: 'linear-gradient(135deg, #6366f1, #ec4899)',
    description: 'Delicate features, playful energy, and a bright expressive personality.',
    descriptionKr: '섬세한 외모와 발랄한 에너지의 일본인 멤버.',
    traits: ['Delicate', 'Playful', 'Bright', 'Sweet'],
    expressionWeights: { neutral: 0.4, happy: 0.8, sad: 0.1, angry: 0.1, surprised: 0.6, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [17, 22],
  },
  // ── (G)I-DLE ───────────────────────────────────────────────────
  {
    id: 'soyeon',
    name: 'Soyeon',
    nameKr: '소연',
    group: '(G)I-DLE',
    groupColor: '#f59e0b',
    gender: 'female',
    typicalAge: 25,
    emoji: '🎤',
    bgGradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    description: 'Fierce, intense gaze with an artist\'s confidence and powerful rapping energy.',
    descriptionKr: '강렬한 눈빛과 아티스트적 자신감을 가진 래퍼.',
    traits: ['Fierce', 'Intense', 'Artistic', 'Confident'],
    expressionWeights: { neutral: 0.5, happy: 0.4, sad: 0.2, angry: 0.7, surprised: 0.3, fearful: 0.1, disgusted: 0.3 },
    ageWeight: [20, 28],
  },
  // ── TWICE ──────────────────────────────────────────────────────
  {
    id: 'tzuyu',
    name: 'Tzuyu',
    nameKr: '쯔위',
    group: 'TWICE',
    groupColor: '#ef4444',
    gender: 'female',
    typicalAge: 25,
    emoji: '🎀',
    bgGradient: 'linear-gradient(135deg, #ef4444, #fbbf24)',
    description: 'Tall, statuesque beauty with a cool demeanor and symmetrical, timeless features.',
    descriptionKr: '큰 키와 시크한 매력, 완벽한 대칭 얼굴의 비주얼.',
    traits: ['Cool', 'Tall', 'Symmetrical', 'Timeless'],
    expressionWeights: { neutral: 0.9, happy: 0.4, sad: 0.2, angry: 0.2, surprised: 0.2, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [20, 27],
  },
  {
    id: 'nayeon',
    name: 'Nayeon',
    nameKr: '나연',
    group: 'TWICE',
    groupColor: '#ef4444',
    gender: 'female',
    typicalAge: 28,
    emoji: '🐇',
    bgGradient: 'linear-gradient(135deg, #fb923c, #f472b6)',
    description: 'Iconic bunny-teeth smile, bubbly energy, and bright, girl-next-door charm.',
    descriptionKr: '토끼 같은 미소와 밝고 친근한 매력의 리더.',
    traits: ['Bright', 'Bubbly', 'Iconic', 'Girl-Next-Door'],
    expressionWeights: { neutral: 0.3, happy: 0.95, sad: 0.1, angry: 0.1, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [22, 30],
  },
  // ── BTS ────────────────────────────────────────────────────────
  {
    id: 'v-bts',
    name: 'V',
    nameKr: '뷔',
    group: 'BTS',
    groupColor: '#6366f1',
    gender: 'male',
    typicalAge: 28,
    emoji: '🎭',
    bgGradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
    description: 'Unconventionally handsome with deep eyes, boxy smile, and artsy, mysterious charisma.',
    descriptionKr: '깊은 눈빛과 박스미소, 독보적인 아티스틱한 매력.',
    traits: ['Mysterious', 'Artistic', 'Unique', 'Deep'],
    expressionWeights: { neutral: 0.7, happy: 0.6, sad: 0.4, angry: 0.3, surprised: 0.4, fearful: 0.2, disgusted: 0.1 },
    ageWeight: [22, 32],
  },
  {
    id: 'jungkook',
    name: 'Jungkook',
    nameKr: '정국',
    group: 'BTS',
    groupColor: '#6366f1',
    gender: 'male',
    typicalAge: 26,
    emoji: '🐰',
    bgGradient: 'linear-gradient(135deg, #22c55e, #6366f1)',
    description: 'The "golden maknae" — youthful charm, defined features, and multi-talented athlete visuals.',
    descriptionKr: '청초하고 건강한 매력의 황금막내.',
    traits: ['Youthful', 'Athletic', 'All-Rounder', 'Charming'],
    expressionWeights: { neutral: 0.5, happy: 0.8, sad: 0.2, angry: 0.3, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [20, 28],
  },
  {
    id: 'jin',
    name: 'Jin',
    nameKr: '진',
    group: 'BTS',
    groupColor: '#6366f1',
    gender: 'male',
    typicalAge: 31,
    emoji: '🌷',
    bgGradient: 'linear-gradient(135deg, #f472b6, #6366f1)',
    description: 'Worldwide handsome — broad shoulders, symmetrical face, and a warm, funny personality.',
    descriptionKr: '월드와이드 핸썸의 넓은 어깨와 대칭적인 미남.',
    traits: ['Handsome', 'Funny', 'Warm', 'Symmetrical'],
    expressionWeights: { neutral: 0.5, happy: 0.85, sad: 0.2, angry: 0.1, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [25, 35],
  },
  {
    id: 'jimin',
    name: 'Jimin',
    nameKr: '지민',
    group: 'BTS',
    groupColor: '#6366f1',
    gender: 'male',
    typicalAge: 29,
    emoji: '✨',
    bgGradient: 'linear-gradient(135deg, #fb923c, #a855f7)',
    description: 'Soft, pretty features with expressive eyes and an emotional, sensual performance style.',
    descriptionKr: '부드럽고 감성적인 표현력과 섬세한 외모의 퍼포머.',
    traits: ['Soft', 'Expressive', 'Sensual', 'Emotional'],
    expressionWeights: { neutral: 0.5, happy: 0.7, sad: 0.5, angry: 0.2, surprised: 0.4, fearful: 0.2, disgusted: 0.1 },
    ageWeight: [23, 31],
  },
  // ── Stray Kids ─────────────────────────────────────────────────
  {
    id: 'hyunjin',
    name: 'Hyunjin',
    nameKr: '현진',
    group: 'Stray Kids',
    groupColor: '#f97316',
    gender: 'male',
    typicalAge: 23,
    emoji: '🎨',
    bgGradient: 'linear-gradient(135deg, #f97316, #a855f7)',
    description: 'Model-like visuals, sharp jaw, and an artistic, poetic personality.',
    descriptionKr: '모델급 외모와 날카로운 턱선의 아티스트.',
    traits: ['Sharp', 'Artistic', 'Model', 'Intense'],
    expressionWeights: { neutral: 0.8, happy: 0.4, sad: 0.4, angry: 0.4, surprised: 0.3, fearful: 0.2, disgusted: 0.2 },
    ageWeight: [18, 26],
  },
  {
    id: 'felix',
    name: 'Felix',
    nameKr: '필릭스',
    group: 'Stray Kids',
    groupColor: '#f97316',
    gender: 'male',
    typicalAge: 23,
    emoji: '🌻',
    bgGradient: 'linear-gradient(135deg, #fbbf24, #f97316)',
    description: 'Freckled, sunshine visuals with a deep voice contrast and irresistible warmth.',
    descriptionKr: '주근깨와 태양 같은 비주얼, 깊은 목소리의 서호주 출신 멤버.',
    traits: ['Sunny', 'Warm', 'Freckled', 'Energetic'],
    expressionWeights: { neutral: 0.3, happy: 0.95, sad: 0.1, angry: 0.1, surprised: 0.6, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [18, 26],
  },
  // ── NCT ────────────────────────────────────────────────────────
  {
    id: 'taeyong',
    name: 'Taeyong',
    nameKr: '태용',
    group: 'NCT',
    groupColor: '#22d3ee',
    gender: 'male',
    typicalAge: 29,
    emoji: '🌊',
    bgGradient: 'linear-gradient(135deg, #22d3ee, #6366f1)',
    description: 'Sharp, edgy features with platinum visuals and fierce, captivating stage presence.',
    descriptionKr: '날카롭고 에지있는 외모와 강렬한 무대 퍼포먼스의 리더.',
    traits: ['Edgy', 'Sharp', 'Fierce', 'Leader'],
    expressionWeights: { neutral: 0.7, happy: 0.4, sad: 0.3, angry: 0.6, surprised: 0.3, fearful: 0.1, disgusted: 0.2 },
    ageWeight: [23, 31],
  },
  // ── EXO ────────────────────────────────────────────────────────
  {
    id: 'kai',
    name: 'Kai',
    nameKr: '카이',
    group: 'EXO',
    groupColor: '#ef4444',
    gender: 'male',
    typicalAge: 30,
    emoji: '🔥',
    bgGradient: 'linear-gradient(135deg, #ef4444, #f59e0b)',
    description: 'Bronzed, sculpted visuals with an animalistic charisma and sensual dance mastery.',
    descriptionKr: '브론즈 피부와 야성적인 카리스마의 댄서.',
    traits: ['Sculpted', 'Charismatic', 'Sensual', 'Bronze'],
    expressionWeights: { neutral: 0.6, happy: 0.5, sad: 0.3, angry: 0.5, surprised: 0.3, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [24, 33],
  },
  {
    id: 'baekhyun',
    name: 'Baekhyun',
    nameKr: '백현',
    group: 'EXO',
    groupColor: '#ef4444',
    gender: 'male',
    typicalAge: 31,
    emoji: '🌙',
    bgGradient: 'linear-gradient(135deg, #818cf8, #f472b6)',
    description: 'Compact, cute facial structure, puppy eyes, and cheerful, mischievous energy.',
    descriptionKr: '강아지 같은 눈매와 장난기 넘치는 활발한 매력.',
    traits: ['Cute', 'Puppy Eyes', 'Cheerful', 'Mischievous'],
    expressionWeights: { neutral: 0.3, happy: 0.9, sad: 0.1, angry: 0.2, surprised: 0.6, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [25, 34],
  },
  // ── TXT ────────────────────────────────────────────────────────
  {
    id: 'yeonjun',
    name: 'Yeonjun',
    nameKr: '연준',
    group: 'TXT',
    groupColor: '#a855f7',
    gender: 'male',
    typicalAge: 25,
    emoji: '🦊',
    bgGradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
    description: 'Fox-like eyes, androgynous beauty, and explosive dance energy with alt-pop aesthetics.',
    descriptionKr: '여우 같은 눈매와 중성적인 아름다움의 퍼포머.',
    traits: ['Fox-Like', 'Androgynous', 'Explosive', 'Alt'],
    expressionWeights: { neutral: 0.5, happy: 0.6, sad: 0.3, angry: 0.4, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [19, 27],
  },
];

/* ===================================================================
   STATE
   =================================================================== */
let currentStream = null;
let topMatchData = null;

/* ===================================================================
   UTILITY HELPERS
   =================================================================== */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Seeded pseudo-random number (0-1) based on a string seed */
function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  // Simple LCG
  const a = 1664525, c = 1013904223, m = 2 ** 32;
  hash = (a * (hash >>> 0) + c) % m;
  return (hash >>> 0) / m;
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  const target = document.getElementById(`section-${name}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
}

function setStepState(stepId, state) {
  // state: '' | 'active' | 'done'
  const el = document.getElementById(stepId);
  if (!el) return;
  el.classList.remove('active', 'done');
  if (state) el.classList.add(state);
}

/* ===================================================================
   MODEL LOADING
   =================================================================== */
async function loadModels() {
  const bar = document.getElementById('loading-bar');
  const pct = document.getElementById('loading-pct');

  function setProgress(p) {
    bar.style.width = `${p}%`;
    pct.textContent = `${p}%`;
  }

  const models = [
    faceapi.nets.tinyFaceDetector,
    faceapi.nets.faceLandmark68TinyNet,
    faceapi.nets.faceExpressionNet,
    faceapi.nets.ageGenderNet,
  ];

  for (let i = 0; i < models.length; i++) {
    await models[i].loadFromUri(MODEL_URL);
    setProgress((i + 1) * 25);
  }
}

/* ===================================================================
   IMAGE RESIZE
   =================================================================== */
function resizeImage(dataUrl, maxSize = 640) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      if (width <= maxSize && height <= maxSize) {
        resolve(dataUrl);
        return;
      }
      const scale = maxSize / Math.max(width, height);
      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(width  * scale);
      canvas.height = Math.round(height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = dataUrl;
  });
}

/* ===================================================================
   CAMERA
   =================================================================== */
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false,
    });
    currentStream = stream;
    const video = document.getElementById('camera-video');
    video.srcObject = stream;
    showSection('camera');
  } catch (err) {
    console.error('Camera error:', err);
    const errEl = document.getElementById('home-error');
    errEl.textContent = '📷 Camera access denied. Please allow camera permission and try again.';
    errEl.classList.remove('hidden');
  }
}

function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(t => t.stop());
    currentStream = null;
  }
  const video = document.getElementById('camera-video');
  video.srcObject = null;
}

function capturePhoto() {
  const video  = document.getElementById('camera-video');
  const canvas = document.getElementById('camera-canvas');
  canvas.width  = video.videoWidth  || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  // Mirror to match display
  ctx.save();
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.restore();
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
  stopCamera();
  return dataUrl;
}

/* ===================================================================
   ANALYSIS
   =================================================================== */
async function analyzeImage(dataUrl) {
  // Reset step states
  ['step-detect', 'step-analyze', 'step-match'].forEach(id => setStepState(id, ''));
  document.getElementById('analysis-error').classList.add('hidden');

  // Resize first
  const resized = await resizeImage(dataUrl);

  // Show analysis section
  showSection('analysis');
  const analysisImg = document.getElementById('analysis-img');
  analysisImg.src = resized;

  setStepState('step-detect', 'active');

  // Wait for image to load then detect
  await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      try {
        // Detection
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.4 }))
          .withFaceLandmarks(true)
          .withFaceExpressions()
          .withAgeAndGender();

        if (!detection) {
          showAnalysisError('No face detected. Please use a clear, well-lit photo with your face visible.');
          reject(new Error('No face detected'));
          return;
        }

        // Draw bounding box on canvas overlay
        const faceCanvas = document.getElementById('face-canvas');
        const displayW = analysisImg.clientWidth  || 200;
        const displayH = analysisImg.clientHeight || 200;
        faceCanvas.width  = displayW;
        faceCanvas.height = displayH;

        const scaleX = displayW / img.naturalWidth;
        const scaleY = displayH / img.naturalHeight;
        const box = detection.detection.box;
        const ctx = faceCanvas.getContext('2d');
        ctx.clearRect(0, 0, displayW, displayH);
        ctx.strokeStyle = '#ff2d78';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ff2d78';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(
          box.x * scaleX,
          box.y * scaleY,
          box.width  * scaleX,
          box.height * scaleY,
          6
        );
        ctx.stroke();

        // Step 1 done, step 2 active
        setStepState('step-detect', 'done');
        setStepState('step-analyze', 'active');
        await delay(800);

        // Match
        const faceData = {
          age: detection.age,
          gender: detection.gender,
          genderProbability: detection.genderProbability,
          expressions: detection.expressions,
        };

        const matches = matchIdols(faceData);

        setStepState('step-analyze', 'done');
        setStepState('step-match', 'active');
        await delay(1000);

        setStepState('step-match', 'done');
        showResults(matches, faceData);
        resolve();
      } catch (err) {
        if (err.message !== 'No face detected') {
          showAnalysisError('Something went wrong during analysis. Please try again.');
        }
        reject(err);
      }
    };
    img.onerror = () => {
      showAnalysisError('Failed to load image. Please try a different photo.');
      reject(new Error('Image load error'));
    };
    img.src = resized;
  }).catch(() => {});
}

function showAnalysisError(msg) {
  setStepState('step-detect', '');
  setStepState('step-analyze', '');
  setStepState('step-match', '');
  const errEl = document.getElementById('analysis-error');
  document.getElementById('analysis-error-text').textContent = msg;
  errEl.classList.remove('hidden');
}

/* ===================================================================
   MATCHING
   =================================================================== */
function matchIdols(faceData) {
  const { age, gender, expressions } = faceData;

  // Filter by gender (face-api returns 'male' | 'female')
  const pool = IDOLS.filter(idol => idol.gender === gender);

  const scored = pool.map(idol => {
    // 1. Age score (0–30 pts)
    const midAge = (idol.ageWeight[0] + idol.ageWeight[1]) / 2;
    const ageDist = Math.abs(age - midAge);
    const ageRange = (idol.ageWeight[1] - idol.ageWeight[0]) / 2;
    const ageScore = Math.max(0, 30 - (ageDist / (ageRange + 5)) * 30);

    // 2. Expression score (0–40 pts)
    let exprScore = 0;
    for (const [key, weight] of Object.entries(idol.expressionWeights)) {
      const exprVal = expressions[key] ?? 0;
      exprScore += exprVal * weight * 100;
    }
    exprScore = Math.min(40, exprScore);

    // 3. Seeded random variety (0–15 pts)
    const seed = `${idol.id}-${Math.round(age)}`;
    const variety = seededRandom(seed) * 15;

    const total = ageScore + exprScore + variety;
    return { idol, score: total };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  // Assign display percentages
  // Top match: 90–99%
  const topRaw = scored[0]?.score ?? 0;
  const results = scored.map((item, i) => {
    let pct;
    if (i === 0) {
      // Normalize top to 90-99 range
      const maxPossible = 85; // approx max raw score
      const norm = Math.min(1, item.score / maxPossible);
      pct = Math.round(90 + norm * 9);
    } else {
      // Decrease from top — min 50%
      const drop = (item.score / topRaw);
      const topPct = scored[0].displayPct || 95;
      pct = Math.max(50, Math.round(topPct * drop));
      // Clamp to be below previous
    }
    item.displayPct = pct;
    return item;
  });

  // Re-pass to ensure strictly decreasing
  for (let i = 1; i < results.length; i++) {
    if (results[i].displayPct >= results[i - 1].displayPct) {
      results[i].displayPct = results[i - 1].displayPct - Math.ceil(Math.random() * 4 + 1);
    }
    results[i].displayPct = Math.max(50, results[i].displayPct);
  }

  return results;
}

/* ===================================================================
   RESULTS
   =================================================================== */
function showResults(matches, faceData) {
  topMatchData = matches[0];
  const top = matches[0].idol;
  const topPct = matches[0].displayPct;

  // ── TOP MATCH CARD ──────────────────────────────────────────
  const topCard = document.getElementById('top-match-card');
  topCard.innerHTML = `
    <div class="match-avatar-area" style="background: ${top.bgGradient}">
      <span class="match-emoji">${top.emoji}</span>
    </div>
    <div class="match-body">
      <span class="match-group-badge" style="color:${top.groupColor}; border-color:${top.groupColor}55;">
        ${top.group}
      </span>
      <div class="match-name">${top.name}</div>
      <div class="match-name-kr">${top.nameKr}</div>
      <div class="match-pct-row">
        <span class="match-pct-label">Match Score</span>
        <span class="match-pct-value">${topPct}%</span>
      </div>
      <div class="match-bar-track">
        <div class="match-bar-fill" id="top-match-bar"></div>
      </div>
      <p class="match-desc">${top.description}</p>
      <div class="trait-tags">
        ${top.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
      </div>
    </div>
  `;

  // ── RUNNER-UPS ───────────────────────────────────────────────
  const grid = document.getElementById('runner-up-grid');
  grid.innerHTML = '';

  const runnerUps = matches.slice(1, 4);
  runnerUps.forEach((m, i) => {
    const idol = m.idol;
    const pct  = m.displayPct;
    const card = document.createElement('div');
    card.className = 'runner-up-card';
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="ru-avatar" style="background: ${idol.bgGradient}">
        <span>${idol.emoji}</span>
      </div>
      <div class="ru-body">
        <div class="ru-name">${idol.name}</div>
        <div class="ru-group">${idol.group}</div>
        <div class="ru-pct">${pct}%</div>
        <div class="ru-bar-track">
          <div class="ru-bar-fill" id="ru-bar-${i}"></div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  showSection('results');

  // Animate bars after paint
  setTimeout(() => {
    const topBar = document.getElementById('top-match-bar');
    if (topBar) topBar.style.width = `${topPct}%`;

    runnerUps.forEach((m, i) => {
      const bar = document.getElementById(`ru-bar-${i}`);
      if (bar) bar.style.width = `${m.displayPct}%`;
    });
  }, 100);
}

/* ===================================================================
   SHARE
   =================================================================== */
async function shareResult() {
  if (!topMatchData) return;
  const idol = topMatchData.idol;
  const pct  = topMatchData.displayPct;
  const text = `I look ${pct}% like ${idol.name} (${idol.group})! ✨ Find your K-Pop twin at K✦POP Idol Look-Alike!`;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'My K-Pop Idol Match!', text });
    } catch (e) {
      if (e.name !== 'AbortError') fallbackCopy(text);
    }
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Result copied to clipboard!');
    }).catch(() => showToast('Could not copy to clipboard.'));
  } else {
    showToast('Sharing not supported on this browser.');
  }
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
      background:#1a1a2e; color:#f0f0ff; border:1px solid rgba(255,255,255,0.15);
      padding:10px 20px; border-radius:99px; font-size:0.85rem;
      box-shadow:0 4px 16px rgba(0,0,0,0.4); z-index:9999;
      transition:opacity 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

/* ===================================================================
   INIT
   =================================================================== */
async function init() {
  // Load models
  try {
    await loadModels();
  } catch (err) {
    console.error('Failed to load models:', err);
    document.getElementById('loading-screen').innerHTML = `
      <div class="loading-inner" style="text-align:center">
        <div style="font-size:3rem">⚠️</div>
        <h2 style="color:#ff2d78; margin:8px 0">Failed to load AI</h2>
        <p style="color:#8b8aaa; font-size:0.9rem">Could not load face detection models.<br>Please check your connection and refresh.</p>
        <button class="btn secondary" onclick="location.reload()" style="margin-top:16px">Refresh Page</button>
      </div>
    `;
    return;
  }

  // Hide loading, show app
  document.getElementById('loading-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  showSection('home');

  /* ── FILE INPUT ──────────────────────────────────────────────── */
  const fileInput = document.getElementById('file-input');
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    fileInput.value = '';
    const reader = new FileReader();
    reader.onload = e => analyzeImage(e.target.result);
    reader.readAsDataURL(file);
  });

  /* ── UPLOAD ZONE CLICK ───────────────────────────────────────── */
  const uploadZone = document.getElementById('upload-zone');
  uploadZone.addEventListener('click', () => {
    document.getElementById('file-input').click();
  });

  /* ── DRAG AND DROP ───────────────────────────────────────────── */
  uploadZone.addEventListener('dragover', e => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer?.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ev => analyzeImage(ev.target.result);
    reader.readAsDataURL(file);
  });

  /* ── CAMERA ──────────────────────────────────────────────────── */
  document.getElementById('camera-btn').addEventListener('click', startCamera);

  document.getElementById('capture-btn').addEventListener('click', () => {
    const dataUrl = capturePhoto();
    analyzeImage(dataUrl);
  });

  document.getElementById('cancel-camera').addEventListener('click', () => {
    stopCamera();
    showSection('home');
  });

  /* ── RETRY / SHARE ───────────────────────────────────────────── */
  document.getElementById('retry-btn').addEventListener('click', () => {
    topMatchData = null;
    document.getElementById('home-error').classList.add('hidden');
    showSection('home');
  });

  document.getElementById('analysis-retry-btn').addEventListener('click', () => {
    document.getElementById('home-error').classList.add('hidden');
    showSection('home');
  });

  document.getElementById('share-btn').addEventListener('click', shareResult);
}

// Start
document.addEventListener('DOMContentLoaded', init);
