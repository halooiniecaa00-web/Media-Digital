import React from 'react';
import { CURRICULUM_INFO } from '../data/learningData';
import { Info, Sparkles, BookOpen, Target, CheckCircle2, HeartHandshake } from 'lucide-react';

export const TentangView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold">
          <Info className="w-3.5 h-3.5 text-amber-700" />
          <span>Kurikulum Merdeka 2026</span>
        </div>
        <h1 className="font-fun text-3xl font-extrabold text-slate-900">
          Tentang Media Pembelajaran
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Identitas dan landasan instruksional media pembelajaran digital interaktif IPAS Kelas 3 Sekolah Dasar.
        </p>
      </div>

      {/* Identity Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase block">Mata Pelajaran</span>
            <span className="font-fun font-bold text-base text-slate-900 block">{CURRICULUM_INFO.mataPelajaran}</span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-1">
            <span className="text-[11px] font-bold text-sky-800 uppercase block">Sasaran Belajar</span>
            <span className="font-fun font-bold text-base text-slate-900 block">{CURRICULUM_INFO.kelas}</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
            <span className="text-[11px] font-bold text-blue-800 uppercase block">Bab Pembelajaran</span>
            <span className="font-fun font-bold text-base text-slate-900 block">{CURRICULUM_INFO.bab}</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
            <span className="text-[11px] font-bold text-purple-800 uppercase block">Subbab Pokok</span>
            <span className="font-fun font-bold text-base text-slate-900 block">{CURRICULUM_INFO.subbab}</span>
          </div>
        </div>

        {/* Capaian Pembelajaran */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="font-fun font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Capaian Pembelajaran (CP)</span>
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {CURRICULUM_INFO.capaianPembelajaran}
          </p>
        </div>

        {/* Tujuan Pembelajaran */}
        <div className="space-y-3">
          <span className="font-fun font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>Tujuan Pembelajaran (TP):</span>
          </span>

          <div className="space-y-2">
            {CURRICULUM_INFO.tujuanPembelajaran.map((tp, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profil Pelajar Pancasila */}
        <div className="space-y-3 pt-2">
          <span className="font-fun font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Dimensi Profil Pelajar Pancasila:</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CURRICULUM_INFO.profilPelajarPancasila.map((dim, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
                <span className="font-fun font-bold text-sm text-amber-900 block">{dim.title}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Petunjuk Guru & Orang Tua */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
          <span className="font-fun font-bold text-xs sm:text-sm text-emerald-950 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <span>Catatan untuk Guru dan Pendamping:</span>
          </span>
          <p className="text-xs text-emerald-900 leading-relaxed">
            Media pembelajaran ini dirancang khusus untuk memfasilitasi pembelajaran berdiferensiasi dan student-centered. Siswa diajak untuk tidak sekadar menghafal definisi wujud zat, namun mengalami sendiri prinsip kelembaman bentuk benda padat, fleksibilitas fluida cair, dan daya penuhan ruang oleh gas melalui simulasi laboratorium virtual serta permainan interaktif.
          </p>
        </div>
      </div>
    </div>
  );
};
