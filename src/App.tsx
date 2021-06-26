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
  const [mouthLocation, setMouthLocation] =
    useState<ILocation>(initialLocation);
  const [noseLocation, setNoseLocation] =
    useState<ILocation>(initialLocation);
  const [rightEyeLocation, setRightEyeLocation] =
    useState<ILocation>(initialLocation);
  const [leftEyeLocation, setLeftEyeLocation] =
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
        x: CANVAS_WIDTH / 2 - 10,
        y: CANVAS_HEIGHT / 2 - 15,
        width: 30,
        height: 30,
      });

      setNoseLocation({
        x: CANVAS_WIDTH / 2 - 10,
        y: CANVAS_HEIGHT / 2 - 45,
        width: 30,
        height: 30,
      });

      setRightEyeLocation({
        x: CANVAS_WIDTH / 2 + 10,
        y: CANVAS_HEIGHT / 2 - 60,
        width: 30,
        height: 30,
      });

      setLeftEyeLocation({
        x: CANVAS_WIDTH / 2 - 30,
        y: CANVAS_HEIGHT / 2 - 60,
        width: 30,
        height: 30,
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
            30,
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
      ctx.drawImage(
        leftEyeImg,
        leftEyeLocation.x,
        leftEyeLocation.y,
        leftEyeLocation.width,
        leftEyeLocation.height
      );
      ctx.drawImage(
        rightEyeImg,
        rightEyeLocation.x,
        rightEyeLocation.y,
        rightEyeLocation.width,
        rightEyeLocation.height
      );
      ctx.drawImage(
        mouthImg,
        mouthLocation.x,
        mouthLocation.y,
        mouthLocation.width,
        mouthLocation.height
      );
      ctx.drawImage(
        noseImg,
        noseLocation.x,
        noseLocation.y,
        noseLocation.width,
        noseLocation.height
      );
    }
  }, [faceImg, mouthLocation, noseLocation, rightEyeLocation, leftEyeLocation, leftEyeImg, mouthImg, rightEyeImg, noseImg]);

  useEffect(() => {
    renderImg();
  }, [faceImg, mouthLocation, renderImg]);

  return (
    <div className="App">
      <canvas ref={ref} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
      <Slider
        min={-10}
        max={30}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            setMouthLocation((prevState) => ({
              ...prevState,
              y: CANVAS_HEIGHT / 2 - (30 + value * 2) / 2,
              x: CANVAS_WIDTH / 2 - (30 + value * 2) / 2 + 5,
              height: 30 + value * 2,
              width: 30 + value * 2,
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
        min={-10}
        max={30}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            setNoseLocation((prevState) => ({
              ...prevState,
              y: CANVAS_HEIGHT / 2 - (30 + value * 2) / 2,
              x: CANVAS_WIDTH / 2 - (30 + value * 2) / 2 + 5,
              height: 30 + value * 2,
              width: 30 + value * 2,
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
      {/* <Slider
        min={-10}
        max={30}
        setLocation={(value) => {
          const ctx = ref.current?.getContext("2d");
          if (ctx) {
            setRightEyeLocation((prevState) => ({
              ...prevState,
              y: CANVAS_HEIGHT / 2 - (30 + value * 2) / 2,
              x: CANVAS_WIDTH / 2 - (30 + value * 2) / 2 + 5,
              height: 30 + value * 2,
              width: 30 + value * 2,
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
      /> */}
    </div>
  );
}

export default App;
