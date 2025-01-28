import React from "react";
import Menu from "../shared/MenuBar";
import TopNewsItems from "../TopNews/TopNewsItems";

export default function Entertainment() {
  const topNewsItems = [
    {
      title: "Top News",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      urlToImage: "https://picsum.photos/200/400",
    },
    {
      title: "Top News",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      urlToImage: "https://picsum.photos/200/400",
    },
    {
      title: "Top News",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      urlToImage: "https://picsum.photos/200/400",
    },
    {
      title: "Top News",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      urlToImage: "https://picsum.photos/200/400",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <Menu menuText={"मनोरंजन"} menu={[]} />

      <div className="md:flex flex-1  items-center gap-8">
        <div className="relative md:w-5/6 w-full h-96 rounded-lg overflow-hidden shadow-xl my">
          {/* Background Image */}
          <img
            src="https://picsum.photos/400/600"
            alt="Entertainment"
            className="w-full h-full object-cover"
          />

          {/* Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* Content Section */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center">
            <button className="bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:bg-red-800 transition-all">
              🎭 मनोरंजन
            </button>
            <p className="text-white font-semibold text-lg mt-2">
              Are you Free? Let's Enjoy the Best Entertainment!
            </p>
          </div>
        </div>
        
        <div className="sm:my-0 my-3">
          <TopNewsItems topNewsItems={topNewsItems} className={"grid gap-4"} />
        </div>
      </div>
    </div>
  );
}
