import React from "react";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "../TopNews/TopNewsItems";

export default function OwnState() {
  const topNewsItems = [
    {
      id: 1,
      title: "News Item 1",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      title: "News Item 2",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      image: "https://picsum.photos/200/400",
    },
    {
      id: 2,
      title: "News Item 2",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      image: "https://picsum.photos/200/500",
    },
    {
      id: 2,
      title: "News Item 2",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      image: "https://picsum.photos/200/700",
    },
  ];
  const menu = [
    "All",
    "Agra",
    "Kanpur",
    "Varanasi",
    "Bahraich",
    "Ballia",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ];
  return (
    <div className="my-2 mb-5">
      <Menu menuText={"उत्तर प्रदेश"} menu={menu} />
      <div className="md:flex flex-1 items-center gap-4">
        <div className="">
          <NewsCard
            className="md:flex flex-col items-start gap-4 max-w-4xl mx-auto"
              classNameToImage="md:w-full md:h-48 sm:w-full w-full h-96 sm:h-96 items-end justify-end relative"
            image="https://picsum.photos/200/500"
            ctaText="खेल"
            title="Are you Free? Let's Enjoy the Best Entertainment!"
            description="जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में             और मई 2024 के बीच आम चुनाव"
          />
        </div>
        <div className="w-1/2">
          <TopNewsItems topNewsItems={topNewsItems} className={"grid gap-3"} />
        </div>
      </div>
    </div>
  );
}
