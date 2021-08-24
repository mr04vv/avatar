import React, { useEffect, useRef, useState } from "react";
import face from "./assets/face.svg";
import nose from "./assets/nose.svg";
import mouth from "./assets/mouth.svg";
import eye from "./assets/eye.svg";
import heart from "./assets/heart.svg";
import "./App.css";
import { Slider } from "./slider";
import { Stage, Sprite, InteractionEvent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import axios from "axios";

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
// const a = PIXI.Texture.from("assets/image.png");
const CANVAS_WIDTH = 580;
const CANVAS_HEIGHT = 720;
const INIT_MOUSE_HIGHT = 20 + 50;
const INIT_EYE_HEIGHT = -90 + 50;
const INIT_NOSE_HIGHT = -50 + 50;
const INIT_EYE_WIDTH = (isLeft: boolean) =>
  CANVAS_WIDTH / 2 + (isLeft ? -40 : +40);
const centerAnchor = new PIXI.Point(0.5, 0.5);

const canvasElement: HTMLCanvasElement = document.getElementById(
  "hoge"
) as HTMLCanvasElement;

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [faceLocation, setFaceLocation] = useState<ILocation>(initialLocation);
  const [mouthLocation, setMouthLocation] =
    useState<ILocation>(initialLocation);
  const [noseLocation, setNoseLocation] = useState<ILocation>(initialLocation);
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
      scale: 0.6,
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
  }, []);

  const stageRef = React.useRef<HTMLCanvasElement>(null);
  const [tex, setTex] = useState<PIXI.Texture<PIXI.Resource>>();
  const [eyetex, setEyeTex] = useState<PIXI.Texture<PIXI.Resource>>();
  const [sv, setSv] = useState<string>("");
  const [mouth, setMouth] = useState<string>("");

  useEffect(() => {
    (async () => {
      // const res = await axios.get("url");
      // const svgStr: string = res.data;
      // setMouth(res.data);
      // setSv(svgStr.replace("{{colorCode}}", "#ff9473"));
      // var parser = new DOMParser();
      // var doc = parser.parseFromString(sv, "image/svg+xml");
      // const s = doc.firstChild as SVGElement;
      // console.debug(s.);
      // const a = new PIXI.ImageResource(
      //   "https://mii-studio.akamaized.net/editor/1/webp/1024/2/6/5/e12f2403f.webp",
      //   { crossorigin: true }
      // );
      // const t = PIXI.BaseTexture.from(a.source);
      // console.debug(a.source);
      // setTex(PIXI.Texture.from(a.source));
      // const e = PIXI.Texture.from(
      //   "https://mii-studio.akamaized.net/editor/1/webp/1024/a/6/8/4f169637a.webp"
      // );
      // setEyeTex(e);
    })();
  }, []);

  return (
    <div className="App">
      <Slider
        initValue={faceLocation.scale * 5}
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
          let color = Math.ceil(16777215 * Math.random()).toString(16);
          let length = color.length;
          while (length < 6) {
            color = "0" + color;
            length++;
          }
          setSv(mouth.replace("{{colorCode}}", "#" + color));
          // const scale = value / 10;
          // setFaceLocation((prevState) => ({
          //   ...prevState,
          //   y: CANVAS_HEIGHT / 2 + value,
          // }));
        }}
      />
      <Slider
        initValue={mouthLocation.scale * 5}
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
        initValue={noseLocation.scale * 5}
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
        initValue={leftEyeLocation.scale * 5}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <button
          style={{ width: "100px", margin: "0 auto" }}
          onClick={() => {
            const canv: HTMLCanvasElement = document.getElementById(
              "hogehoge"
            ) as HTMLCanvasElement;
            const canv2: HTMLCanvasElement = document.getElementById(
              "aa"
            ) as HTMLCanvasElement;
            canv2.width = canv.width;
            canv2.height = canv.height;
            var img = new Image();
            img.src = canv.toDataURL();
            const ctx = canv2.getContext("2d");
            if (ctx) {
              console.debug("her");
              ctx.drawImage(canv, 0, 0, canv.width, canv.height);
              var base64 = canv2.toDataURL();
              const a = canv2.toDataURL("image/png");
              // console.debug(base64);
              // console.debug(a);
              const anchor: HTMLAnchorElement = document.createElement("a");
              canv2.toBlob((blob: any) => {
                if (anchor !== null && blob) {
                  console.debug(base64);
                  anchor.href = base64;
                  anchor.download = `avatar.png`;
                  anchor.click();
                }
              });
            }
          }}
        >
          保存
        </button>
        <Stage
          id="hogehoge"
          options={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            preserveDrawingBuffer: true,
            backgroundAlpha: 0,
          }}
        >
          <Sprite
            texture={tex}
            anchor={0.5}
            x={faceLocation.x}
            y={faceLocation.y}
            scale={faceLocation.scale}
          />
          {/* {!!sv && (
            <Sprite
              texture={PIXI.Texture.from(sv)}
              anchor={0.5}
              x={faceLocation.x}
              y={faceLocation.y - 30}
              scale={faceLocation.scale}
            />
          )} */}
          {!!sv && (
            <Sprite
              texture={PIXI.Texture.from(sv)}
              anchor={0.5}
              x={mouthLocation.x}
              y={faceLocation.y + mouthLocation.y}
              scale={mouthLocation.scale}
            />
          )}
          {/* <Sprite
            texture={PIXI.Texture.from(
              "https://mii-studio.akamaized.net/editor/1/webp/1024/1/4/c/6350bfba4.webp"
            )}
            anchor={0.5}
            x={mouthLocation.x}
            y={faceLocation.y + mouthLocation.y}
            scale={mouthLocation.scale}
          /> */}
          {/* s3画像は普通にやるとcorsで弾かれる */}
          <Sprite
            texture={PIXI.Texture.from(
              "https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/images/s3-photo-album-example.png"
            )}
            anchor={0.5}
            x={noseLocation.x}
            y={faceLocation.y + noseLocation.y}
            scale={noseLocation.scale}
          />
          {eyetex && (
            <>
              <Sprite
                texture={eyetex}
                anchor={centerAnchor}
                x={leftEyeLocation.x}
                y={faceLocation.y + leftEyeLocation.y}
                scale={{ x: -leftEyeLocation.scale, y: leftEyeLocation.scale }}
              />
              <Sprite
                texture={eyetex}
                anchor={centerAnchor}
                x={rightEyeLocation.x}
                y={faceLocation.y + rightEyeLocation.y}
                scale={rightEyeLocation.scale}
              />
            </>
          )}
        </Stage>
      </div>
      <canvas id="aa" />
    </div>
  );
}

export default App;
