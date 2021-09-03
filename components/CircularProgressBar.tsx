import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

interface Props {
  percentage: number;
}

const CircularProgressBar = ({ percentage }: Props) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full h-full">
      {mounted && (
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: `${resolvedTheme === "light" ? "#8833ff" : "#2BEBC8"}`,
            textColor: `${resolvedTheme === "light" ? "black" : "white"}`,
            trailColor: `${resolvedTheme === "light" ? "#f5f5f5" : "#1E1F23"}`,
            backgroundColor: `${
              resolvedTheme === "light" ? "#f5f5f5" : "#1E1F23"
            }`,
          })}
        />
      )}
    </div>
  );
};

export default CircularProgressBar;
