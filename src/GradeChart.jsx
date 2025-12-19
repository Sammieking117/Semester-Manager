import {Pie} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import CourseContext from "./context/CourseContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const GradeChart = () => {
    const {gradeCounts} = useContext(CourseContext);
    const data = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
            {
                data: [
                    gradeCounts.A,
                    gradeCounts.B,
                    gradeCounts.C,
                    gradeCounts.D,
                    gradeCounts.E,
                    gradeCounts.F
                ],
                backgroundColor: ['#28a745', '#7ddb8d', '#f4d44d',
                     '#f28c28', '#e74c3c', '#c0392b'],
            },
        ],
    };

    return ( 
        <div className="grade-chart">
            <Pie data={data} />
        </div>
     );
}
 
export default GradeChart;