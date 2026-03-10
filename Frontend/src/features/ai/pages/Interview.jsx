import React, { useState, useEffect } from "react";
import { useInterview } from "../hook/userinterview";
import { useParams } from "react-router";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

const getMatchStatus = (score) => {
  if (score >= 80)
    return {
      label: "Strong Match",
      desc: "Your profile aligns exceptionally well with this role's requirements.",
    };
  if (score > 60)
    return {
      label: "Good Match",
      desc: "You have a solid foundation, though some preparation in key areas is advised.",
    };
  return {
    label: "Potential Match",
    desc: "There are significant skill gaps. Focus heavily on the suggested roadmap.",
  };
};


// ── Sub-components ────────────────────────────────────────────────────────────

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`group border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${open ? "bg-slate-900/50 ring-1 ring-indigo-500/30" : "bg-slate-900/30 hover:bg-slate-800/50"}`}
    >
      <div
        className="p-4 md:p-5 flex items-start gap-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/20">
          {index + 1}
        </span>
        <p className="flex-1 text-slate-200 font-medium leading-relaxed pt-1">
          {item.question}
        </p>
        <span
          className={`mt-1 transition-transform duration-300 ${open ? "rotate-180 text-indigo-400" : "text-slate-500"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {open && (
        <div className="px-5 pb-5 pt-0 ml-12 space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400/80">
              Intention
            </span>
            <p className="text-sm text-slate-400 leading-relaxed">
              {item.intention}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">
              Model Answer
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="relative pl-8 pb-8 group">
    {/* Timeline Line */}
    <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-slate-800 group-last:bg-transparent" />
    {/* Timeline Dot */}
    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-500 z-10 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.3)]" />

    <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-tighter">
          Day {day.day}
        </span>
        <h3 className="text-lg font-semibold text-slate-100">{day.focus}</h3>
      </div>
      <ul className="space-y-2">
        {day.tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/40 flex-shrink-0" />
            {task}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading } = useInterview();
  const { interviewId } = useParams();
  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <h1 className="text-xl font-medium text-slate-200 animate-pulse">
          Analyzing your interview profile...
        </h1>
      </main>
    );
  }
const matchStatus = getMatchStatus(report.matchScore);

  const getScoreStyles = (score) => {
    if (score >= 80)
      return {
        ring: "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
        text: "text-emerald-400",
      };
    if (score >= 60)
      return {
        ring: "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
        text: "text-amber-400",
      };
    return {
      ring: "border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
      text: "text-rose-400",
    };
  };

  const scoreStyle = getScoreStyles(report.matchScore);

  return (
    <div className="min-h-screen pt-18 bg-[#0f0e0e] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] min-h-screen">
        {/* ── Left Nav ── */}
        <nav className="backdrop-blur-xl p-6 flex flex-col justify-between sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-6">
                Preparation
              </p>
              <div className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer text-sm font-medium transition-all ${
                      activeNav === item.id
                        ? "bg-gray-600 text-white shadow-lg"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* ── Center Content ── */}
        <main className="md:p-10 lg:p-6">
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl  tracking-tight text-white capitalize">
                {activeNav.replace("-", " ")}
              </h2>
            </div>
            <p className="text-slate-400 text-sm">
              {activeNav === "roadmap"
                ? `Personalized ${report.preparationPlan.length}-day curriculum`
                : `Top ${activeNav === "technical" ? report.technicalQuestions.length : report.behavioralQuestions.length} questions for your role`}
            </p>
          </header>

          <div className="space-y-4">
            {activeNav === "technical" &&
              report.technicalQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            {activeNav === "behavioral" &&
              report.behavioralQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            {activeNav === "roadmap" && (
              <div className="mt-8">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* ── Right Sidebar ── */}
        <aside className="border-t mt-10 lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/30 p-8 sticky top-0 h-screen">
          <div className="space-y-12">
            {/* Match Score */}
            <div className="text-center space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                Candidate Match
              </p>

              <div
                className={`relative w-40 h-40 mx-auto rounded-full border-[6px] flex flex-col items-center justify-center bg-slate-900/50 transition-all duration-500 ${scoreStyle.ring}`}
              >
                <span
                  className={`text-5xl font-black tracking-tighter ${scoreStyle.text}`}
                >
                  {report.matchScore}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Percent
                </span>
              </div>

              {/* DYNAMIC DESCRIPTION */}
              <p className="text-sm text-slate-400 leading-relaxed px-4">
                You are a{" "}
                <span className={`font-semibold ${scoreStyle.text}`}>
                  {matchStatus.label}
                </span>{" "}
                {matchStatus.desc}
              </p>
            </div>

            <div className="h-px bg-slate-800" />

            {/* Skill Gaps */}
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                Improvement Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {report.skillGaps.map((gap, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                      gap.severity === "high"
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        : gap.severity === "mid"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                    }`}
                  >
                    {gap.skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
