"use client";

import {
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, useVideoTexture } from "@react-three/drei";

const navItems = [
  { label: "about me", image: "/stickman.webm", sectionId: "aboutme" },
  { label: "education", image: "/document.webm", sectionId: "education" },
  { label: "designs", image: "/pencil.webm", sectionId: "designs" },
  { label: "contact", image: "/telephone.webm", sectionId: "contact" },
  { label: "projects", image: "/flowers.webm", sectionId: "projects" },
];

/* ─────────────────── 3D Orbital Nav (Desktop) ─────────────────── */

function CircularItems() {
  const group = useRef<THREE.Group>(null);
  const hoveredRef = useRef(false);
  const isTabActiveRef = useRef(true);
  const speedRef = useRef(0.2);
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
    if (!group.current || !isTabActiveRef.current) return;

    // Clamp delta to prevent frame jumps when waking/returning from another tab
    const safeDelta = Math.min(delta, 0.05);

    // Smoothly decelerate / accelerate
    const targetSpeed = hoveredRef.current ? 0 : 0.05;
    speedRef.current = THREE.MathUtils.lerp(
      speedRef.current,
      targetSpeed,
      safeDelta * 3
    );

    angleRef.current += safeDelta * speedRef.current;

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
  const texture = useVideoTexture(image, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    crossOrigin: "anonymous",
  });

  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);

  const planeSize: [number, number] = useMemo(() => {
    const video = texture.image as HTMLVideoElement;
    const vw = video?.videoWidth || 1;
    const vh = video?.videoHeight || 1;
    const aspect = vw / vh;

    let w = MAX_W;
    let h = w / aspect;
    if (h > MAX_H) {
      h = MAX_H;
      w = h * aspect;
    }
    return [w, h];
  }, [texture]);

  // Smooth scale animation on hover
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    const target = hovered ? 1.15 : 1;
    scaleRef.current = THREE.MathUtils.lerp(
      scaleRef.current,
      target,
      safeDelta * 8
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
    window.location.href = `/${sectionId}`;
  }, [sectionId]);

  const halfH = planeSize[1] / 2;

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <mesh>
        <planeGeometry args={planeSize} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
        />
      </mesh>

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
  const [tapped, setTapped] = useState(false);

  const handleClick = useCallback(() => {
    setTapped(true);
    setTimeout(() => {
      setTapped(false);
      window.location.href = `/${sectionId}`;
    }, 150);
  }, [sectionId]);

  return (
    <button
      onClick={handleClick}
      className={`dock-item ${tapped ? "dock-item-tapped" : ""}`}
      aria-label={`Navigate to ${label}`}
    >
      <div className="dock-icon-wrapper">
        <video
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
        {navItems.map((item) => (
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

const subscribeMediaQuery = (callback: () => void) => {
  const mq = window.matchMedia("(max-width: 1024px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getMediaQuerySnapshot = () => window.matchMedia("(max-width: 1024px)").matches;
const getMediaQueryServerSnapshot = () => false;

const emptySubscribe = () => () => { };
const getIsMountedSnapshot = () => true;
const getIsMountedServerSnapshot = () => false;

export default function CircularNav() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getIsMountedSnapshot,
    getIsMountedServerSnapshot
  );

  const isMobile = useSyncExternalStore(
    subscribeMediaQuery,
    getMediaQuerySnapshot,
    getMediaQueryServerSnapshot
  );

  // Prevent SSR mismatch — render nothing on the server
  if (!isMounted) return null;

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