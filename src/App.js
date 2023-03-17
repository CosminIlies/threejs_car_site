import React, { Suspense } from 'react';
import {Canvas} from '@react-three/fiber';
import "./style.css";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Ground } from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes'
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
 
//$env:NODE_OPTIONS = "--openssl-legacy-provider"
//set NODE_OPTIONS=--openssl-legacy-provider

function CarShow(){
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>

      <color args={[0,0,0]} attach="background"/>

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture)=>(
          <>
            <Environment map={texture}/>
            <Car/>
          </>
        )

        }
      </CubeCamera>
      {/* <Box key={0} color={0 % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}/> */}

      <Ground/>
      <Boxes/>
      <Rings/>

      <spotLight
        color ={[1, 0.25, 0.7]}
        intensity ={1.25}
        angle={0.6}
        penumbra={0.5}
        position={[5,5,0]}
        castShadow
        shadow-shadowBias={-0.0001}
      />

      <spotLight
        color ={[0.14, 0.5, 1]}
        intensity ={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5,5,0]}
        castShadow
        shadow-shadowBias={-0.0001}
      />

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.1}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction = {BlendFunction.NORMAL}
          offset={[0.0002, 0.0005]}
        />

      </EffectComposer>


    </>
  );
}


function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
