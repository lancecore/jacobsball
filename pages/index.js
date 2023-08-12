import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import useSound from "use-sound";

export default function Home() {
  const controls = useAnimationControls();
  const pitchUrl = "/audio/pepSound1.mp3";
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [scaleRate, setScaleRate] = useState(1.3);
  const [play] = useSound(pitchUrl, {
    playbackRate,
    volume: 0.1,
    interrupt: false,
  });
  const aniVars = {
    grow: { scale: scaleRate },
    shrink: { scale: 1 },
  };
  const handleClick = () => {
    setPlaybackRate(playbackRate + 0.1);
    play();
    setScaleRate(scaleRate + 0.1);
    if (scaleRate < 5) {
      controls.start({
        scale: scaleRate,
      });
    } else {
      unHover();
    }
  };
  const unHover = () => {
    setScaleRate(1);
    controls.start({
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    });
    setPlaybackRate(0.75);
    play();
  };

  let theFace;

  if (scaleRate < 2) {
    theFace = "😃";
  } else if (scaleRate <= 1.5) {
    theFace = "😆";
  } else if (scaleRate <= 2) {
    theFace = "😅";
  } else if (scaleRate <= 2.5) {
    theFace = "😵‍💫";
  } else if (scaleRate <= 3) {
    theFace = "😲";
  } else if (scaleRate < 5) {
    theFace = "🫨";
  } else if (scaleRate >= 5) {
    theFace = "😮‍💨";
  }

  return (
    <main>
      <motion.div
        className="ball"
        layout
        animate={controls}
        onTap={handleClick}
      >
        {theFace}
      </motion.div>
    </main>
  );
}
