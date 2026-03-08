import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const jobDescription = watch("jobDescription") || "";

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Create Your Custom{" "}
            <span className="text-pink-500">Interview Plan</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        {/* CARD */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#111827] border border-gray-700 rounded-2xl p-8 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">
                  Target Job Description
                </h2>

                <span className="text-xs bg-pink-600/20 text-pink-500 px-2 py-1 rounded">
                  REQUIRED
                </span>
              </div>

              <textarea
                {...register("jobDescription", {
                  required: "Job description required",
                })}
                placeholder="Paste the full job description here..."
                className="w-full h-72 resize-none bg-[#0b1220] border border-gray-700 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-pink-500"
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

            {/* RIGHT COLUMN */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Your Profile</h2>
              </div>

              {/* RESUME UPLOAD */}
              <label className="block mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Upload Resume</span>

                  <span className="text-xs bg-pink-600/20 text-pink-500 px-2 py-1 rounded">
                    BEST RESULTS
                  </span>
                </div>

                <div className="border border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-pink-500 transition cursor-pointer bg-[#0b1220]">
                  <p className="text-gray-400">
                    Click to upload or drag & drop
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    PDF Max 3MB
                  </p>

                  <input
                    type="file"
                    hidden
                    {...register("resume")}
                    {...register("resume", {
                      validate: (files) => {
                        if (!files || files.length === 0) return true;
                        return (
                          files[0].type === "application/pdf" ||
                          "Only PDF files allowed"
                        );
                      },
                    })}
                  />
                </div>
              </label>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-xs text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              {/* SELF DESCRIPTION */}
              <div>
                <label className="text-sm font-medium">
                  Quick Self-Description
                </label>

                <textarea
                  {...register("selfDescription")}
                  placeholder="Briefly describe your experience, key skills, and years of experience..."
                  className="w-full mt-2 h-28 bg-[#0b1220] border border-gray-700 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* INFO BOX */}
              <div className="bg-blue-900/30 border border-blue-700 text-blue-300 text-sm p-3 rounded-lg mt-4">
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between mt-8">
            <span className="text-xs text-gray-500">
              AI-Powered Strategy Generation · Approx 30s
            </span>

            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition px-6 py-3 rounded-lg font-semibold"
            >
              ✦ Generate My Interview Strategy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
