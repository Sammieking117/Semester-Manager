import { useContext } from "react";
import CourseContext from "./context/CourseContext";
import { useNavigate } from "react-router-dom";

const CourseItem = () => {
    const {courses, handleDeleteCourse,
          getGrade, showSuccess,
          setEditingCourse} = useContext(CourseContext);
    const navigate = useNavigate();
    const handleEdit = (course) => {
        setEditingCourse(course);
        navigate('/courseForm');
    }

    return ( 
        <>
            {courses.map((course) => (
                <div className="course-item" key={course.id}>
                    <div className="course-top">
                        <div className="course-code">{course.code}</div>
                        <div className="course-title">{course.title}</div>
                    </div>
                    <div className="course-bottom">
                        <div className="course-unit">Units: {course.unit}</div>
                        <div className="course-score">Score: {course.score}({getGrade(course.score)})</div>
                    </div>
                    <div className="actions">
                        <button className="edit-btn"
                        onClick={() => handleEdit(course)}>Edit</button>
                        <button className="delete-btn"
                        onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                    </div>
                </div>
            ))}
            {showSuccess && (<p className="submitMsg">Added Successfully 🎉</p>)}
        </>
     );
}
 
export default CourseItem;