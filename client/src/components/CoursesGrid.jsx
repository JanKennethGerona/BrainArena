import React, { useState } from 'react'
import CourseCard from './CourseCard'
import QuizDetails from './QuizDetails'
import './CoursesGrid.css'

function CoursesGrid({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isQuizDetailsOpen, setIsQuizDetailsOpen] = useState(false)

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setIsQuizDetailsOpen(true)
  }

  const handleCloseQuizDetails = () => {
    setIsQuizDetailsOpen(false)
    setSelectedCourse(null)
  }

  return (
    <>
      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onClick={() => handleCourseClick(course)}
          />
        ))}
      </div>
      
      <QuizDetails 
        isOpen={isQuizDetailsOpen}
        onClose={handleCloseQuizDetails}
        course={selectedCourse}
      />
    </>
  )
}

export default CoursesGrid
