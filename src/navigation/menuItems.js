
let date = new Date();
let fullYear = date.getFullYear(); // Get the current full year



export const menuItems = [
  { name: "ट्रेंडिंग", path: "/topic/trending" },
  { name: "देश", path: "/topic/country" },
  { name: "दुनिया", path: "/topic/world" },
  {
    name: "उत्तर प्रदेश",
    path: "/topic/uttar-pradesh",
    icon: true,
    subItems: [
      { name: "लखनऊ", path: "/topic/uttar-pradesh/lucknow" },
      { name: "कानपुर", path: "/topic/uttar-pradesh/kanpur" },
      { name: "वाराणसी", path: "/topic/uttar-pradesh/varanasi" },
      { name: "आगरा", path: "/topic/uttar-pradesh/agra" },
      { name: "मेरठ", path: "/topic/uttar-pradesh/meerut" },
      { name: "गोरखपुर", path: "/topic/uttar-pradesh/gorakhpur" },
      { name: "झांसी", path: "/topic/uttar-pradesh/jhansi" },
      { name: "सहारनपुर", path: "/topic/uttar-pradesh/saharanpur" },
      { name: "अलीगढ़", path: "/topic/uttar-pradesh/aligarh" },
      { name: "मुरादाबाद", path: "/topic/uttar-pradesh/moradabad" },
      { name: "नोएडा", path: "/topic/uttar-pradesh/noida" },
      { name: "फिरोजाबाद", path: "/topic/uttar-pradesh/firozabad" },
      { name: "बदायूं", path: "/topic/uttar-pradesh/budaun" },
      { name: "रामपुर", path: "/topic/uttar-pradesh/rampur" },
      { name: "शाहजहांपुर", path: "/topic/uttar-pradesh/shahjahanpur" },

      { name: "अयोध्या", path: "/topic/uttar-pradesh/ayodhya" },
      { name: "हापुड़", path: "/topic/uttar-pradesh/hapur" },
      { name: "इटावा", path: "/topic/uttar-pradesh/etawah" },
      { name: "बुलंदशहर", path: "/topic/uttar-pradesh/bulandshahr" },
      { name: "संभल", path: "/topic/uttar-pradesh/sambhal" },
      { name: "अमरोहा", path: "/topic/uttar-pradesh/amroha" },
      { name: "हरदोई", path: "/topic/uttar-pradesh/hardoi" },
    ],
  },
  {
    name: "मध्य प्रदेश",
    path: "/topic/madhya-pradesh",
    icon: true,

    subItems: [
      { name: "भोपाल", path: "/topic/madhya-pradesh/bhopal" },
      { name: "इंदौर", path: "/topic/madhya-pradesh/indore" },
      { name: "ग्वालियर", path: "/topic/madhya-pradesh/gwalior" },
      { name: "जबलपुर", path: "/topic/madhya-pradesh/jabalpur" },
      { name: "उज्जैन", path: "/topic/madhya-pradesh/ujjain" },
      { name: "सागर", path: "/topic/madhya-pradesh/sagar" },
      { name: "रतलाम", path: "/topic/madhya-pradesh/ratlam" },
      { name: "रीवा", path: "/topic/madhya-pradesh/rewa" },
      { name: "छिंदवाड़ा", path: "/topic/madhya-pradesh/chhindwara" },
      { name: "खजुराहो", path: "/topic/madhya-pradesh/khajuraho" },
      { name: "देवास", path: "/topic/madhya-pradesh/dewas" },
      { name: "सतना", path: "/topic/madhya-pradesh/satna" },
      { name: "मुरवारा (कटनी)", path: "/topic/madhya-pradesh/katni" },
      { name: "सिंगरौली", path: "/topic/madhya-pradesh/singrauli" },
      { name: "शाजापुर", path: "/topic/madhya-pradesh/shajapur" },
      { name: "खंडवा", path: "/topic/madhya-pradesh/khandwa" },
      { name: "भिंड", path: "/topic/madhya-pradesh/bhind" },
      { name: "गुना", path: "/topic/madhya-pradesh/guna" },
      { name: "शिवपुरी", path: "/topic/madhya-pradesh/shivpuri" },
      { name: "विदिशा", path: "/topic/madhya-pradesh/vidisha" },
      { name: "छतरपुर", path: "/topic/madhya-pradesh/chhatarpur" },
      { name: "दमोह", path: "/topic/madhya-pradesh/damoh" },
      { name: "मंदसौर", path: "/topic/madhya-pradesh/mandsaur" },
      { name: "खरगोन", path: "/topic/madhya-pradesh/khargone" },
      { name: "नीमच", path: "/topic/madhya-pradesh/neemuch" },
      { name: "पीथमपुर", path: "/topic/madhya-pradesh/pithampur" },
      { name: "होशंगाबाद", path: "/topic/madhya-pradesh/hoshangabad" },
      { name: "इटारसी", path: "/topic/madhya-pradesh/itarsi" },
      { name: "सीहोर", path: "/topic/madhya-pradesh/sehore" },
      { name: "बैतूल", path: "/topic/madhya-pradesh/betul" },
      { name: "सिवनी", path: "/topic/madhya-pradesh/seoni" },
      { name: "दतिया", path: "/topic/madhya-pradesh/datia" },
    ],
  },

  {
    name: "राज्य",
    path: "/topic/state",
    icon: true,

    subItems: [
      { name: "आंध्र प्रदेश", path: "/topic/state/andhra-pradesh" },
      { name: "अरुणाचल प्रदेश", path: "/topic/state/arunachal-pradesh" },
      { name: "असम", path: "/topic/state/assam" },
      { name: "बिहार", path: "/topic/state/bihar" },
      { name: "छत्तीसगढ़", path: "/topic/state/chhattisgarh" },
      { name: "गोवा", path: "/topic/state/goa" },
      { name: "गुजरात", path: "/topic/state/gujarat" },
      { name: "हरियाणा", path: "/topic/state/haryana" },
      { name: "हिमाचल प्रदेश", path: "/topic/state/himachal-pradesh" },
      { name: "झारखंड", path: "/topic/state/jharkhand" },
      { name: "कर्नाटक", path: "/topic/state/karnataka" },
      { name: "केरल", path: "/topic/state/kerala" },
      { name: "मध्य प्रदेश", path: "/topic/state/madhya-pradesh" },
      { name: "महाराष्ट्र", path: "/topic/state/maharashtra" },
      { name: "मणिपुर", path: "/topic/state/manipur" },
      { name: "मेघालय", path: "/topic/state/meghalaya" },
      { name: "मिजोरम", path: "/topic/state/mizoram" },
      { name: "नागालैंड", path: "/topic/state/nagaland" },
      { name: "ओडिशा", path: "/topic/state/odisha" },
      { name: "पंजाब", path: "/topic/state/punjab" },
      { name: "राजस्थान", path: "/topic/state/rajasthan" },
      { name: "सिक्किम", path: "/topic/state/sikkim" },
      { name: "तमिलनाडु", path: "/topic/state/tamil-nadu" },
      { name: "तेलंगाना", path: "/topic/state/telangana" },
      { name: "उत्तर प्रदेश", path: "/topic/state/uttar-pradesh" },
      { name: "उत्तराखंड", path: "/topic/state/uttarakhand" },
      { name: "पश्चिम बंगाल", path: "/topic/state/west-bengal" },

      { name: "दिल्ली", path: "/topic/state/delhi" },

    ],
  },
  {
    name: "हेल्थ",
    path: "/topic/health",
    icon: true,

    subItems: [
      { name: "फिटनेस", path: "/topic/health/fitness" },
      { name: "डाइट", path: "/topic/health/diet" },
      { name: "मेडिकल टिप्स", path: "/topic/health/medical-tips" },
      { name: "मानसिक स्वास्थ्य", path: "/topic/health/mental-health" },
      { name: "योग", path: "/topic/health/yoga" },
      { name: "वजन कम करना", path: "/topic/health/weight-loss" },
      { name: "स्वस्थ त्वचा", path: "/topic/health/healthy-skin" },
      { name: "आयुर्वेद", path: "/topic/health/ayurveda" },
      { name: "प्राकृतिक चिकित्सा", path: "/topic/health/natural-healing" },
      { name: "बच्चों का स्वास्थ्य", path: "/topic/health/child-health" },
      {
        name: "पुराने रोगों का इलाज",
        path: "/topic/health/chronic-diseases-treatment",
      },
      { name: "स्वास्थ्य देखभाल", path: "/topic/health/healthcare" },
      { name: "स्वस्थ आहार", path: "/topic/health/healthy-eating" },
      { name: "दवाइयां", path: "/topic/health/medicines" },
      { name: "प्राकृतिक आहार", path: "/topic/health/natural-diet" },
      { name: "हाइड्रेशन", path: "/topic/health/hydration" },
      { name: "स्ट्रेस मैनेजमेंट", path: "/topic/health/stress-management" },
    ],
  },
  { name: "खेल", path: "/topic/sports" },
  { name: "बिजनेस", path: "/topic/business" },
  { name: "मनोरंजन", path: "/topic/entertainment" },
  {
    name: "विविध",
    path: "/topic/misc",
    icon: true,

    subItems: [
      { name: "अपराध", path: "/topic/misc/crime" },
      { name: "हेल्थ", path: "/topic/misc/health" },
      { name: "टेक्नोलॉजी", path: "/topic/misc/technology" },
      { name: "राजनीति", path: "/topic/misc/politics" },
      { name: "मनोरंजन", path: "/topic/misc/entertainment" },
      { name: "खेल", path: "/topic/misc/sports" },
      { name: "सांस्कृतिक", path: "/topic/misc/culture" },
      { name: "समाज सेवा", path: "/topic/misc/social-service" },
      { name: "आध्यात्मिक", path: "/topic/misc/spiritual" },
      { name: "विज्ञान", path: "/topic/misc/science" },
      { name: "समाचार", path: "/topic/misc/news" },
      { name: "यात्रा", path: "/topic/misc/travel" },
    ],
  },
  // { name: "वीडियो", path: "/videos" },
  { name: `महाभारत ${fullYear}`, path: `/topic/mahabharat${fullYear}` },
  {
    name: "search", path: "/search",
    icon: true,
  },
];



export const transformMenuData = (backendData) => {
  const menuMap = {};

  backendData.forEach((item) => {
    if (!item.parent) {
      // Parent item (main menu)
      menuMap[item.name] = {
        name: item.name,
        path: item.path,
        icon: true,
        subItems: []
      };
    }
  });

  backendData.forEach((item) => {
    if (item.parent && menuMap[item.parent]) {
      // Submenu
      menuMap[item.parent].subItems.push({
        name: item.name,
        path: item.path
      });
    }
  });

  return Object.values(menuMap); // convert from object to array
};
