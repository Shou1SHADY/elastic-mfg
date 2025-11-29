import React, { useContext, useEffect, useRef, useState } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import type { MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

interface ScrollVelocityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  baseVelocity?: number
  direction?: 1 | -1
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const ScrollVelocityContext = React.createContext<MotionValue<number> | null>(
  null
)

export function ScrollVelocityContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  
  // Enhanced mobile smoothing with different spring configs
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: isMobile ? 80 : 50, // Higher damping for mobile to reduce jitter
    stiffness: isMobile ? 300 : 400, // Lower stiffness for smoother mobile response
    restDelta: 0.001, // Better precision for stopping
  })
  
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1
    // Reduce velocity sensitivity on mobile to prevent overreaction
    const mobileMultiplier = isMobile ? 0.7 : 1.0
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5 * mobileMultiplier)
    return sign * magnitude
  })

  return (
    <ScrollVelocityContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  )
}

export function ScrollVelocityRow(props: ScrollVelocityRowProps) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext)
  if (sharedVelocityFactor) {
    return (
      <ScrollVelocityRowImpl {...props} velocityFactor={sharedVelocityFactor} />
    )
  }
  return <ScrollVelocityRowLocal {...props} />
}

interface ScrollVelocityRowImplProps extends ScrollVelocityRowProps {
  velocityFactor: MotionValue<number>
}

function ScrollVelocityRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  ...props
}: ScrollVelocityRowImplProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const [numCopies, setNumCopies] = useState(1)

  const baseX = useMotionValue(0)
  const baseDirectionRef = useRef<number>(direction >= 0 ? 1 : -1)
  const currentDirectionRef = useRef<number>(direction >= 0 ? 1 : -1)
  const unitWidth = useMotionValue(0)
  const lastVelocityRef = useRef<number>(0)
  const directionChangeDebounceRef = useRef<number>(0)

  const isInViewRef = useRef(true)
  const isPageVisibleRef = useRef(true)
  const prefersReducedMotionRef = useRef(false)
  const isMobileRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const block = blockRef.current
    if (!container || !block) return

    // Detect mobile device
    isMobileRef.current = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    const updateSizes = () => {
      const cw = container.offsetWidth || 0
      const bw = block.scrollWidth || 0
      unitWidth.set(bw)
      const nextCopies = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1
      setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies))
    }

    updateSizes()

    const ro = new ResizeObserver(updateSizes)
    ro.observe(container)
    ro.observe(block)

    const io = new IntersectionObserver(([entry]) => {
      isInViewRef.current = entry.isIntersecting
    })
    io.observe(container)

    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === "visible"
    }
    document.addEventListener("visibilitychange", handleVisibility, {
      passive: true,
    })
    handleVisibility()

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handlePRM = () => {
      prefersReducedMotionRef.current = mq.matches
    }
    mq.addEventListener("change", handlePRM)
    handlePRM()

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
      mq.removeEventListener("change", handlePRM)
    }
  }, [children, unitWidth])

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1
    const offset = Number(v) || 0
    return `${-wrap(0, width, offset)}px`
  })

  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current || !isPageVisibleRef.current) return
    const dt = delta / 1000
    const vf = velocityFactor.get()
    const absVf = Math.min(5, Math.abs(vf))
    
    // Apply mobile-specific smoothing
    const speedMultiplier = prefersReducedMotionRef.current ? 1 : 1 + absVf

    // Improved direction change handling with debouncing
    const currentTime = Date.now()
    const velocityThreshold = isMobileRef.current ? 0.05 : 0.1
    
    if (absVf > velocityThreshold) {
      const scrollDirection = vf >= 0 ? 1 : -1
      
      // Debounce direction changes on mobile to prevent jitter
      if (isMobileRef.current) {
        if (currentTime - directionChangeDebounceRef.current > 100) { // 100ms debounce
          const lastDirection = lastVelocityRef.current >= 0 ? 1 : -1
          if (scrollDirection !== lastDirection) {
            currentDirectionRef.current = baseDirectionRef.current * scrollDirection
            directionChangeDebounceRef.current = currentTime
          }
        }
      } else {
        currentDirectionRef.current = baseDirectionRef.current * scrollDirection
      }
    }
    
    lastVelocityRef.current = vf

    const bw = unitWidth.get() || 0
    if (bw <= 0) return
    
    // Reduce base velocity on mobile for smoother experience
    const adjustedBaseVelocity = isMobileRef.current ? baseVelocity * 0.7 : baseVelocity
    const pixelsPerSecond = (bw * adjustedBaseVelocity) / 100
    
    // Apply smoother movement calculation
    const moveBy = currentDirectionRef.current * pixelsPerSecond * speedMultiplier * dt
    
    // Use smooth transition on mobile to prevent jumps
    if (isMobileRef.current) {
      const currentX = baseX.get()
      const targetX = currentX + moveBy
      // Smooth interpolation to prevent sudden position changes
      const smoothFactor = 0.8 // Adjust for desired smoothness
      baseX.set(currentX + (targetX - currentX) * smoothFactor)
    } else {
      baseX.set(baseX.get() + moveBy)
    }
  })

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap", className)}
      {...props}
    >
      <motion.div
        className="inline-flex transform-gpu items-center will-change-transform select-none"
        style={{ x }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : null}
            aria-hidden={i !== 0}
            className="inline-flex shrink-0 items-center"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function ScrollVelocityRowLocal(props: ScrollVelocityRowProps) {
  const { scrollY } = useScroll()
  const localVelocity = useVelocity(scrollY)
  
  // Use same mobile-optimized spring configuration
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: isMobile ? 80 : 50,
    stiffness: isMobile ? 300 : 400,
    restDelta: 0.001,
  })
  
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1
    const mobileMultiplier = isMobile ? 0.7 : 1.0
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5 * mobileMultiplier)
    return sign * magnitude
  })
  return (
    <ScrollVelocityRowImpl {...props} velocityFactor={localVelocityFactor} />
  )
}
