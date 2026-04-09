import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const fieldSx = {
  input: { color: "#fff", fontSize: "13px", fontFamily: "Poppins" },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
    "&:hover fieldset": { borderColor: "#4ade80" },
    "&.Mui-focused fieldset": { borderColor: "#22c55e", borderWidth: "1.5px" },
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  "& .MuiInputLabel-root": { color: "#aaa", fontFamily: "Poppins", fontSize: "13px" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#4ade80" },
};

const LoginForm = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="text-white font-poppins">
      <motion.h2
        className="text-base font-bold text-center mb-4 tracking-widest text-white/90"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        MASUK AKUN
      </motion.h2>

      <form onSubmit={handleLogin} className="space-y-3">

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.01 }}
        >
          <TextField
            fullWidth
            size="small"
            label="Email / No HP"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={fieldSx}
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
        >
          <TextField
            fullWidth
            size="small"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                    sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: "#4ade80" } }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={fieldSx}
          />
        </motion.div>

        {/* Lupa password */}
        <motion.p
          className="text-xs text-green-400 cursor-pointer hover:text-green-300 hover:underline text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Lupa Password?
        </motion.p>

        {/* Tombol login */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full h-10 rounded-xl overflow-hidden font-semibold text-sm tracking-wide"
            style={{
              background: "linear-gradient(135deg, #22c55e, #15803d)",
              color: "#fff",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.8 : 1,
            }}
          >
            {/* Shimmer saat loading */}
            {isLoading && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Memproses...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-1"
                >
                  MASUK →
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 border-t border-white/10" />
          <span className="text-[10px] text-white/30">atau</span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        {/* Switch ke register */}
        <motion.p
          className="text-center text-[11px] text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Belum punya akun?{" "}
          <span
            className="text-green-400 font-semibold cursor-pointer hover:text-green-300 hover:underline transition-colors"
            onClick={onSwitch}
          >
            Daftar Sekarang
          </span>
        </motion.p>
      </form>
    </div>
  );
};

export default LoginForm;