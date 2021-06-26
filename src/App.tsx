import React, { useEffect, useRef, useState } from "react";
import face from "./assets/face.svg";
import nose from "./assets/nose.svg";
import mouth from "./assets/mouth.svg";
import eye from "./assets/eye.svg";
import heart from "./assets/heart.svg"
import "./App.css";
import { Slider } from "./slider";
import { Stage, Sprite } from "@inlet/react-pixi";

interface ILocation {
  x: number;
  y: number;
  scale: number;
}
const initialLocation: ILocation = {
  x: 0,
  y: 0,
  scale: 1.0,
};

const CANVAS_WIDTH = 580;
const CANVAS_HEIGHT = 720;
const INIT_MOUSE_HIGHT = 20;
const INIT_EYE_HEIGHT = -90;
const INIT_NOSE_HIGHT = -50;
const INIT_EYE_WIDTH = (isLeft: boolean) =>
  CANVAS_WIDTH / 2 + (isLeft ? -40 : +40);
const INIT_HEART_HEIGHT = 330;
const INIT_HEART_SCALE = 1.0;

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [faceLocation, setFaceLocation] = 
    useState<ILocation>(initialLocation);
  const [mouthLocation, setMouthLocation] =
    useState<ILocation>(initialLocation);
  const [noseLocation, setNoseLocation] =
    useState<ILocation>(initialLocation);
  const [leftEyeLocation, setLeftEyeLocation] =
    useState<ILocation>(initialLocation);
  const [rightEyeLocation, setRightEyeLocation] =
    useState<ILocation>(initialLocation);
  const [heartLocation, setHeartLocation] =
    useState<ILocation>(initialLocation);

  useEffect(() => {
    setFaceLocation({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      scale: 1.0,
    });

    setMouthLocation({
      x: CANVAS_WIDTH / 2,
      y: INIT_MOUSE_HIGHT,
      scale: 0.5,
    });

    setNoseLocation({
      x: CANVAS_WIDTH / 2,
      y: INIT_NOSE_HIGHT,
      scale: 0.5,
    });

    setLeftEyeLocation({
      x: INIT_EYE_WIDTH(true),
      y: INIT_EYE_HEIGHT,
      scale: 0.5,
    });

    setRightEyeLocation({
      x: INIT_EYE_WIDTH(false),
      y: INIT_EYE_HEIGHT,
      scale: 0.5,
    });

    setHeartLocation({
      x: CANVAS_WIDTH / 2,
      y: INIT_HEART_HEIGHT,
      scale: 0.5
    });
  }, []);

  return (
    <div className="App">
      <Slider
        initValue={faceLocation.scale*5}
        label="顔大きさ"
        min={5}
        max={12}
        setLocation={(value) => {
          const scale = value / 10;
          setFaceLocation((prevState) => ({
            ...prevState,
            scale,
          }));
        }}
      />
      <Slider
        initValue={faceLocation.y}
        label="顔高さ"
        min={-50}
        max={50}
        setLocation={(value) => {
          const scale = value / 10;
          setFaceLocation((prevState) => ({
            ...prevState,
            y: CANVAS_HEIGHT / 2 + value,
          }));
        }}
      />
      <Slider
        initValue={mouthLocation.scale*5}
        label="口大きさ"
        min={0.5}
        max={10}
        setLocation={(value) => {
          const scale = value / 10;
          setMouthLocation((prevState) => ({
            ...prevState,
            scale,
          }));
        }}
      />
      <Slider
        initValue={mouthLocation.y}
        label="口高さ"
        min={-50}
        max={50}
        setLocation={(value) => {
          setMouthLocation((prevState) => ({
            ...prevState,
            y: INIT_MOUSE_HIGHT + value,
          }));
        }}
      />
      <Slider
        initValue={noseLocation.scale*5}
        label="鼻大きさ"
        min={0.5}
        max={10}
        setLocation={(value) => {
          const scale = value / 10;
          setNoseLocation((prevState) => ({
            ...prevState,
            scale,
          }));
        }}
      />
      <Slider
        initValue={noseLocation.y}
        label="鼻高さ"
        min={-50}
        max={50}
        setLocation={(value) => {
          setNoseLocation((prevState) => ({
            ...prevState,
            y: INIT_NOSE_HIGHT + value,
          }));
        }}
      />
      <Slider
        initValue={leftEyeLocation.x}
        label="目幅"
        min={-20}
        max={100}
        setLocation={(value) => {
          setLeftEyeLocation((prevState) => ({
            ...prevState,
            x: INIT_EYE_WIDTH(true) - value,
          }));
          setRightEyeLocation((prevState) => ({
            ...prevState,
            x: INIT_EYE_WIDTH(false) + value,
          }));
        }}
      />
      <Slider
        initValue={leftEyeLocation.scale*5}
        label="目大きさ"
        min={0.5}
        max={10}
        setLocation={(value) => {
          const scale = value / 10;
          setRightEyeLocation((prevState) => ({
            ...prevState,
            scale,
          }));
          setLeftEyeLocation((prevState) => ({
            ...prevState,
            scale,
          }));
        }}
      />
      <Slider
        initValue={leftEyeLocation.y}
        label="目高さ"
        min={-50}
        max={50}
        setLocation={(value) => {
          setRightEyeLocation((prevState) => ({
            ...prevState,
            y: INIT_EYE_HEIGHT + value,
          }));
          setLeftEyeLocation((prevState) => ({
            ...prevState,
            y: INIT_EYE_HEIGHT + value,
          }));
        }}
      />
      <Slider
        initValue={heartLocation.scale*5}
        label="心臓大きさ"
        min={3}
        max={12}
        setLocation={(value) => {
          const scale = value / 10;

          console.log(heartLocation.scale/4);

          setHeartLocation((prevState) => ({
            ...prevState,
            scale,
          }));
        }}
      />
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Sprite
          image={face}
          anchor={0.5}
          x={faceLocation.x}
          y={(faceLocation.y - (heartLocation.scale * 10))}
          scale={faceLocation.scale}
        />
        <Sprite
          image={mouth}
          anchor={0.5}
          x={mouthLocation.x}
          y={(faceLocation.y - (heartLocation.scale * 10)) + mouthLocation.y}
          scale={mouthLocation.scale}
        />
        <Sprite
          image={nose}
          anchor={0.5}
          x={noseLocation.x}
          y={(faceLocation.y - (heartLocation.scale * 10)) + noseLocation.y}
          scale={noseLocation.scale}
        />
        <Sprite
          image={eye}
          anchor={0.5}
          x={leftEyeLocation.x}
          y={(faceLocation.y - (heartLocation.scale * 10)) + leftEyeLocation.y}
          scale={leftEyeLocation.scale}
        />
        <Sprite
          image={eye}
          anchor={0.5}
          x={rightEyeLocation.x}
          y={(faceLocation.y - (heartLocation.scale * 10)) + rightEyeLocation.y}
          scale={rightEyeLocation.scale}
        />
        <Sprite
          image={heart}
          anchor={0.5}
          x={heartLocation.x}
          y={(faceLocation.y - (heartLocation.scale * 10)) + heartLocation.y}
          scale={heartLocation.scale}
        />
      </Stage>
    </div>
  );
}

export default App;
