import React from 'react';
import { TabType, ZatType } from '../types';
import { MASCOTS } from '../data/learningData';
import { playClickSound, speakNarration } from '../utils/audio';
import { Compass, BookOpen, HelpCircle, Info, Sparkles, ChevronRight, Volume2, FlaskConical, Gamepad2, Award } from 'lucide-react';

interface HeroHomeProps {
  onNavigate: (tab: TabType, subZat?: ZatType) => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onNavigate }) => {
  const [activeSpeech, setActiveSpeech] = React.useState<ZatType | null>(null);

  const handleMascotGreet = (zat: ZatType) => {
    playClickSound();
    setActiveSpeech(zat);
    speakNarration(MASCOTS[zat].voiceLine);
  };

  const handleStart = () => {
    playClickSound();
    onNavigate('materi', 'padat');
  };

  return (
    <div className="space-y-10 py-4">
      {/* Top Banner & Title Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100/90 via-sky-50 to-orange-100/60 p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200/60 border border-amber-300/80 rounded-full text-xs font-bold text-amber-900 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Media Pembelajaran Digital Interaktif IPAS Kelas III SD</span>
            </div>

            <h1 className="font-fun text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight" style={{ textWrap: 'balance' }}>
              HALO, SAHABAT SAINS!
            </h1>

            <p className="font-fun text-lg sm:text-xl md:text-2xl font-medium text-amber-900 leading-snug">
              Yuk, Bertualang Bersama Tiga Sahabat dan Temukan Rahasia 3 Wujud Zat!
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Tahukah kamu bahwa semua benda di bumi memiliki wujud zat yang unik? Ada yang kuat dan kokoh, ada yang mengalir ramah, dan ada yang melayang bebas ke angkasa! Ayo berkenalan dan coba eksperimen seru bersama mereka!
            </p>

            {/* 3 Main Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={handleStart}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-fun font-bold text-base rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                <span>MULAI PETUALANGAN</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onNavigate('petunjuk');
                }}
                className="px-5 py-3 bg-white hover:bg-amber-50 text-slate-800 font-fun font-bold text-sm sm:text-base rounded-2xl border-2 border-amber-300 shadow-xs hover:border-amber-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>PETUNJUK BELAJAR</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onNavigate('tentang');
                }}
                className="px-5 py-3 bg-white/80 hover:bg-white text-slate-700 font-fun font-semibold text-sm sm:text-base rounded-2xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Info className="w-4 h-4 text-slate-500" />
                <span>TENTANG PEMBELAJARAN</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white group">
              <img
                src="/src/assets/images/hero_tiga_sahabat_1793362843408.jpg"
                alt="Tiga Sahabat Sains di Laboratorium IPAS Kelas 3 SD"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-16/9 object-cover rounded-xl group-hover:scale-102 transition-transform duration-300"
              />
              <div className="p-3 bg-amber-50/90 text-center border-t border-amber-200">
                <span className="font-fun text-xs sm:text-sm font-bold text-amber-950">
                  🔬 Laboratorium Petualangan Sains Tiga Sahabat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Three Mascots Section */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Pemandu Petualanganmu</div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-900">
            Kenali Tiga Sahabat dengan Kekuatan Ajaib!
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Klik kartu karakter di bawah untuk mendengar suara sapaan dan kekuatan super mereka!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Si Padat Card */}
          <div
            onClick={() => handleMascotGreet('padat')}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white hover:-translate-y-1.5 shadow-sm hover:shadow-md ${
              activeSpeech === 'padat' ? 'border-blue-500 ring-4 ring-blue-200' : 'border-blue-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                Wujud Zat Padat
              </span>
              <button
                className="p-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                title="Dengarkan Sapaan Si Padat"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-blue-300 shadow-xs bg-blue-100 group">
                <img
                  src={MASCOTS.padat.imageSrc}
                  alt="Si Padat - Maskot Wujud Zat Padat"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover animate-float"
                />
              </div>

              <div>
                <h3 className="font-fun text-xl font-bold text-blue-900">SI PADAT</h3>
                <p className="text-xs font-semibold text-blue-700">Kuat, Kokoh & Berbentuk Tetap</p>
              </div>

              <div className="w-full bg-blue-50/90 rounded-xl p-2.5 border border-blue-200 text-xs text-blue-900 text-left space-y-1">
                <div className="font-bold flex items-center gap-1 text-blue-800">
                  <span>✨ Kekuatan Super:</span>
                </div>
                <div>• Bentuk selalu tetap dan kokoh</div>
                <div>• Volume tetap dan tidak berubah</div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  onNavigate('materi', 'padat');
                }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-fun font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pelajari Si Padat</span>
              </button>
            </div>
          </div>

          {/* Si Cair Card */}
          <div
            onClick={() => handleMascotGreet('cair')}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 relative overflow-hidden bg-gradient-to-b from-cyan-50/80 to-white hover:-translate-y-1.5 shadow-sm hover:shadow-md ${
              activeSpeech === 'cair' ? 'border-cyan-500 ring-4 ring-cyan-200' : 'border-cyan-200 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200">
                Wujud Zat Cair
              </span>
              <button
                className="p-1 rounded-full bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
                title="Dengarkan Sapaan Si Cair"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-cyan-300 shadow-xs bg-cyan-100">
                <img
                  src={MASCOTS.cair.imageSrc}
                  alt="Si Cair - Maskot Wujud Zat Cair"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover animate-float"
                  style={{ animationDelay: '1s' }}
                />
              </div>

              <div>
                <h3 className="font-fun text-xl font-bold text-cyan-900">SI CAIR</h3>
                <p className="text-xs font-semibold text-cyan-700">Fleksibel & Mengikuti Bentuk Wadah</p>
              </div>

              <div className="w-full bg-cyan-50/90 rounded-xl p-2.5 border border-cyan-200 text-xs text-cyan-900 text-left space-y-1">
                <div className="font-bold flex items-center gap-1 text-cyan-800">
                  <span>✨ Kekuatan Super:</span>
                </div>
                <div>• Bentuk mengikuti wadah yang ditempatinya</div>
                <div>• Volume tetap dan dapat mengalir</div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  onNavigate('materi', 'cair');
                }}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-fun font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pelajari Si Cair</span>
              </button>
            </div>
          </div>

          {/* Si Gas Card */}
          <div
            onClick={() => handleMascotGreet('gas')}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 relative overflow-hidden bg-gradient-to-b from-purple-50/80 to-white hover:-translate-y-1.5 shadow-sm hover:shadow-md ${
              activeSpeech === 'gas' ? 'border-purple-500 ring-4 ring-purple-200' : 'border-purple-200 hover:border-purple-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                Wujud Zat Gas
              </span>
              <button
                className="p-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200"
                title="Dengarkan Sapaan Si Gas"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-purple-300 shadow-xs bg-purple-100">
                <img
                  src={MASCOTS.gas.imageSrc}
                  alt="Si Gas - Maskot Wujud Zat Gas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover animate-float"
                  style={{ animationDelay: '2s' }}
                />
              </div>

              <div>
                <h3 className="font-fun text-xl font-bold text-purple-900">SI GAS</h3>
                <p className="text-xs font-semibold text-purple-700">Lincah, Bebas & Memenuhi Ruang</p>
              </div>

              <div className="w-full bg-purple-50/90 rounded-xl p-2.5 border border-purple-200 text-xs text-purple-900 text-left space-y-1">
                <div className="font-bold flex items-center gap-1 text-purple-800">
                  <span>✨ Kekuatan Super:</span>
                </div>
                <div>• Bentuk dan volume berubah-ubah</div>
                <div>• Bebas bergerak memenuhi seluruh ruang</div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  onNavigate('materi', 'gas');
                }}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-fun font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pelajari Si Gas</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Activity Cards Grid */}
      <div className="rounded-2xl bg-white p-6 border border-amber-200 shadow-xs space-y-4">
        <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-900 text-center">
          Jelajahi Menu Petualangan Sains
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => {
              playClickSound();
              onNavigate('lab');
            }}
            className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 transition-all cursor-pointer group space-y-2 text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div className="font-fun font-bold text-blue-900 text-base">Laboratorium Virtual</div>
            <p className="text-xs text-slate-600">
              3 eksperimen sains seru: pindahkan batu, tuang aneka cairan, dan pompa balon udara!
            </p>
            <span className="text-xs font-bold text-blue-700 group-hover:underline inline-block">
              Masuk ke Lab →
            </span>
          </div>

          <div
            onClick={() => {
              playClickSound();
              onNavigate('game');
            }}
            className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50/50 hover:bg-purple-100/50 transition-all cursor-pointer group space-y-2 text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-purple-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div className="font-fun font-bold text-purple-900 text-base">Petualangan Mencari Sahabat</div>
            <p className="text-xs text-slate-600">
              Tantangan mencocokkan benda sehari-hari ke rumah Si Padat, Si Cair, atau Si Gas!
            </p>
            <span className="text-xs font-bold text-purple-700 group-hover:underline inline-block">
              Mainkan Game →
            </span>
          </div>

          <div
            onClick={() => {
              playClickSound();
              onNavigate('kuis');
            }}
            className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50/50 hover:bg-amber-100/50 transition-all cursor-pointer group space-y-2 text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div className="font-fun font-bold text-amber-900 text-base">Kuis Evaluasi Pintar</div>
            <p className="text-xs text-slate-600">
              10 pertanyaan pilihan ganda dengan bintang emas dan sertifikat Sahabat Sains Cilik!
            </p>
            <span className="text-xs font-bold text-amber-700 group-hover:underline inline-block">
              Kerjakan Kuis →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
