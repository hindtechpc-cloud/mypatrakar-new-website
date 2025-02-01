import React, { useState } from "react";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "../TopNews/TopNewsItems";
import { articlesCard } from "../../search/news";

export default function OwnState() {
 const [subcategory,setSubcategory]=useState("");
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
      <Menu menuText={"उत्तर प्रदेश"} menu={menu} setSubcategory={setSubcategory}/>
      <div className="md:flex flex-1 items-start gap-4">
        <div className="">
          <NewsCard
            className="md:flex flex-col items-start gap-4 max-w-4xl mx-auto"
            classNameToImage="md:w-96 md:h-48 sm:w-full w-full h-96 sm:h-96 items-end justify-end relative"
            classNameForContent="w-5/6"
            image="https://picsum.photos/200/500"
            ctaText="खेल"
            title="Are you Free? Let's Enjoy the Best Entertainment!"
            description="जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में             और मई 2024 के बीच आम चुनाव"
            news={{
              title:
                "जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में             और मई 2024 के बीच आम चुना",
              urlToImage: "https://picsum.photos/200/500",
            }}
          />
        </div>
        <div className="w-full">
          <TopNewsItems topNewsItems={articlesCard} className={"grid gap-3"} />
        </div>
      </div>
    </div>
  );
}
