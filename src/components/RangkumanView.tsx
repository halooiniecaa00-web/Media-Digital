import React from 'react';
import { TabType } from '../types';
import { MASCOTS } from '../data/learningData';
import { playClickSound } from '../utils/audio';
import { FileText, Printer, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';

interface RangkumanViewProps {
  onNavigate: (tab: TabType) => void;
}

export const RangkumanView: React.FC<RangkumanViewProps> = ({ onNavigate }) => {
  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-fun text-xl sm:text-2xl font-bold text-slate-900">
              Rangkuman Sains Tiga Sahabat
            </h1>
            <p className="text-xs text-slate-500">
              Kartu ingatan cepat & tabel komparasi 3 wujud zat (Padat, Cair, Gas)
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-fun font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer print:hidden"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Rangkuman</span>
        </button>
      </div>

      {/* 3 Character Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Si Padat Summary */}
        <div className="bg-white rounded-3xl p-6 border-2 border-blue-300 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-300 shadow-xs bg-blue-100 shrink-0">
                <img
                  src={MASCOTS.padat.imageSrc}
                  alt="Si Padat"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Wujud Padat
                </span>
                <h3 className="font-fun text-xl font-bold text-blue-900">SI PADAT</h3>
                <span className="text-xs font-semibold text-blue-700">Kuat & Kokoh</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl space-y-1.5 text-xs text-blue-950 border border-blue-200">
              <div className="font-bold">✨ Sifat Kunci:</div>
              <div>• <strong>Bentuk:</strong> TETAP (tidak berubah)</div>
              <div>• <strong>Volume:</strong> TETAP</div>
              <div>• <strong>Partikel:</strong> Sangat rapat & teratur</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 block">Contoh Benda:</span>
              <p className="text-xs text-slate-600">
                Batu, pensil kayu, meja, buku pelajaran, es batu balok.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-blue-700">"Bentukku kokoh tak tergoyahkan!"</span>
          </div>
        </div>

        {/* Si Cair Summary */}
        <div className="bg-white rounded-3xl p-6 border-2 border-cyan-300 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-300 shadow-xs bg-cyan-100 shrink-0">
                <img
                  src={MASCOTS.cair.imageSrc}
                  alt="Si Cair"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                  Wujud Cair
                </span>
                <h3 className="font-fun text-xl font-bold text-cyan-900">SI CAIR</h3>
                <span className="text-xs font-semibold text-cyan-700">Fleksibel & Mengalir</span>
              </div>
            </div>

            <div className="p-3 bg-cyan-50 rounded-xl space-y-1.5 text-xs text-cyan-950 border border-cyan-200">
              <div className="font-bold">✨ Sifat Kunci:</div>
              <div>• <strong>Bentuk:</strong> MENGIKUTI WADAH</div>
              <div>• <strong>Volume:</strong> TETAP</div>
              <div>• <strong>Partikel:</strong> Berdekatan & bisa meluncur</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 block">Contoh Benda:</span>
              <p className="text-xs text-slate-600">
                Air mineral, susu sapi, minyak kelapa, sirup stroberi, madu.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-cyan-700">"Aku ramah mengikuti wadahmu!"</span>
          </div>
        </div>

        {/* Si Gas Summary */}
        <div className="bg-white rounded-3xl p-6 border-2 border-purple-300 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-300 shadow-xs bg-purple-100 shrink-0">
                <img
                  src={MASCOTS.gas.imageSrc}
                  alt="Si Gas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Wujud Gas
                </span>
                <h3 className="font-fun text-xl font-bold text-purple-900">SI GAS</h3>
                <span className="text-xs font-semibold text-purple-700">Bebas & Memenuhi Ruang</span>
              </div>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl space-y-1.5 text-xs text-purple-950 border border-purple-200">
              <div className="font-bold">✨ Sifat Kunci:</div>
              <div>• <strong>Bentuk:</strong> BERUBAH-UBAH</div>
              <div>• <strong>Volume:</strong> BERUBAH MEMENUHI RUANG</div>
              <div>• <strong>Partikel:</strong> Sangat renggang & bergerak cepat</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 block">Contoh Benda:</span>
              <p className="text-xs text-slate-600">
                Udara untuk bernapas, gas balon, uap air hangat, asap roket.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-purple-700">"Wuuush, aku mengisi seluruh ruang!"</span>
          </div>
        </div>
      </div>

      {/* Comparative Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-fun font-bold text-lg text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600" />
          <span>Tabel Perbandingan 3 Wujud Zat</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-amber-100/70 text-slate-900 font-fun font-bold border-b border-amber-300">
                <th className="p-3">Karakteristik</th>
                <th className="p-3 text-blue-900">Si Padat 🪨</th>
                <th className="p-3 text-cyan-900">Si Cair 💧</th>
                <th className="p-3 text-purple-900">Si Gas ☁️</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50/50">Bentuk Benda</td>
                <td className="p-3 text-blue-800 font-bold">Tetap</td>
                <td className="p-3 text-cyan-800 font-bold">Mengikuti Wadah</td>
                <td className="p-3 text-purple-800 font-bold">Berubah Sesuai Ruang</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50/50">Volume (Isi)</td>
                <td className="p-3 text-blue-800 font-bold">Tetap</td>
                <td className="p-3 text-cyan-800 font-bold">Tetap</td>
                <td className="p-3 text-purple-800 font-bold">Berubah Memenuhi Ruang</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50/50">Susunan Partikel</td>
                <td className="p-3">Sangat rapat & teratur rapi</td>
                <td className="p-3">Cukup rapat tapi bisa meluncur</td>
                <td className="p-3">Sangat renggang & bebas melayang</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50/50">Dapat Digenggam?</td>
                <td className="p-3">Ya, sangat mudah digenggam</td>
                <td className="p-3">Tidak bisa, akan menetes bocor</td>
                <td className="p-3">Tidak bisa digenggam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
