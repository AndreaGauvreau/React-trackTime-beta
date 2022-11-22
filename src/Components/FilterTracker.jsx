import React, {useContext} from 'react'
import {ThemesContext} from './TrackApp'

export default function FilterTracker({onTextChange}) {
  const theme = useContext(ThemesContext)
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <input
        type="text"
        onChange={onTextChange}
        placeholder="rechercher un tracker"
        style={{
          background: theme.superposition1,
          width: '100%',
          marginBottom: '10px',
        }}
      />
    </div>
  )
}
