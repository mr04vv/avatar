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

interface ILocation {
  x: number;
  y: number;
  width: number;
  height: number;
}
const initialLocation: ILocation = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const CANVAS_WIDTH = 580;
const CANVAS_HEIGHT = 720;

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [faceLocation, setFaceLocation] = useState<ILocation>(initialLocation);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [faceX, setFaceX] = useState<number>(0);

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
      setFaceLocation({
        x: CANVAS_WIDTH / 5,
        y: CANVAS_HEIGHT / 5,
        width: 300,
        height: 400,
      });

      faceImg.onload = () => {
        if (!initialized)
          ctx.drawImage(faceImg, CANVAS_WIDTH / 5, CANVAS_HEIGHT / 5, 300, 400);
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
            CANVAS_WIDTH / 10 + 10,
            CANVAS_HEIGHT / 4 + 30,
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
        faceLocation.x,
        faceLocation.y,
        faceLocation.width,
        faceLocation.height
      );
      ctx.drawImage(leftEyeImg, CANVAS_WIDTH / 12, CANVAS_HEIGHT / 5, 40, 40);
      ctx.drawImage(rightEyeImg, CANVAS_WIDTH / 8, CANVAS_HEIGHT / 5, 40, 40);
      ctx.drawImage(
        mouthImg,
        CANVAS_WIDTH / 10 + 10,
        CANVAS_HEIGHT / 4 + 30,
        30,
        30
      );
      ctx.drawImage(
        noseImg,
        CANVAS_WIDTH / 10 + 10,
        CANVAS_HEIGHT / 4 + 30,
        30,
        30
      );
    }
  }, [faceImg, faceLocation, leftEyeImg, mouthImg, rightEyeImg, noseImg]);

  useEffect(() => {
    renderImg();
  }, [faceImg, faceLocation, renderImg]);

  return (
    <div className="App">
      <canvas ref={ref} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
      <Slider
        min={-50}
        max={50}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            setFaceLocation((prevState) => ({
              ...prevState,
              x: CANVAS_WIDTH / 5 + value,
            }));
          }
        }}
      />
    </div>
  );
}

export default App;
