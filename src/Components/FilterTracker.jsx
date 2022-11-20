import React from 'react'

export default function FilterTracker({onTextChange}) {
  return (
    <div>
      <input type="text" onChange={onTextChange} />
    </div>
  )
}
