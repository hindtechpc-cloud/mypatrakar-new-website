const IPhoneFrame = ({ children }) => {
  return (
    <div className="relative flex letf-10 items-center justify-center xl:w-[295px] mx-auto lg:w-[295px]  h-[590px] bg-white rounded-[45px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)] border-[8px] border-zinc-900 ml-1">
      {/* Dynamic Island */}

      <div className="absolute -inset-[1px] border-[3px] border-zinc-700 border-opacity-40 rounded-[20px] pointer-events-none"></div>

      {/* Screen Content Area */}
      <div className="relative w-full h-full  ">
        <div className="mt-1  ">
          {children ? (
            children
          ) : (
            <>
              <svg className="text-black h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-12 bg-zinc-600 blur-[60px]"></div>
            </>
          )}
        </div>
      </div>

      {/* Left Side Buttons */}
      <div className="absolute left-[-10px] top-20 w-[3px] h-8 bg-zinc-900 rounded-l shadow-md"></div>
      <div className="absolute left-[-10px] top-36 w-[3px] h-12 bg-zinc-900 rounded-l shadow-md"></div>
      <div className="absolute left-[-10px] top-52 w-[3px] h-12 bg-zinc-900 rounded-l shadow-md"></div>
      
      {/* Right Side Button (Power) */}
      <div className="absolute right-[-10px] top-36 w-[3px] h-16 bg-zinc-900 rounded-r shadow-md"></div>
    </div>
  );
};

export default IPhoneFrame;