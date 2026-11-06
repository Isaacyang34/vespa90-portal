import React from 'react';
import { BEARINGS_AND_SEALS } from '../data/vespaData';
import { ShieldCheck, Wrench, Settings2, AlertCircle } from 'lucide-react';

export const PartsReference: React.FC = () => {
  const torqueSpecs = [
    { component: '汽缸蓋螺帽 (Cylinder Head Nuts)', torque: '1.6 ~ 1.8 kg·m (16 ~ 18 N·m)', note: '對角分次均勻鎖緊，防止鋁合金缸頭變形漏氣' },
    { component: '飛輪緊固螺母 (Flywheel Magneto Nut)', torque: '4.0 ~ 4.5 kg·m (40 ~ 45 N·m)', note: '安裝前確認半月鍵無歪斜，使用飛輪止動特工' },
    { component: '離合器中央螺母 (Clutch Nut)', torque: '3.5 ~ 4.0 kg·m (35 ~ 40 N·m)', note: '務必更換並扳平防鬆波浪折邊華司 (Lock Washer)' },
    { component: '後輪鼓主軸螺母 (Rear Hub Castle Nut)', torque: '9.0 ~ 10.0 kg·m (90 ~ 100 N·m)', note: '必須插好全新開口銷 (Cotter Pin) 鎖定' },
    { component: '曲軸箱合箱中線螺栓 (Casing Bolts M7)', torque: '1.2 ~ 1.5 kg·m (12 ~ 15 N·m)', note: 'M7 專用規格螺栓，切勿過度死鎖以免滑牙' },
    { component: '火星塞 (Spark Plug)', torque: '2.0 ~ 2.5 kg·m (20 ~ 25 N·m)', note: '先以手指旋到底再以火星塞扳手帶緊 1/2 圈' },
  ];

  const carbSpecs = [
    { param: '化油器原廠型號', standard: "Dell'Orto SHB 16/16", note: '小型車體 Smallframe 專用化油器' },
    { param: '主油嘴 (Main Jet)', standard: '74 (M5 螺紋)', note: '若改裝大吸氣空濾或排氣管建議升級 76 ~ 78' },
    { param: '慢速油嘴 (Idle / Slow Jet)', standard: '42 (長柄側置油嘴)', note: '若冷車怠速不穩或回油易熄火需用細銅絲通通' },
    { param: '啟動油嘴 (Choke Jet)', standard: '50', note: '拉出阻風門拉桿時供應冷車濃混合氣' },
    { param: '三角耐磨油針', standard: '尖端黑色橡皮閥針', note: '若油針橡膠老化硬化，化油器將溢油滲入曲軸箱' },
    { param: '風門空氣混合比螺絲', standard: '鎖到底後退出 1.5 ~ 1.75 圈', note: '順時針變濃、逆時針變稀' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>精準翻新數據庫</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          全車培林、油封規格與組裝扭力對照
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          修復老偉士引擎最關鍵的精密數據：曲軸油封、軸承公差、化油器油嘴與標準扭力值。
        </p>
      </div>

      {/* Bearings and Seals Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">曲軸箱與輪軸核心培林 / 油封規格</h3>
            <p className="text-xs text-slate-400">採購 SKF / Corteco 等高品質零件時的直接對照型號</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                <th className="py-3 px-4">安裝位置</th>
                <th className="py-3 px-4 text-emerald-400">規格尺寸 (mm)</th>
                <th className="py-3 px-4">原廠 / 品牌參考號</th>
                <th className="py-3 px-4">功用與防漏注意事項</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm">
              {BEARINGS_AND_SEALS.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-200">
                    {b.position}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-300 font-bold text-xs sm:text-sm whitespace-nowrap">
                    {b.spec}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-400 whitespace-nowrap">
                    {b.oemReference || '-'}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400 leading-relaxed">
                    {b.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column: Carburettor & Torque Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dell'Orto Carb Specs */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">化油器設定參數 (SHB 16/16)</h3>
              <p className="text-xs text-slate-400">原廠出廠標準油嘴規格與混和比</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {carbSpecs.map((c, idx) => (
              <div key={idx} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">{c.param}</span>
                  <span className="font-mono font-bold text-amber-400">{c.standard}</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1">{c.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Torque Specs */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">關鍵部位鎖緊扭力值 (Torque)</h3>
              <p className="text-xs text-slate-400">避免鋁合金箱體滑牙與飛輪脫落的標準規範</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {torqueSpecs.map((t, idx) => (
              <div key={idx} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">{t.component}</span>
                  <span className="font-mono font-bold text-cyan-300">{t.torque}</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1">{t.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Tip Banner */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs sm:text-sm text-amber-300/90 leading-relaxed">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 block mb-1">培林安裝技巧（熱裝冷縮法）</strong>
          更換曲軸箱培林時，強烈建議使用熱風槍均勻加熱曲軸箱軸承座至約 90°C~100°C，並將新培林事先放入冷凍庫冷卻。如此培林可輕鬆就位，完全避免以鐵槌硬敲導致鋁合金箱體變形擴孔。
        </div>
      </div>
    </div>
  );
};

