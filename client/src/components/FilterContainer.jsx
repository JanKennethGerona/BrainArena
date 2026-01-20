import React from 'react'
import './FilterContainer.css'

function FilterContainer({ allTags, activeFilters, toggleFilter, clearFilters }) {
  return (
    <div className="filter-container">
      <div className="filter-header">
        <h3 className="filter-title">Filter by Tags</h3>
        {activeFilters.length > 0 && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All ({activeFilters.length})
          </button>
        )}
      </div>
      <div className="filter-tags">
        {allTags.map((tag, index) => (
          <button
            key={index}
            className={`filter-tag ${activeFilters.includes(tag) ? 'active' : ''}`}
            onClick={() => toggleFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterContainer
