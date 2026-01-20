import React from 'react'
import './CourseCard.css'

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-image" style={{ backgroundImage: `url(${course.image})` }}></div>
      <div className="course-content">
        <h4 className="course-title">{course.title}</h4>
        <p className="course-items">{course.items} items</p>
        <div className="course-tags">
          {course.tags.map((tag, index) => (
            <span key={index} className="course-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
