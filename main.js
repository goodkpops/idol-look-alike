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
    wikiTitle: 'Jennie_(rapper)',
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
    wikiTitle: 'Lisa_(rapper)',
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
    wikiTitle: 'Jisoo_(singer)',
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
    wikiTitle: 'Rosé_(singer)',
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
    wikiTitle: 'Karina_(singer)',
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
    wikiTitle: 'Winter_(singer)',
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
    wikiTitle: 'Ningning_(singer)',
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
    wikiTitle: 'Minji_(singer)',
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
    wikiTitle: 'Hanni_(singer)',
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
    wikiTitle: 'Jang_Won-young',
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
    wikiTitle: 'Rei_(singer)',
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
    wikiTitle: 'Jeon_Soyeon',
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
    wikiTitle: 'Tzuyu',
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
    wikiTitle: 'Nayeon',
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
    wikiTitle: 'V_(singer)',
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
    wikiTitle: 'Jungkook',
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
    wikiTitle: 'Jin_(singer)',
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
    wikiTitle: 'Jimin',
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
    wikiTitle: 'Hwang_Hyunjin',
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
    wikiTitle: 'Felix_(singer)',
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
    wikiTitle: 'Lee_Taeyong',
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
    wikiTitle: 'Kai_(singer)',
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
    wikiTitle: 'Baekhyun',
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
    wikiTitle: 'Yeonjun',
    description: 'Fox-like eyes, androgynous beauty, and explosive dance energy with alt-pop aesthetics.',
    descriptionKr: '여우 같은 눈매와 중성적인 아름다움의 퍼포머.',
    traits: ['Fox-Like', 'Androgynous', 'Explosive', 'Alt'],
    expressionWeights: { neutral: 0.5, happy: 0.6, sad: 0.3, angry: 0.4, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [19, 27],
  },

  // ── 전소미 ─────────────────────────────────────────────────────
  {
    id: 'somi',
    name: 'Somi',
    nameKr: '전소미',
    group: 'Solo',
    groupColor: '#f472b6',
    gender: 'female',
    typicalAge: 24,
    emoji: '🌊',
    bgGradient: 'linear-gradient(135deg, #f472b6, #38bdf8)',
    wikiTitle: 'Jeon_Somi',
    description: 'Half-Korean half-Canadian with bold features, irresistible charisma and powerful girl-crush energy.',
    descriptionKr: '대담한 이목구비와 강렬한 걸크러쉬 매력의 솔로 아티스트.',
    traits: ['Bold', 'Confident', 'Girl-Crush', 'Bright'],
    expressionWeights: { neutral: 0.5, happy: 0.8, sad: 0.2, angry: 0.5, surprised: 0.6, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [19, 27],
  },

  // ── LE SSERAFIM ────────────────────────────────────────────────
  {
    id: 'sakura',
    name: 'Sakura',
    nameKr: '사쿠라',
    group: 'LE SSERAFIM',
    groupColor: '#f43f5e',
    gender: 'female',
    typicalAge: 27,
    emoji: '🌸',
    bgGradient: 'linear-gradient(135deg, #f43f5e, #fbbf24)',
    wikiTitle: 'Miyawaki_Sakura',
    description: 'Gentle, doll-like Japanese beauty with natural warmth and a loyal global fanbase.',
    descriptionKr: '따뜻하고 인형 같은 일본인 멤버, 전 아이즈원 출신.',
    traits: ['Gentle', 'Doll-Like', 'Natural', 'Warm'],
    expressionWeights: { neutral: 0.5, happy: 0.8, sad: 0.3, angry: 0.2, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [22, 30],
  },
  {
    id: 'chaewon-lsf',
    name: 'Chaewon',
    nameKr: '채원',
    group: 'LE SSERAFIM',
    groupColor: '#f43f5e',
    gender: 'female',
    typicalAge: 25,
    emoji: '🦅',
    bgGradient: 'linear-gradient(135deg, #dc2626, #7c3aed)',
    wikiTitle: 'Kim_Chae-won_(singer)',
    description: 'Sharp charisma with a powerful girl-crush image and fierce, commanding stage presence.',
    descriptionKr: '강렬한 걸크러쉬 이미지와 카리스마 넘치는 무대의 리더.',
    traits: ['Fierce', 'Leader', 'Sharp', 'Charismatic'],
    expressionWeights: { neutral: 0.7, happy: 0.5, sad: 0.2, angry: 0.6, surprised: 0.3, fearful: 0.1, disgusted: 0.2 },
    ageWeight: [20, 28],
  },
  {
    id: 'eunchae',
    name: 'Eunchae',
    nameKr: '은채',
    group: 'LE SSERAFIM',
    groupColor: '#f43f5e',
    gender: 'female',
    typicalAge: 20,
    emoji: '☀️',
    bgGradient: 'linear-gradient(135deg, #fb923c, #fbbf24)',
    wikiTitle: 'Hong_Eun-chae',
    description: 'Youthful sunshine energy, bright smile, and a lovable personality that wins over every crowd.',
    descriptionKr: '밝고 사랑스러운 태양 같은 에너지의 막내.',
    traits: ['Sunshine', 'Youthful', 'Bright', 'Lovable'],
    expressionWeights: { neutral: 0.3, happy: 0.95, sad: 0.1, angry: 0.1, surprised: 0.6, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [16, 23],
  },

  // ── ILLIT ──────────────────────────────────────────────────────
  {
    id: 'wonhee',
    name: 'Wonhee',
    nameKr: '원희',
    group: 'ILLIT',
    groupColor: '#e879f9',
    gender: 'female',
    typicalAge: 18,
    emoji: '🎀',
    bgGradient: 'linear-gradient(135deg, #e879f9, #f472b6)',
    wikiTitle: 'Wonhee',
    description: 'Adorably expressive face with a soft, approachable charm and a signature eye-smile.',
    descriptionKr: '사랑스러운 표정과 눈웃음이 매력적인 귀여운 비주얼.',
    traits: ['Adorable', 'Expressive', 'Soft', 'Eye-Smile'],
    expressionWeights: { neutral: 0.3, happy: 0.95, sad: 0.1, angry: 0.1, surprised: 0.6, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [15, 22],
  },
  {
    id: 'minju-illit',
    name: 'Minju',
    nameKr: '민주',
    group: 'ILLIT',
    groupColor: '#e879f9',
    gender: 'female',
    typicalAge: 18,
    emoji: '🌷',
    bgGradient: 'linear-gradient(135deg, #c084fc, #818cf8)',
    wikiTitle: 'Kim_Min-ju_(singer)',
    description: 'Pure, elegant features with a calm and serene presence — naturally photogenic and refined.',
    descriptionKr: '차분하고 우아한 분위기의 순수하고 사진발 잘 받는 비주얼.',
    traits: ['Elegant', 'Pure', 'Serene', 'Refined'],
    expressionWeights: { neutral: 0.7, happy: 0.6, sad: 0.3, angry: 0.1, surprised: 0.3, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [15, 22],
  },

  // ── BABYMONSTER ────────────────────────────────────────────────
  {
    id: 'ahyeon',
    name: 'Ahyeon',
    nameKr: '아현',
    group: 'BABYMONSTER',
    groupColor: '#ff6b35',
    gender: 'female',
    typicalAge: 19,
    emoji: '👾',
    bgGradient: 'linear-gradient(135deg, #ff6b35, #a855f7)',
    wikiTitle: 'Ahyeon',
    description: 'Mesmerizing stage presence with sharp, powerful eyes and outstanding vocal and rap versatility.',
    descriptionKr: '날카롭고 강렬한 눈빛과 뛰어난 보컬·랩 실력의 멀티 아티스트.',
    traits: ['Powerful', 'Versatile', 'Sharp', 'Intense'],
    expressionWeights: { neutral: 0.6, happy: 0.5, sad: 0.3, angry: 0.6, surprised: 0.4, fearful: 0.1, disgusted: 0.2 },
    ageWeight: [15, 23],
  },
  {
    id: 'rora',
    name: 'Rora',
    nameKr: '로라',
    group: 'BABYMONSTER',
    groupColor: '#ff6b35',
    gender: 'female',
    typicalAge: 18,
    emoji: '🌟',
    bgGradient: 'linear-gradient(135deg, #f59e0b, #ff6b35)',
    wikiTitle: 'Rora_(singer)',
    description: 'Bright, star-like aura with youthful freshness and a naturally captivating smile.',
    descriptionKr: '밝고 빛나는 아우라와 청순한 매력의 멤버.',
    traits: ['Star-Like', 'Fresh', 'Bright', 'Captivating'],
    expressionWeights: { neutral: 0.4, happy: 0.9, sad: 0.1, angry: 0.1, surprised: 0.6, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [14, 21],
  },

  // ── 피프티피프티 ────────────────────────────────────────────────
  {
    id: 'saena',
    name: 'Saena',
    nameKr: '세나',
    group: 'FIFTY FIFTY',
    groupColor: '#22d3ee',
    gender: 'female',
    typicalAge: 22,
    emoji: '🎵',
    bgGradient: 'linear-gradient(135deg, #22d3ee, #6366f1)',
    wikiTitle: 'Fifty_Fifty',
    description: 'Striking, girl-crush visuals with sharp features and a confident, cool aura.',
    descriptionKr: '날카롭고 자신감 넘치는 걸크러쉬 비주얼.',
    traits: ['Sharp', 'Cool', 'Confident', 'Girl-Crush'],
    expressionWeights: { neutral: 0.7, happy: 0.5, sad: 0.2, angry: 0.4, surprised: 0.3, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [18, 26],
  },

  // ── QWER ──────────────────────────────────────────────────────
  {
    id: 'chodan',
    name: 'Chodan',
    nameKr: '조단',
    group: 'QWER',
    groupColor: '#84cc16',
    gender: 'female',
    typicalAge: 23,
    emoji: '🎸',
    bgGradient: 'linear-gradient(135deg, #84cc16, #22d3ee)',
    wikiTitle: 'QWER_(band)',
    description: 'Bold, rock-idol energy with strong features and an edgy, unconventional charm.',
    descriptionKr: '강렬하고 엣지있는 락 아이돌 스타일의 개성 넘치는 비주얼.',
    traits: ['Edgy', 'Bold', 'Rock', 'Unconventional'],
    expressionWeights: { neutral: 0.5, happy: 0.6, sad: 0.3, angry: 0.6, surprised: 0.4, fearful: 0.1, disgusted: 0.2 },
    ageWeight: [19, 27],
  },

  // ── 2NE1 ──────────────────────────────────────────────────────
  {
    id: 'cl',
    name: 'CL',
    nameKr: '씨엘',
    group: '2NE1',
    groupColor: '#8b5cf6',
    gender: 'female',
    typicalAge: 33,
    emoji: '👊',
    bgGradient: 'linear-gradient(135deg, #8b5cf6, #000000)',
    wikiTitle: 'CL_(singer)',
    description: 'The original queen of K-Pop swagger — fierce, bold, and undeniably magnetic.',
    descriptionKr: '케이팝 스웨거의 원조 퀸 - 강렬하고 대담한 카리스마.',
    traits: ['Fierce', 'Swag', 'Bold', 'Queen'],
    expressionWeights: { neutral: 0.4, happy: 0.5, sad: 0.2, angry: 0.8, surprised: 0.3, fearful: 0.1, disgusted: 0.3 },
    ageWeight: [26, 36],
  },
  {
    id: 'dara',
    name: 'Sandara Park',
    nameKr: '산다라박',
    group: '2NE1',
    groupColor: '#8b5cf6',
    gender: 'female',
    typicalAge: 39,
    emoji: '💜',
    bgGradient: 'linear-gradient(135deg, #c084fc, #f472b6)',
    wikiTitle: 'Sandara_Park',
    description: 'Timeless, youthful beauty that defies age — bright, friendly, and endlessly charming.',
    descriptionKr: '나이를 거스르는 동안과 밝고 친근한 매력의 영원한 아이돌.',
    traits: ['Timeless', 'Youthful', 'Bright', 'Friendly'],
    expressionWeights: { neutral: 0.4, happy: 0.9, sad: 0.1, angry: 0.1, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [28, 42],
  },

  // ── 예나 ──────────────────────────────────────────────────────
  {
    id: 'yena',
    name: 'Yena',
    nameKr: '예나',
    group: 'Solo',
    groupColor: '#fbbf24',
    gender: 'female',
    typicalAge: 27,
    emoji: '🐥',
    bgGradient: 'linear-gradient(135deg, #fbbf24, #fb923c)',
    wikiTitle: 'Choi_Yena',
    description: 'Chick-like adorableness with an explosive bright smile and fun, quirky personality.',
    descriptionKr: '병아리 같은 귀여움과 폭발적인 밝은 미소의 솔로 아티스트.',
    traits: ['Adorable', 'Bright', 'Quirky', 'Fun'],
    expressionWeights: { neutral: 0.2, happy: 0.95, sad: 0.1, angry: 0.1, surprised: 0.7, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [22, 30],
  },

  // ── BIGBANG ───────────────────────────────────────────────────
  {
    id: 'gdragon',
    name: 'G-Dragon',
    nameKr: '지드래곤',
    group: 'BIGBANG',
    groupColor: '#facc15',
    gender: 'male',
    typicalAge: 36,
    emoji: '👑',
    bgGradient: 'linear-gradient(135deg, #facc15, #1a1a1a)',
    wikiTitle: 'G-Dragon',
    description: 'The king of K-Pop — legendary fashion icon with one-of-a-kind charisma and artistry.',
    descriptionKr: '전설적인 패션 아이콘이자 케이팝의 왕, 독보적인 아티스트.',
    traits: ['Legendary', 'Iconic', 'Artistic', 'Fashion King'],
    expressionWeights: { neutral: 0.7, happy: 0.5, sad: 0.4, angry: 0.5, surprised: 0.3, fearful: 0.1, disgusted: 0.2 },
    ageWeight: [28, 40],
  },
  {
    id: 'taeyang',
    name: 'Taeyang',
    nameKr: '태양',
    group: 'BIGBANG',
    groupColor: '#facc15',
    gender: 'male',
    typicalAge: 36,
    emoji: '☀️',
    bgGradient: 'linear-gradient(135deg, #f59e0b, #dc2626)',
    wikiTitle: 'Taeyang',
    description: 'Warm, earnest visuals with a soulful smile and sincere, heartfelt performance energy.',
    descriptionKr: '따뜻하고 진심 어린 미소와 소울풀한 퍼포먼스의 아티스트.',
    traits: ['Warm', 'Sincere', 'Soulful', 'Earnest'],
    expressionWeights: { neutral: 0.4, happy: 0.8, sad: 0.4, angry: 0.3, surprised: 0.4, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [28, 40],
  },
  {
    id: 'top',
    name: 'T.O.P',
    nameKr: '탑',
    group: 'BIGBANG',
    groupColor: '#facc15',
    gender: 'male',
    typicalAge: 37,
    emoji: '🎩',
    bgGradient: 'linear-gradient(135deg, #1e293b, #475569)',
    wikiTitle: 'T.O.P_(rapper)',
    description: 'Cold, brooding aesthetics with deep-set eyes and an enigmatic, cinematic presence.',
    descriptionKr: '차갑고 신비로운 분위기의 깊은 눈빛을 가진 미남 래퍼.',
    traits: ['Enigmatic', 'Brooding', 'Cold', 'Cinematic'],
    expressionWeights: { neutral: 0.9, happy: 0.3, sad: 0.5, angry: 0.4, surprised: 0.2, fearful: 0.2, disgusted: 0.2 },
    ageWeight: [29, 42],
  },

  // ── MONSTA X ──────────────────────────────────────────────────
  {
    id: 'kihyun',
    name: 'Kihyun',
    nameKr: '기현',
    group: 'MONSTA X',
    groupColor: '#06b6d4',
    gender: 'male',
    typicalAge: 30,
    emoji: '🎤',
    bgGradient: 'linear-gradient(135deg, #06b6d4, #0284c7)',
    wikiTitle: 'Yoo_Kihyun',
    description: 'Powerful vocal with a compact, clean-cut handsome face and sharp, expressive eyes.',
    descriptionKr: '파워풀한 보컬과 단정하고 깔끔한 미남 비주얼.',
    traits: ['Handsome', 'Powerful', 'Sharp', 'Clean-Cut'],
    expressionWeights: { neutral: 0.5, happy: 0.7, sad: 0.3, angry: 0.4, surprised: 0.4, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [24, 34],
  },
  {
    id: 'hyungwon',
    name: 'Hyungwon',
    nameKr: '형원',
    group: 'MONSTA X',
    groupColor: '#06b6d4',
    gender: 'male',
    typicalAge: 29,
    emoji: '🌙',
    bgGradient: 'linear-gradient(135deg, #1e40af, #06b6d4)',
    wikiTitle: 'Chae_Hyungwon',
    description: 'Tall, model-proportioned with sleepy-but-striking eyes and an effortlessly cool aura.',
    descriptionKr: '모델 같은 비율과 졸린 듯 강렬한 눈빛의 쿨한 비주얼.',
    traits: ['Model', 'Sleepy Eyes', 'Cool', 'Tall'],
    expressionWeights: { neutral: 0.9, happy: 0.3, sad: 0.4, angry: 0.3, surprised: 0.2, fearful: 0.2, disgusted: 0.1 },
    ageWeight: [23, 33],
  },

  // ── TWS (투어스) ───────────────────────────────────────────────
  {
    id: 'shinyu',
    name: 'Shinyu',
    nameKr: '신유',
    group: 'TWS',
    groupColor: '#7dd3fc',
    gender: 'male',
    typicalAge: 21,
    emoji: '💙',
    bgGradient: 'linear-gradient(135deg, #7dd3fc, #6366f1)',
    wikiTitle: 'TWS_(group)',
    description: 'Fresh, boyish charm with warm, approachable features and a bright, innocent energy.',
    descriptionKr: '따뜻하고 친근한 이목구비의 풋풋하고 청순한 매력.',
    traits: ['Fresh', 'Boyish', 'Warm', 'Innocent'],
    expressionWeights: { neutral: 0.4, happy: 0.85, sad: 0.2, angry: 0.1, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [17, 25],
  },
  {
    id: 'dohoon',
    name: 'Dohoon',
    nameKr: '도훈',
    group: 'TWS',
    groupColor: '#7dd3fc',
    gender: 'male',
    typicalAge: 20,
    emoji: '🌊',
    bgGradient: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    wikiTitle: 'TWS_(group)',
    description: 'Youthful, sea-like freshness with a soft face and natural, effortless good looks.',
    descriptionKr: '소프트하고 자연스러운 외모의 청량한 매력.',
    traits: ['Youthful', 'Soft', 'Natural', 'Fresh'],
    expressionWeights: { neutral: 0.5, happy: 0.8, sad: 0.2, angry: 0.1, surprised: 0.5, fearful: 0.1, disgusted: 0.1 },
    ageWeight: [16, 24],
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
function resizeImage(dataUrl, maxSize = 1280) {
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
   WIKIPEDIA PHOTO FETCH
   =================================================================== */
async function fetchWikiPhoto(wikiTitle) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`,
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.thumbnail?.source ?? null;
  } catch {
    return null;
  }
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
        // Detection — try progressively more sensitive settings for small/distant faces
        let detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.3 }))
          .withFaceLandmarks(true)
          .withFaceExpressions()
          .withAgeAndGender();

        if (!detection) {
          detection = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 608, scoreThreshold: 0.2 }))
            .withFaceLandmarks(true)
            .withFaceExpressions()
            .withAgeAndGender();
        }

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
    <div class="match-avatar-area" style="background: ${top.bgGradient}" id="top-avatar-area">
      <span class="match-emoji" id="top-emoji">${top.emoji}</span>
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
      <div class="ru-avatar" style="background: ${idol.bgGradient}" id="ru-avatar-${i}">
        <span class="ru-emoji" id="ru-emoji-${i}">${idol.emoji}</span>
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

  // Load actual idol photos from Wikipedia asynchronously
  loadIdolPhotos(top, runnerUps);
}

async function loadIdolPhotos(top, runnerUps) {
  // Top match photo
  if (top.wikiTitle) {
    const url = await fetchWikiPhoto(top.wikiTitle);
    if (url) {
      const area = document.getElementById('top-avatar-area');
      const emojiEl = document.getElementById('top-emoji');
      if (area && emojiEl) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = top.name;
        img.className = 'idol-real-photo';
        img.onload = () => { emojiEl.style.display = 'none'; area.appendChild(img); };
      }
    }
  }

  // Runner-up photos
  for (let i = 0; i < runnerUps.length; i++) {
    const idol = runnerUps[i].idol;
    if (!idol.wikiTitle) continue;
    const url = await fetchWikiPhoto(idol.wikiTitle);
    if (url) {
      const area = document.getElementById(`ru-avatar-${i}`);
      const emojiEl = document.getElementById(`ru-emoji-${i}`);
      if (area && emojiEl) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = idol.name;
        img.className = 'idol-real-photo';
        img.onload = () => { emojiEl.style.display = 'none'; area.appendChild(img); };
      }
    }
  }
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
   VISITOR COUNTER
   =================================================================== */
async function trackVisits() {
  const el = document.getElementById('visitor-count');
  if (!el) return;
  try {
    const res = await fetch(
      'https://api.counterapi.dev/v1/goodkpops/idol-look-alike/up',
      { mode: 'cors' }
    );
    if (!res.ok) throw new Error('counter error');
    const data = await res.json();
    if (data.count != null) {
      el.textContent = Number(data.count).toLocaleString();
      el.closest('.visitor-badge')?.classList.remove('hidden');
    }
  } catch {
    el.closest('.visitor-badge')?.remove();
  }
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

  // Track visitor count (non-blocking)
  trackVisits();
}

// Start
document.addEventListener('DOMContentLoaded', init);
