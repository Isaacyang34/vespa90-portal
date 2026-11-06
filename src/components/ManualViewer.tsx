import React, { useState } from 'react';
import { MANUAL_TAVOLE, MANUAL_NOTICE_ZH } from '../data/manualData';
import { BookOpen, Search, ExternalLink, Image as ImageIcon, AlertCircle, Info, ChevronRight, Download } from 'lucide-react';


export const ManualViewer: React.FC = () => {
  const [selectedTavolaId, setSelectedTavolaId] = useState<string>('t1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [activeImageMode, setActiveImageMode] = useState<'diagram' | 'table'>('diagram');

  const currentTavola = MANUAL_TAVOLE.find((t) => t.id === selectedTavolaId) || MANUAL_TAVOLE[0];

  const filteredParts = currentTavola.parts.filter(
    (p) =>
      p.nameZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.partNo && p.partNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.figNo.includes(searchTerm)
  );

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-600/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Piaggio 1963 原廠手冊繁體中文對照專區</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Vespa 90 / 50 原廠零件手冊繁體中文版
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              依據 Piaggio 原廠備件手冊 <code className="text-emerald-400 font-mono">V5A1T.V5SA1T.V9A1T.r.pdf</code> 全文
              37 頁完整翻譯，提供 16 大分解圖表 (Tavola I ~ XVI) 逐項零件中文名稱、料號、裝配圖與老偉士翻修技術眉角對照。
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => setShowNotice(!showNotice)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                showNotice
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{showNotice ? '返回零件圖表' : '閱讀手冊說明 (Notice)'}</span>
            </button>
            <a
              href="/docs/vespa90_parts_manual_zh.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>開啓 HTML 中文手冊</span>
            </a>
            <a
              href="/docs/vespa90_parts_manual_zh.md"
              download="Vespa90_Parts_Manual_ZH.md"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>中文手冊 (.md)</span>
            </a>
            <a
              href="/docs/V5A1T.V5SA1T.V9A1T.r.pdf"
              download="V5A1T.V5SA1T.V9A1T.r.pdf"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>原廠 PDF (6.4MB)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Notice Dialog / Section */}
      {showNotice && (
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{MANUAL_NOTICE_ZH.title}</h3>
              <p className="text-xs text-slate-400">原廠手冊前言規章與料號編排邏輯中文解析</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MANUAL_NOTICE_ZH.applicableModels.map((m) => (
              <div key={m.code} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="font-mono text-xs text-amber-400 font-bold block">{m.code}</span>
                <span className="text-sm font-semibold text-white block mt-0.5">{m.model}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white block font-bold">手冊編排與零件代號規則：</strong>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400">
              {MANUAL_NOTICE_ZH.instructions.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-300 block mb-2">手冊 16 大分解系統區段劃分：</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {MANUAL_NOTICE_ZH.subdivisions.map((sub, i) => (
                <div key={i} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="font-mono text-cyan-400 font-bold block">{sub.range}</span>
                  <span className="text-slate-300 mt-0.5 block">{sub.system}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Tavola Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Tavola Navigation Selector (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>圖表章節選擇 (Tavole)</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">共 16 篇</span>
          </div>

          <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
            {MANUAL_TAVOLE.map((t) => {
              const isSelected = selectedTavolaId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTavolaId(t.id);
                    setShowNotice(false);
                    setSearchTerm('');
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-emerald-500/15 border border-emerald-500/50 text-white shadow-md'
                      : 'bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">{t.tavolaNo}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{t.category}</span>
                    </div>
                    <span className="text-xs font-bold block text-white group-hover:text-emerald-300 transition-colors">
                      {t.titleZh}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate block max-w-[200px]">
                      {t.titleEn}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-emerald-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Tavola Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section Header */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30">
                  {currentTavola.tavolaNo}
                </span>
                <span className="text-xs text-slate-400">{currentTavola.category}</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                原廠圖紙：{currentTavola.titleEs}
              </span>
            </div>

            <h3 className="text-2xl font-black text-white">
              {currentTavola.titleZh}
            </h3>
            <p className="text-sm font-mono text-slate-400">
              {currentTavola.titleEn}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
              {currentTavola.summaryZh}
            </p>

            {/* Tuning Tip Alert */}
            {currentTavola.tuningTipsZh && (
              <div className="mt-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 mr-1">翻修與組裝眉角：</strong>
                  {currentTavola.tuningTipsZh}
                </div>
              </div>
            )}
          </div>

          {/* Original Scanned Page Image Preview */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">原廠原始掃描檔預覽 (Original Plate)</h4>
              </div>

              {currentTavola.pageImgTable && (
                <div className="flex space-x-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveImageMode('diagram')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeImageMode === 'diagram'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    零件爆炸圖
                  </button>
                  <button
                    onClick={() => setActiveImageMode('table')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeImageMode === 'table'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    原廠料號表頁
                  </button>
                </div>
              )}
            </div>

            {/* Scanned Image Display */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 max-h-[500px] flex items-center justify-center p-2">
              <img
                src={activeImageMode === 'diagram' ? currentTavola.pageImgStart : currentTavola.pageImgTable}
                alt={`${currentTavola.tavolaNo} ${currentTavola.titleZh}`}
                className="max-h-[480px] w-auto object-contain rounded-lg shadow-inner"
              />
              <a
                href={activeImageMode === 'diagram' ? currentTavola.pageImgStart : currentTavola.pageImgTable}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 shadow-lg backdrop-blur-sm transition-all flex items-center space-x-1.5"
              >
                <span>在新分頁檢視高清大圖</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Chinese Parts Translation Table */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white">
                  零件名稱繁體中文對照清單 ({filteredParts.length} 件)
                </h4>
                <p className="text-xs text-slate-400">對照圖紙數字編號 (Fig. N.) 查詢原廠料號與中文名稱</p>
              </div>

              {/* Table search filter */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜尋編號、中文或料號..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase">
                    <th className="py-2.5 px-3 w-16">圖號</th>
                    <th className="py-2.5 px-3 text-emerald-400">中文名稱</th>
                    <th className="py-2.5 px-3">原廠英文 / 西文名稱</th>
                    <th className="py-2.5 px-3 text-amber-300 font-mono">原廠料號</th>
                    <th className="py-2.5 px-3">數量</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredParts.map((part, pIdx) => (
                    <tr key={pIdx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                        #{part.figNo}
                      </td>
                      <td className="py-3 px-3 font-bold text-white whitespace-nowrap">
                        {part.nameZh}
                        {part.validFor && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                            {part.validFor}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                        <div>{part.nameEn}</div>
                        {part.nameEs && <div className="text-slate-500 text-[10px]">{part.nameEs}</div>}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-300 whitespace-nowrap">
                        {part.partNo || '-'}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">
                        {part.qty || '1'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
