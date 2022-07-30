import React from 'react'

function FilterDate({onChange}) {
  return (
      <>
                <label className="dropdown-text">Sort By </label>
                <select className="dropdown-select" onChange={onChange}>
                    <option value="popularity">Popularity</option>
                    <option value="date">Date</option>
                </select>
        </>
  )
}

export default FilterDate
