import LeftHome from "./LeftHome/LeftHome";
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
        </div>
      </div>
    </div>
  );
}
