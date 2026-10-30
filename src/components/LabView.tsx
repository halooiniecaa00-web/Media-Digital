import React from 'react';
import { TabType, ZatType } from '../types';
import { playClickSound, playSuccessSound, playErrorSound, playSplashSound, playPumpSound, playPopSound, speakNarration } from '../utils/audio';
import confetti from 'canvas-confetti';
import { FlaskConical, Sparkles, CheckCircle2, RotateCcw, ArrowRight, Wind, Droplet, Box, Star, Play, Check } from 'lucide-react';

interface LabViewProps {
  onNavigate: (tab: TabType) => void;
}

export const LabView: React.FC<LabViewProps> = ({ onNavigate }) => {
  const [activeExp, setActiveExp] = React.useState<1 | 2 | 3>(1);
  const [completedExps, setCompletedExps] = React.useState<Record<number, boolean>>({});

  // --- EXPERIMENT 1 STATES ---
  const [exp1SelectedObject, setExp1SelectedObject] = React.useState<'batu' | 'air' | 'balon'>('batu');
  const [exp1Target, setExp1Target] = React.useState<'kotak' | 'mangkuk' | 'akuarium'>('kotak');
  const [exp1AnswerShape, setExp1AnswerShape] = React.useState<'tetap' | 'berubah' | null>(null);
  const [exp1Feedback, setExp1Feedback] = React.useState<string | null>(null);

  // --- EXPERIMENT 2 STATES ---
  const [exp2Liquid, setExp2Liquid] = React.useState<'air' | 'susu' | 'sirup' | 'minyak'>('air');
  const [exp2Vessel, setExp2Vessel] = React.useState<'tabung' | 'mangkuk' | 'labu' | 'piring'>('tabung');
  const [exp2Volume, setExp2Volume] = React.useState<number>(200); // 200 ml
  const [exp2IsPouring, setExp2IsPouring] = React.useState<boolean>(false);

  // --- EXPERIMENT 3 STATES ---
  const [exp3Pumps, setExp3Pumps] = React.useState<number>(1); // 0 to 5
  const [exp3Released, setExp3Released] = React.useState<boolean>(false);

  const markCompleted = (expNum: 1 | 2 | 3) => {
    if (!completedExps[expNum]) {
      setCompletedExps((prev) => ({ ...prev, [expNum]: true }));
      playSuccessSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  // Exp 1: Verify Answer
  const handleExp1Check = (ans: 'tetap' | 'berubah') => {
    setExp1AnswerShape(ans);
    playClickSound();

    let correct = false;
    if (exp1SelectedObject === 'batu' && ans === 'tetap') correct = true;
    if (exp1SelectedObject === 'air' && ans === 'berubah') correct = true;
    if (exp1SelectedObject === 'balon' && ans === 'berubah') correct = true;

    if (correct) {
      playSuccessSound();
      setExp1Feedback(
        exp1SelectedObject === 'batu'
          ? '🌟 Hebat sekali! Batu adalah zat padat, sehingga bentuknya TETAP sama di wadah mana pun!'
          : exp1SelectedObject === 'air'
          ? '🌟 Pintar! Air adalah zat cair, sehingga bentuknya BERUBAH mengikuti wadah!'
          : '🌟 Luar biasa! Gas udara di dalam balon bentuknya BERUBAH dan mengisi seluruh ruang!'
      );
      markCompleted(1);
    } else {
      playErrorSound();
      setExp1Feedback('Ayo amati lagi! Apakah bentuk benda itu berubah menyerupai wadah, atau tetap seperti aslinya? Coba lagi ya!');
    }
  };

  // Exp 2: Pour Liquid
  const handleExp2Pour = (vessel: 'tabung' | 'mangkuk' | 'labu' | 'piring') => {
    playSplashSound();
    setExp2IsPouring(true);
    setExp2Vessel(vessel);
    setTimeout(() => {
      setExp2IsPouring(false);
      markCompleted(2);
    }, 600);
  };

  // Exp 3: Pump Balloon
  const handleExp3Pump = () => {
    if (exp3Released) setExp3Released(false);
    playPumpSound();
    setExp3Pumps((prev) => {
      const next = prev >= 5 ? 5 : prev + 1;
      if (next >= 4) markCompleted(3);
      return next;
    });
  };

  // Exp 3: Release Balloon
  const handleExp3Release = () => {
    playPopSound();
    setExp3Released(true);
    setExp3Pumps(0);
    speakNarration('Wuuush! Udara gas melesat keluar dan partikelnya menyebar bebas ke seluruh ruangan!');
    markCompleted(3);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Title & Introduction */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 border border-blue-300 rounded-full text-xs font-bold">
          <FlaskConical className="w-3.5 h-3.5 text-blue-700" />
          <span>Laboratorium Tiga Sahabat</span>
        </div>
        <h1 className="font-fun text-3xl sm:text-4xl font-extrabold text-slate-900">
          Laboratorium Virtual Sains
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Selamat datang di lab sains! Yuk coba 3 eksperimen interaktif untuk membuktikan sendiri kehebatan Si Padat, Si Cair, dan Si Gas!
        </p>
      </div>

      {/* Experiment Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => {
            playClickSound();
            setActiveExp(1);
          }}
          className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer text-left ${
            activeExp === 1
              ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-300 shadow-sm'
              : 'border-slate-200 bg-white hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-fun font-bold text-base shadow-xs shrink-0">
              1
            </div>
            <div>
              <div className="font-fun font-bold text-sm text-slate-900">Ayo Pindahkan Benda!</div>
              <div className="text-[11px] text-slate-500">Uji bentuk benda padat, cair, gas</div>
            </div>
          </div>
          {completedExps[1] && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
        </button>

        <button
          onClick={() => {
            playClickSound();
            setActiveExp(2);
          }}
          className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer text-left ${
            activeExp === 2
              ? 'border-cyan-500 bg-cyan-50/80 ring-2 ring-cyan-300 shadow-sm'
              : 'border-slate-200 bg-white hover:border-cyan-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-fun font-bold text-base shadow-xs shrink-0">
              2
            </div>
            <div>
              <div className="font-fun font-bold text-sm text-slate-900">Ke Mana Bentuk Air?</div>
              <div className="text-[11px] text-slate-500">Tuang cairan ke aneka wadah</div>
            </div>
          </div>
          {completedExps[2] && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
        </button>

        <button
          onClick={() => {
            playClickSound();
            setActiveExp(3);
          }}
          className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer text-left ${
            activeExp === 3
              ? 'border-purple-500 bg-purple-50/80 ring-2 ring-purple-300 shadow-sm'
              : 'border-slate-200 bg-white hover:border-purple-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-fun font-bold text-base shadow-xs shrink-0">
              3
            </div>
            <div>
              <div className="font-fun font-bold text-sm text-slate-900">Ayo Isi Balonnya!</div>
              <div className="text-[11px] text-slate-500">Pompa gas dan amati ruang</div>
            </div>
          </div>
          {completedExps[3] && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
        </button>
      </div>

      {/* EXPERIMENT 1 CARD */}
      {activeExp === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-300 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Eksperimen 1</span>
              <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-900">
                Ayo Pindahkan Benda ke Wadah Uji!
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClickSound();
                  setExp1AnswerShape(null);
                  setExp1Feedback(null);
                  setExp1SelectedObject('batu');
                  setExp1Target('kotak');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Atur Ulang</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  1. Pilih Benda untuk Diuji:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setExp1SelectedObject('batu');
                      setExp1AnswerShape(null);
                      setExp1Feedback(null);
                    }}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      exp1SelectedObject === 'batu'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">🪨</div>
                    <div className="text-xs">Batu Kali</div>
                    <div className="text-[10px] text-slate-500">(Zat Padat)</div>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setExp1SelectedObject('air');
                      setExp1AnswerShape(null);
                      setExp1Feedback(null);
                    }}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      exp1SelectedObject === 'air'
                        ? 'border-cyan-600 bg-cyan-50 text-cyan-900 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">💧</div>
                    <div className="text-xs">Air Segar</div>
                    <div className="text-[10px] text-slate-500">(Zat Cair)</div>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setExp1SelectedObject('balon');
                      setExp1AnswerShape(null);
                      setExp1Feedback(null);
                    }}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      exp1SelectedObject === 'balon'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">🎈</div>
                    <div className="text-xs">Gas Udara</div>
                    <div className="text-[10px] text-slate-500">(Zat Gas)</div>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  2. Pindahkan ke Wadah Uji:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['kotak', 'mangkuk', 'akuarium'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => {
                        playClickSound();
                        setExp1Target(w);
                      }}
                      className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer text-xs font-semibold ${
                        exp1Target === w
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50'
                      }`}
                    >
                      {w === 'kotak' ? '📦 Kotak Kaca' : w === 'mangkuk' ? '🥣 Mangkuk' : '🫧 Akuarium'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiry Question */}
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-amber-950 block">
                  🤔 Pertanyaan Peneliti Cilik:
                </span>
                <p className="text-xs text-amber-900">
                  Saat {exp1SelectedObject === 'batu' ? 'Batu' : exp1SelectedObject === 'air' ? 'Air' : 'Gas'} dimasukkan ke dalam {exp1Target}, apakah bentuknya tetap atau berubah?
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleExp1Check('tetap')}
                    className={`py-2 px-3 rounded-xl font-fun font-bold text-xs transition-all cursor-pointer ${
                      exp1AnswerShape === 'tetap'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-amber-300 text-slate-800 hover:bg-white'
                    }`}
                  >
                    🔒 Bentuknya TETAP
                  </button>

                  <button
                    onClick={() => handleExp1Check('berubah')}
                    className={`py-2 px-3 rounded-xl font-fun font-bold text-xs transition-all cursor-pointer ${
                      exp1AnswerShape === 'berubah'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-amber-300 text-slate-800 hover:bg-white'
                    }`}
                  >
                    🔄 Bentuknya BERUBAH
                  </button>
                </div>
              </div>

              {exp1Feedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium border leading-relaxed ${
                    exp1Feedback.startsWith('🌟')
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                      : 'bg-rose-50 text-rose-950 border-rose-300'
                  }`}
                >
                  {exp1Feedback}
                </div>
              )}
            </div>

            {/* Visual Testing Stage */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 min-h-72 relative">
              <div className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">
                Meja Uji Laboratorium
              </div>

              {/* Container Shape Render */}
              <div className="relative flex items-center justify-center">
                {exp1Target === 'kotak' && (
                  <div className="w-56 h-48 border-4 border-slate-400 bg-white/70 rounded-xl relative flex items-center justify-center shadow-inner overflow-hidden">
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-400">Kotak Kaca Transparan</span>
                    {exp1SelectedObject === 'batu' && (
                      <div className="text-5xl filter drop-shadow-md animate-bounce" style={{ animationDuration: '2s' }}>
                        🪨
                      </div>
                    )}
                    {exp1SelectedObject === 'air' && (
                      <div className="w-full h-24 bg-sky-400/80 self-end border-t-2 border-sky-300 flex items-center justify-center text-white text-xs font-bold">
                        Air Mengikuti Bentuk Kotak!
                      </div>
                    )}
                    {exp1SelectedObject === 'balon' && (
                      <div className="w-full h-full bg-purple-200/40 flex items-center justify-center text-purple-800 text-xs font-bold text-center p-4">
                        Partikel Gas Memenuhi Seluruh Ruang Kotak! 💨
                      </div>
                    )}
                  </div>
                )}

                {exp1Target === 'mangkuk' && (
                  <div className="w-56 h-32 border-4 border-slate-400 border-t-0 bg-white/70 rounded-b-full relative flex items-center justify-center shadow-inner overflow-hidden">
                    <span className="absolute top-2 text-[10px] font-bold text-slate-400">Mangkuk Cembung</span>
                    {exp1SelectedObject === 'batu' && (
                      <div className="text-5xl filter drop-shadow-md">
                        🪨
                      </div>
                    )}
                    {exp1SelectedObject === 'air' && (
                      <div className="w-full h-20 bg-sky-400/80 self-end rounded-b-full border-t-2 border-sky-300 flex items-center justify-center text-white text-xs font-bold">
                        Air Melengkung Menyerupai Mangkuk!
                      </div>
                    )}
                    {exp1SelectedObject === 'balon' && (
                      <div className="w-full h-full bg-purple-200/40 flex items-center justify-center text-purple-800 text-xs font-bold text-center p-2">
                        Gas Menyebar ke Seluruh Cekungan! 💨
                      </div>
                    )}
                  </div>
                )}

                {exp1Target === 'akuarium' && (
                  <div className="w-64 h-48 border-4 border-slate-400 bg-white/70 rounded-2xl relative flex items-center justify-center shadow-inner overflow-hidden">
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-400">Akuarium Silinder Kaca</span>
                    {exp1SelectedObject === 'batu' && (
                      <div className="text-5xl filter drop-shadow-md animate-bounce" style={{ animationDuration: '3s' }}>
                        🪨
                      </div>
                    )}
                    {exp1SelectedObject === 'air' && (
                      <div className="w-full h-28 bg-sky-400/80 self-end border-t-2 border-sky-300 flex items-center justify-center text-white text-xs font-bold">
                        Air Mengisi Dasar Akuarium!
                      </div>
                    )}
                    {exp1SelectedObject === 'balon' && (
                      <div className="w-full h-full bg-purple-200/40 flex items-center justify-center text-purple-800 text-xs font-bold text-center p-4">
                        Gas Mengisi Ruang Akuarium Sampai Penuh! 💨
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPERIMENT 2 CARD */}
      {activeExp === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-cyan-300 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Eksperimen 2</span>
              <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-900">
                Ke Mana Bentuk Air? (Eksplorasi Volume & Wadah)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 bg-cyan-100 text-cyan-900 rounded-full">
                Volume Tetap: {exp2Volume} mL
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Control Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  1. Pilih Jenis Cairan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setExp2Liquid('air');
                    }}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer ${
                      exp2Liquid === 'air' ? 'bg-sky-500 text-white border-sky-600 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>💧</span>
                    <span>Air Bersih (Biru)</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setExp2Liquid('susu');
                    }}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer ${
                      exp2Liquid === 'susu' ? 'bg-amber-600 text-white border-amber-700 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>🥛</span>
                    <span>Susu Sapi (Putih)</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setExp2Liquid('sirup');
                    }}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer ${
                      exp2Liquid === 'sirup' ? 'bg-rose-500 text-white border-rose-600 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>🍓</span>
                    <span>Sirup Manis (Merah)</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setExp2Liquid('minyak');
                    }}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer ${
                      exp2Liquid === 'minyak' ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>🍳</span>
                    <span>Minyak (Emas)</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  2. Tuangkan ke Wadah:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleExp2Pour('tabung')}
                    className={`py-2 px-3 rounded-xl border font-fun font-bold text-xs flex items-center gap-1.5 cursor-pointer ${
                      exp2Vessel === 'tabung' ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>🥛 Gelas Silinder</span>
                  </button>

                  <button
                    onClick={() => handleExp2Pour('mangkuk')}
                    className={`py-2 px-3 rounded-xl border font-fun font-bold text-xs flex items-center gap-1.5 cursor-pointer ${
                      exp2Vessel === 'mangkuk' ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>🥣 Mangkuk Bundar</span>
                  </button>

                  <button
                    onClick={() => handleExp2Pour('labu')}
                    className={`py-2 px-3 rounded-xl border font-fun font-bold text-xs flex items-center gap-1.5 cursor-pointer ${
                      exp2Vessel === 'labu' ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>🧪 Labu Erlenmeyer</span>
                  </button>

                  <button
                    onClick={() => handleExp2Pour('piring')}
                    className={`py-2 px-3 rounded-xl border font-fun font-bold text-xs flex items-center gap-1.5 cursor-pointer ${
                      exp2Vessel === 'piring' ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>🍽️ Piring Cekung</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-cyan-50/90 border border-cyan-200 rounded-2xl text-xs text-cyan-950 space-y-1.5 leading-relaxed">
                <div className="font-bold flex items-center gap-1 text-cyan-900">
                  <Sparkles className="w-4 h-4 text-cyan-700" />
                  <span>Penjelasan Sains Si Cair:</span>
                </div>
                <p>
                  Perhatikan! Meskipun bentuk permukaan cairan berubah ketika dituangkan ke wadah yang berbeda, <strong>banyaknya air (volume) tetap sama persis, yaitu 200 mL</strong>. Inilah rahasia super Si Cair!
                </p>
              </div>
            </div>

            {/* Pouring Animation & Vessel Render */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 min-h-72 relative overflow-hidden">
              {/* Dynamic pouring liquid stream */}
              {exp2IsPouring && (
                <div
                  className={`w-3 h-28 absolute top-0 z-20 animate-pulse rounded-full ${
                    exp2Liquid === 'air'
                      ? 'bg-sky-400'
                      : exp2Liquid === 'susu'
                      ? 'bg-amber-100 border border-amber-300'
                      : exp2Liquid === 'sirup'
                      ? 'bg-rose-500'
                      : 'bg-amber-400'
                  }`}
                />
              )}

              {/* Vessel Graphics */}
              <div className="relative flex flex-col items-center justify-end">
                {exp2Vessel === 'tabung' && (
                  <div className="w-28 h-44 border-4 border-slate-400 border-t-0 rounded-b-2xl bg-white/50 relative overflow-hidden flex items-end">
                    <div
                      className={`w-full transition-all duration-700 rounded-b-xl flex flex-col items-center justify-center ${
                        exp2Liquid === 'air'
                          ? 'bg-sky-400/90 h-32'
                          : exp2Liquid === 'susu'
                          ? 'bg-amber-100 border-t-2 border-amber-200 h-32'
                          : exp2Liquid === 'sirup'
                          ? 'bg-rose-500/90 h-32'
                          : 'bg-amber-400/90 h-32'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-slate-900 bg-white/70 px-1.5 py-0.5 rounded-sm">200 mL</span>
                    </div>
                  </div>
                )}

                {exp2Vessel === 'mangkuk' && (
                  <div className="w-52 h-28 border-4 border-slate-400 border-t-0 rounded-b-full bg-white/50 relative overflow-hidden flex items-end">
                    <div
                      className={`w-full transition-all duration-700 rounded-b-full flex flex-col items-center justify-center ${
                        exp2Liquid === 'air'
                          ? 'bg-sky-400/90 h-20'
                          : exp2Liquid === 'susu'
                          ? 'bg-amber-100 border-t-2 border-amber-200 h-20'
                          : exp2Liquid === 'sirup'
                          ? 'bg-rose-500/90 h-20'
                          : 'bg-amber-400/90 h-20'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-slate-900 bg-white/70 px-1.5 py-0.5 rounded-sm">200 mL</span>
                    </div>
                  </div>
                )}

                {exp2Vessel === 'labu' && (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-14 border-4 border-slate-400 border-b-0 border-t-0 bg-white/40" />
                    <div
                      className="w-40 h-36 border-4 border-slate-400 border-t-0 bg-white/50 relative overflow-hidden flex items-end"
                      style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
                    >
                      <div
                        className={`w-full transition-all duration-700 flex flex-col items-center justify-center ${
                          exp2Liquid === 'air'
                            ? 'bg-sky-400/90 h-24'
                            : exp2Liquid === 'susu'
                            ? 'bg-amber-100 border-t-2 border-amber-200 h-24'
                            : exp2Liquid === 'sirup'
                            ? 'bg-rose-500/90 h-24'
                            : 'bg-amber-400/90 h-24'
                        }`}
                      >
                        <span className="text-[11px] font-bold text-slate-900 bg-white/70 px-1.5 py-0.5 rounded-sm">200 mL</span>
                      </div>
                    </div>
                  </div>
                )}

                {exp2Vessel === 'piring' && (
                  <div className="w-64 h-16 border-4 border-slate-400 border-t-0 rounded-b-3xl bg-white/50 relative overflow-hidden flex items-end">
                    <div
                      className={`w-full transition-all duration-700 rounded-b-2xl flex flex-col items-center justify-center ${
                        exp2Liquid === 'air'
                          ? 'bg-sky-400/90 h-10'
                          : exp2Liquid === 'susu'
                          ? 'bg-amber-100 border-t-2 border-amber-200 h-10'
                          : exp2Liquid === 'sirup'
                          ? 'bg-rose-500/90 h-10'
                          : 'bg-amber-400/90 h-10'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-slate-900 bg-white/70 px-1.5 py-0.5 rounded-sm">200 mL</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPERIMENT 3 CARD */}
      {activeExp === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-300 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Eksperimen 3</span>
              <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-900">
                Ayo Isi Balonnya! (Sifat Gas Menekan & Memenuhi Ruang)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full">
                Tekanan Pompa: {exp3Pumps} / 5
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Control Column */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Tekan tuas pompa angin untuk memasukkan partikel udara gas ke dalam balon karet. Amati bagaimana balon mengembang dan partikel gas bergerak bebas di dalamnya!
              </p>

              {/* Pump Button */}
              <div className="p-4 bg-purple-50/90 border border-purple-200 rounded-2xl space-y-3">
                <button
                  onClick={handleExp3Pump}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-fun font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Wind className="w-5 h-5 animate-pulse" />
                  <span>Tekan Pompa Angin! (+ Udara)</span>
                </button>

                <button
                  onClick={handleExp3Release}
                  className="w-full py-2.5 bg-white border-2 border-purple-300 hover:bg-purple-100/60 text-purple-900 font-fun font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>💨 Buka & Lepaskan Udara Balon!</span>
                </button>
              </div>

              {/* Science Explanation Box */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5 text-xs text-amber-950">
                <div className="font-bold flex items-center gap-1 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Penjelasan Sains Si Gas:</span>
                </div>
                <p>
                  Partikel gas udara bergerak sangat lincah dan cepat ke segala arah. Mereka menabrak dinding balon karet sehingga balon mengembang membulat besar. Saat penutup dibuka, gas langsung menyebar memenuhi seluruh ruangan!
                </p>
              </div>
            </div>

            {/* Balloon Visual Stage */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 min-h-80 relative overflow-hidden">
              {exp3Released ? (
                <div className="flex flex-col items-center text-center space-y-3 animate-fade-in">
                  <div className="text-5xl animate-bounce">💨</div>
                  <div className="font-fun text-lg font-bold text-purple-900">
                    Wuuussshh! Udara Gas Keluar!
                  </div>
                  <p className="text-xs text-slate-600 max-w-xs">
                    Partikel gas tidak lagi terkukung di balon, kini mereka melayang bebas di seluruh ruangan!
                  </p>
                  <button
                    onClick={() => {
                      playClickSound();
                      setExp3Pumps(1);
                      setExp3Released(false);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Pasang Balon Baru
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center relative">
                  {/* Balloon Body */}
                  <div
                    className="rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 shadow-xl transition-all duration-300 relative border-2 border-pink-200 flex items-center justify-center overflow-hidden"
                    style={{
                      width: `${80 + exp3Pumps * 32}px`,
                      height: `${90 + exp3Pumps * 38}px`
                    }}
                  >
                    {/* Floating gas particle dots */}
                    {Array.from({ length: 4 + exp3Pumps * 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 bg-white/90 rounded-full absolute animate-ping"
                        style={{
                          top: `${(i * 23) % 75 + 10}%`,
                          left: `${(i * 37) % 75 + 10}%`,
                          animationDuration: `${1.2 + (i % 3) * 0.4}s`
                        }}
                      />
                    ))}

                    <span className="text-[11px] font-bold text-white drop-shadow-md z-10">
                      Gas Udara
                    </span>
                  </div>

                  {/* Balloon knot */}
                  <div className="w-4 h-4 bg-purple-800 rounded-b-md -mt-1 shadow-xs" />
                  <div className="w-0.5 h-16 bg-slate-400 shadow-xs" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Progres Eksperimen Lab:</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((num) => (
              <span
                key={num}
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  completedExps[num] ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {completedExps[num] ? '✓' : num}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            playClickSound();
            onNavigate('game');
          }}
          className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-fun font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Lanjut ke Permainan Edukatif</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
