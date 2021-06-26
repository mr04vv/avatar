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
  const [mouthLocation, setMouthLocation] =
    useState<ILocation>(initialLocation);
  const [initialized, setInitialized] = useState<boolean>(false);

  const faceImg = useMemo(() => new Image(), []);
  faceImg.src = face;
  const rightEyeImg = useMemo(() => new Image(), []);
  rightEyeImg.src = eye;
  const leftEyeImg = useMemo(() => new Image(), []);
  leftEyeImg.src = eye;
  const noseImg = useMemo(() => new Image(), []);
  noseImg.src = nose;
  const mouthImg = useMemo(() => new Image(), []);
  mouthImg.src = mouth;

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");

    if (ctx) {
      setMouthLocation({
        x: CANVAS_WIDTH / 2 - 30 * 2,
        y: CANVAS_HEIGHT / 2 - 15,
        scale: 1.0,
      });

      faceImg.onload = () => {
        if (!initialized)
          ctx.drawImage(faceImg, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 300, 400);
        setInitialized(true);
      };
      leftEyeImg.onload = () => {
        if (!initialized)
          ctx.drawImage(
            leftEyeImg,
            CANVAS_WIDTH / 12,
            CANVAS_HEIGHT / 5,
            40,
            40
          );
      };
      rightEyeImg.onload = () => {
        if (!initialized)
          ctx.drawImage(
            rightEyeImg,
            CANVAS_WIDTH / 8,
            CANVAS_HEIGHT / 5,
            40,
            40
          );
      };
      mouthImg.onload = () => {
        if (!initialized)
          ctx.drawImage(
            mouthImg,
            CANVAS_WIDTH / 2 - 10,
            CANVAS_HEIGHT / 2 - 15,
            30,
            30
          );
      };
      noseImg.onload = () => {
        if (!initialized)
          ctx.drawImage(
            noseImg,
            CANVAS_WIDTH / 10 + 10,
            CANVAS_HEIGHT / 4 + 30,
            30,
            30
          );
      };
    }
  }, [faceImg, initialized, leftEyeImg, mouthImg, noseImg, rightEyeImg]);

  const renderImg = useCallback(() => {
    const ctx = ref.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(
        faceImg,
        CANVAS_WIDTH / 2 - 150,
        CANVAS_HEIGHT / 2 - 200,
        300,
        400
      );
      ctx.drawImage(leftEyeImg, CANVAS_WIDTH / 12, CANVAS_HEIGHT / 5, 40, 40);
      ctx.drawImage(rightEyeImg, CANVAS_WIDTH / 8, CANVAS_HEIGHT / 5, 40, 40);
      ctx.drawImage(
        mouthImg,
        mouthLocation.x,
        mouthLocation.y,
        30 * mouthLocation.scale * 5,
        30 * mouthLocation.scale * 5
      );
      ctx.drawImage(
        noseImg,
        CANVAS_WIDTH / 10 + 10,
        CANVAS_HEIGHT / 4 + 30,
        30,
        30
      );
    }
  }, [faceImg, mouthLocation, leftEyeImg, mouthImg, rightEyeImg, noseImg]);

  useEffect(() => {
    renderImg();
  }, [faceImg, mouthLocation, renderImg]);

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
      <Stage>
        <Sprite
          image={mouth}
          anchor={0.5}
          x={mouthLocation.x}
          y={mouthLocation.y}
          scale={mouthLocation.scale}
        />
      </Stage>
    </div>
  );
}

export default App;
