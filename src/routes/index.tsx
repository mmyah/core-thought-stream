import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE CORE 4 — Bio-Architecture & Strategic Growth Matrix" },
      { name: "description", content: "Personal dashboard: Health, Work, Study, Art & Media with calendar analytics and AI brain dump." },
    ],
  }),
  component: CoreDashboard,
});

function CoreDashboard() {
  const [brainDumpText, setBrainDumpText] = useState("");
  const [trainingDone, setTrainingDone] = useState(false);
  const [retinolStatus, setRetinolStatus] = useState("БАРЬЕР: СТАБИЛЕН");
  const [workStatus, setWorkStatus] = useState("ПАРСЕР: OK");
  const [workMatches, setWorkMatches] = useState({ applied: 12, total: 25 });

  const [calendarStats, setCalendarStats] = useState({
    lastSync: "10 минут назад",
    connectedAccount: "your.email@domain.com",
    weeklyHours: { health: 6, work: 22, study: 15, art: 4 },
  });

  const [reviews, setReviews] = useState([
    { id: 1, date: "Сегодня", text: "Сдала базовые анализы, сделала МФР затылка. Изучила основы Few-shot промптинга." },
  ]);

  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

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

  const handleImportSubmit = () => {
    setImportError("");
    try {
      const data = JSON.parse(importText);
      if (data.calendar?.weeklyHours) {
        setCalendarStats((s) => ({
          ...s,
          lastSync: data.calendar.lastSync ?? "только что",
          connectedAccount: data.calendar.connectedAccount ?? s.connectedAccount,
          weeklyHours: { ...s.weeklyHours, ...data.calendar.weeklyHours },
        }));
      }
      if (typeof data.health?.retinolStatus === "string") setRetinolStatus(data.health.retinolStatus);
      if (typeof data.health?.trainingDone === "boolean") setTrainingDone(data.health.trainingDone);
      if (typeof data.work?.parserStatus === "string") setWorkStatus(data.work.parserStatus);
      if (data.work?.matches) setWorkMatches({ ...workMatches, ...data.work.matches });
      if (Array.isArray(data.log)) {
        const entries = data.log.map((t: string, i: number) => ({
          id: Date.now() + i,
          date: new Date().toLocaleDateString("ru-RU"),
          text: t,
        }));
        setReviews((r) => [...entries, ...r]);
      }
      setImportText("");
      setImportOpen(false);
    } catch (err) {
      setImportError("Невалидный JSON. Проверь синтаксис.");
    }
  };


  const totalHours =
    calendarStats.weeklyHours.health +
    calendarStats.weeklyHours.work +
    calendarStats.weeklyHours.study +
    calendarStats.weeklyHours.art;

  const bar = (hours: number) => `${Math.min(100, Math.round((hours / totalHours) * 100))}%`;

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F3F4F6] font-mono p-4 md:p-8 selection:bg-emerald-500 selection:text-black">
      {/* HEADER */}
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

      {/* CALENDAR STATS */}
      <section className="max-w-7xl mx-auto border border-zinc-800 bg-[#12161A] p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">// CALENDAR ANALYTICS & TIME AUTO-SORT</h2>
            <p className="text-[11px] text-zinc-500 mt-1">Данные автоматически импортируются из твоих событий и тегов в календаре</p>
          </div>
          <div className="text-[10px] text-zinc-400 border border-zinc-800 px-2 py-1">{calendarStats.connectedAccount}</div>
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

      {/* THE CORE 4 GRID */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* HEALTH */}
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-400">01 // HEALTH (Bio-Architecture)</h2>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800">{retinolStatus}</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-zinc-700 pl-3 text-white">ВЕЧЕР: Retinol 0.2% + Крем Marine Collagen</div>
              <div className="border-l-2 border-zinc-700 pl-3 text-white">ТЕЛО: Салициловый лосьон 2% BHA</div>
              <div className="border-l-2 border-zinc-700 pl-3 text-white">ВОЛОСЫ: Паста Сульсена 2% (Профилактика)</div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500">3D-ПИЛАТЕС (ТАЗ / КОР)</span>
            <button
              onClick={() => setTrainingDone(!trainingDone)}
              className={`text-xs px-3 py-1.5 font-bold border transition-all ${
                trainingDone
                  ? "bg-emerald-500 text-black border-emerald-500"
                  : "bg-transparent text-white border-zinc-700 hover:border-zinc-500"
              }`}
            >
              {trainingDone ? "✓ ВЫПОЛНЕНО" : "ОТМЕТИТЬ"}
            </button>
          </div>
        </section>

        {/* WORK */}
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-sky-400">02 // WORK (NGO Operations)</h2>
              <span className="text-[10px] bg-sky-950 text-sky-400 px-2 py-0.5 border border-sky-800">ПАРСЕР: OK</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 text-[10px]">Project Coordinator</span>
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 text-[10px]">NGO Operations</span>
              </div>
              <div className="mt-3 p-3 bg-zinc-900 border border-zinc-800">
                <div className="text-amber-400 font-bold text-[10px] uppercase mb-1">🔥 Топ Мэтч:</div>
                <div className="text-white font-bold">Program Assistant (Remote)</div>
                <div className="text-zinc-400 text-[10px] mt-0.5">International Development Foundation</div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">КОНВЕРСИЯ ОТКЛИКОВ</span>
            <span className="text-white font-bold">12 / 25 ВАКАНСИЙ</span>
          </div>
        </section>

        {/* STUDY */}
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-purple-400">03 // STUDY (Academic & AI)</h2>
              <span className="text-[10px] bg-purple-950 text-purple-400 px-2 py-0.5 border border-purple-800">RUNNING</span>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 uppercase mb-1">
                  <span>TOEFL PREP</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1 border border-zinc-800">
                  <div className="bg-purple-500 h-full w-[75%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 uppercase mb-1">
                  <span>AI PROMPTING</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1 border border-zinc-800">
                  <div className="bg-purple-500 h-full w-[40%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">НАПРАВЛЕНИЕ</span>
            <span className="text-white font-bold">International Relations</span>
          </div>
        </section>

        {/* ART & MEDIA */}
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-amber-400">04 // ART & MEDIA SPACE</h2>
              <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 border border-amber-800">ACTIVE</span>
            </div>
            <div className="space-y-3 text-xs text-white">
              <div>● Ableton Live (Techno/House/Breakbeat)</div>
              <div>● Швейцарский минимализм & Концепты NOMENA</div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">МЕДИАТРЕК</span>
            <span className="text-white font-bold">Публикация срезов знаний</span>
          </div>
        </section>
      </main>

      {/* BRAIN DUMP */}
      <section className="max-w-7xl mx-auto border border-zinc-800 bg-[#12161A] p-6 mb-8">
        <h2 className="text-sm font-bold tracking-widest uppercase text-white mb-4">// INTERACTIVE MODULE: BRAIN DUMP</h2>
        <form onSubmit={handleBrainDumpSubmit} className="space-y-3">
          <textarea
            value={brainDumpText}
            onChange={(e) => setBrainDumpText(e.target.value)}
            placeholder="Пиши хаотично, тезисно... ИИ автоматически обновит метрики."
            className="w-full bg-[#0D0F12] border border-zinc-800 p-4 text-xs focus:border-zinc-600 focus:outline-none h-20 text-white placeholder-zinc-700 resize-none font-mono"
          />
          <div className="flex justify-end">
            <button type="submit" className="bg-white text-black text-xs px-4 py-2 font-bold hover:bg-zinc-200 transition-all uppercase">
              ОБРАБОТАТЬ ПОТОК
            </button>
          </div>
        </form>
      </section>

      {/* HISTORY LOG */}
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
