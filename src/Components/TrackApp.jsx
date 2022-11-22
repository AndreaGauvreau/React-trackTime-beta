import React, {useContext} from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import db from '../data'
import FilterTracker from './FilterTracker'
import {TrackerForm} from './TrackerForm'
import TrackTable from './TrackTable'
import {themes} from './ThemesContext'
import {createContext} from 'react'
import './trackerApp.css'
import Switch from 'react-switch'

export const ThemesContext = createContext(themes)

export default function TrackApp() {
  const [allTracker, setAllTracker] = useState(db)
  const [filter, SetFilter] = useState('')
  const [selected, setSelected] = useState()

  const [darkMode, setDarkMode] = useState(true)
  const themeMode = darkMode ? themes.light : themes.dark

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

  useEffect(() => {
    const data = localStorage.getItem('LocalTrackers')
    if (data) setAllTracker(JSON.parse(data))
  }, [])

  useEffect(() => {
    localStorage.setItem('LocalTrackers', JSON.stringify(allTracker))
    console.log('add data', allTracker)
  }, [allTracker])

  return (
    <div
      id="mainApp"
      style={{
        color: themeMode.color1,
        background: themeMode.background1,
      }}
    >
      <ThemesContext.Provider value={themeMode}>
        <section>
          <div>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              checkedIcon=""
              uncheckedIcon=""
              onHandleColor={themeMode.color1}
              offColor="#398ffc"
              onColor="#9b9b9b"
            />
            <TrackerForm
              selected={selected}
              onAddTracker={onAddTracker}
              onUpdateTracker={onUpdateTracker}
              onDeleteTracker={onDeleteTracker}
            />
          </div>
          <div>
            <FilterTracker onTextChange={onTextChange} />
            <TrackTable
              allTracker={allTracker}
              setSelected={setSelected}
              selectedID={selectedID}
              selected={selected}
            />
          </div>
        </section>
      </ThemesContext.Provider>
    </div>
  )
}
