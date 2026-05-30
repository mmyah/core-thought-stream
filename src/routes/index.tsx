import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE CORE 4 — Bio-Architecture & Strategic Growth Matrix" },
      { name: "description", content: "Personal dashboard: Health, Work, Study, Art & Media with AI brain dump." },
    ],
  }),
  component: CoreDashboard,
});

function CoreDashboard() {
  const [brainDumpText, setBrainDumpText] = useState("");
  const [trainingDone, setTrainingDone] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, date: "Сегодня", text: "Сдала базовые анализы, сделала МФР затылка. Изучила основы Few-shot промптинга." },
  ]);

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
    alert("ИИ-Аналитик: Поток мыслей принят. Метрики дашборда будут обновлены автоматически.");
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F3F4F6] font-mono p-4 md:p-8 selection:bg-emerald-500 selection:text-black">
      <header className="max-w-7xl mx-auto mb-12 border-b border-zinc-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-white">THE CORE 4</h1>
          <p className="text-xs text-zinc-500 mt-1 italic">SYSTEM STATUS: BIO-ARCHITECTURE & STRATEGIC GROWTH MATRIX</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-400">ВЕХА: TOEFL EXAM — 20 ИЮНЯ</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-widest">● AI-ANALYST ONLINE</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-400">01 // HEALTH (Bio-Architecture)</h2>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800">БАРЬЕР: СТАБИЛЕН</span>
            </div>
            <div className="space-y-4 text-xs">
              <div className="border-l-2 border-zinc-700 pl-3">
                <div className="text-zinc-400 uppercase text-[10px]">Вечерний уход:</div>
                <div className="text-white mt-0.5">Сыворотка Retinol 0.2% (Skin1004) ➡️ Крем Marine Collagen</div>
              </div>
              <div className="border-l-2 border-zinc-700 pl-3">
                <div className="text-zinc-400 uppercase text-[10px]">Тело (Грудь/Спина):</div>
                <div className="text-white mt-0.5">Точечно Лосьон Салициловая кислота 2% (BHA)</div>
              </div>
              <div className="border-l-2 border-zinc-700 pl-3">
                <div className="text-zinc-400 uppercase text-[10px]">Кожа головы:</div>
                <div className="text-white mt-0.5">Профилактическое мытье + Паста Сульсена 2%</div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500">3D-ПИЛАТЕС (ТАЗ / КОР)</span>
            <button
              onClick={() => setTrainingDone(!trainingDone)}
              className={`text-xs px-3 py-1.5 font-bold border transition-all ${
                trainingDone
                  ? "bg-emerald-500 text-black border-emerald-500"
                  : "bg-transparent text-white border-zinc-700 hover:border-zinc-500"
              }`}
            >
              {trainingDone ? "✓ ВЫПОЛНЕНО" : "ОТМЕТИТЬ ТРЕНИРОВКУ"}
            </button>
          </div>
        </section>

        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-sky-400">02 // WORK (NGO & Operations)</h2>
              <span className="text-[10px] bg-sky-950 text-sky-400 px-2 py-0.5 border border-sky-800">ПАРСЕР: АКТИВЕН</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="text-zinc-400 text-[10px] uppercase">Текущие Keywords для ИИ-поиска:</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 text-[10px]">Project Coordinator</span>
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 text-[10px]">NGO Operations</span>
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 text-[10px]">Community Manager</span>
              </div>
              <div className="mt-4 p-3 bg-zinc-900 border border-zinc-800 rounded-sm">
                <div className="text-amber-400 font-bold text-[10px] uppercase mb-1">🔥 Свежий Мэтч от ИИ:</div>
                <div className="text-white font-bold">Program Assistant (Remote)</div>
                <div className="text-zinc-400 text-[10px] mt-0.5">International Development Foundation — Свободный англ.</div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">КОНВЕРСИЯ ОТКЛИКОВ НЕДЕЛИ</span>
            <span className="text-white font-bold">12 / 25 ВАКАНСИЙ</span>
          </div>
        </section>

        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-purple-400">03 // STUDY (Academic & AI)</h2>
              <span className="text-[10px] bg-purple-950 text-purple-400 px-2 py-0.5 border border-purple-800">СПРИНТ 01</span>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 uppercase mb-1">
                  <span>TOEFL Preparation (Writing / Speaking)</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1 border border-zinc-800">
                  <div className="bg-purple-500 h-full w-[75%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 uppercase mb-1">
                  <span>AI Промптинг (Few-Shot / Chain-of-Thought)</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1 border border-zinc-800">
                  <div className="bg-purple-500 h-full w-[40%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">ВЕКТОР МАГИСТРАТУРЫ</span>
            <span className="text-white font-bold">International Relations (Стамбул)</span>
          </div>
        </section>

        <section className="border border-zinc-800 bg-[#12161A] p-6 hover:border-zinc-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold tracking-widest uppercase text-amber-400">04 // ART & MEDIA SPACE</h2>
              <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 border border-amber-800">МУЗА: ОНЛАЙН</span>
            </div>
            <div className="space-y-4 text-xs">
              <div className="border-l-2 border-amber-500/40 pl-3">
                <div className="text-zinc-400 uppercase text-[10px]">Ableton Live / Музыкальный продакшн:</div>
                <div className="text-white mt-0.5">Синтез звука и сведение (Techno/House/Breakbeat)</div>
              </div>
              <div className="border-l-2 border-amber-500/40 pl-3">
                <div className="text-zinc-400 uppercase text-[10px]">Визуальная концепция:</div>
                <div className="text-white mt-0.5">Швейцарский минимализм & Чистая геометрия (NOMENA)</div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">МЕДИАПРОДВИЖЕНИЕ</span>
            <span className="text-white font-bold">Публикация экспертных срезов</span>
          </div>
        </section>
      </main>

      <section className="max-w-7xl mx-auto border border-zinc-800 bg-[#12161A] p-6 mb-12">
        <h2 className="text-sm font-bold tracking-widest uppercase text-white mb-2">// INTERACTIVE MODULE: BRAIN DUMP</h2>
        <p className="text-[11px] text-zinc-500 mb-4">Надиктуй или напиши итоги дня в свободной форме. ИИ-контур автоматически раскидает данные по категориям дашборда.</p>
        <form onSubmit={handleBrainDumpSubmit} className="space-y-3">
          <textarea
            value={brainDumpText}
            onChange={(e) => setBrainDumpText(e.target.value)}
            placeholder="Пиши хаотично, тезисно, как в блокнот... (Например: Сделала 3D-тренировку, нанесла ретинол, повторила лексику к TOEFL)"
            className="w-full bg-[#0D0F12] border border-zinc-800 p-4 text-xs focus:border-zinc-600 focus:outline-none h-24 text-white placeholder-zinc-700 resize-none font-mono"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-white text-black text-xs px-5 py-2 font-bold hover:bg-zinc-200 transition-all uppercase tracking-wider"
            >
              ОБРАБОТАТЬ ПОТОК ИИ
            </button>
          </div>
        </form>
      </section>

      <section className="max-w-7xl mx-auto border border-zinc-800 bg-[#12161A] p-6">
        <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-4">// HISTORY LOG</h2>
        <div className="space-y-4">
          {reviews.map((log) => (
            <div key={log.id} className="text-xs border-b border-zinc-900 pb-3 last:border-0 last:pb-0">
              <div className="text-[10px] text-zinc-500 font-bold mb-1">{log.date}</div>
              <div className="text-zinc-300 leading-relaxed">{log.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
