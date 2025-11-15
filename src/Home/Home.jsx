// import { useLocation } from "react-router-dom";
// import LeftHome from "./LeftHome/LeftHome";
// import { AdListingPage } from "./market/pages/AdListingPage";
// import SellerQueryForm from "./market/pages/QueryForm";
// // import Right from "./RightHome/Right";
// import RightHome from "./RightHome/RightHome";
// import Category from "./category/Category";
// import ReadNews from "./readNews/ReadNews";
// import Subcategories from "./LeftHome/shared/Subcategories";
// export default function Home() {
//   const location = useLocation();
//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row items-start justify-center gap-[45px] my-2 xl:mx-[149px] lg:mx-2  mx-2 ">
//         {/* Left Section */}
//         <div className="w-full xl:w-[760px]">
//           {/* { <LeftHome />} */}
//           {location.pathname === "/" && <LeftHome />}
//           {location.pathname === "/topic/:category/:categoryId" && <Category />}
//           {location.pathname === "/topic/:category/:subcategory/:subCategoryId" && <Subcategories />}
//           {location.pathname.startsWith("/read-news") == "" && <ReadNews />}
//         </div>
//         {/* Right Section */}
//         <div className="w-[335px] xl:w-[335px] lg:w-[295px]  lg:flex flex-1 items-center justify-center mx-auto">
//           <RightHome />
//           {/* <Right/> */}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useLocation, matchPath } from "react-router-dom";
import LeftHome from "./LeftHome/LeftHome";
import { AdListingPage } from "./market/pages/AdListingPage";
import SellerQueryForm from "./market/pages/QueryForm";
import RightHome from "./RightHome/RightHome";
import Category from "./category/Category";
import ReadNews from "./readNews/ReadNews";
import Subcategories from "./LeftHome/shared/Subcategories";

export default function Home() {
  const location = useLocation();
  const path = location.pathname;

  // ✅ Match dynamic paths
  const isCategoryPage = matchPath("/topic/:category/:categoryId", path);
  const isSubCategoryPage = matchPath(
    "/topic/:category/:subcategory/:subCategoryId",
    path
  );
  const isReadNewsPage = matchPath("/read-news/:type/:newsId", path);

  return (
    <div>
      <div className="flex flex-col mt-5 lg:flex-row items-start justify-center gap-[45px] my-2 xl:mx-[149px] lg:mx-2 mx-2">
        {/* Left Section */}
        <div className="w-full xl:w-[760px]">
          {isCategoryPage ? (
            <Category />
          ) : isSubCategoryPage ? (
            <Subcategories />
          ) : isReadNewsPage ? (
            <ReadNews />
          ) : (
            // ✅ Default fallback
            <LeftHome />
          )}
        </div>

        {/* Right Section */}
        <div className="w-[335px]  xl:w-[335px] lg:w-[295px] lg:flex flex-1 items-center justify-center mx-auto">
          <RightHome />
        </div>
      </div>
    </div>
  );
}
