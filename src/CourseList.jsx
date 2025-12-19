import { useContext, useState } from "react";
import CourseItem from "./CourseItem";
import CourseContext from "./context/CourseContext";

const CourseList = () => {
    const {totalCourses, totalUnits} = useContext(CourseContext);

    return ( 
        <div className="course-list">
            <div className="stats">
                <div>
                    <p>Total Courses:</p>
                    <h2>{totalCourses}</h2>
                </div>
                <div>
                    <p>Total units:</p>
                    <h2>{totalUnits}</h2>
                </div>
            </div>
            <CourseItem />
        </div>
     );
}
 
export default CourseList;