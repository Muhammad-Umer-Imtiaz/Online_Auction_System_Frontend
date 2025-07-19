import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_r804be6",
        "template_u6ht1it",
        formData,
        "8UN_ShdHlKodyuZu-"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent.");
        setLoading(false);
        navigateTo("/");
      })
      .catch(() => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section className="w-full min-h-screen  flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl bg-transparent shadow-2xl rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-[#D6482B] mb-8">Contact Us</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleContactForm}>
          <div className="flex flex-col col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
              placeholder="john@example.com"
            />
          </div>

          <div className="flex flex-col col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-2">Your Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
              placeholder="+92 300 1234567"
            />
          </div>

          <div className="flex flex-col col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
              placeholder="Write your subject..."
            />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B] resize-none"
              placeholder="Write your message here..."
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#D6482B] hover:bg-[#b8381e] text-white text-lg font-medium py-3 rounded-md transition duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
