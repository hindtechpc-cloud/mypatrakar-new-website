import HtmlToPlainText from "../../utils/HtmlToPlainText";

const text ="<p>uhweiufherihferw;o  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iusto asperiores fugit libero molestias sed distinctio! Culpa dolorum, excepturi molestias cumque eaque dolorem deleniti fugit dicta itaque maiores laborum expedita uhweiufherihferw;o  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iusto asperiores fugit libero molestias sed distinctio! Culpa dolorum, excepturi molestias cumque eaque dolorem deleniti fugit dicta itaque maiores laborum expedita.</p> <p>uhweiufherihferw;o  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iusto asperiores fugit libero molestias sed distinctio! Culpa dolorum, excepturi molestias cumque eaque dolorem deleniti fugit dicta itaque maiores laborum expedita uhweiufherihferw;o  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iusto asperiores fugit libero molestias sed distinctio! Culpa dolorum, excepturi molestias cumque eaque dolorem deleniti fugit dicta itaque maiores laborum expedita.</p> <p>uhweiufherihferw;o  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iusto asperiores fugit libero molestias sed distinctio! Culpa dolorum, excepturi molestias cumque eaque dolorem deleniti fugit dicta itaque maiores laborum expedita uhweiufherihferw;o  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iusto asperiores fugit libero molestias sed distinctio! Culpa dolorum, excepturi molestias cumque eaque dolorem deleniti fugit dicta itaque maiores laborum expedita.</p>";
export default function AboutMypatrakar() {
  return (
    <div className="">
      <h1 className="text-gray-900 text-center font-bold font-sans text-xl mt-5">
        {" "}
        About MyPatrakar
      </h1>
      <div className="flex flex-col w-full items-start justify-start">
        <HtmlToPlainText htmlContent={text} className=" mb-5" />
      </div>
    </div>
  );
}
