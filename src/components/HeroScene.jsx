import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function seededRandom(index) {
  const value = Math.sin(index * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function StarField() {
  const stars = useRef(null)
  const positions = useMemo(() => {
    const data = new Float32Array(900 * 3)
    for (let i = 0; i < 900; i += 1) {
      const radius = 18 + seededRandom(i + 1) * 52
      const theta = seededRandom(i + 99) * Math.PI * 2
      const phi = Math.acos(2 * seededRandom(i + 199) - 1)
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      data[i * 3 + 2] = radius * Math.cos(phi)
    }
    return data
  }, [])

  useFrame((_, delta) => {
    if (!stars.current) return
    stars.current.rotation.y += delta * .015
  })

  return (
    <points ref={stars}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#bdefff" size={.055} sizeAttenuation transparent opacity={.72} />
    </points>
  )
}

function NeuralCore() {
  const group = useRef(null)
  const points = useMemo(() => Array.from({ length: 22 }, (_, i) => {
    const angle = i * 0.75
    const radius = 1.8 + (i % 7) * 0.18
    return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(i) * .9, Math.sin(angle) * radius)
  }), [])

  const linePositions = useMemo(() => {
    const segments = points.slice(0, 12)
    const data = new Float32Array(segments.length * 2 * 3)
    segments.forEach((point, i) => {
      const next = points[(i * 5 + 7) % points.length]
      data.set(point.toArray(), i * 6)
      data.set(next.toArray(), i * 6 + 3)
    })
    return data
  }, [points])

  useFrame(({ clock, mouse }) => {
    if (!group.current) return
    group.current.rotation.y = clock.elapsedTime * .05 + mouse.x * .12
    group.current.rotation.x = mouse.y * .08
  })

  return (
    <group ref={group}>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[.04 + (i % 3) * .012, 8, 8]} />
          <meshBasicMaterial color={i % 2 ? '#66e3ff' : '#ffffff'} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#66e3ff" transparent opacity={.28} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#5d7dff" wireframe transparent opacity={.45} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas className="hero-canvas" dpr={[1, 1.2]} camera={{ position: [0, 0, 5], fov: 55 }} performance={{ min: .3 }}>
      <color attach="background" args={['#02040a']} />
      <StarField />
      <NeuralCore />
    </Canvas>
  )
}
