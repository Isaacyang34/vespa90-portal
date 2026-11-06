import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { VEHICLE_SUMMARY } from '../data/vespaData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm">
              V90
            </div>
            <div>
              <span className="font-bold text-white text-sm">Vespa 90 (V9A1T) Technical Hub</span>
              <p className="text-[11px] text-slate-500">專為老偉士車主、翻新玩家與工作室打造的數位技術手冊</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href={VEHICLE_SUMMARY.scooterHelpSpecsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors inline-flex items-center space-x-1"
            >
              <span>ScooterHelp 資料庫</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={VEHICLE_SUMMARY.scooterCenterEarlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors inline-flex items-center space-x-1"
            >
              <span>Scooter Center 爆炸圖</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={VEHICLE_SUMMARY.sipScootershopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors inline-flex items-center space-x-1"
            >
              <span>SIP Scootershop</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            所有圖資與手冊版權屬於 Piaggio & C. S.p.A. 及原資料收錄網站。本專案為老車文化推廣與維修技術參考用途。
          </p>
          <div className="flex items-center space-x-1">
            <span>Crafted with passion for Classic Smallframes</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};

