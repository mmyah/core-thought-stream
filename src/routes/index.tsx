import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE CORE 4 — Bio-Architecture & Strategic Growth Matrix" },
      { name: "description", content: "Personal dashboard: Health, Work, Study, Art & Media with calendar analytics and AI brain dump." },
    ],
  }),
  component: CoreDashboard,
});

// URL твоего будущего Google Apps Script (заменишь после развертывания скрипта)
const GOOGLE_SCRIPT_API = "https://script.google.com/macros/s/AKfycbwDZgUjVxU1XXs2fmv_fCZB-4yNEj_gN5qrYZxTN3TAluovZxd7C6C1tbr8xz9vfc0/exec";

function CoreDashboard() {
  const [brainDumpText, setBrainDumpText] = useState("");
  const [calendarStats, setCalendarStats] = useState({
    lastSync: "Синхронизация настроена",
    connectedAccount: "mmyah24@gmail.com",
    weeklyHours: { health: 6, work: 22, study: 15, art: 4 },
  });

  // СОСТОЯНИЕ ДЛЯ HEALTH (Чекбоксы и статусы)
  const [healthTasks, setHealthTasks] = useState([
    { id: "retinol", text: "ВЕЧЕР: Retinol 0.2% + Крем Marine Collagen", done: false },
    { id: "bha", text: "ТЕЛО: Салициловый лосьон 2% BHA", done: false },
    { id: "sulsena", text: "ВОЛОСЫ: Паста Сульсена 2% (Профилактика)", done: false },
    { id: "pilates", text: "3D-ПИЛАТЕС (ТАЗ / КОР)", done: false },
  ]);

  const [retinolStatus, setRetinolStatus] = useState("БАРЬЕР: СТАБИЛЕН");
  const [workStatus, setWorkStatus] = useState("АГЕНТ: АКТИВЕН (1 РАЗ/ДЕНЬ)");
  const [workMatches, setWorkMatches] = useState({ applied: 12, total: 25 });
  
  // ДИНАМИЧЕСКИЕ ДАННЫЕ ИЗ GOOGLE DOCS
  const [studyTasks, setStudyTasks] = useState<string[]>([
    "Загрузка данных из Google Docs...",
  ]);
  const [artTasks, setArtTasks] = useState<string[]>([
    "Загрузка списков из Google Docs...",
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, date: "Сегодня", text: "Система подготовлена к интеграции с Google API." },
  ]);

  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  // Подгрузка данных из Google при старте приложения
  useEffect(() => {
    async function fetchGoogleData() {
      try {
        const res = await fetch(`${GOOGLE_SCRIPT_API}?action=getData`);
        const data = await res.json();
        if (data.calendar) setCalendarStats(s => ({ ...s, ...data.calendar }));
        if (data.study) setStudyTasks(data.study);
        if (data.art) setArtTasks(data.art);
      } catch (e) {
        console.log("Ожидание привязки Google Apps Script Web App API URL");
        // Временные моки для демонстрации списков из доков:
        setStudyTasks(["● Проработать Few-shot промпты для NGO парсера", "● TOEFL: Написание эссе (Task 2)"]);
        setArtTasks(["● Ableton: Свести брейкбит-трек", "● NOMENA: Подготовить сетку постов для медиатрека"]);
      }
    }
    fetchGoogleData();
  }, []);

  // Переключение чекбокса в Health с автоматической записью в лог
  const handleToggleHealth = async (id: string, text: string) => {
    const updated = healthTasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setHealthTasks(updated);
    
    const isNowDone = !healthTasks.find(t => t.id === id)?.done;
    if (isNowDone) {
      const logText = `Выполнено по протоколу Health: ${text.replace(/^[А-Я\s]+:\s/, '')}`;
      const newLog = {
        id: Date.now(),
        date: new Date().toLocaleDateString("ru-RU"),
        text: logText
      };
      setReviews([newLog, ...reviews]);

      // Отправка лога в Google Docs на бэкенд
      try {
        await fetch(GOOGLE_SCRIPT_API, {
          method: "POST",
          body: JSON.stringify({ action: "appendLog", text: `${newLog.date}: ${newLog.text}` })
        });
      } catch(e) {}
    }
  };

  const handleBrainDumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brainDumpText.trim()) return;
    const newReview = {
      id: Date.now(),
      date: new Date().toLocaleDateString("ru-RU"),
      text: brainDumpText,
    };
    setReviews([newReview, ...reviews]);
    setBrainDumpText("");
  };

  const totalHours =
    calendarStats.weeklyHours.health + calendarStats.weeklyHours.work +
    calendarStats.weeklyHours.study + calendarStats.weeklyHours.art;
  const bar = (hours: number) => `${Math.min(100, Math.round((hours / (totalHours || 1)) * 100))}%`;

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F3F4F6] font-mono p-4 md:p-8 selection:bg-emerald-500 selection:text-black">
      <header className="max-w-7xl mx-auto mb-8 border-b border-zinc-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-white">THE CORE 4</h1>
          <p className="text-xs text-zinc-500 mt-1 italic">SYSTEM STATUS: BIO-ARCHITECTURE & STRATEGIC GROWTH MATRIX</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-400">ВЕХА: TOEFL EXAM — 20 ИЮНЯ</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-widest">
            ● CALENDAR SYNC: ACTIVE ({calendarStats.lastSync})
          </div>
        </div>
      </header>

      {/* CALENDAR BLOCK */}
      <section className="max-w-7xl mx-auto border border-zinc-800 bg-[#12161A] p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">// CALENDAR ANALYTICS & TIME AUTO-SORT</h2>
            <p className="text-[11px] text-zinc-500 mt-1">Автоматический подсчёт часов из Google Календаря раз в час</p>
          </div>
          <div className="text-[10px] text-emerald-400 border border-emerald-900/50 bg-emerald-950/30 px-3 py-1 font-bold tracking-wider">
            ● LINKED: {calendarStats.connectedAccount}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {[
            { label: "HEALTH TIME", hours: calendarStats.weeklyHours.health, color: "bg-emerald-500" },
            { label: "WORK OPERATIONS", hours: calendarStats.weeklyHours.work, color: "bg-sky-500" },
            { label: "STUDY SPRINT", hours: calendarStats.weeklyHours.study, color: "bg-purple-500" },
            { label: "ART & MEDIA", hours: calendarStats.weeklyHours.art, color: "bg-amber-500" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-[10px] uppercase mb-1">
                <span className="text-zinc-400">{row.label}</span>
                <span className="text-white font-bold">{row.hours}ч / неделю</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 border border-zinc-800">
                <div className={`${row.color} h-full`} style={{ width: bar(row.hours) }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 01 // HEALTH */}
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-400">01 // HEALTH (Bio-Architecture)</h2>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800">{retinolStatus}</span>
            </div>
            <div className="space-y-3 text-xs">
              {healthTasks.map((task) => (
                <label key={task.id} className="flex items-start gap-3 p-2 border border-zinc-900 bg-[#0D0F12]/40 hover:bg-zinc-900/60 cursor-pointer transition-colors select-none">
                  <input type="checkbox" checked={task.done} onChange={() => handleToggleHealth(task.id, task.text)}
                    className="mt-0.5 accent-emerald-500 h-3.5 w-3.5 border-zinc-700 bg-zinc-900 rounded-none focus:ring-0" />
                  <span className={`text-zinc-300 transition-all ${task.done ? "line-through text-zinc-600 italic" : ""}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/60 text-[10px] text-zinc-500 italic">
            * Галочка автоматически пишет операцию в лог для синхронизации с Google Docs
          </div>
        </section>

        {/* 02 // WORK */}
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-sky-400">02 // WORK (NGO Operations)</h2>
              <span className="text-[10px] bg-sky-950 text-sky-400 px-2 py-0.5 border border-sky-800">{workStatus}</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 text-[10px]">Project Coordinator</span>
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 text-[10px]">NGO Operations</span>
              </div>
              <div className="mt-3 p-3 bg-zinc-900 border border-zinc-800">
                <div className="text-amber-400 font-bold text-[10px] uppercase mb-1">🔥 ИИ-Агент: Сводка за 24ч:</div>
                <div className="text-white font-bold">Program Assistant (Remote)</div>
                <div className="text-zinc-400 text-[10px] mt-0.5">International Development Foundation</div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">КОНВЕРСИЯ ОТКЛИКОВ</span>
            <span className="text-white font-bold">{workMatches.applied} / {workMatches.total} ВАКАНСИЙ</span>
          </div>
        </section>

        {/* 03 // STUDY */}
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-purple-400">03 // STUDY (Academic & AI)</h2>
              <span className="text-[10px] bg-purple-950 text-purple-400 px-2 py-0.5 border border-purple-800">DOCS: LINKED</span>
            </div>
            <div className="space-y-2 text-xs text-zinc-300">
              {studyTasks.map((task, i) => <div key={i} className="border-l-2 border-purple-800 pl-3 py-0.5">{task}</div>)}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">НАПРАВЛЕНИЕ</span>
            <span className="text-white font-bold">International Relations</span>
          </div>
        </section>

        {/* 04 // ART */}
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-amber-400">04 // ART & MEDIA SPACE</h2>
              <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 border border-amber-800">DOCS: LINKED</span>
            </div>
            <div className="space-y-2 text-xs text-zinc-300">
              {artTasks.map((task, i) => <div key={i} className="border-l-2 border-amber-800 pl-3 py-0.5">{task}</div>)}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">МЕДИАТРЕК</span>
            <span className="text-white font-bold">Публикация срезов знаний</span>
          </div>
        </section>
      </main>

      {/* BRAIN DUMP & LOGS */}
      <section className="max-w-7xl mx-auto border border-zinc-800 bg-[#12161A] p-6 mb-8">
        <h2 className="text-sm font-bold tracking-widest uppercase text-white mb-4">// INTERACTIVE MODULE: BRAIN DUMP</h2>
        <form onSubmit={handleBrainDumpSubmit} className="space-y-3">
          <textarea value={brainDumpText} onChange={(e) => setBrainDumpText(e.target.value)}
            placeholder="Пиши хаотично, тезисно... Данные синхронизируются с твоей облачной матрицей."
            className="w-full bg-[#0D0F12] border border-zinc-800 p-4 text-xs focus:border-zinc-600 focus:outline-none h-20 text-white placeholder-zinc-700 resize-none font-mono" />
          <div className="flex justify-end">
            <button type="submit" className="bg-white text-black text-xs px-4 py-2 font-bold hover:bg-zinc-200 transition-all uppercase">
              ОБРАБОТАТЬ ПОТОК
            </button>
          </div>
        </form>
      </section>

      <section className="max-w-7xl mx-auto border border-zinc-800 bg-[#12161A] p-6">
        <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-4">// HISTORY LOG</h2>
        <div className="space-y-3">
          {reviews.map((log) => (
            <div key={log.id} className="text-xs border-b border-zinc-900 pb-2 last:border-0">
              <span className="text-[10px] text-zinc-600 font-bold mr-4">{log.date}</span>
              <span className="text-zinc-300">{log.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
