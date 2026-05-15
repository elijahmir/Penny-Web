"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

type Props = {
  onComplete?: () => void;
  forceShow?: boolean;
};

const SESSION_KEY = "penny_intro_seen";
const INTRO_HOLD_MS = 2200; // time to show full intro before exit

export function PennyIntro({ onComplete, forceShow = false }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (forceShow) return true;
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const handleComplete = useCallback(() => {
    onCompleteRef.current?.();
  }, []);

  // Persist session flag + handle already-seen path
  useEffect(() => {
    if (show && !forceShow) {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
    if (!show) {
      handleComplete();
    }
  }, [show, forceShow, handleComplete]);

  // Auto-dismiss after hold duration
  useEffect(() => {
    if (!show) return;

    const delay = prefersReducedMotion ? 400 : INTRO_HOLD_MS;
    const timer = setTimeout(() => {
      setShow(false);
      // Fallback: forcefully complete after animation should have finished
      setTimeout(handleComplete, 800);
    }, delay);
    return () => clearTimeout(timer);
  }, [show, prefersReducedMotion, handleComplete]);

  const letters = "penny".split("");

  return (
    <AnimatePresence onExitComplete={handleComplete}>
      {show && (
        <motion.div
          key="penny-intro"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "var(--bg)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="flex items-center gap-5 md:gap-7">
            {/* Loop mark */}
            <motion.svg
              width="100"
              height="100"
              viewBox="270 830 330 420"
              className="w-[72px] h-[72px] md:w-[120px] md:h-[120px]"
              initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.6 },
              }}
            >
              <motion.path
                d="M0 0 C1.7714765 1.53810834 3.52103123 3.10175941 5.25 4.6875 C6.22453125 5.56921875 7.1990625 6.4509375 8.203125 7.359375 C31.00935325 28.67083359 42.60514768 58.06784347 43.70581055 88.94799805 C44.29394089 127.07249144 27.77632548 162.27599382 1.61328125 189.2890625 C-23.71418371 215.00487722 -56.2573555 230.67928942 -91.75 236.6875 C-92.41515625 236.80319336 -93.0803125 236.91888672 -93.765625 237.03808594 C-111.49607796 239.93302908 -129.84839275 238.87107726 -147.75 238.6875 C-147.72905273 239.65349121 -147.70810547 240.61948242 -147.68652344 241.61474609 C-147.12488936 270.01728835 -147.11042021 293.82210645 -167.76953125 315.83984375 C-179.80237659 327.4708501 -196.69649463 332.75810576 -213.1875 333.0625 C-230.9860265 332.43336166 -247.38242696 325.11515297 -259.6875 312.12890625 C-272.71188423 296.71178477 -277.11436549 279.39650242 -275.75 259.6875 C-273.56045709 243.62471885 -264.41538929 229.91872675 -252.22265625 219.56640625 C-239.45157466 209.86199828 -225.89790612 205.48353921 -209.97265625 205.58984375 C-209.16130722 205.5912587 -208.34995819 205.59267365 -207.51402283 205.59413147 C-204.94680953 205.59968643 -202.37968652 205.61223033 -199.8125 205.625 C-198.06185023 205.63002083 -196.31119907 205.63458271 -194.56054688 205.63867188 C-190.2903303 205.64964107 -186.02018041 205.66687418 -181.75 205.6875 C-181.75368717 205.05656559 -181.75737434 204.42563118 -181.76117325 203.77557755 C-181.85001841 188.32997376 -181.91594742 172.88446047 -181.95724869 157.43866348 C-181.97775927 149.96878048 -182.00565567 142.49906941 -182.05175781 135.02929688 C-182.09198235 128.50867066 -182.11751606 121.98816911 -182.12635398 115.46742225 C-182.13150944 112.02371999 -182.14337654 108.58037395 -182.17292023 105.13678741 C-182.45570313 68.01894677 -174.28967146 36.02870516 -147.75 8.6875 C-135.8864427 -3.21696612 -122.29936921 -11.23240711 -106.75 -17.3125 C-105.55697266 -17.80169922 -105.55697266 -17.80169922 -104.33984375 -18.30078125 C-70.13062721 -31.15395509 -28.18855019 -22.26895465 0 0 Z"
                fill="#C98160"
                transform="translate(546.75,869.3125)"
              />
            </motion.svg>

            {/* Wordmark */}
            <div
              className="flex text-[56px] md:text-[88px] font-bold tracking-tight leading-none"
              style={{ color: "var(--ink)" }}
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.55 + i * 0.07,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
