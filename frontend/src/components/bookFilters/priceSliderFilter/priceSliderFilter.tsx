import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 7,
  "& .MuiSlider-thumb": {
    width: 16,
    height: 16,
    "&:hover": {
      boxShadow: `0 0 0 8px ${theme.palette.primary.light}26`,
    },
  },
  "& .MuiSlider-valueLabel": {
    display: "none",
  },
}));

type PriceSliderProps = {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  max?: number;
  min?: number;
  step?: number;
};

export const PriceSliderFilter = ({
  value = [0, 5000],
  onChange,
  max = 5000,
  min = 0,
  step = 100,
}: PriceSliderProps) => {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setSliderValue(newValue as [number, number]);
  };

  const handleChangeCommitted = (_: unknown, newValue: number | number[]) => {
    onChange(newValue as [number, number]);
  };

  return (
    <div className="w-full max-w-[270px]">
      <Box sx={{ width: "100%" }}>
        <CustomSlider
          value={sliderValue}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          aria-label="Price range"
          min={min}
          max={max}
          step={step}
          valueLabelDisplay="auto"
        />
      </Box>
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>{sliderValue[0]} ₽</span>
        <span>{sliderValue[1]} ₽</span>
      </div>
    </div>
  );
};
