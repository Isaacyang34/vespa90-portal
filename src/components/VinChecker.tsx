import React, { useState } from 'react';
import { Search, ExternalLink, ShieldAlert, MapPin } from 'lucide-react';
import { VEHICLE_SUMMARY } from '../data/vespaData';

export const VinChecker: React.FC = () => {
  const [serialInput, setSerialInput] = useState<string>('54210');

  const cleanNum = parseInt(serialInput.replace(/[^0-9]/g, ''), 10);
  const isValid = !isNaN(cleanNum) && cleanNum > 0;

  const isEarly = isValid && cleanNum <= VEHICLE_SUMMARY.chassisSplitNumber;

  // Approximate year estimation based on Smallframe production registry
  const estimateYear = (num: number) => {
    if (num < 1000) return '序號過小（原廠起始號約為 1001）';
    if (num <= 25000) return '1963 年 (最初期)';
    if (num <= 70000) return '1964 年';
    if (num <= 141544) return '1965 年 (前期改款前)';
    if (num <= 165000) return '1966 ~ 1968 年';
    if (num <= 185000) return '1969 ~ 1974 年';
    if (num <= 220000) return '1975 ~ 1984 年 (後期末代)';
    return '超出原廠已知號碼範圍';
  };

  const sampleNumbers = [
    { num: '12450', desc: '1963 早期小側蓋' },
    { num: '141000', desc: '1965 前期末尾' },
    { num: '142500', desc: '1965 後期大側蓋開始' },
    { num: '178000', desc: '1970 年代中後期' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
          <Search className="w-3.5 h-3.5" />
          <span>車身號碼與年份分水嶺快速判別</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Vespa 90 車架號碼 (Chassis VIN) 鑑定器
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          輸入您的車台打刻號碼，即刻判定屬於「前期型」或「後期型」，並指引對應的原廠爆炸圖與零件規格。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Box */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <label className="text-sm font-bold text-white block mb-2">
              請輸入車身打刻流水號碼 (不含 V9A1T 字樣)：
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-amber-400 font-bold">
                V9A1T ★
              </span>
              <input
                type="text"
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                placeholder="例如 54210"
                className="w-full pl-28 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-lg font-mono text-white tracking-wider focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              分水嶺車架號碼：<span className="font-mono text-amber-400 font-bold">141544</span>
            </p>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs text-slate-400 block mb-2">點選測試範例號碼：</span>
            <div className="grid grid-cols-2 gap-2">
              {sampleNumbers.map((s) => (
                <button
                  key={s.num}
                  onClick={() => setSerialInput(s.num)}
                  className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-left transition-all"
                >
                  <span className="font-mono text-xs text-cyan-300 font-bold block">{s.num}</span>
                  <span className="text-[11px] text-slate-400">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stamping Location Guide */}
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-slate-200 font-semibold text-sm">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>車架號碼打刻位置指引</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              打開右側引擎金屬側蓋，在車台鈑金邊緣凹槽處（靠近後避震器上鎖點外側邊框），您會看見義大利 Piaggio 原廠打刻的星號與字樣：
              <br />
              <code className="text-amber-300 bg-slate-950 px-2 py-1 rounded-md mt-2 inline-block font-mono border border-slate-800">
                ★ V9A1T ★ {cleanNum || 'XXXXX'} ★
              </code>
            </p>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-6">
          {isValid ? (
            <div
              className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 ${
                isEarly
                  ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/40 shadow-xl shadow-emerald-500/5'
                  : 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border-cyan-500/40 shadow-xl shadow-cyan-500/5'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                    isEarly
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  }`}
                >
                  {isEarly ? '前期型 (Early Model)' : '後期型 (Late Model)'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  推估年份: {estimateYear(cleanNum)}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                {isEarly ? '前期標準 V9A1T (經典小側蓋)' : '後期改款 V9A1T (加大側蓋)'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {isEarly
                  ? '您的愛車屬於 1963~1965 年間的原裝經典前期車型，擁有最受收藏家青睞的小側蓋設計與斜體草寫金屬標牌。'
                  : '您的愛車屬於 1965 年後生產的成熟改款型號，側蓋開口加大，大幅提升了更換火星塞與化油器維護的便利性。'}
              </p>

              {/* Specs Breakdown */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">側蓋尺寸：</span>
                  <span className="font-bold text-white">
                    {isEarly ? '小側蓋 (Sportellini piccoli)' : '大側蓋 (Sportellini grandi)'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">原裝車標：</span>
                  <span className="font-bold text-white">
                    {isEarly ? '老字體斜體金屬飾牌 (Corsivo)' : '六角 Piaggio 藍標 + 方塊字'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">離合器規格：</span>
                  <span className="font-bold text-white">
                    {isEarly ? '前期單一中央大彈簧' : '後期微調彈簧座與副軸面'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">建議對應爆炸圖：</span>
                  <span className="font-bold text-amber-400 font-mono">
                    {isEarly ? 'Scooter Center c-5035' : 'Scooter Center c-5213'}
                  </span>
                </div>
              </div>

              {/* Direct Link to matching parts diagram */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <a
                  href={isEarly ? VEHICLE_SUMMARY.scooterCenterEarlyUrl : VEHICLE_SUMMARY.scooterCenterLateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-slate-950 font-bold text-sm shadow-lg transition-all ${
                    isEarly
                      ? 'bg-emerald-400 hover:bg-emerald-300 shadow-emerald-500/20'
                      : 'bg-cyan-400 hover:bg-cyan-300 shadow-cyan-500/20'
                  }`}
                >
                  <span>開啟對應 {isEarly ? '前期型' : '後期型'} 全車爆炸圖專區</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 text-center text-slate-400">
              <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-sm">請在左側輸入有效的阿拉伯數字車架流水號以開始判定</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
