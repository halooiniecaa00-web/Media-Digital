import React from 'react';
import { TabType, ZatType } from '../types';
import { MASCOTS } from '../data/learningData';
import { playClickSound, playSplashSound, playPumpSound, speakNarration } from '../utils/audio';
import { BookOpen, Volume2, RotateCcw, ArrowRight, CheckCircle2, Sparkles, Layers, Box, Droplets, Wind } from 'lucide-react';

interface MateriViewProps {
  initialZat?: ZatType;
  onNavigate: (tab: TabType) => void;
}

export const MateriView: React.FC<MateriViewProps> = ({ initialZat = 'padat', onNavigate }) => {
  const [selectedZat, setSelectedZat] = React.useState<ZatType>(initialZat);

  // Padat Simulation State: target container for stone
  const [padatTarget, setPadatTarget] = React.useState<'piring' | 'mangkuk' | 'gelas'>('piring');
  const [padatItem, setPadatItem] = React.useState<'batu' | 'es' | 'pensil'>('batu');

  // Cair Simulation State: target container for water
  const [cairContainer, setCairContainer] = React.useState<'gelas' | 'botol' | 'mangkuk'>('gelas');
  const [cairLiquid, setCairLiquid] = React.useState<'air' | 'susu' | 'sirup'>('air');
  const [isPouring, setIsPouring] = React.useState(false);

  // Gas Simulation State: balloon inflation or open jar
  const [gasInflation, setGasInflation] = React.useState<number>(40); // 10% to 100%
  const [gasContainerType, setGasContainerType] = React.useState<'balon' | 'toples'>('balon');
  const [jarOpen, setJarOpen] = React.useState(false);

  const mascot = MASCOTS[selectedZat];

  const handleSelectZat = (zat: ZatType) => {
    playClickSound();
    setSelectedZat(zat);
  };

  const handleListenMateri = () => {
    playClickSound();
    let text = '';
    if (selectedZat === 'padat') {
      text = `Wujud Zat Padat bersama Si Padat. Benda padat memiliki bentuk yang tetap dan volume yang tetap. Contohnya adalah batu, pensil, meja, buku, dan es batu. Meskipun dipindahkan ke piring, mangkuk, atau gelas, bentuk benda padat tidak akan berubah!`;
    } else if (selectedZat === 'cair') {
      text = `Wujud Zat Cair bersama Si Cair. Benda cair memiliki volume yang tetap, tetapi bentuknya selalu berubah mengikuti bentuk wadahnya. Contohnya air mineral, susu, minyak goreng, dan sirup. Air dapat mengalir dari tempat tinggi ke tempat rendah.`;
    } else {
      text = `Wujud Zat Gas bersama Si Gas. Benda gas memiliki bentuk dan volume yang tidak tetap. Gas dapat bergerak bebas ke segala penjuru dan memenuhi seluruh ruangan yang ada. Contohnya udara di sekitar kita, gas di dalam balon, dan uap air.`;
    }
    speakNarration(text);
  };

  const handlePadatMove = (container: 'piring' | 'mangkuk' | 'gelas') => {
    playClickSound();
    setPadatTarget(container);
  };

  const handleCairPour = (cont: 'gelas' | 'botol' | 'mangkuk') => {
    playSplashSound();
    setIsPouring(true);
    setCairContainer(cont);
    setTimeout(() => setIsPouring(false), 500);
  };

  const handleGasPump = () => {
    playPumpSound();
    setGasInflation((prev) => (prev >= 100 ? 30 : prev + 20));
  };

  const nextZatMap: Record<ZatType, ZatType> = {
    padat: 'cair',
    cair: 'gas',
    gas: 'padat'
  };

  const handleNextMateri = () => {
    playClickSound();
    if (selectedZat === 'gas') {
      onNavigate('lab');
    } else {
      setSelectedZat(nextZatMap[selectedZat]);
    }
  };

  const handleResetSimulation = () => {
    playClickSound();
    if (selectedZat === 'padat') {
      setPadatTarget('piring');
      setPadatItem('batu');
    } else if (selectedZat === 'cair') {
      setCairContainer('gelas');
      setCairLiquid('air');
    } else {
      setGasInflation(40);
      setJarOpen(false);
      setGasContainerType('balon');
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Tab Switcher for 3 Mascots */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white rounded-2xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-2 p-1 bg-amber-50 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => handleSelectZat('padat')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-fun font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              selectedZat === 'padat'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-700 hover:bg-blue-100/60'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>1. Si Padat</span>
          </button>

          <button
            onClick={() => handleSelectZat('cair')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-fun font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              selectedZat === 'cair'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-100/60'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>2. Si Cair</span>
          </button>

          <button
            onClick={() => handleSelectZat('gas')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-fun font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              selectedZat === 'gas'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-100/60'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>3. Si Gas</span>
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleListenMateri}
            className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold font-fun flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Dengarkan Materi</span>
          </button>
        </div>
      </div>

      {/* Main Material Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border-2 shadow-sm transition-all bg-white ${mascot.borderColor}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Mascot Profile & Concepts */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm shrink-0 bg-slate-100">
                <img
                  src={mascot.imageSrc}
                  alt={mascot.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                  {selectedZat === 'padat' ? 'Bab 8.A: Benda Padat' : selectedZat === 'cair' ? 'Bab 8.B: Benda Cair' : 'Bab 8.C: Benda Gas'}
                </span>
                <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  {mascot.name}
                </h2>
                <p className="text-xs font-semibold text-slate-500">{mascot.nickname}</p>
              </div>
            </div>

            {/* Quote bubble */}
            <div className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border relative ${mascot.bgLight} ${mascot.borderColor} text-slate-800 leading-relaxed`}>
              <span className="font-bold block text-slate-900 mb-1">💬 Kata {mascot.name}:</span>
              "{mascot.quote}"
            </div>

            {/* Core Rules Table */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">Bentuk</span>
                <span className="font-fun text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
                  {mascot.shapeRule}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">Volume</span>
                <span className="font-fun text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
                  {mascot.volumeRule}
                </span>
              </div>
            </div>

            {/* Superpowers list */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Ciri-Ciri Utama:
              </span>
              <div className="space-y-1.5">
                {mascot.powers.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Particle Arrangement Explanation */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Rahasia Partikel Terkecil:</span>
              </span>
              <p className="text-xs text-amber-950 leading-relaxed">
                {mascot.particleDescription}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Sandbox & Experiment */}
          <div className="lg:col-span-7 space-y-6">
            {/* SUB-SIMULATION A: SI PADAT */}
            {selectedZat === 'padat' && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-fun font-bold text-base text-slate-900">
                      🧪 Simulasi: Ayo Pindahkan Si Padat!
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pilih benda dan pindahkan ke wadah berbeda. Amati apakah bentuknya berubah?
                    </p>
                  </div>
                  <button
                    onClick={handleResetSimulation}
                    className="p-1.5 rounded-lg text-xs bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                    title="Ulangi Simulasi"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ulangi</span>
                  </button>
                </div>

                {/* Object selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Pilih Benda:</span>
                  {(['batu', 'es', 'pensil'] as const).map((it) => (
                    <button
                      key={it}
                      onClick={() => {
                        playClickSound();
                        setPadatItem(it);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        padatItem === it
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {it === 'batu' ? '🪨 Batu Kali' : it === 'es' ? '🧊 Es Batu' : '✏️ Pensil'}
                    </button>
                  ))}
                </div>

                {/* Containers selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Pindahkan ke:</span>
                  {(['piring', 'mangkuk', 'gelas'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => handlePadatMove(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-fun font-bold cursor-pointer transition-all ${
                        padatTarget === c
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-amber-50'
                      }`}
                    >
                      {c === 'piring' ? '🍽️ Piring Datar' : c === 'mangkuk' ? '🥣 Mangkuk Cekung' : '🥛 Gelas Tinggi'}
                    </button>
                  ))}
                </div>

                {/* Simulation Stage */}
                <div className="h-60 bg-gradient-to-b from-blue-50/50 to-amber-50/30 rounded-xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center relative p-4">
                  {/* Container Graphic */}
                  <div className="relative flex items-center justify-center">
                    {padatTarget === 'piring' && (
                      <div className="w-56 h-12 rounded-b-3xl border-4 border-slate-300 bg-white/80 shadow-xs flex items-center justify-center">
                        <span className="absolute -bottom-6 text-[11px] font-bold text-slate-500">Piring Datar</span>
                      </div>
                    )}
                    {padatTarget === 'mangkuk' && (
                      <div className="w-40 h-24 rounded-b-full border-4 border-slate-300 bg-white/80 shadow-xs flex items-center justify-center">
                        <span className="absolute -bottom-6 text-[11px] font-bold text-slate-500">Mangkuk Cekung</span>
                      </div>
                    )}
                    {padatTarget === 'gelas' && (
                      <div className="w-28 h-36 rounded-b-xl border-4 border-slate-300 bg-white/80 shadow-xs flex items-center justify-center">
                        <span className="absolute -bottom-6 text-[11px] font-bold text-slate-500">Gelas Silinder</span>
                      </div>
                    )}

                    {/* The Solid Object Inside */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex flex-col items-center">
                      <div className="text-4xl filter drop-shadow-md animate-bounce" style={{ animationDuration: '2s' }}>
                        {padatItem === 'batu' ? '🪨' : padatItem === 'es' ? '🧊' : '✏️'}
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-600 text-white mt-1">
                        Bentuk Tetap!
                      </span>
                    </div>
                  </div>
                </div>

                {/* Observation callout */}
                <div className="p-3 bg-blue-100/70 border border-blue-300 rounded-xl text-xs text-blue-950 flex items-center gap-2">
                  <span className="text-lg">🔎</span>
                  <div>
                    <strong>Kesimpulan Pengamatan:</strong> Meskipun {padatItem} diletakkan di dalam {padatTarget}, bentuknya <strong>TETAP SAMA</strong> dan tidak berubah mengikuti wadahnya!
                  </div>
                </div>
              </div>
            )}

            {/* SUB-SIMULATION B: SI CAIR */}
            {selectedZat === 'cair' && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-fun font-bold text-base text-slate-900">
                      🧪 Simulasi: Ke Mana Bentuk Air Mengalir?
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tuang 250 ml cairan ke wadah yang berbeda dan amati perubahan bentuknya!
                    </p>
                  </div>
                  <button
                    onClick={handleResetSimulation}
                    className="p-1.5 rounded-lg text-xs bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                    title="Ulangi Simulasi"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ulangi</span>
                  </button>
                </div>

                {/* Liquid selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Pilih Cairan:</span>
                  {(['air', 'susu', 'sirup'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        playClickSound();
                        setCairLiquid(l);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        cairLiquid === l
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {l === 'air' ? '💧 Air Mineral' : l === 'susu' ? '🥛 Susu Segar' : '🍓 Sirup Manis'}
                    </button>
                  ))}
                </div>

                {/* Container selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Tuangkan ke:</span>
                  {(['gelas', 'botol', 'mangkuk'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => handleCairPour(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-fun font-bold cursor-pointer transition-all ${
                        cairContainer === c
                          ? 'bg-cyan-600 text-white shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-cyan-50'
                      }`}
                    >
                      {c === 'gelas' ? '🥛 Gelas Silinder' : c === 'botol' ? '🍾 Botol Ramping' : '🥣 Mangkuk Bundar'}
                    </button>
                  ))}
                </div>

                {/* Simulation Stage */}
                <div className="h-60 bg-gradient-to-b from-cyan-50/50 to-blue-50/30 rounded-xl border-2 border-dashed border-cyan-200 flex flex-col items-center justify-center relative p-4 overflow-hidden">
                  {/* Pouring stream if pouring */}
                  {isPouring && (
                    <div className="absolute top-2 w-2 h-20 bg-cyan-400 rounded-full animate-pulse z-20" />
                  )}

                  {/* Render Container with Fluid Conforming */}
                  <div className="relative flex flex-col items-center justify-end">
                    {cairContainer === 'gelas' && (
                      <div className="w-28 h-40 border-4 border-slate-400 border-t-0 rounded-b-2xl bg-white/40 relative overflow-hidden flex items-end">
                        <div
                          className={`w-full transition-all duration-500 rounded-b-xl flex items-center justify-center ${
                            cairLiquid === 'air'
                              ? 'bg-sky-400/80 h-28'
                              : cairLiquid === 'susu'
                              ? 'bg-amber-100/90 border-t border-amber-200 h-28'
                              : 'bg-rose-500/80 h-28'
                          }`}
                        >
                          <span className="text-[10px] font-bold text-white drop-shadow-xs">250 ml</span>
                        </div>
                      </div>
                    )}

                    {cairContainer === 'botol' && (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-slate-400 border-b-0 border-t-0 bg-white/40" />
                        <div className="w-24 h-36 border-4 border-slate-400 border-t-0 rounded-b-2xl bg-white/40 relative overflow-hidden flex items-end">
                          <div
                            className={`w-full transition-all duration-500 rounded-b-xl flex items-center justify-center ${
                              cairLiquid === 'air'
                                ? 'bg-sky-400/80 h-28'
                                : cairLiquid === 'susu'
                                ? 'bg-amber-100/90 border-t border-amber-200 h-28'
                                : 'bg-rose-500/80 h-28'
                            }`}
                          >
                            <span className="text-[10px] font-bold text-white drop-shadow-xs">250 ml</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {cairContainer === 'mangkuk' && (
                      <div className="w-48 h-24 border-4 border-slate-400 border-t-0 rounded-b-full bg-white/40 relative overflow-hidden flex items-end">
                        <div
                          className={`w-full transition-all duration-500 rounded-b-full flex items-center justify-center ${
                            cairLiquid === 'air'
                              ? 'bg-sky-400/80 h-16'
                              : cairLiquid === 'susu'
                              ? 'bg-amber-100/90 border-t border-amber-200 h-16'
                              : 'bg-rose-500/80 h-16'
                          }`}
                        >
                          <span className="text-[10px] font-bold text-white drop-shadow-xs">250 ml</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Observation callout */}
                <div className="p-3 bg-cyan-100/70 border border-cyan-300 rounded-xl text-xs text-cyan-950 flex items-center gap-2">
                  <span className="text-lg">🔎</span>
                  <div>
                    <strong>Kesimpulan Pengamatan:</strong> Bentuk cairan berubah persis mengikuti bentuk {cairContainer}, tetapi <strong>VOLUMENYA TETAP 250 ml</strong>!
                  </div>
                </div>
              </div>
            )}

            {/* SUB-SIMULATION C: SI GAS */}
            {selectedZat === 'gas' && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-fun font-bold text-base text-slate-900">
                      🧪 Simulasi: Ayo Isi Balon & Ruang Gas!
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pompa udara ke dalam balon untuk melihat bagaimana partikel gas memenuhi seluruh ruang!
                    </p>
                  </div>
                  <button
                    onClick={handleResetSimulation}
                    className="p-1.5 rounded-lg text-xs bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                    title="Ulangi Simulasi"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ulangi</span>
                  </button>
                </div>

                {/* Mode selector: Balon vs Toples */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setGasContainerType('balon');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-fun font-bold cursor-pointer ${
                      gasContainerType === 'balon'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    🎈 Balon Karet Gas
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setGasContainerType('toples');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-fun font-bold cursor-pointer ${
                      gasContainerType === 'toples'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    🫙 Toples Partikel Gas
                  </button>

                  {gasContainerType === 'balon' && (
                    <button
                      onClick={handleGasPump}
                      className="ml-auto px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-fun font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Wind className="w-3.5 h-3.5" />
                      <span>Pompa Udara! ({gasInflation}%)</span>
                    </button>
                  )}

                  {gasContainerType === 'toples' && (
                    <button
                      onClick={() => {
                        playClickSound();
                        setJarOpen(!jarOpen);
                      }}
                      className="ml-auto px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-xs rounded-lg cursor-pointer"
                    >
                      {jarOpen ? 'Tutup Toples' : 'Buka Tutup Toples!'}
                    </button>
                  )}
                </div>

                {/* Simulation Stage */}
                <div className="h-60 bg-gradient-to-b from-purple-50/50 to-indigo-50/30 rounded-xl border-2 border-dashed border-purple-200 flex flex-col items-center justify-center relative p-4 overflow-hidden">
                  {gasContainerType === 'balon' ? (
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className="rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-md transition-all duration-300 flex items-center justify-center relative border-2 border-purple-300"
                        style={{
                          width: `${Math.max(60, gasInflation * 1.8)}px`,
                          height: `${Math.max(60, gasInflation * 2.1)}px`
                        }}
                      >
                        {/* Animated gas particles floating inside */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-white text-xs font-bold drop-shadow-xs">
                            {gasInflation >= 100 ? 'Penuh Gas!' : 'Zat Gas'}
                          </span>
                        </div>
                      </div>
                      <div className="w-3 h-4 bg-purple-700 rounded-b-sm -mt-0.5" />
                    </div>
                  ) : (
                    <div className="relative w-44 h-48 border-4 border-slate-400 rounded-b-2xl bg-white/40 flex flex-col items-center">
                      {/* Jar lid */}
                      <div
                        className={`w-36 h-4 bg-amber-700 rounded-t-md transition-all duration-300 ${
                          jarOpen ? '-translate-y-8 rotate-12 opacity-80' : 'translate-y-0'
                        }`}
                      />

                      {/* Gas particles bouncing */}
                      <div className="flex-1 w-full relative overflow-hidden p-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((dot) => (
                          <div
                            key={dot}
                            className={`w-3.5 h-3.5 rounded-full bg-purple-500/80 absolute shadow-xs transition-transform ${
                              jarOpen ? 'animate-ping' : 'animate-bounce'
                            }`}
                            style={{
                              top: `${(dot * 21) % 80}%`,
                              left: `${(dot * 31) % 80}%`,
                              animationDuration: `${1 + (dot % 3) * 0.4}s`
                            }}
                          />
                        ))}
                      </div>

                      {jarOpen && (
                        <div className="absolute -top-10 text-[10px] font-bold text-purple-700 animate-pulse bg-white/90 px-2 py-0.5 rounded-full border border-purple-300">
                          Gas menyebar ke seluruh ruangan!
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Observation callout */}
                <div className="p-3 bg-purple-100/70 border border-purple-300 rounded-xl text-xs text-purple-950 flex items-center gap-2">
                  <span className="text-lg">🔎</span>
                  <div>
                    <strong>Kesimpulan Pengamatan:</strong> Gas tidak memiliki bentuk tetap. Partikel gas bergerak bebas ke segala penjuru dan <strong>MEMENUHI SELURUH RUANGAN</strong>!
                  </div>
                </div>
              </div>
            )}

            {/* Daily Examples Gallery */}
            <div className="space-y-3">
              <h4 className="font-fun font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-600" />
                <span>Contoh Benda {mascot.name} di Sekitar Kita:</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {mascot.dailyExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-amber-300 transition-all space-y-1 shadow-2xs"
                  >
                    <div className="text-2xl">{ex.icon}</div>
                    <div className="font-fun font-bold text-xs text-slate-900">{ex.name}</div>
                    <p className="text-[11px] text-slate-500 leading-snug">{ex.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Progression Controls */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
              <button
                onClick={handleResetSimulation}
                className="px-4 py-2 rounded-xl text-xs font-fun font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Coba Lagi Simulasi</span>
              </button>

              <button
                onClick={handleNextMateri}
                className="px-5 py-2.5 rounded-xl text-xs font-fun font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {selectedZat === 'gas' ? 'Lanjut ke Laboratorium Virtual' : `Lanjut: ${MASCOTS[nextZatMap[selectedZat]].name}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
