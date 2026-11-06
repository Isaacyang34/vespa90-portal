import React, { useState } from 'react';
import { WIRING_CIRCUITS_NO_BATTERY, VEHICLE_SUMMARY } from '../data/vespaData';
import { Download, ExternalLink, Zap, AlertTriangle, HelpCircle, Activity } from 'lucide-react';

export const WiringSection: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<'no-battery' | 'with-battery'>('no-battery');
  const [activeWireId, setActiveWireId] = useState<string | null>(null);

  const troubleshootingItems = [
    {
      symptom: '踩下後煞車時引擎熄火或大燈嚴重變暗',
      cause: '煞車燈泡燒毀，或煞車開關常閉接點氧化接觸不良',
      solution: '檢查後煞車燈泡 (6V 5W) 是否斷絲。老偉士無電瓶版採常閉回路，燈泡燒斷會導致發電線圈阻抗突變影響點火。',
    },
    {
      symptom: '按壓熄火按鈕 (Kill Switch) 無法熄火',
      cause: '手把內部紅色熄火線斷裂，或手把開關接地金屬彈片生鏽氧化',
      solution: '拆開右側把手開關盒，使用三用電表測量按下開關時紅線與車身金屬是否導通 (接地電阻 < 0.5Ω)。',
    },
    {
      symptom: '所有車燈非常微弱，隨油門稍微變亮但依舊昏暗',
      cause: '電盤飛輪磁鐵退磁，或照明線圈老化、接地線搭鐵處生鏽阻抗過大',
      solution: '重新打磨引擎接地螺絲與車身搭鐵點，必要時重新充磁飛輪或更換全新 6V 銅線發電線圈。',
    },
    {
      symptom: '容易燒大燈或尾燈燈泡',
      cause: '未裝設電壓穩壓器 (Regulator) 且燈泡瓦數使用錯誤',
      solution: '確認前大燈為原廠規格 6V 15W/15W，尾燈 6V 5W。瓦數過低會導致負載不足、交流電壓飆高至 9V 以上燒毀。',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-600/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>ScooterHelp 官方電系資料庫</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              V9A1T 全車電系線路圖 (Wiring Diagrams)
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Vespa 90 採用 6V 交流電盤磁石發電機系統。老偉士原廠提供「無電瓶純交流版」與「外銷附電瓶/方向燈版」兩種規格，可點擊下方直接下載官方 PDF 高清圖紙。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={VEHICLE_SUMMARY.wiringPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>無電瓶版 PDF 下載</span>
            </a>
            <a
              href={VEHICLE_SUMMARY.wiringSelectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>雙版本官方線上選擇頁</span>
            </a>
          </div>
        </div>
      </div>

      {/* Version Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setSelectedVersion('no-battery')}
          className={`flex items-center space-x-2 pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
            selectedVersion === 'no-battery'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>義大利標準版 (無電瓶・6V 交流電盤)</span>
        </button>
        <button
          onClick={() => setSelectedVersion('with-battery')}
          className={`flex items-center space-x-2 pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
            selectedVersion === 'with-battery'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>外銷豪華版 (附 6V 電瓶 / 方向燈 / 點火鎖頭)</span>
        </button>
      </div>

      {/* Interactive Circuit Color Tracer (No Battery) */}
      {selectedVersion === 'no-battery' ? (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">原廠色碼導線與回路解析 (點擊高亮追蹤)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Piaggio 義大利原廠使用特定的色彩標示各迴路功能，點擊任意線路即可查看走向與工作原理：
                </p>
              </div>
              {activeWireId && (
                <button
                  onClick={() => setActiveWireId(null)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  清除選取
                </button>
              )}
            </div>

            {/* Wire Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WIRING_CIRCUITS_NO_BATTERY.map((wire) => {
                const isSelected = activeWireId === wire.id;
                return (
                  <div
                    key={wire.id}
                    onClick={() => setActiveWireId(isSelected ? null : wire.id)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-500 shadow-xl ring-2 ring-amber-500/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className="w-5 h-5 rounded-full shadow-inner border border-white/20"
                        style={{ backgroundColor: wire.colorHex }}
                      />
                      <div>
                        <span className="font-bold text-white text-base">{wire.colorName}</span>
                        <span className="ml-2 font-mono text-xs text-slate-400">({wire.italianName})</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400">線路功能：</span>
                        <p className="text-slate-200 font-medium mt-0.5">{wire.function}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-slate-400">走線與終端：</span>
                        <p className="text-slate-300 font-mono mt-0.5">{wire.destination}</p>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                        <span>電壓: {wire.voltage}</span>
                        <span className="text-amber-400">{wire.currentType}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Special Circuit Principle Alert */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm space-y-2">
              <div className="flex items-center space-x-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>經典老偉士「常閉式煞車燈回路」特殊原理提醒</span>
              </div>
              <p className="leading-relaxed">
                與現代機車「按煞車通電」不同，無電瓶 Vespa 90 的腳煞車開關在平常是<strong>閉合接地 (Normally Closed)</strong> 的。
                踩下煞車踏板時，開關反而<strong>被頂開斷路</strong>，迫使交流發電線圈的電流轉而流向煞車燈絲發光。因此若煞車燈泡燒毀，發電負載失去回路，踩下煞車時常會導致大燈變暗或引擎點火抖動！
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* With Battery Version */
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white">外銷版電系特點 (有電瓶 / 鑰匙 / 方向燈)</h3>
            <p className="text-sm text-slate-400 mt-1">
              為符合部分外銷市場法規（如德國、英國、美國等），此版本具備 6V 電瓶與整流器，能在引擎未發動時維持小燈與方向燈亮起。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase">蓄電結構</span>
              <h4 className="text-base font-bold text-white">6V 鉛酸電瓶 + 硒整流器</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                引擎發電線圈輸出交流電，經由金屬散熱片型硒/矽整流二極體整流為直流電，為電瓶充電。
              </p>
            </div>
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase">安全轉向</span>
              <h4 className="text-base font-bold text-white">雙端把手尾端方向燈</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                把手左右末端配備經典 Hella 凸透鏡轉向方向燈 (Lenkerendenblinker)，由 6V 雙腳機械式閃爍繼電器控制。
              </p>
            </div>
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase">點火鎖頭</span>
              <h4 className="text-base font-bold text-white">龍頭上方鑰匙點火開關</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                具備 OFF / ON / PARKING (停車小燈) 多檔位切換，拔出鑰匙即將高壓點火線直接接地防止被盜騎。
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <a
              href={VEHICLE_SUMMARY.wiringSelectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>在 ScooterHelp 查閱外銷電系原廠線路圖</span>
            </a>
          </div>
        </div>
      )}

      {/* Electrical Troubleshooting FAQ */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">老偉士常見電系疑難排解 (Troubleshooting)</h3>
            <p className="text-xs text-slate-400">白金點火與 6V 磁石發電機日常故障速查手冊</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {troubleshootingItems.map((item, idx) => (
            <div key={idx} className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 space-y-2.5">
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  !
                </span>
                <h4 className="text-sm font-bold text-white">{item.symptom}</h4>
              </div>
              <div className="text-xs space-y-1 pl-7">
                <p className="text-slate-400">
                  <strong className="text-slate-300">可能原因：</strong>{item.cause}
                </p>
                <p className="text-amber-300/90">
                  <strong className="text-amber-400">排查修復：</strong>{item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

