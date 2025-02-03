import Image from 'next/image';

const About = () => {
  return (
    <div className="w-11/12 mx-auto py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="text-[#c6ff41] font-semibold">Dev by Khulood</span>! Our goal is to share insightful articles, practical tips, and the latest trends across diverse topics to inspire and inform our readers.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            We aim to provide engaging, informative, and valuable content to our readers. We believe knowledge empowers people and strive to make learning accessible, enjoyable, and easy to explore.
          </p>
        </div>
        <Image
          src="/about.png"
          alt="Our Mission"
          width={600}
          height={400}
          className=""
        />
      </section>

      {/* Vision Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <Image
          src="/vision.png" // Replace with your vision image path
          alt="Our Vision"
          width={600}
          height={400}
          className=""
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Our vision is to build a community of curious minds and innovative thinkers who continuously learn and grow. We foster a space where creativity and knowledge converge.
          </p>
        </div>
      </section>

      {/* Author Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Meet the Author</h2>
        <div className="space-y-6 text-center">
          <Image
            src="/dp.png" // Replace with your author image path
            alt="Khulood Maqbool"
            width={150}
            height={150}
            className="rounded-full mx-auto border-4 border-[#c6ff41]"
          />
          <h3 className="text-xl font-semibold text-gray-900">Khulood Maqbool</h3>
          <p className="text-[#c6ff41] font-medium">Founder & Front-End Developer</p>
          <p className="text-gray-600">
            Passionate about creating beautiful, responsive, and user-friendly websites.
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;
