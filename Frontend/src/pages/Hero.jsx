const Hero = () => {
  return (
    <>
      <section className='bg-black h-screen bg-[url("https://assets.prebuiltui.com/images/components/hero-section/hero-net-image.png")] bg-no-repeat bg-bottom bg-size-[100%_auto] px-4 pt-5 md:pb-32'>
        <div className="flex items-center gap-2 border border-white/15 rounded-full pl-2 pr-3 py-1 text-sm w-fit mt-32 mx-auto">
          <span className="flex items-center gap-1 text-violet-200 text-xs sm:text-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4m7-3a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1m-2 10a.75.75 0 0 1 .728.568.97.97 0 0 0 .704.704.75.75 0 0 1 0 1.456.97.97 0 0 0-.704.704.75.75 0 0 1-1.456 0 .97.97 0 0 0-.704-.704.75.75 0 0 1 0-1.456.97.97 0 0 0 .704-.704A.75.75 0 0 1 10 11"
                fill="#7F22FE"
              />
            </svg>
            Create your resume instantly ai
          </span>
        </div>

        <h1 className="text-4xl md:text-[58px]/19 text-center max-w-4xl mx-auto mt-4 text-white bg-clip-text leading-tight font-medium">
          Create Your First Professional Resume
        </h1>
        <p className="text-base mx-auto text-gray-400 text-center mt-4">
          Perfect for students and job seekers. Build a polished resume quickly
          and download it instantly.
        </p>

        <div className="flex gap-3 mt-5 justify-center">
          <a
            href="/login"
            className="bg-violet-600 hover:bg-violet-700 text-slate-100 text-xs md:text-sm px-6 py-3 rounded-full transition cursor-pointer"
          >
            Get Start
          </a>
          <a
            href="/login"
            className="bg-white/10 hover:bg-white/20 border border-violet-900 text-gray-50 text-xs md:text-sm px-5 py-3 rounded-full transition cursor-pointer"
          >
            Crete resume
          </a>
        </div>

        {/* Avatars + Stars */}
        <div className="flex items-center mt-10 justify-center">
          <div className="flex -space-x-3 pr-3">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
              alt="user3"
              className="size-9.5 object-cover rounded-full border-2 border-slate-50 hover:-translate-y-0.5 transition z-[1]"
            />
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="user1"
              className="size-9.5 object-cover rounded-full border-2 border-slate-50 hover:-translate-y-0.5 transition z-2"
            />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="user2"
              className="size-9.5 object-cover rounded-full border-2 border-slate-50 hover:-translate-y-0.5 transition z-[3]"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
              alt="user3"
              className="size-9.5 object-cover rounded-full border-2 border-slate-50 hover:-translate-y-0.5 transition z-[4]"
            />
          </div>

          <div>
            <div className="flex ">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star text-transparent fill-[#615FFF]"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                ))}
            </div>
            <p className="text-xs text-white/60">Used by 10,000+ users</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
