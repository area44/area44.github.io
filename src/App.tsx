import { useRef, useEffect, useState } from "react"


export default function AREA44() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768) // Set mobile breakpoint
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
      letterIndex: number
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      // Ensure canvas has valid dimensions before proceeding
      if (canvas.width <= 0 || canvas.height <= 0) {
        return 0
      }

      ctx.fillStyle = "white"
      ctx.save()

      const fontSize = isMobile ? 48 : 96
      ctx.font = `bold ${fontSize}px 'Courier New', monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const text = "AREA44"

      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.fillText(text, 0, 0)

      ctx.restore()

      // Additional validation before getImageData
      try {
        textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      } catch (error) {
        console.warn("Failed to get image data:", error)
        textImageData = null
        return 0
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return fontSize / 96 // Return scale factor
    }

    function getLetterIndex(x: number, _y: number): number {
      if (!ctx || !canvas) return 0
      // Determine which letter the particle belongs to based on position
      const centerX = canvas.width / 2
      const fontSize = isMobile ? 48 : 96
      const letterWidth = fontSize * 0.6 // Approximate letter width for monospace

      const relativeX = x - centerX
      const letterPosition = Math.floor((relativeX + letterWidth * 3) / letterWidth)

      return Math.max(0, Math.min(5, letterPosition)) // Clamp to 0-5 for "AREA44"
    }

    function getColorForLetter(letterIndex: number): string {
      const colors = [
        "#FF6B35", // A - Orange/Red
        "#F7931E", // R - Orange
        "#FFD23F", // E - Yellow
        "#06D6A0", // A - Teal/Green
        "#118AB2", // 4 - Blue
        "#073B4C", // 4 - Dark Blue
      ]
      return colors[letterIndex] || "#FF6B35"
    }

    function createParticle(_scale: number) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          const letterIndex = getLetterIndex(x, y)
          const scatteredColor = getColorForLetter(letterIndex)

          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "white",
            scatteredColor: scatteredColor,
            letterIndex: letterIndex,
            life: Math.random() * 100 + 50,
          }
        }
      }

      return null
    }

    function createInitialParticles(scale: number) {
      if (!ctx || !canvas) return 0
      const baseParticleCount = 7000 // Increased base count for higher density
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale)
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number

    function animate(scale: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 240

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 60
          const moveY = Math.sin(angle) * force * 60
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY

          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
          ctx.fillStyle = "white"
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle(scale)
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const baseParticleCount = 7000
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
      )
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale)
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      // Add a small delay to ensure canvas dimensions are properly set
      setTimeout(() => {
        const newScale = createTextImage()
        if (newScale > 0) {
          particles = []
          createInitialParticles(newScale)
        }
      }, 10)
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

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
  )
}

