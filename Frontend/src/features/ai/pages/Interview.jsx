import React, { useState } from "react";

const reportData = {
  matchScore: 88,

  skillGaps: [
    { text: "Message Queues (Kafka/RabbitMQ)", color: "red" },
    { text: "Advanced Docker & CI/CD", color: "yellow" },
    { text: "Distributed Systems Design", color: "yellow" },
    { text: "Production Redis Management", color: "green" },
  ],

  sections: {
    technical: {
      title: "Technical Questions",
      questions: [
        {
          id: 1,
          title:
            "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
          intention:
            "Assess understanding of Node.js internal architecture.",
          answer:
            "Node.js event loop processes async callbacks through phases like timers, poll, check and close callbacks.",
        },
        {
          id: 2,
          title:
            "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
        },
      ],
    },

    behavioral: {
      title: "Behavioral Questions",
      questions: [
        { id: 1, title: "Tell me about a difficult problem you solved." },
        { id: 2, title: "Describe working under pressure." },
      ],
    },

    roadmap: {
      title: "Learning Road Map",
      items: [
        "Learn advanced Docker & CI/CD",
        "Understand distributed systems",
        "Deep dive into message queues",
        "Improve Redis production management",
      ],
    },
  },
};

export default function Report() {
  const [section, setSection] = useState("technical");
  const [open, setOpen] = useState(null);

  const current = reportData.sections[section];

  return (
    <div className="min-h-screen pt-15 bg-slate-950 text-gray-200 flex flex-col lg:flex-row">

      {/* SIDEBAR */}
      <div className="w-full lg:w-64 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-700 p-5">

        <h2 className="text-xs text-gray-400 mb-4 tracking-widest">
          SECTIONS
        </h2>

        <div className="flex lg:flex-col gap-2 overflow-x-auto">

          <SidebarItem
            active={section === "technical"}
            onClick={() => setSection("technical")}
          >
            Technical
          </SidebarItem>

          <SidebarItem
            active={section === "behavioral"}
            onClick={() => setSection("behavioral")}
          >
            Behavioral
          </SidebarItem>

          <SidebarItem
            active={section === "roadmap"}
            onClick={() => setSection("roadmap")}
          >
            Road Map
          </SidebarItem>

        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">
            {current.title}
          </h1>

          {current.questions && (
            <span className="bg-slate-800 px-3 py-1 rounded-full text-xs md:text-sm">
              {current.questions.length} questions
            </span>
          )}
        </div>

        {/* QUESTIONS */}
        {current.questions && (
          <div className="space-y-4">

            {current.questions.map((q) => (
              <div
                key={q.id}
                className="bg-slate-800 border border-slate-700 rounded-lg"
              >
                <div
                  onClick={() => setOpen(open === q.id ? null : q.id)}
                  className="p-4 md:p-5 flex justify-between cursor-pointer gap-4"
                >
                  <div className="flex gap-3 md:gap-4">
                    <span className="text-pink-400 font-bold">
                      Q{q.id}
                    </span>

                    <p className="text-sm md:text-base">
                      {q.title}
                    </p>
                  </div>

                  <span>{open === q.id ? "▲" : "▼"}</span>
                </div>

                {open === q.id && q.answer && (
                  <div className="px-5 pb-5 text-sm space-y-3">

                    {q.intention && (
                      <div>
                        <span className="text-purple-400 font-semibold">
                          INTENTION
                        </span>
                        <p>{q.intention}</p>
                      </div>
                    )}

                    <div>
                      <span className="text-green-400 font-semibold">
                        MODEL ANSWER
                      </span>
                      <p>{q.answer}</p>
                    </div>

                  </div>
                )}
              </div>
            ))}

          </div>
        )}

        {/* ROADMAP */}
        {current.items && (
          <div className="grid gap-4 sm:grid-cols-2">

            {current.items.map((item, i) => (
              <div
                key={i}
                className="bg-slate-800 border border-slate-700 p-4 rounded"
              >
                {item}
              </div>
            ))}

          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-700 p-6 md:p-8">

        {/* MATCH SCORE */}
        <div className="text-center mb-10">

          <h3 className="text-sm text-gray-400 mb-6">
            MATCH SCORE
          </h3>

          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-green-500 flex items-center justify-center text-2xl md:text-3xl font-bold mx-auto">
            {reportData.matchScore}
          </div>

          <p className="text-green-400 mt-3 text-sm md:text-base">
            Strong match for this role
          </p>
        </div>

        {/* SKILL GAPS */}
        <div>

          <h3 className="text-sm text-gray-400 mb-4">
            SKILL GAPS
          </h3>

          <div className="space-y-3">

            {reportData.skillGaps.map((skill, i) => (
              <SkillTag key={i} color={skill.color}>
                {skill.text}
              </SkillTag>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({ children, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 rounded cursor-pointer whitespace-nowrap ${
        active
          ? "bg-pink-600/20 text-pink-400"
          : "hover:bg-slate-800"
      }`}
    >
      {children}
    </div>
  );
}

function SkillTag({ children, color }) {
  const colors = {
    red: "bg-red-500/20 text-red-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    green: "bg-green-500/20 text-green-400",
  };

  return (
    <div className={`px-4 py-2 rounded text-sm ${colors[color]}`}>
      {children}
    </div>
  );
}