/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TabType, ZatType } from './types';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { PetunjukView } from './components/PetunjukView';
import { MateriView } from './components/MateriView';
import { LabView } from './components/LabView';
import { GameView } from './components/GameView';
import { QuizView } from './components/QuizView';
import { RangkumanView } from './components/RangkumanView';
import { TentangView } from './components/TentangView';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = React.useState<TabType>('home');
  const [targetZat, setTargetZat] = React.useState<ZatType>('padat');

  const handleNavigate = (tab: TabType, subZat?: ZatType) => {
    if (subZat) {
      setTargetZat(subZat);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800 antialiased font-body">
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={(tab) => handleNavigate(tab)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4">
        {currentTab === 'home' && <HeroHome onNavigate={handleNavigate} />}
        {currentTab === 'petunjuk' && <PetunjukView onNavigate={handleNavigate} />}
        {currentTab === 'materi' && <MateriView initialZat={targetZat} onNavigate={handleNavigate} />}
        {currentTab === 'lab' && <LabView onNavigate={handleNavigate} />}
        {currentTab === 'game' && <GameView onNavigate={handleNavigate} />}
        {currentTab === 'kuis' && <QuizView onNavigate={handleNavigate} />}
        {currentTab === 'rangkuman' && <RangkumanView onNavigate={handleNavigate} />}
        {currentTab === 'tentang' && <TentangView />}
      </main>

      {/* Quiet Kid-Friendly Footer */}
      <footer className="mt-auto border-t border-amber-200/80 bg-white/80 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-fun font-bold text-slate-800 text-sm">
              Petualangan Tiga Sahabat
            </span>
            <span>·</span>
            <span>IPAS Kelas III SD Bab 8</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <span>Dibuat dengan rasa cinta untuk pendidikan anak Indonesia</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => handleNavigate('petunjuk')}
              className="hover:text-amber-700 cursor-pointer"
            >
              Petunjuk Belajar
            </button>
            <button
              onClick={() => handleNavigate('rangkuman')}
              className="hover:text-amber-700 cursor-pointer"
            >
              Rangkuman Materi
            </button>
            <button
              onClick={() => handleNavigate('tentang')}
              className="hover:text-amber-700 cursor-pointer"
            >
              Kurikulum
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
