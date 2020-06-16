import React, { useState, useEffect } from "react";
import { AllCoursesURL } from "./settings";
function CoursePage({ apiFetchFacade }) {
  const [courses, setCourses] = useState([]);
  const [yogaClass, setYogaClass] = useState();
  const [showClass, setShowClass] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    apiFetchFacade()
      .getApiFetch(AllCoursesURL)
      .then((data) => {
        setCourses([...data]);
      })
      .catch((err) => {
        setError(err.status);
      });
  }, []);

  function showClassInfo(yogaClass) {
    console.log(yogaClass);
    setYogaClass(yogaClass);
    setShowClass(true);
  }

  return (
    <div>
      <h2>Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Classes</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseName}</td>
              <td>{course.description}</td>
              <td>
                {
                  <button onClick={() => showClassInfo(course.yogaClasses)}>
                    Info On Classes
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showClass && (
        <ul>
          <li>Max ParticiPants: {yogaClass[0].maxParticipants}</li>
          <li>Price: {yogaClass[0].price}</li>
          <li>Start Date: {yogaClass[0].startDate}</li>
        </ul>
      )}
    </div>
  );
}

export default CoursePage;
