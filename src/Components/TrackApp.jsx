import React from 'react'
import {useState} from 'react'
import db from '../data'
import FilterTracker from './FilterTracker'
import TrackTable from './TrackTable'
export default function TrackApp() {
  const [allTracker, setAllTracker] = useState(db)
  const [filter, SetFilter] = useState()

  const onTextChange = e => {
    SetFilter(e.target.value)
    const filterTracks = db.filter(
      track => track.name.toLocaleLowerCase().indexOf(e.target.value) !== -1,
    )
    setAllTracker(filterTracks)
  }

  return (
    <div>
      il y a {allTracker.length}
      <FilterTracker onTextChange={onTextChange} />
      <TrackTable allTracker={allTracker} />
    </div>
  )
}
