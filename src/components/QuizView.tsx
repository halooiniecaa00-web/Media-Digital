import React from 'react';
import { TabType, QuizQuestion } from '../types';
import { QUIZ_QUESTIONS, MASCOTS } from '../data/learningData';
import { playClickSound, playSuccessSound, playErrorSound, speakNarration } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Award, Star, CheckCircle2, XCircle, Volume2, ArrowRight, RotateCcw, Home, Printer, Sparkles, HelpCircle } from 'lucide-react';

interface QuizViewProps {
  onNavigate: (tab: TabType) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, 'A' | 'B' | 'C'>>({});
  const [showFeedback, setShowFeedback] = React.useState<boolean>(false);
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);
  const [studentName, setStudentName] = React.useState<string>('Siswa Cerdas IPAS');
  const [hintVisible, setHintVisible] = React.useState<boolean>(false);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const userChoice = selectedAnswers[question.id];
  const isCorrect = userChoice === question.correctAnswer;

  const handleSelectOption = (opt: 'A' | 'B' | 'C') => {
    if (showFeedback) return;
    playClickSound();
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: opt }));
    setShowFeedback(true);

    if (opt === question.correctAnswer) {
      playSuccessSound();
      speakNarration('Hebat! Jawabanmu benar!');
    } else {
      playErrorSound();
      speakNarration('Jawabanmu belum tepat. Yuk pelajari pembahasannya!');
    }
  };

  const handleNext = () => {
    playClickSound();
    setShowFeedback(false);
    setHintVisible(false);

    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      playSuccessSound();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    playClickSound();
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setIsCompleted(false);
    setHintVisible(false);
  };

  const handleReadQuestion = () => {
    playClickSound();
    const text = `Soal nomor ${currentIndex + 1}. ${question.question}. Opsi A: ${question.options[0].text}. Opsi B: ${question.options[1].text}. Opsi C: ${question.options[2].text}.`;
    speakNarration(text);
  };

  // Calculate results
  const totalQuestions = QUIZ_QUESTIONS.length;
  const correctCount = Object.entries(selectedAnswers).filter(
    ([id, ans]) => QUIZ_QUESTIONS.find((q) => q.id === Number(id))?.correctAnswer === ans
  ).length;
  const incorrectCount = totalQuestions - correctCount;
  const finalScore = Math.round((correctCount / totalQuestions) * 100);

  let stars = 1;
  let predikat = 'Penjelajah Sains Pemula';
  let motivasi = 'Bagus sekali! Teruslah rajin belajar dan bereksplorasi ya!';

  if (finalScore >= 80) {
    stars = 3;
    predikat = 'Bintang Sains Super Cilik!';
    motivasi = 'Wah, luar biasa hebat! Kamu berhasil menjadi Sahabat Sains Sejati!';
  } else if (finalScore >= 60) {
    stars = 2;
    predikat = 'Peneliti Sains Berbakat!';
    motivasi = 'Hebat sekali! Pemahamanmu tentang 3 wujud zat sudah sangat baik!';
  }

  const handlePrintCertificate = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {!isCompleted ? (
        <div className="space-y-6">
          {/* Header & Progress */}
          <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-rose-600 text-white font-fun font-bold text-sm flex items-center justify-center">
                  Q
                </span>
                <div>
                  <h1 className="font-fun font-bold text-lg text-slate-900">
                    Kuis Evaluasi 3 Wujud Zat
                  </h1>
                  <span className="text-xs text-slate-500">IPAS Kelas 3 SD Bab 8</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReadQuestion}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold font-fun flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Dengarkan Soal</span>
                </button>

                <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-full font-fun font-bold text-xs">
                  Soal {currentIndex + 1} / {totalQuestions}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-rose-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 font-fun font-bold text-base flex items-center justify-center shrink-0 border border-amber-300">
                {currentIndex + 1}
              </span>
              <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {question.question}
              </h2>
            </div>

            {/* Hint toggler */}
            <div>
              <button
                onClick={() => {
                  playClickSound();
                  setHintVisible(!hintVisible);
                }}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{hintVisible ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk?'}</span>
              </button>
              {hintVisible && (
                <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
                  💡 <strong>Petunjuk:</strong> {question.hint}
                </div>
              )}
            </div>

            {/* 3 Options (A, B, C) */}
            <div className="space-y-3">
              {question.options.map((opt) => {
                const isSelected = userChoice === opt.label;
                const isThisCorrect = opt.label === question.correctAnswer;

                let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                if (showFeedback) {
                  if (isThisCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-bold';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelectOption(opt.label as 'A' | 'B' | 'C')}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 cursor-pointer ${btnStyle}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl font-fun font-bold text-sm flex items-center justify-center shrink-0 border ${
                        showFeedback && isThisCorrect
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : showFeedback && isSelected
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white border-slate-300 text-slate-800'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="font-fun text-sm sm:text-base flex-1">{opt.text}</span>

                    {showFeedback && isThisCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {showFeedback && isSelected && !isThisCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Panel */}
            {showFeedback && (
              <div
                className={`p-4 rounded-2xl border-2 space-y-2 animate-fade-in ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="font-fun font-bold text-base flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span>Hebat! Jawabanmu Benar!</span>
                    </>
                  ) : (
                    <>
                      <span>💡 Penjelasan Jawaban:</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{question.explanation}</p>
              </div>
            )}

            {/* Next Question Button */}
            {showFeedback && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-fun font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentIndex + 1 < totalQuestions ? 'Soal Selanjutnya' : 'Lihat Hasil Belajar'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Final Scorecard & Printable Certificate */
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-xl space-y-8 text-center print:border-2 print:shadow-none">
            {/* Header Ribbon */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Piagam Sahabat Sains IPAS Kelas 3 SD</span>
              </div>
              <h2 className="font-fun text-3xl sm:text-4xl font-extrabold text-slate-900">
                HASIL BELAJAR EVALUASI
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">{motivasi}</p>
            </div>

            {/* Stars row */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-10 h-10 ${
                    i < stars ? 'text-amber-400 fill-amber-400 animate-bounce' : 'text-slate-200'
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            {/* Student Name Input / Display */}
            <div className="max-w-md mx-auto p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2">
              <label className="text-xs font-bold text-amber-900 block text-left">
                Nama Siswa:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Tuliskan Namamu di Sini..."
                className="w-full px-4 py-2 rounded-xl bg-white border border-amber-300 font-fun font-bold text-base text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-[11px] text-amber-700 block text-left">
                (Nama ini akan tercetak di piagam penghargaanmu)
              </span>
            </div>

            {/* Scorecard Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Jawaban Benar</span>
                <span className="font-fun font-bold text-2xl text-emerald-600 tabular-nums">
                  {correctCount}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Jawaban Salah</span>
                <span className="font-fun font-bold text-2xl text-rose-500 tabular-nums">
                  {incorrectCount}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Nilai Akhir</span>
                <span className="font-fun font-bold text-2xl text-amber-600 tabular-nums">
                  {finalScore} / 100
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Predikat</span>
                <span className="font-fun font-bold text-xs text-slate-900 block mt-1">
                  {predikat}
                </span>
              </div>
            </div>

            {/* Mascot endorsement stamp */}
            <div className="p-4 bg-gradient-to-r from-blue-50 via-cyan-50 to-purple-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-400">
                  <img src={MASCOTS.padat.imageSrc} alt="Si Padat" className="w-full h-full object-cover" />
                </div>
                <span className="font-fun font-bold text-xs text-blue-900">Si Padat Setuju!</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400">
                  <img src={MASCOTS.cair.imageSrc} alt="Si Cair" className="w-full h-full object-cover" />
                </div>
                <span className="font-fun font-bold text-xs text-cyan-900">Si Cair Bangga!</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-400">
                  <img src={MASCOTS.gas.imageSrc} alt="Si Gas" className="w-full h-full object-cover" />
                </div>
                <span className="font-fun font-bold text-xs text-purple-900">Si Gas Bergembira!</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 print:hidden">
              <button
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-fun font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan Piagam</span>
              </button>

              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-fun font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onNavigate('home');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-fun font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
