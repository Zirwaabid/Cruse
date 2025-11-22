import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Banners } from "../index.js"; // adjust import

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      phone: formData.phone,
      message: formData.message,
      to_email: "zirwaabid112@gmail.com",
    };

    emailjs
      .send(
        "service_eyb1nhb",
        "template_b5qt3t2",
        templateParams,
        "qKQVq7M_OlzPRkPeF"
      )
      .then(() => {
        setSubmitted(true);
        setError(false);

        setFormData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 4000);
      });
  };

  return (
    <div className="w-full mt-10 pb-20">

      {/* ---------------------- FLOATING CARD ---------------------- */}
      <div className="max-w-6xl mx-auto px-4 mt-28 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

          {/* LEFT FORM SECTION */}
          <div className="p-10">
            <h2 className="text-2xl font-bold mb-7 text-gray-800">
              Send us a Message
            </h2>

            {submitted && (
              <p className="text-green-700 bg-green-100 p-3 rounded-lg mb-4 text-center">
                Message sent successfully!
              </p>
            )}

            {error && (
              <p className="text-red-700 bg-red-100 p-3 rounded-lg mb-4 text-center">
                Failed to send message. Please try again.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <textarea
                name="message"
                required
                rows={5}
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

              <button
                type="submit"
                className="button-bg hover:bg-blue-700 transition-all text-white font-semibold w-full py-3 rounded-lg shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT CONTACT INFORMATION */}
          <div className="button-bg text-white p-10 space-y-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-5">Contact Us</h2>

            <p className="flex items-center gap-3 opacity-90">
              📍 360 King Street,  
              <br /> Faisalabad, Pakistan
            </p>

            <p className="flex items-center gap-3 opacity-90">
              ☎️ (800) 900-200-300
            </p>

            <p className="flex items-center gap-3 opacity-90">
              ✉️ info@example.com
            </p>

            <div className="flex gap-4 mt-4 opacity-80 text-xl">
              <i className="bx bxl-twitter"></i>
              <i className="bx bxl-linkedin"></i>
              <i className="bx bxl-instagram"></i>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
