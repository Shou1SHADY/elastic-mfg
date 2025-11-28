import { useEffect, useRef } from "react";

type Props = {
  height?: string | number;
  accentColors?: string[];
  density?: number;
  className?: string;
};

export default function TerminalGrid({
  height = "100vh",
  accentColors = ["#00e5ff"],
  density = 0,
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // three canvases: background (static gradient), grid (animated), beams (glows + cores)
  const bgRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<HTMLCanvasElement | null>(null);
  const beamRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const wrap = wrapRef.current;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bgCanvas = bgRef.current!;
    const gridCanvas = gridRef.current!;
    const beamCanvas = beamRef.current!;
    const bgCtx = bgCanvas.getContext("2d", { alpha: false })!; // opaque background
    const gridCtx = gridCanvas.getContext("2d", { alpha: true })!;
    const beamCtx = beamCanvas.getContext("2d", { alpha: true })!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    let W = 0;
    let H = 0;

    // beams
    type Beam = { x: number; y: number; vx: number; vy: number; color: string; width: number; life: number };
    let beams: Beam[] = [];

    function hexToRgba(hex: string, a: number) {
      const c = hex.replace("#", "");
      let r: number, g: number, b: number;
      if (c.length === 3) {
        r = parseInt(c[0] + c[0], 16);
        g = parseInt(c[1] + c[1], 16);
        b = parseInt(c[2] + c[2], 16);
      } else {
        r = parseInt(c.slice(0, 2), 16);
        g = parseInt(c.slice(2, 4), 16);
        b = parseInt(c.slice(4, 6), 16);
      }
      return `rgba(${r},${g},${b},${a})`;
    }

    function resize() {
      // measure in CSS pixels
      W = Math.max(320, wrap.clientWidth);
      H = Math.max(240, typeof height === "number" ? height : wrap.clientHeight);

      // set physical pixels and CSS size
      [bgCanvas, gridCanvas, beamCanvas].forEach((c) => {
        c.width = Math.floor(W * dpr);
        c.height = Math.floor(H * dpr);
        c.style.width = `${W}px`;
        c.style.height = `${H}px`;
      });

      // set transforms so we can draw in CSS pixels
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beamCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // redraw static background on resize
      drawGradientBackground(bgCtx);
    }

    function drawGradientBackground(ctx: CanvasRenderingContext2D) {
      // fill full rect (opaque)
      ctx.clearRect(0, 0, W, H);

      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#04040a");
      g.addColorStop(0.45, "#07060c");
      g.addColorStop(1, "#0b0811");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const rg = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, Math.max(W, H) * 0.9);
      rg.addColorStop(0, "rgba(12,10,20,0.45)");
      rg.addColorStop(1, "rgba(5,6,10,0.0)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);
    }

    // mouse parallax - currently unused since we're using straight vertical lines
    // let mouseX = W / 2;
    // let mouseY = H / 2;
    // function onMove(e: MouseEvent) {
    //   const rect = wrap.getBoundingClientRect();
    //   mouseX = e.clientX - rect.left;
    //   mouseY = e.clientY - rect.top;
    // }
    // function onTouch(e: TouchEvent) {
    //   const rect = wrap.getBoundingClientRect();
    //   const t0 = e.touches[0];
    //   mouseX = t0.clientX - rect.left;
    //   mouseY = t0.clientY - rect.top;
    // }

    function spawnBeam() {
  const color = accentColors[0] ?? "#00e5ff";
  const width = 0.6 + Math.random() * 1.6;

  // snap points for the grid
  const gridX: number[] = [];
  const gridY: number[] = [];

  const colCount = Math.ceil(W / 120) + 6;
  const rowCount = Math.ceil(H / 120) + 6;

  for (let i = -3; i <= colCount; i++) {
    gridX.push(i * 120);
  }
  for (let i = 0; i <= rowCount; i++) {
    gridY.push(i * 120);
  }

  const vertical = Math.random() < 0.5;

  if (vertical) {
    // choose an exact vertical grid line
    const x = gridX[Math.floor(Math.random() * gridX.length)];

    const fromTop = Math.random() < 0.5;
    beams.push({
      x,
      y: fromTop ? -40 : H + 40,
      vx: 0,
      vy: fromTop ? (60 + Math.random() * 140) : -(60 + Math.random() * 140),
      color,
      width,
      life: 0,
    });
  } else {
    // choose an exact horizontal grid line
    const y = gridY[Math.floor(Math.random() * gridY.length)];

    const fromLeft = Math.random() < 0.5;
    beams.push({
      x: fromLeft ? -60 : W + 60,
      y,
      vx: fromLeft ? (80 + Math.random() * 160) : -(80 + Math.random() * 160),
      vy: 0,
      color,
      width,
      life: 0,
    });
  }

  // limit beams
  if (beams.length > 6) beams.splice(0, beams.length - 6);
}

    // draw grid each frame; this canvas is cleared every frame so gradient below stays intact
    function drawPerspectiveGrid(ctx: CanvasRenderingContext2D) { // Remove unused t parameter
      ctx.clearRect(0, 0, W, H);

      // STATIC SQUARE GRID - more visible but still light
      ctx.save();
      ctx.lineWidth = 1.0; // Slightly thicker for better visibility
      ctx.strokeStyle = "rgba(120,140,180,0.25)"; // More visible, less transparent
      ctx.globalCompositeOperation = "source-over";

      const cols = Math.ceil(W / 120) + 6;
      const horCount = Math.ceil(H / 120);
      
      // Draw vertical lines with gradient transparency
      for (let i = -3; i <= cols; i++) {
        const gx = i * 120;
        
        // Create gradient for vertical line (fade at top and bottom)
        const gradient = ctx.createLinearGradient(gx, 0, gx, H);
        gradient.addColorStop(0, 'rgba(120,140,180,0)'); // Transparent at top
        gradient.addColorStop(0.15, 'rgba(120,140,180,0.25)'); // Fade in
        gradient.addColorStop(0.85, 'rgba(120,140,180,0.25)'); // Maintain opacity
        gradient.addColorStop(1, 'rgba(120,140,180,0)'); // Transparent at bottom
        
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H); // Extend to full height
        ctx.stroke();
      }
      ctx.restore();

      // Draw horizontal lines with gradient transparency
      ctx.save();
      ctx.lineWidth = 1.0;
      ctx.globalCompositeOperation = "source-over";
      
      for (let i = 0; i <= horCount; i++) {
        const gy = i * 120;
        
        // Skip the very first and lines near the bottom (make them completely transparent)
        // Larger buffer to hide lines near footer
        if (i === 0 || gy >= H - 150) { // Increased buffer for footer area
          continue; // Skip drawing these lines entirely
        }
        
        // Create gradient for horizontal line (fade at edges)
        const gradient = ctx.createLinearGradient(0, gy, W, gy);
        gradient.addColorStop(0, 'rgba(120,140,180,0)'); // Transparent at left
        gradient.addColorStop(0.15, 'rgba(120,140,180,0.25)'); // Fade in
        gradient.addColorStop(0.85, 'rgba(120,140,180,0.25)'); // Maintain opacity
        gradient.addColorStop(1, 'rgba(120,140,180,0)'); // Transparent at right
        
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }
      ctx.restore();

      // subtle accent lines - more visible with gradient
      ctx.save();
      ctx.lineWidth = 1.2; // Slightly thicker for accents
      ctx.globalCompositeOperation = "screen";
      
      // Vertical accent lines with gradient
      for (let i = -1; i <= cols; i += 3) {
        const gx = i * 120;
        
        // Create gradient for vertical accent line
        const gradient = ctx.createLinearGradient(gx, 0, gx, H);
        gradient.addColorStop(0, 'rgba(200,220,255,0)'); // Transparent at top
        gradient.addColorStop(0.15, 'rgba(200,220,255,0.12)'); // Fade in
        gradient.addColorStop(0.85, 'rgba(200,220,255,0.12)'); // Maintain opacity
        gradient.addColorStop(1, 'rgba(200,220,255,0)'); // Transparent at bottom
        
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H); // Extend to full height
        ctx.stroke();
      }
      
      // Horizontal accent lines with gradient
      for (let i = 0; i <= horCount; i += 3) {
        const gy = i * 120;
        
        // Skip the very first and lines near the bottom (make them completely transparent)
        // Larger buffer to hide lines near footer
        if (i === 0 || gy >= H - 150) { // Increased buffer for footer area
          continue; // Skip drawing these lines entirely
        }
        
        // Create gradient for horizontal accent line
        const gradient = ctx.createLinearGradient(0, gy, W, gy);
        gradient.addColorStop(0, 'rgba(200,220,255,0)'); // Transparent at left
        gradient.addColorStop(0.15, 'rgba(200,220,255,0.12)'); // Fade in
        gradient.addColorStop(0.85, 'rgba(200,220,255,0.12)'); // Maintain opacity
        gradient.addColorStop(1, 'rgba(200,220,255,0)'); // Transparent at right
        
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawBeams(ctx: CanvasRenderingContext2D, dt: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      beams.forEach((b) => {
        b.life += dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        const lifeProgress = b.life / 2.6; // fade speed
        const alpha = Math.max(0, 1 - lifeProgress);

        // Original size glow with increased opacity
        const glow = 18 + Math.abs(Math.sin(b.life * 2.2)) * 18;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glow);
        g.addColorStop(0, hexToRgba(b.color, 1.0 * alpha)); // Increased from 0.9 to 1.0
        g.addColorStop(0.45, hexToRgba(b.color, 0.5 * alpha)); // Increased from 0.35 to 0.5
        g.addColorStop(1, hexToRgba(b.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // Shorter core colored stroke
        ctx.strokeStyle = hexToRgba(b.color, 1.0 * alpha); // Already full opacity
        ctx.lineWidth = b.width;
        ctx.beginPath();
        if (Math.abs(b.vx) > 0.1) {
          ctx.moveTo(b.x - 20, b.y); // Reduced from 40 to 20
          ctx.lineTo(b.x + 20, b.y); // Reduced from 40 to 20
        } else {
          ctx.moveTo(b.x, b.y - 20); // Reduced from 40 to 20
          ctx.lineTo(b.x, b.y + 20); // Reduced from 40 to 20
        }
        ctx.stroke();

        // Shorter white core with increased opacity
        ctx.strokeStyle = hexToRgba("#ffffff", 0.8 * alpha); // Increased from 0.65 to 0.8
        ctx.lineWidth = Math.max(0.6, b.width * 0.28);
        ctx.beginPath();
        if (Math.abs(b.vx) > 0.1) {
          ctx.moveTo(b.x - 12, b.y); // Reduced from 24 to 12
          ctx.lineTo(b.x + 12, b.y); // Reduced from 24 to 12
        } else {
          ctx.moveTo(b.x, b.y - 12); // Reduced from 24 to 12
          ctx.lineTo(b.x, b.y + 12); // Reduced from 24 to 12
        }
        ctx.stroke();
      });

      // trim
      beams = beams.filter((b) => b.life < 3 && b.x > -150 && b.x < W + 150 && b.y > -150 && b.y < H + 150);
      ctx.restore();
    }

    // animation loop
    let last = performance.now();
    let time = 0;
    function loop(now: number) {
      const dt = Math.min(0.06, (now - last) / 1000);
      last = now;
      time += dt;

      // grid draws on top of static background (grid canvas is transparent)
      drawPerspectiveGrid(gridCtx); // Remove time parameter

      if (!prefersReduced) {
        if (Math.random() < 0.02) spawnBeam();
        drawBeams(beamCtx, dt); // Beams always draw after grid
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    // init
    resize();
    spawnBeam();

    // events
    window.addEventListener("resize", resize);
    // Mouse/touch events removed since we're not using parallax
    // window.addEventListener("mousemove", onMove);
    // window.addEventListener("touchstart", onTouch, { passive: true });
    // window.addEventListener("touchmove", onTouch, { passive: true });

    rafRef.current = requestAnimationFrame(loop);

    // cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      // Mouse/touch cleanup removed since events are not added
      // window.removeEventListener("mousemove", onMove);
      // window.removeEventListener("touchstart", onTouch);
      // window.removeEventListener("touchmove", onTouch);
    };
  }, [accentColors, density, height]);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ height }}
      aria-hidden
    >
      {/* background (static) */}
      <canvas
        ref={bgRef}
        className="absolute inset-0 w-full h-full block"
        style={{ zIndex: 1 }}
      />
      {/* animated grid lines (transparent) */}
      <canvas
        ref={gridRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
        style={{ zIndex: 2 }}
      />
      {/* beams on top */}
      <canvas
        ref={beamRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
        style={{ zIndex: 3 }}
      />
      {/* subtle vignette overlay for depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0.5) 100%)",
          mixBlendMode: "overlay",
          zIndex: 4,
        }}
      />
    </div>
  );
}
