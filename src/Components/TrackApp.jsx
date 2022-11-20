import React from 'react'
import {useState} from 'react'
import db from '../data'
import FilterTracker from './FilterTracker'
import {TrackerForm} from './TrackerForm'
import TrackTable from './TrackTable'

export default function TrackApp() {
  const [allTracker, setAllTracker] = useState(db)
  const [filter, SetFilter] = useState('')
  const [selected, setSelected] = useState()

  const onTextChange = e => {
    SetFilter(e.target.value)
    const filterTracks = db.filter(
      track => track.name.toLocaleLowerCase().indexOf(e.target.value) !== -1,
    )
    setAllTracker(filterTracks)
  }
  const selectedID = selected?.id

  const onAddTracker = tracker => {
    if (tracker.name === '') {
      return alert('veuillez ajouter un nom')
    }
    if (tracker.starttime === '') {
      return alert('veuillez ajouter une date de début')
    }
    if (tracker.category === '') {
      return alert('veuillez ajouter une categorie')
    }
    setAllTracker([...allTracker, tracker])
  }
  const onDeleteTracker = tracker => {
    if (tracker.id === '') {
      alert('veuillez selectionner un tracker')
      return
    }
    setAllTracker(allTracker.filter(item => item.id !== tracker.id))
  }
  const onUpdateTracker = tracker => {
    let updatedList = allTracker.map(item =>
      item.id === tracker.id ? tracker : item,
    )
    setAllTracker(updatedList)
  }

  return (
    <div>
      il y a {allTracker.length}
      <FilterTracker onTextChange={onTextChange} />
      <TrackerForm
        selected={selected}
        onAddTracker={onAddTracker}
        onDeleteTracker={onDeleteTracker}
        onUpdateTracker={onUpdateTracker}
      />
      <TrackTable
        allTracker={allTracker}
        setSelected={setSelected}
        selectedID={selectedID}
        selected={selected}
      />
    </div>
  )
}
