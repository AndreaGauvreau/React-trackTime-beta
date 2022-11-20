import React, {useState} from 'react'
import {randomId, getDateTimeForPicker} from '../functions'

const newTracker = () => ({
  id: randomId(),
  name: '',
  starttime: getDateTimeForPicker(),
  endtime: '',
  category: 'default',
})

export function TrackerForm({
  selected = {...newTracker(), id: ''},
  onAddTracker,
  onUpdateTracker,
  onDeleteTracker,
}) {
  const [tracker, setTracker] = useState(selected)
  console.log('tracker', tracker)

  const handleNameChange = e => {
    setTracker({...tracker, name: e.target.value})
  }

  const handleStartTimeChange = e => {
    setTracker({...tracker, starttime: e.target.value})
  }

  const handleEndTimeChange = e => {
    setTracker({...tracker, endtime: e.target.value})
  }

  const handleCategoryChange = e => {
    setTracker({...tracker, category: e.target.value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    onAddTracker(tracker)
  }
  const handleDelete = () => {
    onDeleteTracker(tracker)
  }

  const handleUpdate = () => {
    onUpdateTracker(tracker)
  }
  const handleCreate = () => {
    setTracker(newTracker())
  }
  React.useEffect(() => {
    if (selected?.id !== '' && selected?.id !== tracker.id) {
      setTracker(selected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const disabled = tracker.id === '' ? true : false

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <input type="text" value={tracker.name} onChange={handleNameChange} />
          <input
            type="datetime-local"
            value={tracker.starttime}
            onChange={handleStartTimeChange}
          />
          <input
            type="datetime-local"
            value={tracker.endtime}
            onChange={handleEndTimeChange}
          />
          <input
            type="text"
            value={tracker.category}
            onChange={handleCategoryChange}
          />
        </fieldset>
        <input
          type="button"
          value="mettre à jour"
          onClick={handleUpdate}
          disabled={disabled}
        />
        <input
          type="button"
          value="supprimer"
          onClick={handleDelete}
          disabled={disabled}
        />
        <input type="submit" value="ajouter" disabled={disabled} />
        <input type="button" value="nouveau" onClick={handleCreate} />
      </form>
    </div>
  )
}
