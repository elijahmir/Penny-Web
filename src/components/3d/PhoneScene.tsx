"use client"

import { Canvas } from '@react-three/fiber'
import { Environment, Float, PresentationControls, ContactShadows, Html } from '@react-three/drei'
import { Model as Iphone } from './IphonePenny'
import { Suspense } from 'react'

export function PhoneScene() {
  return (
    <div className="w-full h-[600px] lg:h-[800px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <PresentationControls
            global
            rotation={[0, -0.2, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
          >
            <Float rotationIntensity={0.4} floatIntensity={2} speed={1.5}>
              {/* Scale down the phone if it's too big, you might need to adjust this */}
              <group position={[0, -0.5, 0]} scale={0.8}>
                <Iphone />
                
                {/* Incoming Call UI Overlay */}
                {/* Note: The exact position and rotation will depend on the model's origin and orientation */}
                <Html
                  transform
                  wrapperClass="htmlScreen"
                  distanceFactor={1.17}
                  zIndexRange={[100, 0]}
                  position={[0, 0, 0.1]} /* Adjust Z to be just above the screen surface */
                  style={{
                    width: '320px',
                    height: '690px',
                    borderRadius: '40px',
                    overflow: 'hidden',
                    backgroundColor: '#111',
                    pointerEvents: 'none' // Let user drag the phone through the screen
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-between p-6 bg-black text-white relative">
                    {/* Top status bar area */}
                    <div className="flex justify-between items-center text-xs text-white/70">
                      <span>Penny</span>
                      <div className="flex gap-1 items-center">
                        <div className="w-4 h-2.5 bg-white/70 rounded-sm"></div>
                      </div>
                    </div>

                    {/* Caller Info */}
                    <div className="flex flex-col items-center mt-12 space-y-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--copper)] to-orange-400 p-1 flex items-center justify-center shadow-[0_0_30px_rgba(217,119,87,0.3)]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl">
                          👋
                        </div>
                      </div>
                      <div className="text-center">
                        <h2 className="text-3xl font-light mb-1">Penny</h2>
                        <p className="text-white/50 text-sm">Penny AI Assistant</p>
                      </div>
                    </div>

                    {/* Call Status / Waveform */}
                    <div className="flex justify-center items-center h-20 gap-1">
                       {[...Array(6)].map((_, i) => (
                         <div 
                           key={i}
                           className="w-1.5 bg-[var(--copper)] rounded-full animate-pulse"
                           style={{ 
                             height: `${20 + Math.random() * 40}px`,
                             animationDelay: `${i * 0.1}s` 
                           }}
                         />
                       ))}
                    </div>

                    {/* Call Controls */}
                    <div className="flex justify-between items-center pb-8 px-4">
                      <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                      </button>
                      <button className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/></svg>
                      </button>
                    </div>
                  </div>
                </Html>
              </group>
            </Float>
          </PresentationControls>
          
          <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  )
}
