import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import face from "./assets/face.svg";
import nose from "./assets/nose.svg";
import mouth from "./assets/mouth.svg";
import eye from "./assets/eye.svg";
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
  const [initialized, setInitialized] = useState<boolean>(false);


  useEffect(() => {
      setFaceLocation({
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        scale: 1.0,
      });

      setMouthLocation({
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2 + 20,
        scale: 0.5,
      });

      setNoseLocation({
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2 - 50,
        scale: 0.5,
      });

      setLeftEyeLocation({
        x: CANVAS_WIDTH / 2 - 40,
        y: CANVAS_HEIGHT / 2 - 90,
        scale: 0.5,
      });

      setRightEyeLocation({
        x: CANVAS_WIDTH / 2 + 40,
        y: CANVAS_HEIGHT / 2 - 90,
        scale: 0.5,
      });
  }, [initialized]);

  return (
    <div className="App">
      <canvas ref={ref} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
      <Slider
        min={0.5}
        max={10}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            const scale = value / 10;
            setMouthLocation((prevState) => ({
              ...prevState,
              scale,
            }));
          }
        }}
      />
      <Slider
        min={-50}
        max={50}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            setMouthLocation((prevState) => ({
              ...prevState,
              y: CANVAS_HEIGHT / 2 - 15 - value,
            }));
          }
        }}
      />
      <Slider
        min={0.5}
        max={10}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            const scale = value / 10;
            setNoseLocation((prevState) => ({
              ...prevState,
              scale,
            }));
          }
        }}
      />
      <Slider
        min={-50}
        max={50}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            setNoseLocation((prevState) => ({
              ...prevState,
              y: CANVAS_HEIGHT / 2 - 15 - value,
            }));
          }
        }}
      />
      <Slider
        min={0.5}
        max={10}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            const scale = value / 10;
            setLeftEyeLocation((prevState) => ({
              ...prevState,
              scale,
            }));
          }
        }}
      />
      <Slider
        min={-50}
        max={50}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            setLeftEyeLocation((prevState) => ({
              ...prevState,
              y: CANVAS_HEIGHT / 2 - 15 - value,
            }));
          }
        }}
      />
      <Slider
        min={0.5}
        max={10}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            const scale = value / 10;
            setRightEyeLocation((prevState) => ({
              ...prevState,
              scale,
            }));
          }
        }}
      />
      <Slider
        min={-50}
        max={50}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            setRightEyeLocation((prevState) => ({
              ...prevState,
              y: CANVAS_HEIGHT / 2 - 15 - value,
            }));
          }
        }}
      />
      <Stage>
        <Sprite
          image={face}
          anchor={0.5}
          x={faceLocation.x}
          y={faceLocation.y}
          scale={faceLocation.scale}
        />
        <Sprite
          image={mouth}
          anchor={0.5}
          x={mouthLocation.x}
          y={mouthLocation.y}
          scale={mouthLocation.scale}
        />
        <Sprite
          image={nose}
          anchor={0.5}
          x={noseLocation.x}
          y={noseLocation.y}
          scale={noseLocation.scale}
        />
        <Sprite
          image={eye}
          anchor={0.5}
          x={leftEyeLocation.x}
          y={leftEyeLocation.y}
          scale={leftEyeLocation.scale}
        />
        <Sprite
          image={eye}
          anchor={0.5}
          x={rightEyeLocation.x}
          y={rightEyeLocation.y}
          scale={rightEyeLocation.scale}
        />
       
      </Stage>
    </div>
  );
}

export default App;
