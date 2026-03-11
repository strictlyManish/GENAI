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
        className="w-5 h-5 flex-shrink-0"
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
        className="w-5 h-5 flex-shrink-0"
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
        className="w-5 h-5 flex-shrink-0"
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
      className={`group border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${
        open
          ? "bg-slate-900/50 ring-1 ring-indigo-500/30"
          : "bg-slate-900/30 hover:bg-slate-800/50"
      }`}
    >
      <div
        className="p-3 sm:p-4 md:p-5 flex items-start gap-3 sm:gap-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs sm:text-sm border border-indigo-500/20">
          {index + 1}
        </span>
        <p className="flex-1 text-slate-200 font-medium leading-relaxed pt-0.5 sm:pt-1 text-sm sm:text-base">
          {item.question}
        </p>
        <span
          className={`mt-1 transition-transform duration-300 flex-shrink-0 ${
            open ? "rotate-180 text-indigo-400" : "text-slate-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="w-4 h-4 sm:w-5 sm:h-5"
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
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 ml-10 sm:ml-12 md:ml-12 space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400/80">
              Intention
            </span>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {item.intention}
            </p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">
              Model Answer
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 group">
    {/* Timeline Line */}
    <div className="absolute left-[9px] sm:left-[11px] top-2 bottom-0 w-0.5 bg-slate-800 group-last:bg-transparent" />
    {/* Timeline Dot */}
    <div className="absolute left-0 sm:left-0 top-1 sm:top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950 border-2 border-indigo-500 z-10 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.3)]" />

    <div className="bg-slate-900/40 border border-slate-800 p-4 sm:p-5 rounded-xl hover:border-slate-700 transition-colors">
      <div className="flex items-center gap-3 mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs font-bold text-indigo-400 uppercase tracking-tighter">
          Day {day.day}
        </span>
        <h3 className="text-base sm:text-lg font-semibold text-slate-100">
          {day.focus}
        </h3>
      </div>
      <ul className="space-y-2">
        {day.tasks.map((task, i) => (
          <li
            key={i}
            className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400"
          >
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
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <h1 className="text-lg sm:text-xl font-medium text-slate-200 animate-pulse">
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
    <div className="min-h-screen pt-4 sm:pt-10 lg:pt-18 bg-[#0f0e0e] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[250px_1fr_280px] xl:grid-cols-[280px_1fr_320px] min-h-screen">
        
        {/* ── Left Nav ── */}
        <nav className="backdrop-blur-xl p-4 sm:p-6 lg:p-6 flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto z-10 border-b border-slate-800/50 lg:border-none mb-6 lg:mb-0">
          <div className="space-y-4 lg:space-y-8 w-full">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-3 lg:mb-6 hidden sm:block">
                Preparation
              </p>
              
              {/* Responsive Nav Buttons - Horizontal scroll on mobile */}
              <div className="flex flex-row overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0 hide-scrollbar w-full">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex-shrink-0 lg:w-full flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full cursor-pointer text-xs sm:text-sm font-medium transition-all ${
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

              {/* Download Button */}
              <button
                onClick={() => {
                  getResumePdf(interviewId);
                }}
                className="bg-gray-800 p-2 mt-4 lg:mt-5 cursor-pointer text-white rounded-full flex items-center w-auto lg:w-12 hover:w-full lg:hover:w-52 overflow-hidden transition-all duration-300 ease-in-out group"
              >
                <svg
                  className="bg-pink-500 rounded-full p-2 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z" />
                  <path d="M9 4h6" />
                </svg>
                <span className="ml-3 sm:ml-4 whitespace-nowrap opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-sm pr-4 lg:pr-0">
                  Download resume
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* ── Center Content ── */}
        <main className="p-4 sm:p-6 lg:p-6">
          <header className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <h2 className="text-2xl sm:text-3xl tracking-tight text-white capitalize">
                {activeNav.replace("-", " ")}
              </h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              {activeNav === "roadmap"
                ? `Personalized ${report.preparationPlan.length}-day curriculum`
                : `Top ${
                    activeNav === "technical"
                      ? report.technicalQuestions.length
                      : report.behavioralQuestions.length
                  } questions for your role`}
            </p>
          </header>

          <div className="space-y-3 sm:space-y-4">
            {activeNav === "technical" &&
              report.technicalQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            {activeNav === "behavioral" &&
              report.behavioralQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            {activeNav === "roadmap" && (
              <div className="mt-6 sm:mt-8">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* ── Right Sidebar ── */}
        <aside className="border-t mt-8 lg:mt-0 lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/30 p-6 sm:p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="space-y-10 lg:space-y-12">
            {/* Match Score */}
            <div className="text-center space-y-4 sm:space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                Candidate Match
              </p>

              <div
                className={`relative w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full border-[5px] sm:border-[6px] flex flex-col items-center justify-center bg-slate-900/50 transition-all duration-500 ${scoreStyle.ring}`}
              >
                <span
                  className={`text-4xl sm:text-5xl font-black tracking-tighter ${scoreStyle.text}`}
                >
                  {report.matchScore}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">
                  Percent
                </span>
              </div>

              {/* DYNAMIC DESCRIPTION */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed px-2 sm:px-4">
                You are a{" "}
                <span className={`font-semibold ${scoreStyle.text}`}>
                  {matchStatus.label}
                </span>{" "}
                {matchStatus.desc}
              </p>
            </div>

            <div className="h-px bg-slate-800" />

            {/* Skill Gaps */}
            <div className="space-y-4 sm:space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                Improvement Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {report.skillGaps.map((gap, i) => (
                  <span
                    key={i}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border transition-colors ${
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

      {/* Optional: Add a CSS style snippet to hide standard scrollbar in the flex-row nav for an ultra-clean look on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Interview;