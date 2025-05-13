export default function AddRightHome1() {
  return (
    <div className="relative md:max-w-sm w-[320px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-red-100 via-blue-50 to-purple-100 border-2 border-white hover:shadow-3xl transition-all duration-500 group">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-red-400 rounded-full filter blur-xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full filter blur-xl opacity-20"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-6 text-center">
        {/* Header with animated underline */}
        <div className="mb-5">
          <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 inline-block">
            लाखों रीडर्स/व्यूअर्स तक
            <span className="block h-1 mt-1 bg-gradient-to-r from-red-400 to-purple-400 w-3/4 mx-auto scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </h3>
          <p className="text-gray-600 mt-2 font-medium text-sm">
            पहुंचाएं अपना विज्ञापन न्यूनतम दर में
          </p>
        </div>
        
        {/* Features in cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/90 p-2 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 mx-auto mb-1 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-xs font-bold text-red-600">चुनावी विज्ञापन</span>
          </div>
          
          <div className="bg-white/90 p-2 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 mx-auto mb-1 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <span className="text-xs font-bold text-blue-600">व्यवसाय</span>
          </div>
          
          <div className="bg-white/90 p-2 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 mx-auto mb-1 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
              </svg>
            </div>
            <span className="text-xs font-bold text-purple-600">प्रतिष्ठान</span>
          </div>
          
          <div className="bg-white/90 p-2 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 mx-auto mb-1 bg-pink-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <span className="text-xs font-bold text-pink-600">शैक्षिणिक संस्थान</span>
          </div>
        </div>
        
        {/* CTA Button with pulse animation */}
        <button className="relative w-full py-3 px-6 mb-4 font-extrabold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
          <span className="relative z-10">आज ही संपर्क करें</span>
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          <span className="absolute animate-pulse-slow top-0 left-0 w-2 h-full bg-white/30 -translate-x-10 group-hover:translate-x-[400px] transition-transform duration-1000"></span>
        </button>
        
        {/* Contact info with floating effect */}
        <div className="flex items-center justify-center mb-2 animate-float">
          <div className="bg-white/90 px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center">
            <span className="text-lg font-bold text-gray-800">+91 XXXX-XX-XXXX</span>
            <a href="#" className="ml-2 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors shadow-inner">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
        
        {/* Footer note */}
        <p className="mt-4 text-xs text-gray-500 border-t border-gray-200 pt-3">
          विज्ञापन के लिए संपर्क करें और न्यूज़ वेबसाइट पर प्रकाशित कराएं।
        </p>
      </div>
    </div>
  );
}