import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import AnimationsLady from "../../../../assets/ai/animations.glb";
import AnimationsMan from "../../../../assets/ai/animations_man.glb";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import JazzarModel from "../../../../assets/ai/jazzar-transformed.glb";
import DevLordModel from "../../../../assets/ai/taha-transformed.glb";
import RecruitmentGeneralModel from "../../../../assets/ai/gheeda-transformed.glb";
import ColorQueenModel from "../../../../assets/ai/nour-transformed.glb";
import CareersterModel from "../../../../assets/ai/jane-transformed.glb";
import DefaultModel from "../../../../assets/ai/default.glb";
import { ChatContext } from "../../../../contexts/ChatContext/ChatContext";
import { SkeletonUtils } from "three-stdlib";
import { authContext } from "../../../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { interviewContext } from "../../../../contexts/InterviewContext/InterviewContext";

const modelMap = {
  "The Jazzar": JazzarModel,
  "The Dev Lord": DevLordModel,
  "The Recruitment General": RecruitmentGeneralModel,
  "The Color Queen": ColorQueenModel,
  "The Careerster": CareersterModel,
  "WorkWise Interviewer": DefaultModel,
};

const animationsMap = {
  man: [JazzarModel, DevLordModel],
  lady: [
    RecruitmentGeneralModel,
    ColorQueenModel,
    CareersterModel,
    DefaultModel,
  ],
};

export function Avatar(props) {
  const navigate = useNavigate();
  const { interviewer } = useContext(interviewContext);
  console.log(interviewer.label);
  console.log(modelMap[interviewer.label]);
  const modelPath = useMemo(
    () => modelMap[interviewer.label] || DefaultModel,
    [interviewer.label]
  );

  const { scene } = useGLTF(modelPath);
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

  function getModelPath(interviewer) {
    const modelPaths = {
      "The Jazzar": "../../../../assets/ai/jazzar-transformed.glb",
      "The Dev Lord": "../../../../assets/ai/taha-transformed.glb",
      "The Recruitment General": "../../../../assets/ai/gheeda-transformed.glb",
      "The Color Queen": "../../../../assets/ai/nour-transformed.glb",
      "The Careerster": "../../../../assets/ai/jane-transformed.glb",
      "WorkWise Interviewer": "../../../../assets/ai/default.glb",
    };
    return modelPaths[interviewer] || "../../../../assets/ai/default-model.glb";
  }

  const animationsPath = useMemo(() => {
    return animationsMap.man.includes(modelPath)
      ? AnimationsMan
      : AnimationsLady;
  }, [modelPath]);
  const { animations } = useGLTF(animationsPath);

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
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];
        if (node.isSkinnedMesh) {
          return (
            <skinnedMesh
              key={key}
              geometry={node.geometry}
              material={materials[node.material?.name]}
              skeleton={node.skeleton}
              morphTargetDictionary={node.morphTargetDictionary}
              morphTargetInfluences={node.morphTargetInfluences}
            />
          );
        }
        return null; // Skip if the node is not a skinned mesh
      })}
    </group>
  );
}
