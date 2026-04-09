import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.png";
import AnimatedGradientBg from "./AnimatedGradientBg";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <AnimatedGradientBg>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Glow atas */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] rounded-b-full blur-[80px] bg-green-500/10 pointer-events-none" />

        {/* Glow bawah */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-t-full blur-[80px] bg-green-400/10 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Glow kiri */}
        <motion.div
          className="absolute left-1/4 top-1/3 w-64 h-64 rounded-full blur-[80px] bg-green-400/10 pointer-events-none"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Glow kanan */}
        <motion.div
          className="absolute right-1/4 bottom-1/3 w-64 h-64 rounded-full blur-[80px] bg-lime-400/10 pointer-events-none"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", delay: 1 }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 w-full max-w-xs px-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative group">

            {/* Border animation (AMAN) */}
            <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-0 left-0 h-[2px] w-[45%] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-70"
                animate={{ left: ["-45%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>

            {/* Glass Card */}
            <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl px-4 py-5">

              {/* GRID (NO CLICK BLOCK) */}
              <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />

              {/* ✅ BACK BUTTON (FIX TOTAL) */}
              <button
                onClick={() => {
                  console.log("CLICKED"); // debug
                  navigate("/");
                }}
                className="absolute top-3 left-3 z-[999] flex items-center justify-center w-9 h-9 rounded-full bg-black/50 border border-white/30 hover:bg-black/70 transition backdrop-blur pointer-events-auto active:scale-95"
              >
                <span className="text-white text-sm">←</span>
              </button>

              {/* LOGO BESAR */}
              <div className="flex justify-center -mt-12 mb-2 relative z-10">
                <img
                  src={logo}
                  alt="logo"
                  className="w-40 sm:w-44 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* SUBTITLE */}
              <motion.p
                className="text-center text-green-200/70 text-[11px] mb-3 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Silahkan Masukkan Data Anda
              </motion.p>

              {/* FORM */}
              <div className="relative z-10">
                {children}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedGradientBg>
  );
};

export default AuthLayout;