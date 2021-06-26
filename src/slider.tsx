import { useState, VFC } from "react";

interface IProps {
  min: number;
  max: number;
  setLocation: (value: number) => void;
  label: string;
}

export const Slider: VFC<IProps> = ({ min, max, setLocation, label }) => {
  const [value, setValue] = useState<number>(0);
  return (
    <div>
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
      {label}
    </div>
  );
};
