import React, { useState } from 'react';
import { TECHNICAL_SPECS, EARLY_LATE_COMPARISON, VEHICLE_SUMMARY } from '../data/vespaData';
import { Download, ExternalLink, Sparkles, AlertCircle, Gauge, Cpu, Zap, Droplet } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全部規格' },
    { id: 'engine', label: '引擎與動力', icon: Cpu },
    { id: 'electrical', label: '電系與點火', icon: Zap },
    { id: 'fluids', label: '油品與調配', icon: Droplet },
    { id: 'chassis', label: '底盤與車架', icon: Gauge },
  ];

  const filteredSpecs = selectedCategory === 'all'
    ? TECHNICAL_SPECS
    : TECHNICAL_SPECS.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smallframe 經典之作・義大利 Piaggio 原廠規格庫</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Vespa 90 <span className="text-amber-400 font-mono">(V9A1T)</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            誕生於 1963 年，採用經典單體沖壓鋼架 (Monocoque) 與 88.5cc 二行程引擎。本站整合 ScooterHelp 原廠掃描手冊、
            Scooter Center 與 SIP 德國原裝零件爆炸圖、無電瓶雙版本電系圖與調校數據。
          </p>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
              <span className="text-xs text-slate-400 block">點火正時</span>
              <span className="text-lg font-bold text-amber-400 font-mono">19° BTDC</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
              <span className="text-xs text-slate-400 block">白金間隙</span>
              <span className="text-lg font-bold text-amber-400 font-mono">0.3 - 0.5 mm</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
              <span className="text-xs text-slate-400 block">二行程預混油</span>
              <span className="text-lg font-bold text-amber-400 font-mono">2.0% (1:50)</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
              <span className="text-xs text-slate-400 block">齒輪箱油</span>
              <span className="text-lg font-bold text-amber-400 font-mono">SAE 30 / 250cc</span>
            </div>
          </div>

          {/* Direct Downloads & Links Bar */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-700/50">
            <a
              href={VEHICLE_SUMMARY.scooterHelpPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" />
              <span>原廠零件爆炸圖手冊 (6.4MB PDF)</span>
            </a>
            <a
              href={VEHICLE_SUMMARY.wiringPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>無電瓶電系圖 (PDF 直連)</span>
            </a>
            <a
              href={VEHICLE_SUMMARY.scooterHelpSpecsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-sm border border-slate-700/80 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>ScooterHelp 車主技術手冊專區</span>
            </a>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">原廠技術參數與調校規範</h2>
            <p className="text-sm text-slate-400">日常維護、化油器調校與點火正時的核心關鍵數值</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === c.id
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpecs.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 border transition-all duration-200 ${
                item.highlight
                  ? 'bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {item.label}
                </span>
                {item.highlight && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                    重要設定
                  </span>
                )}
              </div>
              <div className="text-xl font-bold text-white font-mono mt-1 mb-2">
                {item.value}
              </div>
              {item.note && (
                <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Early vs Late Model Comparison Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-start space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">前期型 vs 後期型關鍵辨識指南</h3>
            <p className="text-sm text-slate-400 mt-1">
              V9A1T 在 1965 年前後進行小改款（車架號碼 <span className="font-mono text-amber-400 font-bold">141544</span> 前後為分界線）。在購買備品與對照爆炸圖時務必先確認愛車特徵：
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                <th className="py-3 px-4">辨識項目</th>
                <th className="py-3 px-4 text-emerald-400">前期型 (標準 V9A1T, 1963-1965)</th>
                <th className="py-3 px-4 text-cyan-400">後期型 (改款版, 141544 以後)</th>
                <th className="py-3 px-4">維修與備品採購重點</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm">
              {EARLY_LATE_COMPARISON.map((row, index) => (
                <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-200 whitespace-nowrap">
                    {row.aspect}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono text-xs sm:text-sm">
                    {row.early}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono text-xs sm:text-sm">
                    {row.late}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400">
                    {row.importance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

