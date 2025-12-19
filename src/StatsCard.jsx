import { useContext } from "react";
import CourseContext from "./context/CourseContext";

const StatsCard = () => {
    const {totalCourses, totalUnits, gradeCounts, cgpa} = useContext(CourseContext);
    const currentGPA = cgpa;

    return ( 
        <>
            <div className="stats-card">
                <div className="card">
                    <p>Total Courses:</p>
                    <h2>{totalCourses}</h2>
                </div>
                <div className="card">
                    <p>Total Units:</p>
                    <h2>{totalUnits}</h2>
                </div>
                <div className="card">
                    <p>Current GPA:</p>
                    <h2>{currentGPA}</h2>
                </div>
            </div>
            <div className="summary-card">
                <h3>Grade Summary</h3>
                <ul>
                    <li>A: {gradeCounts.A}</li>
                    <li>B: {gradeCounts.B}</li>
                    <li>C: {gradeCounts.C}</li>
                    <li>D: {gradeCounts.D}</li>
                    <li>E: {gradeCounts.E}</li>
                    <li>F: {gradeCounts.F}</li>
                </ul>
            </div>
        </>
     );
}
 
export default StatsCard;