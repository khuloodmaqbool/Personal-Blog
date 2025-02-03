import Image from 'next/image';

const Contact = () => {
  return (
    <div className="w-11/12 mx-auto py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">Contact Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Have questions, suggestions, or want to connect? We’d love to hear from you! Reach out to us using the details below.
        </p>
      </section>

      {/* Contact Information Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Our Location</h2>
            <p className="mt-2 text-gray-600">
              Office 123, Tech Park Avenue, Innovation City, Exampleland.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Email Us</h2>
            <p className="mt-2 text-blue-500 font-medium">
              contact@devbykhulood.com
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Call Us</h2>
            <p className="mt-2 text-gray-600">+123-456-7890</p>
          </div>
        </div>
        <Image
          src="/contact.png" // Replace with your image path
          alt="Contact Illustration"
          width={600}
          height={400}
      
        />
      </section>

      {/* Social Media Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Follow Us</h2>
        <div className="flex justify-center gap-8">
          <a href="#" className="text-blue-500 hover:underline">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="#" className="text-blue-500 hover:underline">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="#" className="text-blue-500 hover:underline">
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </div>
      </section>

  
    </div>
  );
};

export default Contact;
