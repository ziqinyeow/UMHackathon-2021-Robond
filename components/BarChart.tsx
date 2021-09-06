import { Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";

interface Props {
  title1: string;
  xAxis: string[];
  yAxis1: number[];
  title2: string;
  yAxis2: number[];
}

const BarChart = ({ title1, xAxis, yAxis1, title2, yAxis2 }: Props) => {
  const { resolvedTheme } = useTheme();
  let count = 0;
  for (let i = 0; i < yAxis1.length; i += 1) {
    if (yAxis1[i]) {
      count = i;
      break;
    }
  }
  const x = xAxis.slice(count);
  const y1 = yAxis1.slice(count);
  const y2 = yAxis2.slice(count);

  return (
    <div className="w-full h-full dark:text-white">
      <Bar
        data={{
          labels: x,
          datasets: [
            {
              label: title1,
              data: y1,
              backgroundColor: `${
                resolvedTheme === "light" ? "#8833ff" : "#2BEBC8"
              }`,
            },
            {
              label: title2,
              data: y2,
              backgroundColor: `${
                resolvedTheme === "light" ? "#8833ff" : "#2BEBC8"
              }`,
            },
          ],
        }}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
          scale: {
            ticks: { beginAtZero: true },
          },
          legend: {
            labels: {
              fontColor: "orange",
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
