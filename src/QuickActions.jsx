import { Link } from "react-router-dom";

const QuickActions = () => {
    return ( 
        <div className="actionBtn">
            <Link to="/courseForm"><button>Add New Course</button></Link>
            <Link to="/courseList"><button>View All Courses</button></Link>
        </div>
     );
}
 
export default QuickActions;