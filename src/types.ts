export type TabType = 'home' | 'petunjuk' | 'materi' | 'lab' | 'game' | 'kuis' | 'rangkuman' | 'tentang';

export type ZatType = 'padat' | 'cair' | 'gas';

export interface CharacterMascot {
  id: ZatType;
  name: string;
  nickname: string;
  colorName: string;
  themeColor: string;
  bgLight: string;
  borderColor: string;
  imageSrc: string;
  quote: string;
  voiceLine: string;
  powers: string[];
  shapeRule: string;
  volumeRule: string;
  particleDescription: string;
  dailyExamples: { name: string; icon: string; desc: string }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: 'A' | 'B' | 'C';
  explanation: string;
  relatedMascot: ZatType;
  hint: string;
}

export interface GameItem {
  id: string;
  name: string;
  category: ZatType;
  iconName: string;
  emoji: string;
  funFact: string;
  hint: string;
}
