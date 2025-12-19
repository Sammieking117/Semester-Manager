import { useEffect, useMemo, useState } from "react";
import CourseContext from "./CourseContext";

const CourseProvider = ({children}) => {
    //courses array
    const [courses, setCourses] = useState(() => {
        const savedCourses = localStorage.getItem('semester-courses');
        return savedCourses ? JSON.parse(savedCourses) : [];
    });

    useEffect(() => {
        localStorage.setItem('semester-courses', JSON.stringify(courses));
    }, [courses]);

    //state for editing course
    const [editingCourse, setEditingCourse] = useState(null);

    //grades for courses
    const getGrade = (score) => {
        if (score <= 39) return 'F';
        if (score <= 44) return 'E';
        if (score <= 49) return 'D';
        if (score <= 59) return 'C';
        if (score <= 69) return 'B';
        if (score >= 70) return 'A';
        return '';
    };

    //grade counts for all courses
    const gradeCounts = useMemo(() => {
        const counts = {A: 0, B: 0, C: 0, D: 0, E: 0, F: 0};
        courses.forEach((course) => {
            const grade = getGrade(course.score);
            if(counts.hasOwnProperty(grade)) {
                counts[grade] += 1;
            }
        });
        return counts;
    }, [courses]);

    // course addition success message
    const [showSuccess, setShowSuccess] = useState(false);

    // course delition function
    const handleDeleteCourse = (idToDelete) => {
        const newCourses = courses.filter(course => course.id !== idToDelete);
        setCourses(newCourses);
    };

    // course addition function
    const addCourse = (course) => {
        setCourses(prev => [...prev, course]);

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 2000)
    };

    // updating course function
    const updateCourse = (updatedCourse) => {
        setCourses(prev =>
            prev.map(course =>
                course.id === updatedCourse.id ? updatedCourse : course
            )
        );
        setEditingCourse(null);
    };

    //course limit
    const [courseLimit, setCourseLimit] = useState(() => {
        const savedLimit = localStorage.getItem('saved-limit');
        return savedLimit ? savedLimit : null;
    });
    useEffect(() => {
        if (courseLimit !== null) {
            localStorage.setItem('saved-limit', courseLimit);
        }
    }, [courseLimit])
    //total courses
    const [totalCourses, setTotalCourses] = useState(() => {
        const savedTotalCourses = localStorage.getItem('total-courses');
        return savedTotalCourses ? savedTotalCourses : '';
    });
    useEffect(() => {
        localStorage.setItem('total-courses', totalCourses);
    }, [totalCourses]);

    //total units
    const [totalUnits, setTotalUnits] = useState(() => {
        const savedTotalUnits = localStorage.getItem('total-units');
        return savedTotalUnits ? savedTotalUnits : '';
    });
    useEffect(() => {
        localStorage.setItem('total-units', totalUnits);
    }, [totalUnits]);

    //My name
    const [myName, setMyName] = useState(() => {
        const savedName = localStorage.getItem('my-name');
        return savedName ? savedName : '';
    });
    useEffect(() => {
        localStorage.setItem('my-name', myName);
    }, [myName])

    //Grade Point scale
    const getGradePoint = (grade) => {
        switch (grade) {
            case 'A': return 5;
            case 'B': return 4;
            case 'C': return 3;
            case 'D': return 2;
            case 'E': return 1;
            default: return 0;
        }
    };

    // CGPA calculation
    const cgpa = useMemo(() => {
        let totalQualityPoints = 0;
        let allUnits = 0;

        courses.forEach((course) => {
            const unit = Number(course.unit);
            const score = Number(course.score);

            if (!isNaN(unit) && !isNaN(score)) {
                const grade = getGrade(score);
                const gradePoint = getGradePoint(grade);

                totalQualityPoints += (unit * gradePoint);
                allUnits += unit;
            }
        });
        return allUnits === 0 ? 0 : (totalQualityPoints / allUnits).toFixed(2);
    }, [courses]);

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
        
    return ( 
        <CourseContext.Provider
        value={{
            courses, handleDeleteCourse, addCourse,
            getGrade, gradeCounts,
            showSuccess,  updateCourse,
            editingCourse, setEditingCourse,
            courseLimit, setCourseLimit,
            totalCourses, setTotalCourses,
            totalUnits, setTotalUnits,
            myName, setMyName,
            cgpa,
            theme, toggleTheme}}>
            {children}
        </CourseContext.Provider>
     );
};
 
export default CourseProvider;