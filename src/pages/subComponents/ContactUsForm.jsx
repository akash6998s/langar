import React, { useState } from "react";

const ContactUsForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !address || !message) {
      alert("कृपया सभी जानकारी भरें।");
      return;
    }

    setIsModalOpen(true);
    setName("");
    setPhone("");
    setAddress("");
    setMessage("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="bg-yellow-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md border border-yellow-200">
        <h2 className="text-2xl font-bold text-center text-yellow-800 mb-4">
          सेवा हेतु संपर्क करें
        </h2>
        <p className="text-center text-sm text-yellow-600 mb-6">
          अपना नाम, संपर्क विवरण और संदेश साझा करें। हम जल्द ही आपसे संपर्क करेंगे।
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-yellow-900">
                आपका नाम
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-yellow-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-yellow-900">
                मोबाइल नंबर
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-yellow-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-yellow-900">
                पता
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-yellow-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-yellow-900">
                आपका संदेश
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-yellow-300 rounded-md"
                required
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
              >
                सेवा के लिए भेजें
              </button>
            </div>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">धन्यवाद!</h3>
            <p className="text-sm text-yellow-700 mb-4">
              आपका संदेश सफलतापूर्वक भेज दिया गया है। हम आपसे जल्द संपर्क करेंगे।
            </p>
            <button
              onClick={closeModal}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
            >
              बंद करें
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactUsForm;
