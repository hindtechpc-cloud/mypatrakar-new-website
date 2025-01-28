import call from "../../assets/telephone.svg";
import whatsapp from "../../assets/whatsapp.svg";

export default function ContactUs() {
  return (
    <div className="bg-red-100 w-full h-full py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className="bg-red-600 text-white py-4 px-6">
          <h1 className="font-bold text-xl text-start">CONTACT US</h1>
        </header>
        {/* Main Content */}
        <section className="p-6">
          {/* Brand Information */}
          <div className="mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">MyPatrakar</h2>
            </div>
          </div>

          {/* Owner Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Ankit Sonkar</h3>
            <p className="text-sm">Founder and Owner</p>
            <p className="text-sm mt-2">📞 9170446729</p>
            <p className="text-sm">📧 ankitsonkar@gmail.com</p>
          </div>

          <section className="md:flex flex-1 items-start justify-between flex-wrap gap-5">
            {/* Address and Contact */}
            <div className="mb-6 w-1/3">
              <h3 className="text-lg font-semibold">Address:</h3>
              <p className="text-sm mt-2">
                Building No 10/703, Ground Floor, near Arvindo Park Road, Sector
                10, Indira Nagar, Lucknow, Uttar Pradesh 226016
              </p>
              <p className="text-sm mt-2">📞 +91-120-4807100</p>
              <p className="text-sm">📧 business@intoday.com</p>
            </div>

            {/* Contact Icons */}
            <div className="flex justify-center gap-5">
  {/* Call Support */}
  <div className="text-center">
    <a href="tel:+918960905167">
      <img
        src={call}
        alt="Call support"
        className="w-12 h-12 cursor-pointer hover:scale-110 transform transition duration-300 animate-pulse"
      />
    </a>
  </div>

  {/* WhatsApp Support */}
  <div className="text-center">
    <a href="https://wa.me/+918960905167" target="_blank" rel="noopener noreferrer">
      <img
        src={whatsapp}
        alt="WhatsApp support"
        className="w-12 h-12 cursor-pointer hover:scale-110 transform transition duration-300 animate-pulse"
      />
    </a>
  </div>
</div>

          </section>
        </section>
      </div>
    </div>
  );
}
