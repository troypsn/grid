"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const navItems = [
  { label: "About Me", image: "/stickman.webm", sectionId: "aboutme" },
  { label: "Education", image: "/document.webm", sectionId: "education" },
  { label: "Designs", image: "/pencil.webm", sectionId: "designs" },
  { label: "Contact", image: "/telephone.webm", sectionId: "contact" },
  { label: "Projects", image: "/flowers.webm", sectionId: "projects" },
];

/* ─────────────────── 3D Orbital Nav (Desktop) ─────────────────── */

function CircularItems() {
  const group = useRef<THREE.Group>(null);
  const hoveredRef = useRef(false);
  const speedRef = useRef(0.3);
  const angleRef = useRef(0);

  // Wide ellipse to orbit around center text
  const radiusX = 7;
  const radiusY = 4.5;

  const handleHoverStart = useCallback(() => {
    hoveredRef.current = true;
  }, []);

  const handleHoverEnd = useCallback(() => {
    hoveredRef.current = false;
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

    // Smoothly decelerate / accelerate
    const targetSpeed = hoveredRef.current ? 0 : 0.3;
    speedRef.current = THREE.MathUtils.lerp(
      speedRef.current,
      targetSpeed,
      delta * 2
    );

    angleRef.current += delta * speedRef.current;

    const count = navItems.length;
    for (let i = 0; i < count; i++) {
      const child = group.current.children[i];
      if (!child) continue;

      const itemAngle =
        angleRef.current + (i / count) * Math.PI * 2;

      child.position.x = Math.cos(itemAngle) * radiusX;
      child.position.y = Math.sin(itemAngle) * radiusY;
    }
  });

  return (
    <group ref={group}>
      {navItems.map((item) => (
        <NavObject
          key={item.label}
          label={item.label}
          image={item.image}
          sectionId={item.sectionId}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        />
      ))}
    </group>
  );
}

const MAX_W = 1;
const MAX_H = 1;

function NavObject({
  label,
  image,
  sectionId,
  onHoverStart,
  onHoverEnd,
}: {
  label: string;
  image: string;
  sectionId: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const [texture, setTexture] =
    useState<THREE.VideoTexture | null>(null);
  const [planeSize, setPlaneSize] =
    useState<[number, number] | null>(null);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = image;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;

    video.addEventListener("loadedmetadata", () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const aspect = vw / vh;

      let w = MAX_W;
      let h = w / aspect;
      if (h > MAX_H) {
        h = MAX_H;
        w = h * aspect;
      }
      setPlaneSize([w, h]);
    });

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    setTexture(videoTexture);

    video.play().catch((error) => {
      console.error(`Failed to play ${image}:`, error);
    });

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      videoTexture.dispose();
    };
  }, [image]);

  // Smooth scale animation on hover
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = hovered ? 1.15 : 1;
    scaleRef.current = THREE.MathUtils.lerp(
      scaleRef.current,
      target,
      delta * 8
    );
    groupRef.current.scale.setScalar(scaleRef.current);
  });

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    onHoverStart();
    document.body.style.cursor = "pointer";
  }, [onHoverStart]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    onHoverEnd();
    document.body.style.cursor = "auto";
  }, [onHoverEnd]);

  const handleClick = useCallback(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [sectionId]);

  const halfH = planeSize ? planeSize[1] / 2 : 0.75;

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {texture && planeSize && (
        <mesh>
          <planeGeometry args={planeSize} />
          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
          />
        </mesh>
      )}

      <Text
        position={[0, -(halfH + 0.2), 0]}
        fontSize={0.22}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        {label}
      </Text>
    </group>
  );
}

/* ─────────────────── Dock Nav (Mobile / Tablet) ─────────────────── */

function DockItem({
  label,
  image,
  sectionId,
}: {
  label: string;
  image: string;
  sectionId: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  const handleClick = useCallback(() => {
    setTapped(true);
    setTimeout(() => setTapped(false), 300);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [sectionId]);

  return (
    <button
      onClick={handleClick}
      className={`dock-item ${tapped ? "dock-item-tapped" : ""}`}
      aria-label={`Navigate to ${label}`}
    >
      <div className="dock-icon-wrapper">
        <video
          ref={videoRef}
          src={image}
          muted
          loop
          autoPlay
          playsInline
          className="dock-icon-video"
        />
      </div>
      <span className="dock-label">{label}</span>
      <span className="dock-indicator" />
    </button>
  );
}

function DockNav() {
  return (
    <nav className="dock-container" aria-label="Main navigation">
      <div className="dock-bar">
        {navItems.map((item, i) => (
          <DockItem
            key={item.label}
            label={item.label}
            image={item.image}
            sectionId={item.sectionId}
          />
        ))}
      </div>
    </nav>
  );
}

/* ─────────────────── Main Export ─────────────────── */

export default function CircularNav() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Prevent SSR mismatch — render nothing on the server
  if (!mounted) return null;

  if (isMobile) {
    return <DockNav />;
  }

  return (
    <div className="absolute inset-0 z-20">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CircularItems />
        </Suspense>
      </Canvas>
    </div>
  );
}