import { useLocation } from "react-router-dom";
import LeftHome from "./LeftHome/LeftHome";
import { AdListingPage } from "./market/pages/AdListingPage";
import SellerQueryForm from "./market/pages/QueryForm";
// import Right from "./RightHome/Right";
import RightHome from "./RightHome/RightHome";
import Category from "./category/Category";

export default function Home() {
  const location=useLocation();
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 lg:mx-14 md:mx-10 sm:mx-8 mx-2 ">
        {/* Left Section */}
        <div className="w-full lg:w-8/12">
         {/* { <LeftHome />} */}
          {location.pathname === "/" ? <LeftHome /> : <Category/>}

        </div>

        {/* Right Section */}
        <div className="w-full  lg:w-4/12">
          <RightHome />
          {/* <Right/> */}
        </div>

      </div>
      
    </div>
  );
}
