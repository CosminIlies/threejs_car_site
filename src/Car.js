import React, {useEffect} from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";


export function Car(){
const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
    );

    useEffect(()=>{
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.traverse((object) =>{
            if(object instanceof Mesh){
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 5;
            }
        });
    }, [gltf]);

    useFrame((state)=>{
        let t = state.clock.getElapsedTime();
        let group = gltf.scene.children[0].children[0].children[0].children[3];
        group.children[14].rotation.x = t * 2;
        group.children[18].rotation.x = t * 2;
    });

    return <primitive object={gltf.scene} />

}