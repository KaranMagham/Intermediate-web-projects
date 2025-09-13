import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col p-5 items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 px-4 py-12">
      <div className="bg-[#232323] rounded-2xl shadow-xl shadow-black/30 p-8 w-full max-w-2xl flex flex-col items-center">
        <Image
          src="/zen_circle.png"
          alt="Zen Circle"
          width={80}
          height={80}
          className="mb-4 opacity-80"
        />
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text mb-4 text-center">
          About OtakuDeck
        </h1>
        <p className="text-gray-300 text-lg text-center mb-6">
          <span className="text-blue-400 font-semibold">OtakuDeck</span> is your
          peaceful anime sanctuary. Discover, explore, and collect cards of your
          favorite anime characters in a calm, zen-inspired interface. Our mission
          is to bring the joy of anime to everyone, with a focus on simplicity,
          beauty, and community.
        </p>
        <div className="bg-[#181818] rounded-lg p-4 mb-4 w-full text-center">
          <span className="text-xl text-purple-300 font-semibold">
            Our Zen Philosophy
          </span>
          <p className="text-gray-400 mt-2">
            Like a tranquil garden, OtakuDeck is designed to be clutter-free and
            mindful. We believe in slow, meaningful discovery—every card, every
            character, every moment.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          <div className="flex-1 bg-[#232323] border border-blue-900 rounded-lg p-4 text-center">
            <h2 className="text-lg font-bold text-blue-400 mb-2">Minimal UI</h2>
            <p className="text-gray-400">
              No distractions. Just you and your favorite anime worlds.
            </p>
          </div>
          <div className="flex-1 bg-[#232323] border border-purple-900 rounded-lg p-4 text-center">
            <h2 className="text-lg font-bold text-purple-400 mb-2">
              Community
            </h2>
            <p className="text-gray-400">
              Share, connect, and celebrate anime with fellow fans.
            </p>
          </div>
        </div>
        <div className="mt-8 text-gray-500 text-sm text-center">
          Made with{" "}
          <span className="text-pink-400">♥</span> by Karan &amp; the OtakuDeck
          team.
        </div>
      </div>
    </div>
  );
}
