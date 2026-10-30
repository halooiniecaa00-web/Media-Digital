import React from 'react';
import { TabType } from '../types';
import { playClickSound, speakNarration } from '../utils/audio';
import { Compass, Volume2, Sparkles, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';

interface PetunjukViewProps {
  onNavigate: (tab: TabType) => void;
}

export const PetunjukView: React.FC<PetunjukViewProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: 1,
      title: 'Klik Tombol Menu di Atas',
      desc: 'Pilih menu yang ingin kamu jelajahi: Beranda, Materi Sahabat, Laboratorium, Permainan, atau Kuis Pintar.',
      icon: '👆',
      color: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      num: 2,
      title: 'Dengarkan Penjelasan Tiga Sahabat',
      desc: 'Klik tombol suara untuk mendengarkan Si Padat, Si Cair, dan Si Gas bercerita tentang rahasia dan kekuatan mereka!',
      icon: '🎧',
      color: 'bg-sky-100 text-sky-900 border-sky-300'
    },
    {
      num: 3,
      title: 'Amati Gambar dan Coba Simulasinya',
      desc: 'Cobalah memindahkan benda padat ke piring, menuang air ke berbagai wadah, dan meniup balon udara di laboratorium virtual!',
      icon: '🔬',
      color: 'bg-blue-100 text-blue-900 border-blue-300'
    },
    {
      num: 4,
      title: 'Mainkan Permainan Edukatif',
      desc: 'Bantu benda-benda menemukan rumah sahabatnya dalam "Petualangan Mencari Sahabat". Dapatkan skor tinggi!',
      icon: '🎮',
      color: 'bg-purple-100 text-purple-900 border-purple-300'
    },
    {
      num: 5,
      title: 'Jawab Kuis untuk Mendapatkan Bintang',
      desc: 'Kerjakan 10 soal kuis pilihan ganda. Dapatkan bintang emas ⭐⭐⭐ dan cetak piagam penghargaan Sahabat Sains!',
      icon: '⭐',
      color: 'bg-rose-100 text-rose-900 border-rose-300'
    }
  ];

  const handleReadGuide = () => {
    playClickSound();
    const narration = `Petunjuk Belajar Sains Tiga Sahabat. Pertama, klik tombol untuk menjelajahi materi. Kedua, dengarkan penjelasan dari ketiga sahabat. Ketiga, amati gambar dan coba simulasi. Keempat, kerjakan permainan seru. Kelima, jawab kuis untuk mendapatkan bintang emas!`;
    speakNarration(narration);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Panduan Siswa Kelas 3 SD</span>
        </div>

        <h1 className="font-fun text-3xl sm:text-4xl font-extrabold text-slate-900">
          Petunjuk Belajar Petualangan Sains
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Halo teman-teman! Agar petualangan belajarmu semakin seru dan mudah dipahami, yuk ikuti 5 langkah petunjuk berikut:
        </p>

        <button
          onClick={handleReadGuide}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-fun font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Petunjuk dengan Suara</span>
        </button>
      </div>

      {/* 5 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className={`p-5 rounded-2xl border-2 transition-all bg-white hover:shadow-md flex items-start gap-4 ${step.color}`}
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs shrink-0">
              {step.icon}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
                <h3 className="font-fun font-bold text-base text-slate-900">{step.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}

        {/* Bonus Tip Card */}
        <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-2xl shadow-xs shrink-0">
            💡
          </div>
          <div className="space-y-1">
            <h3 className="font-fun font-bold text-base text-emerald-950 flex items-center gap-1.5">
              <span>Tips Rahasia Sahabat Sains</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
              Kamu bisa mengulang simulasi dan permainan sesuka hatimu! Jangan takut salah, karena para ilmuwan hebat belajar dari mencoba berkali-kali!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            playClickSound();
            onNavigate('materi');
          }}
          className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-fun font-bold text-base rounded-2xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-5 h-5" />
          <span>Sudah Paham! Ayo Mulai Belajar Materi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
