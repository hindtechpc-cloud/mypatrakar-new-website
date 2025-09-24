import Header from "../shared/Header";
import MobileFrame from "./MobileFrame";
import { ImSpinner2 } from "react-icons/im";
import { useShorts } from "../../../hooks/useShorts";
import IPhoneFrame from "./IPhoneFrame";

export default function Shorts() {
  const {
    articles, // formatted shorts (title, desc, image, updated)
    currentIndex,
    loading,
    error,
    nextArticle,
    prevArticle,
  } = useShorts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-pulse flex flex-col items-center">
          <div className="text-center">
            <ImSpinner2 className="animate-spin text-red-500" size={50} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[400px] text-red-500">
        {error}
      </div>
    );
  }

  if (!articles.length) return null;

  return (
    <>
      {articles.length > 0 && (
        <div className="mt-[9px] xl:w-[335px] lg:w-[295px] w-[335px]  mx-auto">
          <Header text="Shorts" />

          <div className="flex items-center justify-center mx-auto lg:ml-5 ml-2.5">
            <IPhoneFrame>
              <MobileFrame
                articles={articles}
                currentIndex={currentIndex}
                onNext={nextArticle}
                onPrev={prevArticle}
                loading={loading}
                error={error}
              />
            </IPhoneFrame>
          </div>
        </div>
      )}
    </>
  );
}
