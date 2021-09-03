import { Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";

interface Props {
  history: number[];
}

const BarChart = ({ history }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full h-full dark:text-white">
      <Bar
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "April",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: `${new Date().getFullYear()} Bond Price (RM) `,
              data: history,
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
