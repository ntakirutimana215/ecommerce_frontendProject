const About = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          About <span className="text-yellow-500">Us</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          We are passionate about delivering the best shopping experience. 
          Our mission is to provide high-quality products, fast delivery, and outstanding customer support. 
          Your satisfaction is our success.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg p-6 rounded-xl hover:scale-105 transform transition">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Bringing quality products closer to you with unmatched customer care and trust.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl hover:scale-105 transform transition">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading eCommerce brand known for innovation, quality, and value.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl hover:scale-105 transform transition">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Our Values</h2>
            <p className="text-gray-600">
              Honesty, commitment, and excellence in every product and service we offer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
