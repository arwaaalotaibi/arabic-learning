export type Letter = {
  l: string;
  name: string;
  word: string;
  meaning: string;
};

export type TileColor = { bg: string; ink: string; accent: string };

export type Haraka = {
  name: string;
  mark: string;
  sound: 'a' | 'u' | 'i';
  color: string;
  emoji: string;
};

export type LetterForm = {
  id: 'isolated' | 'initial' | 'medial' | 'final';
  name: string;
  short: string;
  text: string;
  hint: string;
};

export const LETTERS: Letter[] = [
  { l: 'ا', name: 'ألف', word: 'أَرنب', meaning: 'rabbit' },
  { l: 'ب', name: 'باء', word: 'بَطَّة', meaning: 'duck' },
  { l: 'ت', name: 'تاء', word: 'تُفّاحة', meaning: 'apple' },
  { l: 'ث', name: 'ثاء', word: 'ثَعلب', meaning: 'fox' },
  { l: 'ج', name: 'جيم', word: 'جَمَل', meaning: 'camel' },
  { l: 'ح', name: 'حاء', word: 'حِصان', meaning: 'horse' },
  { l: 'خ', name: 'خاء', word: 'خَروف', meaning: 'sheep' },
  { l: 'د', name: 'دال', word: 'دُبّ', meaning: 'bear' },
  { l: 'ذ', name: 'ذال', word: 'ذِئب', meaning: 'wolf' },
  { l: 'ر', name: 'راء', word: 'رُمّان', meaning: 'pomegranate' },
  { l: 'ز', name: 'زاي', word: 'زَرافة', meaning: 'giraffe' },
  { l: 'س', name: 'سين', word: 'سَمَكة', meaning: 'fish' },
  { l: 'ش', name: 'شين', word: 'شَمس', meaning: 'sun' },
  { l: 'ص', name: 'صاد', word: 'صَقر', meaning: 'falcon' },
  { l: 'ض', name: 'ضاد', word: 'ضِفدع', meaning: 'frog' },
  { l: 'ط', name: 'طاء', word: 'طائر', meaning: 'bird' },
  { l: 'ظ', name: 'ظاء', word: 'ظَبي', meaning: 'gazelle' },
  { l: 'ع', name: 'عين', word: 'عُصفور', meaning: 'sparrow' },
  { l: 'غ', name: 'غين', word: 'غَزال', meaning: 'deer' },
  { l: 'ف', name: 'فاء', word: 'فيل', meaning: 'elephant' },
  { l: 'ق', name: 'قاف', word: 'قِطّ', meaning: 'cat' },
  { l: 'ك', name: 'كاف', word: 'كَلب', meaning: 'dog' },
  { l: 'ل', name: 'لام', word: 'لَيمون', meaning: 'lemon' },
  { l: 'م', name: 'ميم', word: 'مَوز', meaning: 'banana' },
  { l: 'ن', name: 'نون', word: 'نَحلة', meaning: 'bee' },
  { l: 'ه', name: 'هاء', word: 'هُدهُد', meaning: 'hoopoe' },
  { l: 'و', name: 'واو', word: 'وَردة', meaning: 'rose' },
  { l: 'ي', name: 'ياء', word: 'يَمامة', meaning: 'dove' },
];

export const TILE_COLORS: TileColor[] = [
  { bg: '#FFE0F0', ink: '#C0006A', accent: '#F72585' },
  { bg: '#E5F4FF', ink: '#0064A8', accent: '#4CC9F0' },
  { bg: '#FFF3D6', ink: '#8C5A00', accent: '#FFBE0B' },
  { bg: '#EDE0FF', ink: '#4A0090', accent: '#7209B7' },
  { bg: '#D9FFE7', ink: '#006B36', accent: '#06C167' },
  { bg: '#FFDFD3', ink: '#A03200', accent: '#FF6B35' },
];

export const HARAKAT: Haraka[] = [
  { name: 'فَتْحَة', mark: 'َ', sound: 'a', color: '#F72585', emoji: '↗' },
  { name: 'ضَمَّة', mark: 'ُ', sound: 'u', color: '#FFBE0B', emoji: '↻' },
  { name: 'كَسْرَة', mark: 'ِ', sound: 'i', color: '#4CC9F0', emoji: '↘' },
];

export const NON_CONNECTING = ['ا', 'د', 'ذ', 'ر', 'ز', 'و'];

export function getLetterForms(letter: string): LetterForm[] {
  const T = 'ـ';
  if (NON_CONNECTING.includes(letter)) {
    return [
      { id: 'isolated', name: 'مُفرَد', short: 'مُفرَد', text: letter, hint: 'الشَّكل الأَصلي لِلحَرف' },
      { id: 'final', name: 'في آخِر الكَلِمة', short: 'النِّهاية', text: T + letter, hint: 'مُتَّصِل مِنَ اليَمين فَقَط' },
    ];
  }
  return [
    { id: 'isolated', name: 'مُفرَد', short: 'مُفرَد', text: letter, hint: 'الشَّكل الأَصلي لِلحَرف' },
    { id: 'initial', name: 'في أَوَّل الكَلِمة', short: 'البِداية', text: letter + T, hint: 'مُتَّصِل مِنَ اليَسار' },
    { id: 'medial', name: 'في وَسَط الكَلِمة', short: 'الوَسَط', text: T + letter + T, hint: 'مُتَّصِل مِن الجِهَتَين' },
    { id: 'final', name: 'في آخِر الكَلِمة', short: 'النِّهاية', text: T + letter, hint: 'مُتَّصِل مِنَ اليَمين' },
  ];
}

export type Progress = {
  completed: number[];
  stars: number;
  lastIndex: number;
};

export type Tweaks = {
  theme: 'candy' | 'ocean' | 'sunset' | 'meadow';
  mascot: 'owl' | 'parrot' | 'cat';
  letterFont: 'naskh' | 'amiri' | 'cairo' | 'markazi' | 'kufi';
  bigButtons: boolean;
  showMascot: boolean;
};

export const TWEAK_DEFAULTS: Tweaks = {
  theme: 'candy',
  mascot: 'owl',
  letterFont: 'naskh',
  bigButtons: true,
  showMascot: true,
};

export const LETTER_FONTS: Record<Tweaks['letterFont'], { label: string; family: string }> = {
  naskh: { label: 'نَسخ', family: "'Noto Naskh Arabic', 'Cairo', serif" },
  amiri: { label: 'أَميري', family: "'Amiri', 'Noto Naskh Arabic', serif" },
  cairo: { label: 'القاهِرة', family: "'Cairo', sans-serif" },
  markazi: { label: 'مَركَزي', family: "'Markazi Text', serif" },
  kufi: { label: 'كوفي', family: "'Reem Kufi', sans-serif" },
};

export type Screen = 'home' | 'letter' | 'write' | 'game' | 'profile';
