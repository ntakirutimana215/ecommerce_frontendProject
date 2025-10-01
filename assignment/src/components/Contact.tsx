const Contact = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Contact <span className="text-yellow-500">Us</span>
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have any questions? We’d love to hear from you! Fill in the form below and we’ll get back to you soon.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              rows={5}
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition shadow-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
