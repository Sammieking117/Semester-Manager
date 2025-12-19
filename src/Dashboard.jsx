import { useContext } from "react";
import GradeChart from "./GradeChart";
import QuickActions from "./QuickActions";
import StatsCard from "./StatsCard";
import CourseContext from "./context/CourseContext";

const DashBoard = () => {
    const {myName} = useContext(CourseContext);

    return ( 
        <div className="dash-board">
            <h2>Hey {myName}!</h2>
            <p>Here's your semester overview.</p>
            <StatsCard />
            <GradeChart />
            <QuickActions />
        </div>
     );
}
 
export default DashBoard;