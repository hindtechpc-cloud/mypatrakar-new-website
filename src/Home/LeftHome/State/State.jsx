import React from "react";
import Menu from "../shared/MenuBar";
import TopNewsItems from "../TopNews/TopNewsItems";
import NewsCard from "../shared/NewsCard";

export default function State() {
  const topNewsItems = [
    {
      id: 1,
      title: "News 1",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "News 2",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "News 3",
      description:
        "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      <Menu
        menuText={"राज्य"}
        menu={[
          "All",
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chhattisgarh",
          "Goa",
          "Gujarat",
        ]}
      ></Menu>
      <div className="flex  flex-col items-center gap-4">
        <NewsCard
         className="  sm:flex flex-1  items-start gap-4 max-w-4xl mx-auto"
          classNameToImage="md:w-full md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
          image={"https://picsum.photos/200/500"}
          ctaText={"राज्य"}
          title={"Are you Free? Let's Enjoy the Best Entertainment!"}
          description={
            "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव"
          }
          news={{
            title:
              "जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में             और मई 2024 के बीच आम चुना",
            urlToImage: "https://picsum.photos/200/500",
          }}
        />
        <NewsCard
          className=" sm:flex flex-1  items-start gap-4 max-w-4xl mx-auto"
          classNameToImage="md:w-full md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
          image={"https://picsum.photos/200/700"}
          ctaText={"राज्य"}
          title={"Are you Free? Let's Enjoy the Best Entertainment!"}
          description={
            "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव"
          }
          news={{
            title:
              "जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में             और मई 2024 के बीच आम चुना",
            urlToImage: "https://picsum.photos/200/700",
          }}
        />
        <NewsCard
         className="sm:flex flex-1  items-start gap-4 max-w-4xl mx-auto"
          classNameToImage="md:w-full md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
          image={"https://picsum.photos/200/100"}
          ctaText={"राज्य"}
          title={"Are you Free? Let's Enjoy the Best Entertainment!"}
          description={
            "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव"
          }
          news={{
            title:
              "जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में             और मई 2024 के बीच आम चुना",
            urlToImage: "https://picsum.photos/200/100",
          }}
        />
        <NewsCard
          className=" sm:flex flex-1  items-start gap-4 max-w-4xl mx-auto"
          classNameToImage="md:w-full md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
          image={"https://picsum.photos/200/300"}
          ctaText={"राज्य"}
          title={"Are you Free? Let's Enjoy the Best Entertainment!"}
          description={
            "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव"
          }
          news={{
            title:
              "जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में             और मई 2024 के बीच आम चुना",
            urlToImage: "https://picsum.photos/200/300",
          }}
        />
        <NewsCard
          className=" sm:flex flex-1  items-start gap-4 max-w-4xl mx-auto"
          classNameToImage="md:w-full md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
          image={"https://picsum.photos/200/200"}
         
          ctaText={"राज्य"}
          title={"Are you Free? Let's Enjoy the Best Entertainment!"}
          description={
            "जब चुनाव का मौसम आता है, तो मंचों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भरोसे की परीक्षा होती है। दुनिया के सबसे युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में अप्रैल और मई 2024 के बीच आम चुनाव"
          }
          news={{
            title:
              "जब चुनाव का मौसम आता है, तो मंच ों और पोस्टरों पर वादे करने वालों और उज्ज्वल भविष्य की आशा रखने वालों से आमरी भर से की परीक्षा होती है। दुनिया के युवा लोकतंत्रों में से एक होने के बावजूद भारत की संसद में युवा सदस्यों की भागीदारी बहुत कम है। भारत में             और मई 2024 के बीच आम चुना",
            urlToImage: "https://picsum.photos/200/200",
          }}
        />
      </div>
    </div>
  );
}
