import { useState, VFC } from "react";

interface IProps {
  min: number;
  max: number;
  setLocation: (value: number) => void;
}

export const Slider: VFC<IProps> = ({ min, max, setLocation }) => {
  const [value, setValue] = useState<number>(0);
  return (
    <input
      type="range"
      id="volume"
      name="volume"
      value={value}
      min={min}
      max={max}
      onChange={(e) => {
        setValue(Number(e.currentTarget.value));
        setLocation(Number(e.currentTarget.value));
      }}
    />
  );
};
