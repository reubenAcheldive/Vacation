
import{ useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { graphIDs } from "../../Api-Calls/Graph/graphIDs";
export const Charts = () => {
  const [value, valueSet] = useState([]);

  useEffect(() => {
    async function getChartIDS() {
      try {
        const results: any = await graphIDs();
        const { result } = results.data;
        valueSet(result);
      } catch (error) {
 
      }
    }
    getChartIDS();
  }, []);
  return (
    <div>
      <Bar
        height={400}
        width={600}
        options={{
          
        }}
        data={{
          labels:value.map(({idVacation}) => [`id of the Vacation: ${idVacation}`]),
          datasets: [
            {
              label: "number of Follow",
              data: value.map(({amount}) => amount),

              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 5,
            },
          ],
        }}
      />
   
    </div>
  );
};
