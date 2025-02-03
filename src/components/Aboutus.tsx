export const Aboutus = () => {
    return (
      <>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto px-5 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Left Side - Image */}
            <div className="w-full">
  <img
    className="w-full h-auto object-cover object-center"
    alt="hero"
    src="/images/aboutus.png" 
  />
</div>

  
            {/* Right Side - Text */}
            <div className="lg:pl-16 md:pl-10 flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="title-font sm:text-6xl text-3xl mb-6 font-semibold text-gray-900">
                Creative solutions by professional designers
              </h1>
              <p className="mb-8 leading-relaxed">
                Your kitchen is an expression of who you are, and its design should match your lifestyle. 
                Whether you have traditional tastes or desire a modern feel, we can design your dream kitchen to suit any purpose.
              </p>
              {/* <div className="flex justify-center"> */}
              <button className="px-8 py-3 bg-[#4cab19] text-white text-sm font-semibold rounded-3xl">
                    CONTINUE READING →
                  </button>
                {/* <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-3 px-8 focus:outline-none hover:bg-gray-200 rounded-lg text-lg">
                  Learn More
                </button>
              </div> */}
            </div>
          </div>
        </section>
      </>
    );
  };
  