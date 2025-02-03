// pages/parallax.js
import Head from "next/head";

export default function Parallax() {
  // Stats data
  const stats = [
    { value: "25+", label: "Interior Designs" },
    { value: "93+", label: "Architecture" },
    { value: "23+", label: "Construction" },
    { value: "83+", label: "Projects Done" },
  ];

  return (
    <>
      <Head>
        <title>Parallax Scroll Effect</title>
      </Head>
      <div
        className="relative h-96 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/herosection2.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="flex flex-col md:flex-row justify-between items-center h-full px-6 md:px-16">
            {/* Heading Section */}
            <div className="text-center md:text-left max-w-2xl space-y-4">
              <h5 className="text-[#4cab19] text-xl font-semibold mt-6">QUALITY OF WORK</h5>
              <h1 className="text-white text-2xl md:text-4xl font-semibold">
                Milestones that we proudly accomplished & lead us forward.
              </h1>
            </div>

            {/* Stats Section */}
            <div className="mt-8 md:mt-0 w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-10 md:gap-14 text-center mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={` flex flex-col items-center `}
                  >
                    <h4 className="text-[#4cab19] font-bold text-5xl">{stat.value}</h4>
                    <h5 className="text-white text-lg">{stat.label}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
