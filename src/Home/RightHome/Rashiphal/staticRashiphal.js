const rashiNames = [
    "मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या",
    "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन",
  ];
  
  const rashifalMessages = [
    "आज का दिन शुभ रहेगा। नए अवसर मिलेंगे।",
    "व्यवसाय में लाभ के संकेत हैं।",
    "परिवार के साथ समय बितेगा।",
    "स्वास्थ्य का ध्यान रखें।",
    "यात्रा के योग बन रहे हैं।",
    "मन प्रसन्न रहेगा।",
    "संबंधों में मधुरता आएगी।",
    "नए काम की शुरुआत हो सकती है।",
    "किस्मत साथ देगी।",
    "पुराने मित्र से भेंट होगी।",
    "कार्यस्थल पर सराहना मिलेगी।",
    "ध्यान और योग लाभदायक होंगे।",
  ];
  
  function generateNewRashiphal() {
    return rashiNames.map((rashi) => {
      const randomIndex = Math.floor(Math.random() * rashifalMessages.length);
      return {
        rashi,
        rashifal: rashifalMessages[randomIndex],
      };
    });
  }
  
  function generateRandomRashiphal() {
    const savedData = localStorage.getItem("daily_rashiphal");
    const savedTimestamp = localStorage.getItem("rashiphal_timestamp");
    const now = Date.now();
  
    // If saved data exists and is less than 24 hours old, return it
    if (savedData && savedTimestamp) {
      const diff = now - parseInt(savedTimestamp, 10);
      const hoursPassed = diff / (1000 * 60 * 60);
  
      if (hoursPassed < 24) {
        return JSON.parse(savedData);
      }
    }
  
    // Else, generate new data
    const newData = generateNewRashiphal();
    localStorage.setItem("daily_rashiphal", JSON.stringify(newData));
    localStorage.setItem("rashiphal_timestamp", now.toString());
  
    return newData;
  }
  
  export default generateRandomRashiphal;
  