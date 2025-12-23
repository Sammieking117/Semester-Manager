import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseContext from "./context/CourseContext";

const CourseForm = () => {
    const { addCourse, getGrade, updateCourse,
         editingCourse, courseLimit, courses, myName, } = useContext(CourseContext);

    const [ title, setTitle ] = useState('');
    const [ code, setCode ] = useState('');
    const [ unit, setUnit ] = useState(1);
    const [ testSCore, setTestSCore ] = useState('');
    const [ examScore, setExamScore ] = useState('');
    const score = testSCore + examScore;
    const navigate = useNavigate();

    useEffect(() => {
        if (!editingCourse) return;
            setTitle(editingCourse.title);
            setCode(editingCourse.code);
            setUnit(editingCourse.unit);
            setTestSCore(editingCourse.testSCore);
            setExamScore(editingCourse.examScore);
    }, [editingCourse]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
         const courseData = {
            id: editingCourse ?
            editingCourse.id : crypto.randomUUID(),
            title,
            code,
            unit,
            testSCore,
            examScore,
            score,
            grade: getGrade()
        };

        if(editingCourse) {
            updateCourse(courseData);
        } else {
            addCourse(courseData);
        }
       /*  addCourse(newCourse); */
        // Clear form
        setTitle('');
        setCode('');
        setUnit(1);
        setTestSCore('');
        setExamScore('');
        navigate('/courseList');
    }

    const handleCancel = () => {
        setTitle('');
        setCode('');
        setUnit(1);
        setTestSCore('');
        setExamScore('');
    };

    const isEditMode = editingCourse !== null;

    const isAddingLimitReached = !isEditMode && courseLimit !== null
    && courses.length >= courseLimit;


    if (!courseLimit) {
        return (
            <div className="setup-warning">
                <h3>Hold on, {myName}!</h3>
                <p>You need to set your semester limits in your profile
                    before adding courses.
                </p>
                <button onClick={() => navigate('/profile')}>Go to Profile</button>
            </div>
        );
    }
    return ( 
        <div className="course-form">
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label>Course Title:</label>
                    <input
                     type="text"
                     required
                     value={title}
                     onChange={(e) => setTitle(e.target.value)} />
                </div>
                 <div className="input-wrapper">
                    <label>Course Code:</label>
                    <input
                     type="text"
                     required
                     value={code}
                     onChange={(e) => setCode(e.target.value)} />
                </div>
                 <div className="input-wrapper">
                    <label>Unit:</label>
                    <select
                     required
                     value={unit}
                     onChange={(e) => setUnit(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label>Test Score:</label>
                    <input
                     type="number"
                     min={0}
                     max={40}
                     value={testSCore}
                     onChange={(e) => {
                        const val = e.target.value;
                        setTestSCore(val === "" ? "" :
                            Number(val)
                        );
                     }} />
                </div>
                <div className="input-wrapper">
                    <label>Exam Score:</label>
                    <input
                     type="number"
                     min={0}
                     max={60}
                     value={examScore}
                     onChange={(e) => {
                        const val = e.target.value;
                        setExamScore(val === "" ? "" :
                            Number(val)
                        );
                     }} />
                </div>
                <div className="form-action">
                    {isAddingLimitReached ? (
                        <p className="error-message">
                            Cannot add more courses. Semester
                             limit of {courseLimit} reached.
                        </p>
                    ) : (
                        <button className="saveBtn">Save</button>
                    )}
                    
                    <button className="cancelBtn" type="button"
                     onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
     );
}
 
export default CourseForm;