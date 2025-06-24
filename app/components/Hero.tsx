
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";
import { FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';

// 🎤 Set next tour date
const TOUR_DATE = new Date("2025-07-01T20:00:00");

function getCountdown() {
  const now = new Date();
  const diff = TOUR_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const Hero: React.FC = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const visualizerRef = useRef<AnalyserNode | null>(null);
  const starfieldRef = useRef<THREE.Scene | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const orbControls = useAnimation();

  // ⏳ Countdown timer
  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🎵 Audio setup and visualizer
  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize AudioContext and MediaElementSourceNode only once
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
      visualizerRef.current = audioContextRef.current.createAnalyser();
      visualizerRef.current.fftSize = 256;
      sourceRef.current.connect(visualizerRef.current);
      visualizerRef.current.connect(audioContextRef.current.destination);
    }

   const analyser = visualizerRef.current;
    if (!analyser) return; // ⛑ safe early return

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const drawVisualizer = () => {
      if (!isAudioPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bufferLength;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        ctx.fillStyle = `hsl(${i * 2}, 100%, 50%)`;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
      }
      requestAnimationFrame(drawVisualizer);
    };

    audio.onplay = () => drawVisualizer();
    audio.onpause = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

    return () => {
      // Cleanup: Disconnect source and close AudioContext only if they exist
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [isAudioPlaying]);

  // 🌌 WebGL Starfield
  useEffect(() => {
    if (typeof window === "undefined" || /Mobi|Android/i.test(navigator.userAgent)) return; // Skip on mobile
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("starfield")?.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
    const starsVertices = new Float32Array(5000 * 3);
    for (let i = 0; i < starsVertices.length; i++) {
      starsVertices[i] = (Math.random() - 0.5) * 2000;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    camera.position.z = 50;

    const animate = () => {
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    starfieldRef.current = scene;
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);


  // 🖱️ Orb interaction
  useEffect(() => {
    if (/Mobi|Android/i.test(navigator.userAgent)) return; // Skip on mobile
    const handleMouseMove = (e: MouseEvent) => {
      const orbs = document.querySelectorAll('.orb');
      orbs.forEach((orb) => {
        const rect = orb.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          orbControls.start({ x: dx * 0.1, y: dy * 0.1, transition: { duration: 0.3 } });
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [orbControls]);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 px-6 md:px-12 bg-gradient-to-br from-[#1a0033] via-[#2b1a5e] to-[#0d1a66] text-white overflow-hidden">
      {/* Starfield */}
      <div id="starfield" className="absolute inset-0 z-0 opacity-50" />

      {/* Interactive Orbs */}
      <motion.div className="orb hidden lg:block" animate={orbControls} style={{ top: '15%', left: '20%' }} />
      <motion.div className="orb hidden lg:block" animate={orbControls} style={{ top: '30%', left: '70%' }} />
      <motion.div className="orb hidden lg:block" animate={orbControls} style={{ top: '65%', left: '25%' }} />
      <motion.div className="orb hidden lg:block" animate={orbControls} style={{ top: '80%', left: '85%' }} />

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center lg:text-left max-w-xl z-20"
      >
        <h1 className="text-5xl md:text-7xl font-orbitron font-bold leading-tight text-glow">
          Ariana Grande
        </h1>
        <p className="mt-4 text-lg md:text-xl font-montserrat font-light text-white/80" style={{color:"white"}}>
          Galactic Pop Empress — Interstellar Tour 2025
        </p>

        {/* Countdown Timer */}
        <motion.div
          className="mt-6 bg-black/60 backdrop-blur-lg p-4 rounded-xl shadow-neon"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm text-neonCyan font-orbitron font-medium"style={{color:"white"}}>
            🚀 Cosmic Countdown to Next Show
          </div>
          <div className="text-2xl font-bold text-white font-mono flex gap-2 justify-center" style={{color:"white"}}>
            <span className="bg-cyan-900/50 px-3 py-1 rounded">{countdown.days.toString().padStart(2, "0")}d</span>
            <span className="bg-cyan-900/50 px-3 py-1 rounded">{countdown.hours.toString().padStart(2, "0")}h</span>
            <span className="bg-cyan-900/50 px-3 py-1 rounded">{countdown.minutes.toString().padStart(2, "0")}m</span>
            <span className="bg-cyan-900/50 px-3 py-1 rounded">{countdown.seconds.toString().padStart(2, "0")}s</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(0, 255, 255, 0.7)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR"
            className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-neonCyan to-neonPink text-white font-orbitron font-semibold rounded-full transition duration-300 hover:shadow-neon" style={{color:"white"}}>
            Enter Music Cosmos
          </Link>
        </motion.div>

        {/* Spotify Embed */}
        <motion.div
          className="mt-6 relative"
          whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            className="rounded-xl shadow-neon hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-shadow duration-300"
            src="https://open.spotify.com/embed/track/3e9HZxeyfWwjeyPAMmWSSQ?utm_source=generator"
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </motion.div>

        {/* Soundwave Visualizer */}
        <motion.div
          className="mt-4 w-full h-20 bg-black/50 backdrop-blur-md rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isAudioPlaying ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>

  
        {/* Social Media Icons */}
        <motion.div
          className="mt-6 flex justify-center lg:justify-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="https://www.instagram.com/arianagrande" target="_blank">
            <motion.div whileHover={{ scale: 1.2, color: '#00FFFF' }} className="text-white">
              <FaInstagram size={24} />
            </motion.div>
          </Link>
          <Link href="https://x.com/ArianaGrande" target="_blank">
            <motion.div whileHover={{ scale: 1.2, color: '#00FFFF' }} className="text-white">
              <FaXTwitter size={24} />
            </motion.div>
          </Link>
          <Link href="https://www.youtube.com/@arianagrande" target="_blank">
            <motion.div whileHover={{ scale: 1.2, color: '#00FFFF' }} className="text-white">
              <FaYoutube size={24} />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;