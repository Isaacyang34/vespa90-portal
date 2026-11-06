import React, { useState } from 'react';
import { EXPLODED_SECTIONS, VEHICLE_SUMMARY } from '../data/vespaData';
import { ExternalLink, Download, Search, BookOpen, Layers, Info, CheckCircle2 } from 'lucide-react';

export const DiagramSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = EXPLODED_SECTIONS.filter(
    (sec) =>
      sec.nameZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.keyParts.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10">
      {/* Top Banner: ScooterHelp Original Manual */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-800/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Piaggio 原廠備件手冊掃描庫</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              原廠零件手冊 & 全車爆炸圖 (Parts Book)
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              老偉士經典資料庫 <strong className="text-white">ScooterHelp</strong> 收錄了 Piaggio 原廠 Smallframe 零件圖冊，
              涵蓋 Vespa 50 (V5A1T) 與 Vespa 90 (V9A1T)。您可以直接下載整本完整 6.4MB PDF，隨身攜帶或在修車時即時比對原廠爆炸圖與裝配順序。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={VEHICLE_SUMMARY.scooterHelpPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>下載完整手冊 PDF (6.4MB)</span>
            </a>
            <a
              href={VEHICLE_SUMMARY.sipScootershopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>SIP 零件料號庫</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scooter Center 16 Sections Navigator Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              全車各部位線上互動式爆炸圖
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
              共 16 大分解系統
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            德國零件商拆解圖紙，滑鼠移至圖上編號即可查閱零件名稱、規格尺寸（培林、油封、墊片）與對應原廠料號。
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜尋部位或零件 (例: 離合器、油嘴)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSections.map((sec) => (
          <div
            key={sec.id}
            className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono text-amber-400/90 font-medium">
                  {sec.nameEn}
                </span>
                <span className="p-2 rounded-lg bg-slate-800/80 text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-800 transition-colors">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                {sec.nameZh}
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {sec.description}
              </p>

              {/* Key Parts Pills */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5 uppercase">
                  重要關鍵零件 / 耗材：
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sec.keyParts.map((part, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 font-mono"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons (Early & Late links) */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
              <a
                href={sec.earlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-emerald-600/80 hover:text-white text-emerald-400 text-xs font-semibold border border-emerald-500/20 transition-all text-center"
              >
                <span>前期型圖紙</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={sec.lateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-cyan-600/80 hover:text-white text-cyan-400 text-xs font-semibold border border-cyan-500/20 transition-all text-center"
              >
                <span>後期型圖紙</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Smallframe Assembly Tips Box */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Info className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">Vespa 90 組裝與拆解實用眉角</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/70 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>換檔十字爪 (Cruciform) 間隙調整</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              組裝 3 速變速齒輪時，副軸齒輪兩端的擋圈墊片 (Shims) 間隙應維持在 0.15 ~ 0.40 mm。太緊換檔生澀，太鬆重催油門會發生跳檔現象。
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/70 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>曲軸箱密封中線與油封</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              合箱時請使用高品質原廠厚度紙墊片，並在兩側抹上微量二行程耐油汽缸膠。傳動側 22.7x47x7 油封請確實壓入平面，不可傾斜。
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/70 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>離合器銅柱與壓盤 (Brass Plunger)</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              安裝離合器蓋前，請務必在離合器壓桿頂部的黃銅推力頂銷 (Bicchiere / Plunger) 抹上耐磨黃油，防止發動時金屬摩擦異音或脫落掉入齒輪箱。
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/70 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>半月鍵 (Woodruff Key) 對準注意</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              飛輪側與離合器齒輪曲軸端均有精密半月鍵。飛輪緊固螺母扭力約 4.0~4.5 kgm，組裝前確認鍵槽無變形滑移，否則點火正時將嚴重跑掉。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
