import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function Chart({ data }) {
  const chartData = [
    { name: "Todo", value: data.todo.length },
    { name: "Progress", value: data.inProgress.length },
    { name: "Done", value: data.done.length }
  ];

  return (
    <BarChart width={400} height={250} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  );
}

export default Chart;