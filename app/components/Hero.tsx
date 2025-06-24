import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white bg-gradient-to-b from-[#d4a5ff] to-[#2b1a5e] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ariana-grande-hero.png"
          alt="Ariana Grande Background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-30"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold font-montserrat tracking-tight text-shadow-lg">
          Welcome to Ariana’s World 🌙✨
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light max-w-2xl mx-auto">
          Music, Love, and Good Vibes – Join Ariana Grande on Her Journey of Empowerment and Artistry.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <div>
            <Link
                href="https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR"
                className="inline-block bg-[#ff4da6] text-white px-8 py-3 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-[0_0_15px_rgba(255,77,166,0.8)] transition-transform duration-300"
            >
                Stream My New Album Now
            </Link>
          </div>
            <div>
          <Link
                href="https://x.com/ArianaGrande"
                className="inline-block border-2 border-white bg-transparent text-white px-8 py-3 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-transform duration-300"
            >
                Join the Arianator Community
            </Link>
          </div>
        </div>
      </div>

      {/* Sparkle Animations */}
      <div className="sparkle top-[20%] left-[10%]"></div>
      <div className="sparkle top-[30%] left-[80%] animation-delay-500"></div>
      <div className="sparkle top-[70%] left-[20%] animation-delay-1000"></div>
    </section>
  );
};

export default HeroSection;