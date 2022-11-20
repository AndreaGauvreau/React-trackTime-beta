import React from 'react'
import {groupBy} from '../functions'
export default function TrackTable({allTracker}) {
  const rows = []
  let lastCategory = ''

  const trackerParCategory = groupBy(allTracker, 'category')

  Object.keys(trackerParCategory).forEach(category => {
    trackerParCategory[category].forEach(tracker => {
      if (tracker.category !== lastCategory) {
        rows.push(<TrackerCategory key={category} category={category} />)
      }
      rows.push(<TrackRow key={tracker.id} allTracker={tracker} />)
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

function TrackRow({allTracker}) {
  return (
    <tr key={allTracker.id}>
      <td>{allTracker.name}</td>
      <td>{allTracker.starttime}</td>
      <td>{allTracker.endtime}</td>
      <td>durée</td>
    </tr>
  )
}

function TrackerCategory({category}) {
  return (
    <tr>
      <th colSpan="4">{category}</th>
    </tr>
  )
}
