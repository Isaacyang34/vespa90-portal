import React, { useState, useEffect } from 'react';
import { ROUTINE_MAINTENANCE } from '../data/vespaData';
import { CheckSquare, Square, Plus, Trash2, Calendar, CheckCircle2 } from 'lucide-react';

interface LogEntry {
  id: string;
  date: string;
  title: string;
  mileage: string;
  cost: string;
  notes: string;
}

export const MaintenanceChecklist: React.FC = () => {
  // Checked tasks state in localStorage
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('v90_maintenance_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Restoration logs in localStorage
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('v90_restoration_logs');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: '1',
        date: '2026-10-15',
        title: '全車引擎重組與更換油封培林',
        mileage: '24,350 km',
        cost: 'NT$ 3,800',
        notes: '更換 6303、6204 培林，Corteco 曲軸油封，重新調校點火 19° BTDC。',
      },
      {
        id: '2',
        date: '2026-11-01',
        title: '更換 SAE 30 齒輪油 & 清洗化油器',
        mileage: '24,500 km',
        cost: 'NT$ 350',
        notes: '注入 250cc SAE 30 機油，清洗 SHB 16/16 慢車與主油嘴。',
      },
    ];
  });

  // New log form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newMileage, setNewMileage] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('v90_maintenance_checklist', JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  useEffect(() => {
    localStorage.setItem('v90_restoration_logs', JSON.stringify(logs));
  }, [logs]);

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry: LogEntry = {
      id: Date.now().toString(),
      date: newDate,
      title: newTitle.trim(),
      mileage: newMileage.trim() || '未記錄',
      cost: newCost.trim() || 'NT$ 0',
      notes: newNotes.trim(),
    };

    setLogs([newEntry, ...logs]);
    setNewTitle('');
    setNewMileage('');
    setNewCost('');
    setNewNotes('');
    setShowAddForm(false);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  const completedCount = ROUTINE_MAINTENANCE.filter((t) => checkedTasks[t.id]).length;
  const progressPercent = Math.round((completedCount / ROUTINE_MAINTENANCE.length) * 100);

  return (
    <div className="space-y-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>保養歷程與愛車管理</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          定期保養檢核清單 & 修復施工日誌
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          追蹤您的 Vespa 90 定期檢查項目，並記錄零件更換歷程與花費（自動儲存於瀏覽器）。
        </p>
      </div>

      {/* Routine Maintenance Checklist Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">標準例行保養檢核項目</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">點擊勾選框即可記錄已完成之檢查</p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400">完成度：</span>
            <div className="w-28 h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">
              {completedCount} / {ROUTINE_MAINTENANCE.length} ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Checklist items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROUTINE_MAINTENANCE.map((item) => {
            const isDone = !!checkedTasks[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleTask(item.id)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-3.5 select-none ${
                  isDone
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-70'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="pt-0.5 text-amber-400 shrink-0">
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-bold text-sm ${
                        isDone ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400/90 block">
                    週期：{item.interval}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restoration Logs Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">愛車翻新與施工日誌 (Restoration Log)</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">自訂記錄修復項目、備品料號與花費</p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>新增施工紀錄</span>
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAddLog} className="p-5 bg-slate-950 rounded-2xl border border-slate-700 space-y-4">
            <h4 className="text-sm font-bold text-white">填寫新維修紀錄</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">施工日期</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div className="sm:col-span-1 lg:col-span-2">
                <label className="text-xs text-slate-400 block mb-1">項目名稱</label>
                <input
                  type="text"
                  placeholder="例如 更換離合器片與線索"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">當前里程</label>
                <input
                  type="text"
                  placeholder="例如 24,500 km"
                  value={newMileage}
                  onChange={(e) => setNewMileage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">零件費用</label>
                <input
                  type="text"
                  placeholder="例如 NT$ 1,200"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="text-xs text-slate-400 block mb-1">詳細備註 / 料號</label>
                <input
                  type="text"
                  placeholder="例如 使用 SIP 原廠 3 片式木質離合器片..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                儲存紀錄
              </button>
            </div>
          </form>
        )}

        {/* Logs List */}
        <div className="space-y-3">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              目前尚未有任何維修日誌，點擊右上角新增您的第一筆愛車保養記錄！
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">
                      {log.title}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700">
                      {log.mileage}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                      {log.cost}
                    </span>
                  </div>
                  {log.notes && (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {log.notes}
                    </p>
                  )}
                  <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-mono pt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{log.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteLog(log.id)}
                  className="self-end sm:self-center p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="刪除紀錄"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
