import React, { useState } from 'react';
import { Droplet, Info, Check, Sparkles } from 'lucide-react';

export const OilMixCalculator: React.FC = () => {
  const [fuelLiters, setFuelLiters] = useState<number>(4);
  const [percentage, setPercentage] = useState<number>(2.0);
  const [customRatio, setCustomRatio] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const presets = [
    { label: '2.0% (1:50)', value: 2.0, tag: '原廠標準日常推薦' },
    { label: '2.5% (1:40)', value: 2.5, tag: '夏季長途 / 雙載巡航' },
    { label: '3.0% (1:33)', value: 3.0, tag: '爬坡負載 / 舊缸抗磨' },
    { label: '4.0% (1:25)', value: 4.0, tag: '新搪缸 / 磨合前500KM' },
  ];

  const fuelPresets = [2, 3, 4, 5, 5.6];

  const activePercent = isCustom ? (parseFloat(customRatio) || 0) : percentage;
  // Calculate ml of 2T oil: Liters * 1000 * (percentage / 100) = Liters * percentage * 10
  const requiredOilMl = Math.round(fuelLiters * activePercent * 10);

  const maxCupScale = 250;
  const cupFillPercent = Math.min(100, Math.max(0, (requiredOilMl / maxCupScale) * 100));

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
          <Droplet className="w-3.5 h-3.5" />
          <span>Vespa 經典二行程引擎核心守護工具</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          二行程機油預混比例計算機 (2T Pre-mix)
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          V9A1T 原廠無獨立機油幫浦，每次加油均需自行將 2T 二行程專用機油依比例混入油箱。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input controls (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Step 1: Fuel amount */}
          <div>
            <label className="text-sm font-bold text-white flex items-center justify-between mb-2">
              <span>1. 預計注入汽油公升數 (Fuel Liters)</span>
              <span className="font-mono text-amber-400 text-base">{fuelLiters.toFixed(1)} L</span>
            </label>

            {/* Slider */}
            <input
              type="range"
              min="0.5"
              max="6.0"
              step="0.1"
              value={fuelLiters}
              onChange={(e) => setFuelLiters(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              {fuelPresets.map((f) => (
                <button
                  key={f}
                  onClick={() => setFuelLiters(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                    fuelLiters === f
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {f === 5.6 ? '5.6L (油箱加滿)' : `${f} 公升`}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Ratio Selection */}
          <div className="pt-6 border-t border-slate-800">
            <label className="text-sm font-bold text-white block mb-3">
              2. 選擇機油混合比例 (Mix Ratio)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {presets.map((p) => {
                const isSelected = !isCustom && percentage === p.value;
                return (
                  <button
                    key={p.value}
                    onClick={() => {
                      setPercentage(p.value);
                      setIsCustom(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm">{p.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">{p.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Ratio */}
            <div className="mt-4 flex items-center space-x-3">
              <button
                onClick={() => setIsCustom(true)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isCustom
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                自訂比例 %
              </button>
              {isCustom && (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="8"
                    placeholder="例如 2.2"
                    value={customRatio}
                    onChange={(e) => setCustomRatio(e.target.value)}
                    className="w-24 px-3 py-1.5 bg-slate-950 border border-amber-500 rounded-xl text-sm font-mono text-white focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Visual Result & Cup (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
              計算結果 (需添加 2T 機油量)
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight">
                {requiredOilMl}
              </span>
              <span className="text-xl font-bold text-slate-300">ml (cc)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              比例 <span className="font-mono text-white font-bold">{activePercent}%</span> 配比於{' '}
              <span className="font-mono text-white font-bold">{fuelLiters} 公升</span> 汽油
            </p>
          </div>

          {/* Visual Measuring Cylinder */}
          <div className="my-8 flex items-center justify-center">
            <div className="relative w-28 h-56 bg-slate-950 border-2 border-slate-600 rounded-b-2xl rounded-t-md p-1 shadow-inner flex flex-col justify-end overflow-hidden">
              {/* Cup tick marks */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 px-2 pointer-events-none z-10 text-[9px] font-mono text-slate-500 select-none">
                <div className="flex justify-between items-center border-b border-slate-700/60 pb-0.5">
                  <span>250ml</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700/60 pb-0.5">
                  <span>200ml</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700/60 pb-0.5">
                  <span>150ml</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700/60 pb-0.5">
                  <span>100ml</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700/60 pb-0.5">
                  <span>50ml</span>
                  <span>-</span>
                </div>
              </div>

              {/* Oil liquid level */}
              <div
                className="w-full bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-400 rounded-b-xl transition-all duration-500 shadow-lg shadow-amber-500/30 relative"
                style={{ height: `${cupFillPercent}%` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 blur-[1px]" />
              </div>
            </div>
          </div>

          {/* Golden Rule Callout */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>加油站混油黃金 SOP</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              1. 先加約 1 公升汽油底。<br />
              2. 倒入量杯中的 <strong>{requiredOilMl} ml</strong> 二行程機油。<br />
              3. 繼續加完剩餘汽油，藉油槍沖力徹底擊散混合。<br />
              4. 鎖好油箱蓋，前後搖晃車身 5 秒即完成！
            </p>
          </div>
        </div>
      </div>

      {/* 2T Oil Selection Tips */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Info className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">二行程機油選用守則</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1">
            <strong className="text-emerald-400 block text-sm">認證規範：JASO FC / FD</strong>
            <p className="text-slate-400 leading-relaxed">
              優先選用符合日本 JASO FC 或更高階 FD (低煙、低積碳) 認證，或歐洲 ISO-L-EGD 規範之二行程專用油。
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1">
            <strong className="text-amber-400 block text-sm">油基選擇：半合成 vs 全合成</strong>
            <p className="text-slate-400 leading-relaxed">
              原裝標準缸推薦優質半合成 2T 油，燃燒乾淨且不易冷車不易發動；若有改裝 102cc/130cc 汽缸則建議全合成油品。
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1">
            <strong className="text-rose-400 block text-sm">絕對禁忌：切勿使用四行程機油</strong>
            <p className="text-slate-400 leading-relaxed">
              4T 汽車/機車機油含高黏度添加劑與金屬清淨劑，無法隨汽油完全霧化燃燒，會造成火星塞迅速積碳潮濕並卡死活塞環。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

