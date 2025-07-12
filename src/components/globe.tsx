"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeGlobe from "three-globe";
import countries from "../assets/data/globe.json";
import { motion } from "framer-motion";

extend({ ThreeGlobe });

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;

export interface Position {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

function randomSampleIndices(max: number, count: number) {
  const set = new Set<number>();
  while (set.size < count) set.add(Math.floor(Math.random() * max));
  return Array.from(set);
}

/** Globe component (three-globe wrapper) **/
export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const [isReady, setIsReady] = useState(false);

  const cfg = useMemo<Required<GlobeConfig>>(
    () => ({
      pointSize: 1,
      globeColor: "#1d072e",
      showAtmosphere: true,
      atmosphereColor: "#ffffff",
      atmosphereAltitude: 0.1,
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      polygonColor: "rgba(255,255,255,0.7)",
      ambientLight: "#ffffff",
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#ffffff",
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      autoRotate: true,
      autoRotateSpeed: 1,
      ...globeConfig,
    }),
    [globeConfig]
  );

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current as unknown as THREE.Object3D);
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady || !globeRef.current) return;

    const mat = globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    mat.color = new THREE.Color(cfg.globeColor);
    mat.emissive = new THREE.Color(cfg.emissive);
    mat.emissiveIntensity = cfg.emissiveIntensity;
    mat.shininess = cfg.shininess;
  }, [isReady, cfg]);

  useEffect(() => {
    if (!isReady || !globeRef.current) return;

    globeRef.current
      .hexPolygonsData((countries as any).features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(cfg.showAtmosphere)
      .atmosphereColor(cfg.atmosphereColor)
      .atmosphereAltitude(cfg.atmosphereAltitude)
      .hexPolygonColor(() => cfg.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat("startLat")
      .arcStartLng("startLng")
      .arcEndLat("endLat")
      .arcEndLng("endLng")
      .arcColor("color")
      .arcAltitude("arcAlt")
      .arcStroke(() => [0.32, 0.28, 0.3][Math.floor(Math.random() * 3)])
      .arcDashLength(cfg.arcLength)
      .arcDashInitialGap("order")
      .arcDashGap(15)
      .arcDashAnimateTime(cfg.arcTime);

    const unique = Array.from(
      new Map(
        data
          .flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: d.color },
            { lat: d.endLat, lng: d.endLng, color: d.color },
          ])
          .map((p) => [`${p.lat}-${p.lng}`, p])
      ).values()
    );

    globeRef.current
      .pointsData(unique)
      .pointColor((d: any) => d.color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(cfg.pointSize);

    globeRef.current
      .ringsData([])
      .ringColor(() => cfg.polygonColor)
      .ringMaxRadius(cfg.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((cfg.arcTime * cfg.arcLength) / cfg.rings);
  }, [isReady, data, cfg]);

  useEffect(() => {
    if (!isReady || !globeRef.current) return;

    const interval = setInterval(() => {
      const pick = randomSampleIndices(data.length, Math.floor(data.length * 0.8));
      const rings = pick.map((i) => ({
        lat: data[i].startLat,
        lng: data[i].startLng,
        color: data[i].color,
      }));
      globeRef.current!.ringsData(rings);
    }, 2000);

    return () => clearInterval(interval);
  }, [isReady, data]);

  return <group ref={groupRef} />;
}

/** Tweaks for Renderer */
function RendererTweaks() {
  const { gl, size } = useThree();
  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0);
  }, [gl, size]);
  return null;
}

/** World component rendering the globe */
export function World({ globeConfig, data }: WorldProps) {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, cameraZ] }}>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["#000000", 400, 2000]} />
      <RendererTweaks />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight color={globeConfig.directionalLeftLight} position={[-400, 100, 400]} />
      <directionalLight color={globeConfig.directionalTopLight} position={[-200, 500, 200]} />
      <pointLight color={globeConfig.pointLight} position={[-200, 500, 200]} intensity={0.8} />
      <Globe globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotate={globeConfig.autoRotate}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

/** White Stars overlay component */
export function WhiteStars({ count = 80 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    [count]
  );

  return (
    <>
      {stars.map((star, idx) => (
        <motion.span
          key={idx}
          className="absolute block rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: "1px",
            height: "1px",
            opacity: 0.8,
            pointerEvents: "none",
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/** Main component wrapping the globe and stars */
export default function GlobeWrapper() {
  const data: Position[] = [
    {
      order: 1,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 51.5074,
      endLng: -0.1278,
      arcAlt: 0.3,
      color: "#ffffff",
    },
    {
      order: 2,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: "#ffffff",
    },
  ];

  const globeConfig: GlobeConfig = {
    globeColor: "#1d072e",
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 2000,
    arcLength: 0.9,
    autoRotate: true,
    autoRotateSpeed: 1,
  };

  return (
    <section className="bg-black w-full py-16 relative overflow-hidden">
      <div className="text-center pt-12 pb-8 z-20 relative">
        <h2 className="text-5xl font-extrabold text-white tracking-tight">
          From Lagos to the World
        </h2>
        <p className="text-xl text-white/80 mt-4 max-w-3xl mx-auto">
          Discover our bold design legacy in every pixel.
        </p>
      </div>
      <div className="h-[40rem] w-full max-w-6xl mx-auto relative z-10">
        <World globeConfig={globeConfig} data={data} />
        {/* White stars overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <WhiteStars count={80} />
        </div>
      </div>
    </section>
  );
}
