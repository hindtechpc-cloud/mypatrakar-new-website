import React from "react";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "./TopNewsItems";
// import Menu

export default function TopNews() {
  const menu = [];
  const topNewsItems = [
    {
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      urlToImage: "https://picsum.photos/200/500",
      title: "This is current news",
    },
    {
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      urlToImage: "https://picsum.photos/200/700",
      title: "This is current news",
    },
    {
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      imaurlToImagege: "https://picsum.photos/200/200",
      title: "This is current news",
    },
    {
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      imaurlToImagege: "https://picsum.photos/200/300",
      title: "This is current news",
    },
    {
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      imurlToImageage: "https://picsum.photos/200/700",
      title: "This is current news",
    },
    {
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      urlToImage: "https://picsum.photos/200/500",
      title: "This is current news",
    },
  ];
  return (
    <div>
      <Menu menuText={"TopNews"} menu={menu} />
      <div className="w-full">
        <NewsCard
          className="sm:flex flex-1 w-full  items-start gap-4 max-w-4xl mx-auto"
          classNameToImage="md:w-full md:h-48 sm:w-full w-full h-96 sm:h-96 items-end justify-end relative"
          image="https://picsum.photos/200/500"
          ctaText="खेल"
          title="Are you Free? Let's Enjoy the Best Entertainment!"
          description="जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में और मई 2024 के बीच आम चुनाव"
          news={{
            title: "Are you Free? Let's Enjoy the Best Entertainment!",
            urlToImage: "https://picsum.photos/200/500",
            content:
              "जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में और मई 2024 के बीच आम चुनाव",
          }}
        />
      </div>

      <TopNewsItems
        topNewsItems={topNewsItems}
        className={"grid grid-cols-1 sm:grid-cols-2 gap-4 my-2"}
      />
    </div>
  );
}
