import { useState } from "react";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

type BookImageProps = {
  cover: string;
  title: string;
};

export const BookImage = ({ cover, title }: BookImageProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
    className={`relative w-full transition-all duration-300 mx-auto md:mx-0 ${
      isExpanded
        ? "max-w-[250px] xs:max-w-[300px] sm:max-w-[350px] md:max-w-[400px] xl:max-w-[600px]"
        : "max-w-[150px] xs:max-w-[200px] sm:max-w-[250px] md:max-w-[300px] xl:max-w-[500px]"
    }`}
  >
      <div className="relative">
        <img src={cover} alt={title} className="rounded-md shadow-lg w-full" />
        <Button
          onClick={handleImageClick}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            minWidth: 24,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "white",
            padding: "3px",
            "&:hover": {
              backgroundColor: "#f3eeee",
            },
          }}
        >
          {isExpanded ? (
            <ZoomOutIcon
              color="action"
              sx={{
                fontSize: 24,
                margin: "auto",
              }}
            />
          ) : (
            <ZoomInIcon
              color="action"
              sx={{
                fontSize: 24,
                margin: "auto",
              }}
            />
          )}
        </Button>
      </div>
    </div>
  );
};
