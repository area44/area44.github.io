import { useRef, useEffect, useState } from "react";
import { useHead } from '@unhead/react';

export default function App() {
  useHead({
    title: 'AREA44 | Website',
    meta: [{ name: 'description', content: 'Welcome to AREA44' }]
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < 768);
    };

    updateCanvasSize();

    let particles: any[] = [];
    let textImageData: ImageData | null = null;

    function createTextImage(): number {
      if (!ctx || !canvas) return 0;

      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <path d="m385.42 326.45c7.5002 11.979 14.799 23.656 22.202 35.5-8.1935 5.0413-16.606 4.262-24.579 4.2893-37.649 0.12912-75.301-0.41928-112.95-0.33032-23.302 0.055023-46.602 0.98456-69.905 1.2102-18.151 0.17575-36.306-0.15396-54.46-0.21256-14.984-0.04837-29.969 0.065522-44.951-0.081878-6.7307-0.066223-7.8922-1.4271-4.9177-7.4055 6.1438-12.349 12.832-24.436 19.572-36.476 6.175-11.03 12.936-21.733 19.035-32.803 7.134-12.949 13.653-26.236 20.755-39.204 13.59-24.818 27.295-49.574 41.159-74.24 10.441-18.576 21.402-36.862 31.75-55.488 6.0504-10.891 11.318-22.216 17.019-33.303 1.1251-2.1883 2.622-4.1855 4.8904-7.7543 5.7382 9.557 11.258 17.968 16.005 26.795 18.521 34.436 36.581 69.122 55.249 103.48 10.482 19.291 22.071 37.979 32.702 57.193 10.704 19.346 20.84 39.008 31.426 58.833m-147.65-196.09c-6.8811 12.731-13.765 25.46-20.643 38.193-26.635 49.31-53.288 98.611-79.886 147.94-5.3618 9.9441-10.83 19.852-15.653 30.058-3.1228 6.6081-2.2816 7.4296 4.9122 7.4871 25.804 0.20612 51.609 0.60953 77.412 0.4834 25.964-0.12695 51.924-1.0068 77.888-1.1692 26.313-0.16449 52.629 0.23712 78.943 0.1875 7.2331-0.013611 14.465-0.75507 22.485-1.2069-1.2543-2.8544-1.9446-4.8765-2.9768-6.7055-12.26-21.723-24.719-43.336-36.793-65.161-4.5791-8.277-7.9431-17.224-12.489-25.522-11.912-21.741-24.535-43.098-36.183-64.977-10.707-20.111-20.396-40.762-30.776-61.05-3.9071-7.6365-8.4975-14.923-12.776-22.37-0.55866 0.038421-1.1173 0.076835-1.6759 0.11526-3.8183 7.6772-7.6366 15.354-11.787 23.696z"/>
          <path d="m225.1 291.91c-1.6356-3.1e-5 -2.8994 0.28671-3.9451-0.068634-1.493-0.50739-3.5675-1.1808-4.0422-2.3378-0.60886-1.484-0.52339-3.9944 0.38878-5.2343 4.2394-5.7626 9.1434-11.044 13.267-16.881 3.1425-4.4477 6.4169-6.9789 12.279-4.0055v21.656c2.279 0.15097 4.193 0.27777 6.0605 0.40149 1.3418 5.7549 1.0544 6.1013-5.3554 6.7429-3.8485 4.8808 4.2317 4.6031 3.5826 8.5007h-20.87c0.3517-4.5121 8.8479-2.2303 6.2637-8.7733h-7.6303m3.7686-6.0166c1.3887-0.10904 2.7774-0.21808 3.7849-0.29718v-11.418c-2.9601 4.3854-5.2821 7.8253-7.9156 11.727 1.6734 0 2.4826 0 4.1308-0.012238z"/>
          <path d="m279.98 285.16c2.0652 0.14368 3.6948 0.14368 5.3178 0.14368 1.7896 5.8358-1.0354 7.2611-5.957 6.5522v4.3891c1.4268 1.0446 2.9593 2.1665 4.4917 3.2884-0.23108 0.36005-0.46219 0.72012-0.69327 1.0802h-20.718c0.54193-4.3939 8.8558-2.2182 6.2835-8.7031-3.8832 0-7.8742 0.17319-11.835-0.096772-1.3314-0.090728-3.3237-1.0383-3.7032-2.0744-0.57408-1.5672-0.6989-4.0794 0.20068-5.2777 5.2959-7.0544 10.67-14.098 16.655-20.555 1.615-1.7427 5.4395-1.4379 9.5222-2.3605 0 8.6894 0 16.08 0.43567 23.615m-10.962-2.7256v-7.1547c-0.32431-0.064179-0.64862-0.12836-0.97296-0.19254-2.3341 3.451-4.6682 6.902-7.0024 10.353 2.9108-0.79971 6.9207 3.0047 7.9753-3.0058z"/>
        </svg>`.trim();

      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        const scale = isMobile ? 1.0 : 2.0;
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          canvas.width / 2 - imgWidth / 2,
          canvas.height / 2 - imgHeight / 2,
          imgWidth,
          imgHeight
        );

        try {
          textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch (error) {
          console.warn("Failed to get image data:", error);
          textImageData = null;
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startParticles(imgWidth / 500); // maintain scale ratio for particles
        URL.revokeObjectURL(url);
      };

      img.src = url;
      return 0;
    }

    function startParticles(scale: number) {
      particles = [];
      createInitialParticles(scale);
      animate(scale);
    }

    function createParticle(_scale: number) {
      if (!ctx || !canvas || !textImageData) return null;

      const data = textImageData.data;
      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "white",
            scatteredColor: "white",
            letterIndex: 0,
            life: Math.random() * 100 + 50,
          };
        }
      }
      return null;
    }

    function createInitialParticles(scale: number) {
      if (!ctx || !canvas) return;

      const baseParticleCount = 7000;
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)));
      for (let i = 0; i < particleCount; i++) {
        const p = createParticle(scale);
        if (p) particles.push(p);
      }
    }

    let animationFrameId: number;

    function animate(scale: number) {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      const maxDistance = 240;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * 60;
          const moveY = Math.sin(angle) * force * 60;
          p.x = p.baseX - moveX;
          p.y = p.baseY - moveY;
          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          ctx.fillStyle = "white";
        }

        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.life--;
        if (p.life <= 0) {
          const newP = createParticle(scale);
          if (newP) particles[i] = newP;
          else {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      const baseCount = 7000;
      const targetCount = Math.floor(baseCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)));
      while (particles.length < targetCount) {
        const newP = createParticle(scale);
        if (newP) particles.push(newP);
      }

      animationFrameId = requestAnimationFrame(() => animate(scale));
    }

    createTextImage();

    const handleResize = () => {
      updateCanvasSize();
      setTimeout(() => createTextImage(), 10);
    };

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = () => (isTouchingRef.current = true);
    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      mousePositionRef.current = { x: 0, y: 0 };
    };

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with AREA44 logo"
      />
      <div className="absolute bottom-[100px] text-center z-10">
        <p className="font-mono text-gray-400 text-xs sm:text-base md:text-sm ">
          Welcome to{" "}
          <a
            href="https://github.com/area44"
            target="_blank"
            className="invite-link text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            rel="noreferrer"
          >
            AREA44
          </a>{" "}
          <span>-</span>{" "}
          <span className="transition-colors duration-300">Crafted with code & curiosity.</span>
          <style>{`
            a.invite-link:hover + span + span {
              color: #FF9900;
            }
          `}</style>
        </p>
      </div>
    </div>
  );
}
