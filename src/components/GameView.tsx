import React from 'react';
import { TabType, ZatType, GameItem } from '../types';
import { GAME_ITEMS, MASCOTS } from '../data/learningData';
import { playClickSound, playSuccessSound, playErrorSound, speakNarration } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Gamepad2, Sparkles, Star, RotateCcw, Trophy, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

interface GameViewProps {
  onNavigate: (tab: TabType) => void;
}

export const GameView: React.FC<GameViewProps> = ({ onNavigate }) => {
  const [itemsPool, setItemsPool] = React.useState<GameItem[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [streak, setStreak] = React.useState<number>(0);
  const [feedback, setFeedback] = React.useState<{ text: string; isCorrect: boolean } | null>(null);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [matchedItems, setMatchedItems] = React.useState<{ item: GameItem; target: ZatType }[]>([]);

  // Initialize and shuffle items
  const startNewGame = () => {
    playClickSound();
    const shuffled = [...GAME_ITEMS].sort(() => Math.random() - 0.5);
    setItemsPool(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setIsGameOver(false);
    setMatchedItems([]);
  };

  React.useEffect(() => {
    startNewGame();
  }, []);

  const currentItem: GameItem | undefined = itemsPool[currentIndex];

  const handleMatch = (targetZat: ZatType) => {
    if (!currentItem || feedback) return;

    if (currentItem.category === targetZat) {
      // Correct!
      playSuccessSound();
      const points = 10 + streak * 2;
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
      setMatchedItems((prev) => [...prev, { item: currentItem, target: targetZat }]);
      setFeedback({
        text: `🎉 Hebat! ${currentItem.name} adalah wujud ${targetZat.toUpperCase()}! ${currentItem.funFact}`,
        isCorrect: true
      });

      // After short delay, move to next item
      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 >= itemsPool.length) {
          setIsGameOver(true);
          playSuccessSound();
          confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.6 }
          });
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 1600);
    } else {
      // Incorrect
      playErrorSound();
      setStreak(0);
      setFeedback({
        text: `Yuk coba lagi! ${currentItem.name} ${currentItem.hint} Siapakah sahabat yang cocok?`,
        isCorrect: false
      });
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  };

  const handleHint = () => {
    if (!currentItem) return;
    playClickSound();
    speakNarration(`Petunjuk: ${currentItem.hint}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-fun text-xl sm:text-2xl font-bold text-slate-900">
              Petualangan Mencari Sahabat
            </h1>
            <p className="text-xs text-slate-500">
              Cocokkan benda sehari-hari ke rumah Si Padat, Si Cair, atau Si Gas!
            </p>
          </div>
        </div>

        {/* Score & Streak */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <span className="text-[10px] font-bold text-amber-800 uppercase block">Skor</span>
            <span className="font-fun font-bold text-lg text-amber-950 tabular-nums">{score}</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-center">
            <span className="text-[10px] font-bold text-purple-800 uppercase block">Runtunan</span>
            <span className="font-fun font-bold text-lg text-purple-950 tabular-nums">🔥 {streak}x</span>
          </div>

          <button
            onClick={startNewGame}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Mulai Ulang Permainan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isGameOver && currentItem ? (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / itemsPool.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Benda ke-{currentIndex + 1} dari {itemsPool.length}</span>
            <button
              onClick={handleHint}
              className="text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Dengarkan Petunjuk</span>
            </button>
          </div>

          {/* Current Object Active Card */}
          <div className="bg-gradient-to-b from-amber-50/70 to-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 text-center shadow-md space-y-4 relative overflow-hidden">
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Siapakah Sahabat dari Benda Ini?
            </div>

            <div className="text-6xl sm:text-7xl filter drop-shadow-md animate-bounce" style={{ animationDuration: '2.5s' }}>
              {currentItem.emoji}
            </div>

            <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentItem.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {currentItem.hint}
            </p>

            {feedback && (
              <div
                className={`p-3 rounded-2xl text-xs sm:text-sm font-fun font-bold border transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 animate-pulse'
                    : 'bg-rose-100 text-rose-900 border-rose-300'
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>

          {/* 3 Mascot Drop Targets / Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Si Padat Target */}
            <button
              onClick={() => handleMatch('padat')}
              className="p-5 rounded-2xl border-2 border-blue-300 bg-gradient-to-b from-blue-50/70 to-white hover:bg-blue-100/60 hover:border-blue-500 hover:-translate-y-1 transition-all cursor-pointer text-center space-y-3 group shadow-xs hover:shadow-md"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-blue-300 shadow-2xs group-hover:scale-105 transition-transform bg-blue-100">
                <img
                  src={MASCOTS.padat.imageSrc}
                  alt="Si Padat"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="font-fun font-bold text-lg text-blue-900 block group-hover:text-blue-700">
                  Rumah SI PADAT
                </span>
                <span className="text-xs font-semibold text-blue-700">
                  Bentuk & Volume Tetap
                </span>
              </div>

              <div className="py-2 px-3 rounded-xl bg-blue-600 text-white font-fun font-bold text-xs group-hover:bg-blue-700">
                Pilih Si Padat
              </div>
            </button>

            {/* Si Cair Target */}
            <button
              onClick={() => handleMatch('cair')}
              className="p-5 rounded-2xl border-2 border-cyan-300 bg-gradient-to-b from-cyan-50/70 to-white hover:bg-cyan-100/60 hover:border-cyan-500 hover:-translate-y-1 transition-all cursor-pointer text-center space-y-3 group shadow-xs hover:shadow-md"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-cyan-300 shadow-2xs group-hover:scale-105 transition-transform bg-cyan-100">
                <img
                  src={MASCOTS.cair.imageSrc}
                  alt="Si Cair"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="font-fun font-bold text-lg text-cyan-900 block group-hover:text-cyan-700">
                  Rumah SI CAIR
                </span>
                <span className="text-xs font-semibold text-cyan-700">
                  Mengikuti Wadah & Mengalir
                </span>
              </div>

              <div className="py-2 px-3 rounded-xl bg-cyan-600 text-white font-fun font-bold text-xs group-hover:bg-cyan-700">
                Pilih Si Cair
              </div>
            </button>

            {/* Si Gas Target */}
            <button
              onClick={() => handleMatch('gas')}
              className="p-5 rounded-2xl border-2 border-purple-300 bg-gradient-to-b from-purple-50/70 to-white hover:bg-purple-100/60 hover:border-purple-500 hover:-translate-y-1 transition-all cursor-pointer text-center space-y-3 group shadow-xs hover:shadow-md"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-purple-300 shadow-2xs group-hover:scale-105 transition-transform bg-purple-100">
                <img
                  src={MASCOTS.gas.imageSrc}
                  alt="Si Gas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="font-fun font-bold text-lg text-purple-900 block group-hover:text-purple-700">
                  Rumah SI GAS
                </span>
                <span className="text-xs font-semibold text-purple-700">
                  Bebas & Memenuhi Ruang
                </span>
              </div>

              <div className="py-2 px-3 rounded-xl bg-purple-600 text-white font-fun font-bold text-xs group-hover:bg-purple-700">
                Pilih Si Gas
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Game Over Celebratory Summary Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-lg text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-4xl shadow-xs animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Permainan Selesai!
            </span>
            <h2 className="font-fun text-3xl font-extrabold text-slate-900">
              Luar Biasa, Sahabat Sains Cilik!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Kamu berhasil mencocokkan semua benda dengan sahabat wujud zat yang tepat! Tiga sahabat sangat bangga padamu!
            </p>
          </div>

          <div className="inline-flex items-center gap-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <div>
              <span className="text-xs font-bold text-slate-500 block">Total Skor</span>
              <span className="font-fun font-bold text-3xl text-amber-900">{score}</span>
            </div>
            <div className="w-px h-10 bg-amber-200" />
            <div>
              <span className="text-xs font-bold text-slate-500 block">Bintang</span>
              <div className="flex items-center gap-1 text-amber-500 text-xl">
                <Star className="w-6 h-6 fill-amber-400" />
                <Star className="w-6 h-6 fill-amber-400" />
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={startNewGame}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-fun font-bold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mainkan Lagi</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onNavigate('kuis');
              }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-fun font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Uji Kemampuan di Kuis Pintar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
