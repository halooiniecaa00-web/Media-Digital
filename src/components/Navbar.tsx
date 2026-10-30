import React from 'react';
import { TabType } from '../types';
import { playClickSound, isSoundEnabled, setSoundEnabled, isVoiceEnabled, setVoiceEnabled, stopNarration } from '../utils/audio';
import { Volume2, VolumeX, Mic, MicOff, Sparkles, BookOpen, FlaskConical, Gamepad2, Award, FileText, Info, Home } from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());
  const [voiceOn, setVoiceOn] = React.useState(isVoiceEnabled());

  const handleTabClick = (tab: TabType) => {
    playClickSound();
    stopNarration();
    onSelectTab(tab);
  };

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) playClickSound();
  };

  const toggleVoice = () => {
    const newState = !voiceOn;
    setVoiceOn(newState);
    setVoiceEnabled(newState);
    playClickSound();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          title="Kembali ke Beranda"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm shadow-amber-300 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="font-fun text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors whitespace-nowrap">
              Petualangan Tiga Sahabat
            </div>
            <div className="text-[11px] font-semibold text-amber-700 tracking-wide uppercase flex items-center gap-1.5">
              <span>IPAS Kelas 3 SD</span>
              <span aria-hidden="true">·</span>
              <span>Bab 8: 3 Wujud Zat</span>
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => handleTabClick('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'home'
                ? 'bg-amber-100 text-amber-900 shadow-xs ring-1 ring-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4 text-amber-600" />
            <span>Beranda</span>
          </button>

          <button
            onClick={() => handleTabClick('petunjuk')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'petunjuk'
                ? 'bg-amber-100 text-amber-900 shadow-xs ring-1 ring-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Info className="w-4 h-4 text-sky-600" />
            <span>Petunjuk</span>
          </button>

          <button
            onClick={() => handleTabClick('materi')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'materi'
                ? 'bg-amber-100 text-amber-900 shadow-xs ring-1 ring-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Materi Sahabat</span>
          </button>

          <button
            onClick={() => handleTabClick('lab')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'lab'
                ? 'bg-amber-100 text-amber-900 shadow-xs ring-1 ring-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-blue-600" />
            <span>Laboratorium</span>
          </button>

          <button
            onClick={() => handleTabClick('game')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'game'
                ? 'bg-amber-100 text-amber-900 shadow-xs ring-1 ring-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-purple-600" />
            <span>Permainan</span>
          </button>

          <button
            onClick={() => handleTabClick('kuis')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'kuis'
                ? 'bg-amber-100 text-amber-900 shadow-xs ring-1 ring-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-rose-600" />
            <span>Kuis Pintar</span>
          </button>

          <button
            onClick={() => handleTabClick('rangkuman')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'rangkuman'
                ? 'bg-amber-100 text-amber-900 shadow-xs ring-1 ring-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Rangkuman</span>
          </button>

          <button
            onClick={() => handleTabClick('tentang')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'tentang'
                ? 'bg-amber-100 text-amber-900 shadow-xs ring-1 ring-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Info className="w-4 h-4 text-slate-500" />
            <span>Kurikulum</span>
          </button>
        </nav>

        {/* Zone 3: Audio & Voice Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
            title={soundOn ? 'Efek Suara: Aktif' : 'Efek Suara: Mati'}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              soundOn
                ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span className="hidden sm:inline text-xs">{soundOn ? 'Suara' : 'Bisu'}</span>
          </button>

          <button
            onClick={toggleVoice}
            aria-label={voiceOn ? 'Matikan Suara Narator' : 'Nyalakan Suara Narator'}
            title={voiceOn ? 'Suara Narator: Aktif' : 'Suara Narator: Mati'}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              voiceOn
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {voiceOn ? <Mic className="w-4 h-4 text-emerald-600" /> : <MicOff className="w-4 h-4 text-slate-400" />}
            <span className="hidden sm:inline text-xs">{voiceOn ? 'Narator' : 'Narator Off'}</span>
          </button>

          <button
            onClick={() => handleTabClick('kuis')}
            className="hidden sm:flex px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-xs font-bold shadow-xs hover:from-amber-600 hover:to-orange-600 transition-all items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Mulai Kuis</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="lg:hidden border-t border-amber-100 px-2 py-1.5 overflow-x-auto flex items-center gap-1 scrollbar-none bg-amber-50/70">
        {[
          { id: 'home', label: 'Beranda' },
          { id: 'petunjuk', label: 'Petunjuk' },
          { id: 'materi', label: 'Materi' },
          { id: 'lab', label: 'Lab' },
          { id: 'game', label: 'Game' },
          { id: 'kuis', label: 'Kuis' },
          { id: 'rangkuman', label: 'Rangkuman' },
          { id: 'tentang', label: 'Kurikulum' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id as TabType)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              currentTab === item.id
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-100/70'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
