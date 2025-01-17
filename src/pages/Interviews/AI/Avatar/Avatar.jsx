import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import AnimationsPath from "../../../../assets/ai/animations.glb";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ModelPath from "../../../../assets/ai/nour-transformed.glb";
import { ChatContext } from "../../../../contexts/ChatContext/ChatContext";
import { SkeletonUtils } from "three-stdlib";
import { authContext } from "../../../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export function Avatar(props) {
  const navigate = useNavigate();
  const { scene } = useGLTF(ModelPath);
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const {
    message,
    onMessagePlayed,
    chat,
    isUserInteracted,
    userInput,
    setAllMessages,
    allMessages,
    setStartChatting,
    ended,
    complete,
    setLoading,
  } = useContext(ChatContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    console.log("triggered user input");
    if (userInput) {
      console.log("started the request");
      const message = { role: "user", content: userInput };
      setAllMessages([...allMessages, message]);
      setStartChatting(true);
    }
  }, [userInput]);

  useEffect(() => {
    if (!message || !isUserInteracted) {
      setAnimation("Idle");
      return;
    }

    setAnimation(message.animation);

    setAudio(new Audio("data:audio/mp3;base64," + message.audio));
  }, [message, isUserInteracted]);

  const { animations } = useGLTF(AnimationsPath);

  const group = useRef();
  const { actions, mixer } = useAnimations(animations, group);
  const [animation, setAnimation] = useState(
    animations.find((a) => a.name === "Idle") ? "Idle" : animations[0].name
  );

  useEffect(() => {
    actions[animation]
      .reset()
      .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
      .play();
    return () => {
      if (actions && actions[animation]) {
        actions[animation].fadeOut(0.5);
      }
    };
  }, [animation]);

  const lerpMorphTarget = (target, value, speed = 0.1) => {
    scene.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (
          index === undefined ||
          child.morphTargetInfluences[index] === undefined
        ) {
          return;
        }
        child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed
        );
      }
    });
  };
  const [audio, setAudio] = useState();

  useEffect(() => {
    if (audio) {
      audio.play().catch((err) => console.error("Audio play failed:", err));
      setAudio(audio);
      audio.onended = () => {
        onMessagePlayed();
        setAudio(null);
        setLoading(false);
      };
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
        setAudio(null);
      }
    };
  }, [audio]);

  useEffect(() => {
    if (ended === true) {
      setTimeout(() => {
        if (audio && !audio.paused && !audio.ended && audio.currentTime > 0) {
          console.log(
            "Audio is still playing. Waiting to execute ending mechanism."
          );
        } else {
          if (audio == null) {
            console.log(
              "No audio playing. Executing ending mechanism immediately."
            );
            onMessagePlayed();
            complete();
            navigate("/interview");
          }
        }
      }, 1000);
    }
  }, [audio]);

  useEffect(() => {
    if (user) {
      const message = {
        role: "user",
        content: `Hello my name is ${user.username}`,
      };
      chat([message]);
    }
  }, [user]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Headwear.geometry}
        material={materials.Wolf3D_Headwear}
        skeleton={nodes.Wolf3D_Headwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload(ModelPath);
useGLTF.preload(AnimationsPath);
