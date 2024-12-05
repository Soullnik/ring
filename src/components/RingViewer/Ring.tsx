import { useRef } from "react";
import { Mesh } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RingConfig } from "@/types/ring";
import { CSG } from "three-csg-ts";

interface RingProps {
  config: RingConfig;
}

export const Ring = ({ config }: RingProps) => {
  const ringRef = useRef<Mesh>(null);

  // Материалы для разных типов металлов
  const materials = {
    gold: {
      color: "#FFC933",
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    },
    silver: {
      color: "#C0C0C0",
      metalness: 0.9,
      roughness: 0.3,
      envMapIntensity: 2.5,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    },
    platinum: {
      color: "#F4F4F4",
      metalness: 1,
      roughness: 0.1,
      envMapIntensity: 3.5,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    },
  };

  const gemstones = {
    diamond: {
      color: "#FFFFFF",
      metalness: 0.1,
      roughness: 0,
      transmission: 0.9,
    },
    ruby: { color: "#E0115F", metalness: 0.2, roughness: 0.1 },
    sapphire: { color: "#0F52BA", metalness: 0.2, roughness: 0.1 },
    emerald: { color: "#50C878", metalness: 0.2, roughness: 0.1 },
  };

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.01;
    }
  });

  const generatePattern = (type: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (!context) return null;

    context.fillStyle = "#808080";
    context.fillRect(0, 0, 256, 256);
    context.strokeStyle = "#ffffff";

    switch (type) {
      case "geometric":
        // Геометрический узор
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 256, 256);
        context.strokeStyle = "#ffffff";
        context.lineWidth = 2;

        // Создаем сетку ромбов
        for (let i = 0; i < 256; i += 32) {
          for (let j = 0; j < 256; j += 32) {
            context.beginPath();
            context.moveTo(i + 16, j);
            context.lineTo(i + 32, j + 16);
            context.lineTo(i + 16, j + 32);
            context.lineTo(i, j + 16);
            context.closePath();
            context.stroke();
          }
        }
        break;

      case "floral":
        // Цветочный узор
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 256, 256);
        context.strokeStyle = "#ffffff";
        context.lineWidth = 1;

        // Создаем повторяющийся цветочный паттерн
        for (let i = 0; i < 256; i += 64) {
          for (let j = 0; j < 256; j += 64) {
            // Рисуем лепестки
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
              context.beginPath();
              context.ellipse(
                i + 32 + Math.cos(angle) * 8,
                j + 32 + Math.sin(angle) * 8,
                12,
                6,
                angle,
                0,
                Math.PI * 2
              );
              context.stroke();
            }
          }
        }
        break;

      case "waves":
        // Волнистый узор
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 256, 256);
        context.strokeStyle = "#ffffff";
        context.lineWidth = 2;

        for (let i = 0; i < 256; i += 16) {
          context.beginPath();
          context.moveTo(0, i);
          for (let x = 0; x < 256; x += 10) {
            context.lineTo(x, i + Math.sin(x * 0.1) * 8);
          }
          context.stroke();
        }
        break;
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1); // Повторяем текстуру 4 раза по окружности кольца
    return texture;
  };

  const getRingGeometry = () => {
    const baseRadius = 1;
    const thickness = 0.3 * (config.width / 10);

    // Создаем базовые свойства материала
    const materialProps = {
      ...materials[config.material as keyof typeof materials],
    };

    // Если указан паттерн, добавляем текстуру и настраиваем материал
    if (config.pattern) {
      const patternTexture = generatePattern(config.pattern);
      if (patternTexture) {
        materialProps.bumpMap = patternTexture;
        materialProps.bumpScale = 0.05;
        materialProps.normalMap = patternTexture;
        materialProps.normalScale = new THREE.Vector2(0.05, 0.05);
      }
    }

    switch (config.type) {
      case "flat":
        const outerCylinder = new THREE.CylinderGeometry(
          baseRadius + thickness, // увеличенный внешний радиус
          baseRadius + thickness,
          1, // используем height вместо thickness для высоты цилиндра
          64, // radialSegments
          1, // heightSegments
          false // openEnded
        );
        const innerCylinder = new THREE.CylinderGeometry(
          baseRadius,
          baseRadius,
          1.1, // немного больше для надежного вычитания
          64,
          1,
          false
        );
        const outerMesh = new THREE.Mesh(outerCylinder);
        const innerMesh = new THREE.Mesh(innerCylinder);
        const ringCSG = CSG.subtract(outerMesh, innerMesh);
        return (
          <mesh geometry={ringCSG.geometry}>
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      case "round":
      default:
        return (
          <mesh>
            <torusGeometry
              args={[
                baseRadius,
                thickness,
                16, // стандартное количество сегментов
                64,
                Math.PI * 2,
              ]}
            />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
    }
  };

  return (
    <group>
      {config.type === "flat" ? (
        <mesh ref={ringRef}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh>{getRingGeometry()}</mesh>
          </group>
        </mesh>
      ) : (
        <mesh ref={ringRef}>{getRingGeometry()}</mesh>
      )}

      <mesh
        position={[0, 0.4 * (config.width / 10), 1.2]}
        rotation={[0.5, 0, 0]}
      >
        <octahedronGeometry args={[0.2]} />
        <meshStandardMaterial
          {...gemstones[config.gemstone as keyof typeof gemstones]}
        />
      </mesh>
    </group>
  );
};
