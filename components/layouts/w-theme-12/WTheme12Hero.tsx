"use client";

import { useEffect, useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// ── Content ─────────────────────────────────────────────────────────────────

const PORTRAIT_SRC = "/my-3d-avatar.png";

const EXPOSURE = [
  { k: "ISO", v: "100% GOAT · 32/32" },
  { k: "f/", v: "0% false positives" },
  { k: "exp", v: "9 years · 5 providers" },
] as const;

interface ProjectFrame {
  frame: string;
  name: string;
  desc: string;
  metric: string;
  stack: string;
}

const PROJECTS: ProjectFrame[] = [
  {
    frame: "01",
    name: "Artemis",
    desc: "Multi-cloud attack-path simulation. GCP SCC and AWS Security Hub unified into an AI-enriched graph layer across the estate.",
    metric: "2,800+ accounts",
    stack: "Python · GCP SCC · AWS Security Hub · Vertex AI",
  },
  {
    frame: "02",
    name: "IAM Audit Agent",
    desc: "Boto3 tool-calling agent traversing 65+ escalation paths across 10 vulnerability classes with semantic interpretation of transitive chains.",
    metric: "100% GOAT recall",
    stack: "IAM · Python · Boto3 · LLM tool-use",
  },
  {
    frame: "03",
    name: "Autonomous Threat Intel",
    desc: "19 models from 5 providers behind a performance-weighted router. Analyst-ready proposals at a fraction of baseline cost.",
    metric: "$1.40 / run",
    stack: "Multi-Agent · Claude · GPT · Gemini",
  },
  {
    frame: "04",
    name: "Detection Engine",
    desc: "200+ active signatures deployed via Terraform. MITRE ATT&CK gap analysis. Zero false positives at account scale.",
    metric: "200+ signatures",
    stack: "Python · Lambda · Terraform · MITRE ATT&CK",
  },
];

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

// ── Dithering canvas (WebGL with 2D fallback) ───────────────────────────────
// Renders the portrait as an ordered (Bayer 8x8) 1-bit dither that "develops"
// from black → resolved as uThreshold tweens 0→1. Cursor proximity locally
// sharpens (reduces dither density) so the image clarifies under the pointer.

interface DitherHandle {
  setThreshold: (t: number) => void;
  setPointer: (x: number, y: number, active: boolean) => void;
  startLoop: () => void;
  stopLoop: () => void;
  renderOnce: () => void;
  dispose: () => void;
  mode: "webgl" | "2d";
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = vec2(aPos.x * 0.5 + 0.5, 1.0 - (aPos.y * 0.5 + 0.5));
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;          // canvas px size
uniform vec2 uImg;          // image aspect (cover)
uniform float uThreshold;   // 0 = black, 1 = resolved
uniform vec2 uPointer;      // pointer in uv (0..1)
uniform float uPointerOn;   // 0/1
uniform vec2 uTexel;        // image dims for cover math
uniform vec3 uInk;          // bright dither dot color
uniform vec3 uPaper;        // dark background color

// 8x8 ordered Bayer matrix, normalized 0..1
float bayer8(vec2 p){
  int x = int(mod(p.x, 8.0));
  int y = int(mod(p.y, 8.0));
  int i = y * 8 + x;
  float m[64];
  m[0]=0.0;m[1]=32.0;m[2]=8.0;m[3]=40.0;m[4]=2.0;m[5]=34.0;m[6]=10.0;m[7]=42.0;
  m[8]=48.0;m[9]=16.0;m[10]=56.0;m[11]=24.0;m[12]=50.0;m[13]=18.0;m[14]=58.0;m[15]=26.0;
  m[16]=12.0;m[17]=44.0;m[18]=4.0;m[19]=36.0;m[20]=14.0;m[21]=46.0;m[22]=6.0;m[23]=38.0;
  m[24]=60.0;m[25]=28.0;m[26]=52.0;m[27]=20.0;m[28]=62.0;m[29]=30.0;m[30]=54.0;m[31]=22.0;
  m[32]=3.0;m[33]=35.0;m[34]=11.0;m[35]=43.0;m[36]=1.0;m[37]=33.0;m[38]=9.0;m[39]=41.0;
  m[40]=51.0;m[41]=19.0;m[42]=59.0;m[43]=27.0;m[44]=49.0;m[45]=17.0;m[46]=57.0;m[47]=25.0;
  m[48]=15.0;m[49]=47.0;m[50]=7.0;m[51]=39.0;m[52]=13.0;m[53]=45.0;m[54]=5.0;m[55]=37.0;
  m[56]=63.0;m[57]=31.0;m[58]=55.0;m[59]=23.0;m[60]=61.0;m[61]=29.0;m[62]=53.0;m[63]=21.0;
  float v = 0.0;
  for(int k=0;k<64;k++){ if(k==i){ v = m[k]; } }
  return (v + 0.5) / 64.0;
}

void main(){
  // cover-fit the image into the canvas
  float canvasAspect = uRes.x / uRes.y;
  float imgAspect = uImg.x / uImg.y;
  vec2 uv = vUv;
  if(canvasAspect > imgAspect){
    float s = imgAspect / canvasAspect;
    uv.y = (uv.y - 0.5) * s + 0.5;
  } else {
    float s = canvasAspect / imgAspect;
    uv.x = (uv.x - 0.5) * s + 0.5;
  }

  vec4 tex = texture2D(uTex, uv);
  // luminance; treat out-of-frame & transparent as background
  float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
  float inFrame = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0) * tex.a;
  lum = mix(0.02, lum, inFrame);

  // develop: threshold pushes the image up from black over time, with a soft
  // emerging edge so it "fades in" like film in developer fluid
  float dev = smoothstep(0.0, 1.0, uThreshold);
  lum = lum * dev;

  // pointer sharpen: near the cursor reduce dither contribution → smoother grays
  float pd = 1.0;
  if(uPointerOn > 0.5){
    float d = distance(vUv, uPointer);
    pd = smoothstep(0.0, 0.26, d); // 0 at center (sharp), 1 far (full dither)
  }

  // pixelate the dither grid so dots read as physical halftone
  float cell = 2.0;
  vec2 px = floor(gl_FragCoord.xy / cell);
  float th = bayer8(px);

  // blend between hard 1-bit dither (pd=1) and smooth tone (pd=0)
  float dithered = step(th, lum);
  float smoothTone = smoothstep(th - 0.5, th + 0.5, lum);
  float v = mix(smoothTone, dithered, pd);

  vec3 col = mix(uPaper, uInk, v);
  gl_FragColor = vec4(col, 1.0);
}`;

function createDither(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  ink: [number, number, number],
  paper: [number, number, number]
): DitherHandle | null {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let raf = 0;
  let threshold = 0;
  const pointer = { x: 0.5, y: 0.5, on: 0 };

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
  };
  resize();

  // ── WebGL path ──
  const gl = (canvas.getContext("webgl", { antialias: false, alpha: false }) ||
    canvas.getContext("experimental-webgl", { antialias: false, alpha: false })) as WebGLRenderingContext | null;

  if (gl) {
    try {
      const compile = (type: number, src: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(sh) || "shader compile failed");
        }
        return sh;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(prog) || "link failed");
      }
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const u = {
        res: gl.getUniformLocation(prog, "uRes"),
        img: gl.getUniformLocation(prog, "uImg"),
        threshold: gl.getUniformLocation(prog, "uThreshold"),
        pointer: gl.getUniformLocation(prog, "uPointer"),
        pointerOn: gl.getUniformLocation(prog, "uPointerOn"),
        ink: gl.getUniformLocation(prog, "uInk"),
        paper: gl.getUniformLocation(prog, "uPaper"),
      };
      gl.uniform2f(u.img, img.naturalWidth, img.naturalHeight);
      gl.uniform3f(u.ink, ink[0], ink[1], ink[2]);
      gl.uniform3f(u.paper, paper[0], paper[1], paper[2]);

      const draw = () => {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(u.res, canvas.width, canvas.height);
        gl.uniform1f(u.threshold, threshold);
        gl.uniform2f(u.pointer, pointer.x, pointer.y);
        gl.uniform1f(u.pointerOn, pointer.on);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const onResize = () => {
        resize();
        draw();
      };
      window.addEventListener("resize", onResize);

      const loop = () => {
        draw();
        raf = requestAnimationFrame(loop);
      };

      return {
        mode: "webgl",
        setThreshold: (t) => {
          threshold = t;
        },
        setPointer: (x, y, active) => {
          pointer.x = x;
          pointer.y = y;
          pointer.on = active ? 1 : 0;
        },
        startLoop: () => {
          if (!raf) raf = requestAnimationFrame(loop);
        },
        stopLoop: () => {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        },
        renderOnce: () => {
          resize();
          draw();
        },
        dispose: () => {
          if (raf) cancelAnimationFrame(raf);
          window.removeEventListener("resize", onResize);
        },
      };
    } catch {
      // fall through to 2D
    }
  }

  // ── 2D fallback ──
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const off = document.createElement("canvas");
  const octx = off.getContext("2d")!;
  const inkCss = `rgb(${Math.round(ink[0] * 255)},${Math.round(ink[1] * 255)},${Math.round(ink[2] * 255)})`;
  const paperCss = `rgb(${Math.round(paper[0] * 255)},${Math.round(paper[1] * 255)},${Math.round(paper[2] * 255)})`;

  const BAYER = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
  ];

  // low-res luminance buffer computed once (cover-fit)
  let lumBuf: Float32Array = new Float32Array(0);
  let gw = 0;
  let gh = 0;
  const CELL = 3; // px per dither cell on screen

  const buildLum = () => {
    const W = canvas.width;
    const H = canvas.height;
    gw = Math.max(1, Math.floor(W / CELL));
    gh = Math.max(1, Math.floor(H / CELL));
    off.width = gw;
    off.height = gh;
    // cover fit
    const ca = gw / gh;
    const ia = img.naturalWidth / img.naturalHeight;
    let dw = gw;
    let dh = gh;
    let dx = 0;
    let dy = 0;
    if (ca > ia) {
      dw = gw;
      dh = gw / ia;
      dy = (gh - dh) / 2;
    } else {
      dh = gh;
      dw = gh * ia;
      dx = (gw - dw) / 2;
    }
    octx.fillStyle = "#000";
    octx.fillRect(0, 0, gw, gh);
    octx.drawImage(img, dx, dy, dw, dh);
    const data = octx.getImageData(0, 0, gw, gh).data;
    lumBuf = new Float32Array(gw * gh);
    for (let i = 0; i < gw * gh; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      const a = data[i * 4 + 3] / 255;
      lumBuf[i] = ((0.299 * r + 0.587 * g + 0.114 * b) / 255) * a;
    }
  };
  buildLum();

  const draw = () => {
    const W = canvas.width;
    const H = canvas.height;
    ctx.fillStyle = paperCss;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = inkCss;
    const dev = threshold;
    const pxX = pointer.x * W;
    const pxY = pointer.y * H;
    const sharpR = 0.26 * Math.min(W, H);
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const lum = lumBuf[y * gw + x] * dev;
        const th = (BAYER[y & 7][x & 7] + 0.5) / 64;
        const sx = x * CELL;
        const sy = y * CELL;
        let on: boolean;
        if (pointer.on) {
          const d = Math.hypot(sx + CELL / 2 - pxX, sy + CELL / 2 - pxY);
          if (d < sharpR) {
            // sharpen: smoother tone near pointer
            const k = d / sharpR; // 0..1
            const smoothV = Math.max(0, Math.min(1, (lum - (th - 0.5)) / 1));
            on = lum > th ? true : smoothV > 0.5;
            on = (1 - k) > 0.5 ? smoothV > 0.5 : lum > th;
          } else {
            on = lum > th;
          }
        } else {
          on = lum > th;
        }
        if (on) ctx.fillRect(sx, sy, CELL, CELL);
      }
    }
  };

  const onResize = () => {
    resize();
    buildLum();
    draw();
  };
  window.addEventListener("resize", onResize);

  const loop = () => {
    draw();
    raf = requestAnimationFrame(loop);
  };

  return {
    mode: "2d",
    setThreshold: (t) => {
      threshold = t;
    },
    setPointer: (x, y, active) => {
      pointer.x = x;
      pointer.y = y;
      pointer.on = active ? 1 : 0;
    },
    startLoop: () => {
      if (!raf) raf = requestAnimationFrame(loop);
    },
    stopLoop: () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
    renderOnce: () => {
      resize();
      buildLum();
      draw();
    },
    dispose: () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    },
  };
}

// ── Component ───────────────────────────────────────────────────────────────

export default function WTheme12Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<DitherHandle | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Build the dither engine + develop animation (own RAF/effect, not GSAP-owned)
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const INK: [number, number, number] = [0.95, 0.95, 0.93]; // bone-white dots
    const PAPER: [number, number, number] = [0.024, 0.024, 0.024]; // paper-black

    let disposed = false;
    let pointerActive = false;
    const img = new Image();
    img.decoding = "async";

    let onMove: ((e: PointerEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;
    let io: IntersectionObserver | null = null;
    let developTween: gsap.core.Tween | null = null;

    img.onload = () => {
      if (disposed) return;
      const handle = createDither(canvas, img, INK, PAPER);
      if (!handle) return;
      handleRef.current = handle;

      if (prefersReduced) {
        // Static final resolved frame — no RAF, no develop, no pointer loop.
        handle.setThreshold(1);
        handle.setPointer(0.5, 0.5, false);
        handle.renderOnce();
        return;
      }

      // Develop: threshold 0 → 1 (film emerging in developer fluid)
      handle.setThreshold(0);
      handle.startLoop();
      const env = { t: 0 };
      developTween = gsap.to(env, {
        t: 1,
        duration: 1.6,
        ease: "power2.inOut",
        delay: 0.15,
        onUpdate: () => handle.setThreshold(env.t),
      });

      // Cursor sharpen
      onMove = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        pointerActive = true;
        handle.setPointer(x, y, true);
      };
      onLeave = () => {
        pointerActive = false;
        handle.setPointer(0.5, 0.5, false);
      };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);

      // Pause RAF when the stage scrolls off-screen
      io = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (e.isIntersecting) handle.startLoop();
          else handle.stopLoop();
        },
        { threshold: 0.01 }
      );
      io.observe(stage);
      void pointerActive;
    };
    img.src = PORTRAIT_SRC;

    return () => {
      disposed = true;
      developTween?.kill();
      if (onMove) stage.removeEventListener("pointermove", onMove);
      if (onLeave) stage.removeEventListener("pointerleave", onLeave);
      io?.disconnect();
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, []);

  // DOM text / scroll reveals (GSAP-owned)
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const split = SplitText.create(".w12-name", { type: "chars", mask: "chars", aria: "none" });
      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        duration: 1.0,
        stagger: 0.035,
        ease: "power4.out",
        delay: 0.35,
      });

      gsap.from(".w12-exposure > *", {
        autoAlpha: 0,
        y: 10,
        duration: 0.7,
        stagger: 0.07,
        ease: "power2.out",
        delay: 1.05,
      });
      gsap.from(".w12-lede", { autoAlpha: 0, y: 14, duration: 0.8, ease: "power2.out", delay: 1.2 });

      gsap.utils.toArray<HTMLElement>(".w12-rule").forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.inOut",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".w12-sheet-row").forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 86%", once: true },
        });
      });

      gsap.from(".w12-contact-row", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".w12-contact", start: "top 86%", once: true },
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="w12-root" ref={rootRef}>
      <a href="#w12-main" className="w12-skip">Skip to main content</a>
      <h1 className="w12-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids. Cloud security engineer
        building AI-native security platforms.
      </h1>

      <nav className="w12-nav" aria-label="Primary navigation">
        <span className="w12-nav-logo" aria-hidden="true">
          KK<span className="w12-nav-dot">·</span>
        </span>
        <span className="w12-nav-mid" aria-hidden="true">AVATAR</span>
        <span className="w12-nav-status">
          <span className="w12-status-dot" aria-hidden="true" />
          Open to work
        </span>
      </nav>

      <main id="w12-main">
        {/* ── Darkroom hero ──────────────────────────────────────────────── */}
        <header className="w12-hero">
          <div className="w12-stage" ref={stageRef}>
            <canvas ref={canvasRef} className="w12-canvas" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PORTRAIT_SRC}
              alt="Portrait of Koushik Kotamraju"
              className="w12-portrait"
            />
            <span className="w12-frame-tick w12-frame-tick--tl" aria-hidden="true" />
            <span className="w12-frame-tick w12-frame-tick--tr" aria-hidden="true" />
            <span className="w12-frame-tick w12-frame-tick--bl" aria-hidden="true" />
            <span className="w12-frame-tick w12-frame-tick--br" aria-hidden="true" />
          </div>

          <div className="w12-hero-text">
            <p className="w12-kicker">
              <span aria-hidden="true">◖</span> Sr. Security Engineer · Yahoo Paranoids
            </p>
            <div className="w12-name" aria-hidden="true">
              Koushik
              <br />
              Kotamraju
            </div>

            <div className="w12-exposure" role="list" aria-label="Exposure status">
              {EXPOSURE.map((e) => (
                <span key={e.k} className="w12-exposure-item" role="listitem">
                  <span className="w12-exposure-k">{e.k}</span>
                  <span className="w12-exposure-v">{e.v}</span>
                </span>
              ))}
            </div>

            <p className="w12-lede">
              Cloud security engineer building AI-native security platforms — production
              systems, not prototypes. Nine years, securing 2,800+ cloud accounts.
            </p>
          </div>
        </header>

        <div className="w12-rule" aria-hidden="true" />

        {/* ── Contact sheet of projects ──────────────────────────────────── */}
        <section className="w12-sheet" aria-labelledby="w12-sheet-head">
          <div className="w12-sheet-top">
            <h2 id="w12-sheet-head" className="w12-sheet-title">Contact sheet — selected work</h2>
            <span className="w12-sheet-num" aria-hidden="true">04 frames</span>
          </div>

          <ol className="w12-sheet-list" role="list">
            {PROJECTS.map((p) => (
              <li key={p.frame} className="w12-sheet-row" aria-label={`Project: ${p.name}`}>
                <span className="w12-sheet-frame" aria-hidden="true">{p.frame}</span>
                <div className="w12-sheet-body">
                  <h3 className="w12-sheet-name">{p.name}</h3>
                  <p className="w12-sheet-desc">{p.desc}</p>
                  <p className="w12-sheet-stack" aria-label="Stack">{p.stack}</p>
                </div>
                <span className="w12-sheet-metric" aria-hidden="true">{p.metric}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="w12-rule" aria-hidden="true" />

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <section className="w12-contact" aria-labelledby="w12-contact-head">
          <div className="w12-contact-left">
            <p className="w12-kicker"><span aria-hidden="true">◖</span> Develop the next frame</p>
            <h2 id="w12-contact-head" className="w12-contact-title">
              Open to Staff &amp; Principal Security Engineer roles.
            </h2>
          </div>
          <div className="w12-contact-links">
            {CONTACT.map((c) => (
              <a
                key={c.k}
                href={c.href}
                className="w12-contact-row"
                {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="w12-contact-k">{c.k}</span>
                <span className="w12-contact-v">{c.v}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
