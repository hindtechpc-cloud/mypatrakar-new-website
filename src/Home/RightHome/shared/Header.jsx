
import { useWebThemeContext } from "../../../context/WebThemeContext";

export default function Header({text}) {
  const { webTheme } = useWebThemeContext();

    const themeColor = webTheme["bg-color"] || "#b91c1c"
  return (
    <div>
      <div className=" text-gray-100 text-start w-full py-[7px] px-[10px] rounded my-2 bg-black" 
      // style={{
      //   background:themeColor
      // }}

      >
        <span>{text}</span>
      </div>
    </div>
  );
}
