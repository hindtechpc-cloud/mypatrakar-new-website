import LeftHome from "./LeftHome/LeftHome";
import { AdListingPage } from "./market/pages/AdListingPage";
import SellerQueryForm from "./market/pages/QueryForm";
// import Right from "./RightHome/Right";
import RightHome from "./RightHome/RightHome";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 lg:mx-14 md:mx-10 sm:mx-8 mx-2 ">
        {/* Left Section */}
        <div className="w-full lg:w-8/12">
          <LeftHome />
        </div>

        {/* Right Section */}
        <div className="w-full  lg:w-4/12">
          <RightHome />
          {/* <Right/> */}
        </div>

      </div>
      <AdListingPage/>
      <SellerQueryForm/>
    </div>
  );
}
