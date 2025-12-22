import { useContext } from "react";
import CourseContext from "./context/CourseContext";

const Profile = () => {
    const { courseLimit, setCourseLimit, totalCourses,
         setTotalCourses, totalUnits, setTotalUnits,
        myName, setMyName} = useContext(CourseContext);

    const handleProfile = (e) => {
        e.preventDefault();
        const limit = parseInt(totalCourses, 10);
        if (limit > 0) {
            setCourseLimit(limit);
        }
    };

    const handleProfileDelete = () => {
        setCourseLimit('');
        setTotalCourses('');
        setTotalUnits('');
    }
    return ( 
        <div className="profile">
            <form onSubmit={handleProfile}>
                <div className="input-wrapper">
                    <label>Total Course:</label>
                    <input
                     type="number"
                     required
                     value={totalCourses}
                     onChange={(e) => setTotalCourses(e.target.value)}
                     min={5}
                     max={15} />
                </div>
                <div className="input-wrapper">
                    <label>Total Units:</label>
                    <input
                     type="number"
                     required
                     value={totalUnits}
                     onChange={(e) => setTotalUnits(e.target.value)}
                     min={21}
                     max={24} />
                </div>
                <div className="input-wrapper">
                    <label>My Name:</label>
                    <input
                     type="text"
                     required
                     value={myName}
                     onChange={(e) => setMyName(e.target.value)} />
                </div>
                <button>Save</button>
                <button
                className="delete-profile"
                 type="button"
                 onClick={handleProfileDelete}>Delete</button>

                {courseLimit && (<p>Current Limit Set:
                    <strong>{courseLimit}</strong>
                </p>)}
            </form>
        </div>
     );
}
 
export default Profile;