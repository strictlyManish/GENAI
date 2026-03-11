import { useForm } from "react-hook-form";
import { useInterview } from "../hook/userinterview"; 
import { useNavigate } from "react-router";
import { useRef, useEffect } from "react";

export default function Home() {
  const { loading, generateReport, reports, getAllReports } = useInterview();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (getAllReports) {
      getAllReports();
    }
  }, []);

  const jobDescription = watch("jobDescription") || "";
  const resumeFile = watch("resume");

  const onSubmit = async (data) => {
    if (!data.resume?.length && !data.selfDescription) {
      setError("selfDescription", {
        type: "manual",
        message: "Either Resume or Self Description is required",
      });
      return;
    }

    try {
      const res = await generateReport({
        resume: data.resume?.[0] || null,
        selfDescription: data.selfDescription || "",
        jobDescription: data.jobDescription || "",
      });

      if (res?._id) {
        navigate(`/interview/${res._id}`);
      }
    } catch (error) {
      console.error("Failed to generate report", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-semibold mb-4 text-indigo-400">
            Generating Your Interview Strategy...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex justify-center pt-24 pb-12 px-4 md:px-8">
      <div className="w-full max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* JOB DESCRIPTION */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">Target Job Description</h2>
                <span className="text-[10px] md:text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">
                  REQUIRED
                </span>
              </div>

              <textarea
                {...register("jobDescription", {
                  required: "Job description required",
                  maxLength: {
                    value: 5000,
                    message: "Max 5000 characters allowed",
                  },
                })}
                placeholder="Paste the full job description here..."
                className="w-full h-64 md:h-72 resize-none bg-[#0b1220] border border-gray-700 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              {errors.jobDescription && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.jobDescription.message}
                </p>
              )}

              <div className="text-xs text-gray-500 text-right mt-1">
                {jobDescription.length}/5000 chars
              </div>
            </div>

            {/* PROFILE */}
            <div className="flex flex-col">
              <h2 className="font-semibold text-lg mb-4">Your Profile</h2>

              {/* RESUME UPLOAD */}
              <label className="block mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Upload Resume</span>
                  <span className="text-[10px] md:text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">
                    BEST RESULTS
                  </span>
                </div>

                <div
                  onClick={() => fileInputRef.current.click()}
                  className="border border-dashed border-gray-600 rounded-lg p-6 md:p-8 text-center hover:border-indigo-500 transition cursor-pointer bg-[#0b1220]"
                >
                  {resumeFile?.length ? (
                    <p className="text-green-400 font-medium break-all">
                      {resumeFile[0].name}
                    </p>
                  ) : (
                    <>
                      <p className="text-gray-400 text-sm md:text-base">Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-500 mt-1">PDF Max 3MB</p>
                    </>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    {...register("resume", {
                      validate: (files) => {
                        if (!files || files.length === 0) return true;
                        const file = files[0];
                        if (file.type !== "application/pdf") return "Only PDF files allowed";
                        if (file.size > 3 * 1024 * 1024) return "File must be less than 3MB";
                        clearErrors("selfDescription");
                        return true;
                      },
                    })}
                  />
                </div>

                {errors.resume && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.resume.message}
                  </p>
                )}
              </label>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-xs text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              {/* SELF DESCRIPTION */}
              <div className="mb-4">
                <label className="text-sm font-medium">Quick Self-Description</label>
                <textarea
                  {...register("selfDescription", {
                    onChange: () => clearErrors("selfDescription"),
                  })}
                  placeholder="Briefly describe your experience, key skills, and years of experience..."
                  className="w-full mt-2 h-28 bg-[#0b1220] border border-gray-700 rounded-lg p-4 text-gray-300 resize-none focus:outline-none focus:border-indigo-500 transition-colors"
                />

                {errors.selfDescription && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.selfDescription.message}
                  </p>
                )}
              </div>

              {/* INFO */}
              <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs md:text-sm p-3 rounded-lg">
                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4 md:gap-0 pb-12">
            <span className="text-xs text-pink-500 font-medium text-center md:text-left">
              AI-Powered Strategy Generation · Approx 30s
            </span>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-gray-100 text-[#1a1919] cursor-pointer hover:bg-white transition px-8 py-2.5 rounded-full font-bold disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </form>

        {/* PREVIOUS REPORTS */}
        {reports && reports.length > 0 && (
          <div className="border-t border-gray-800 pt-10 pb-10">
            <h2 className="text-xl font-semibold mb-6">Your Previous Reports</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <div
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="cursor-pointer p-5 bg-[#0b1220] border border-gray-700 rounded-xl hover:border-indigo-500 transition group flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="font-medium group-hover:text-indigo-400 transition-colors truncate">
                        {report.title || "Job Analysis Report"}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <svg className="w-5 h-5 flex-shrink-0 text-gray-600 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                     <span className="text-pink-400 font-bold text-lg">{report.matchScore}</span>
                     <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Match Score</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}