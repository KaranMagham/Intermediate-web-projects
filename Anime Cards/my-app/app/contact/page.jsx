import React from "react";
import { Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 px-4">
      <div className="bg-[#232323] rounded-lg shadow-xl shadow-black/40 p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-400 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-300 mb-6 text-center">
          Have feedback, questions, or suggestions? Fill out the form below or email us at{" "}
          <a
            href="mailto:karanmagham09@gmail.com"
            className="text-blue-400 underline"
          >
            karanmagham09@gmail.com
          </a>
        </p>
        <form className="flex flex-col gap-4">
          <label htmlFor="name" className="sr-only">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="p-3 rounded bg-[#181818] text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            required
            aria-label="Your Name"
          />
          <label htmlFor="email" className="sr-only">Your Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="p-3 rounded bg-[#181818] text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            required
            aria-label="Your Email"
          />
          <label htmlFor="message" className="sr-only">Your Message</label>
          <textarea
            id="message"
            placeholder="Your Message"
            rows={4}
            className="p-3 rounded bg-[#181818] text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            required
            aria-label="Your Message"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-all inline-flex items-center justify-center"
            disabled
            title="Demo only"
          >
            <Send className="inline-block w-4 h-4 mr-2" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
