import React, {useEffect, useState} from 'react'
import {diffTime, groupBy} from '../functions'
import './table.css'

export default function TrackTable({allTracker, setSelected, selectedID}) {
  const rows = []
  let lastCategory = ''

  const trackerParCategory = groupBy(allTracker, 'category')

  Object.keys(trackerParCategory).forEach(category => {
    trackerParCategory[category].forEach(tracker => {
      if (tracker.category !== lastCategory) {
        rows.push(<TrackerCategory key={category} category={category} />)
      }
      rows.push(
        <TrackRow
          key={tracker.id}
          allTracker={tracker}
          setSelected={setSelected}
          selectedID={selectedID}
        />,
      )
      lastCategory = tracker.category
    })
  })

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom du tracker</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function TrackRow({allTracker, setSelected, selectedID}) {
  const [duree, setDuree] = useState(
    diffTime(allTracker?.starttime, allTracker?.endtime),
  )

  useEffect(() => {
    const refresh = () => {
      setDuree(diffTime(allTracker?.starttime, allTracker?.endtime))
    }
    const timer = setTimeout(() => refresh(), 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [allTracker?.starttime, allTracker?.endtime, duree])

  const handleClick = () => {
    setSelected(allTracker)
  }

  const selected = allTracker.id === selectedID ? 'selected' : ''

  return (
    <tr
      className="table-row"
      id={selected}
      key={allTracker.id}
      onClick={handleClick}
    >
      <td>{allTracker.name}</td>
      <td>{allTracker.starttime}</td>
      <td>{allTracker.endtime}</td>
      <td>{duree}</td>
    </tr>
  )
}

function TrackerCategory({category}) {
  return (
    <tr>
      <th className="table-category" colSpan="4">
        {category}
      </th>
    </tr>
  )
}
