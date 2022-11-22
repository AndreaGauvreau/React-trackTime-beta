import React, {useContext, useReducer, useState} from 'react'
import {randomId, getDateTimeForPicker} from '../functions'
import {themes} from './ThemesContext'
import './trackerForm.css'
import {ThemesContext} from './TrackApp'

const newTracker = () => ({
  id: randomId(),
  name: '',
  starttime: getDateTimeForPicker(),
  endtime: '',
  category: 'default',
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'new':
      return {
        status: 'new',
        tracker: newTracker(),
        activeButtons: {
          btnSave: true,
          btnUp: false,
          btnDel: true,
          btnAdd: true,
        },
        activeInput: true,
        error: null,
      }
    case 'edit':
      return {
        status: 'edition',
        tracker: action.payload,
        activeButtons: {
          btnSave: false,
          btnUp: true,
          btnDel: false,
          btnAdd: false,
        },
        activeInput: true,
        error: null,
      }
    case 'save':
      return {
        ...state,
        status: 'saved',
        activeButtons: {btnSave: false, btnUp: false, btnDel: false},
        activeInput: false,
        error: null,
      }
    case 'update':
      return {
        ...state,
        status: 'updated',
        activeButtons: {btnSave: false, btnUp: true, btnDel: true},
        activeInput: true,
        error: null,
      }
    case 'delete':
      return {
        ...state,
        status: 'deleted',
        tracker: action.payload,
        activeButtons: {btnSave: false, btnUp: false, btnDel: false},
        activeInput: false,
        error: null,
      }
    case 'fail':
      return {
        status: 'fail',
        tracker: null,
        activeButtons: {btnSave: true, btnUp: true, btnDel: true},
        activeInput: false,
        error: action.error,
      }
    case 'trackerChange':
      return {
        ...state,
        tracker: action.payload,
        error: null,
      }
    default:
      throw new Error('Action non supporté')
  }
}

export function TrackerForm({
  selected = {...newTracker(), id: ''},
  onAddTracker,
  onUpdateTracker,
  onDeleteTracker,
}) {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle',
    tracker: selected,
    activeButtons: {btnSave: true, btnUp: true, btnDel: true, btnAdd: false},
    activeInput: false,
    error: null,
  })
  console.log('tracker', state.tracker)

  const handleNameChange = e => {
    dispatch({
      type: 'trackerChange',
      payload: {...state.tracker, name: e.target.value},
    })
  }

  const handleStartTimeChange = e => {
    dispatch({
      type: 'trackerChange',
      payload: {...state.tracker, starttime: e.target.value},
    })
  }

  const handleEndTimeChange = e => {
    dispatch({
      type: 'trackerChange',
      payload: {...state.tracker, endtime: e.target.value},
    })
  }

  const handleCategoryChange = e => {
    dispatch({
      type: 'trackerChange',
      payload: {...state.tracker, category: e.target.value},
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    onAddTracker(state.tracker)
    dispatch({type: 'save'})
  }
  const handleDelete = () => {
    onDeleteTracker(state.tracker)
    dispatch({type: 'delete', payload: newTracker()})
  }

  const handleUpdate = () => {
    onUpdateTracker(state.tracker)
    dispatch({type: 'update'})
  }
  const handleCreate = () => {
    dispatch({type: 'new', payload: newTracker()})
  }
  React.useEffect(() => {
    if (selected?.id !== '' && selected?.id !== state.tracker.id) {
      dispatch({type: 'edit', payload: selected})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const disabled = state.tracker.id === '' ? true : false
  const theme = useContext(ThemesContext)
  return (
    <div id="formDiv" style={{background: theme.superposition1}}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <input
            style={{background: theme.background1, color: theme.color1}}
            type="text"
            value={state.tracker.name}
            onChange={handleNameChange}
            disabled={disabled}
          />
          <input
            style={{background: theme.background1, color: theme.color1}}
            type="datetime-local"
            value={state.tracker.starttime}
            onChange={handleStartTimeChange}
            disabled={disabled}
          />
          <input
            style={{background: theme.background1, color: theme.color1}}
            type="datetime-local"
            value={state.tracker.endtime}
            onChange={handleEndTimeChange}
            disabled={disabled}
          />
          <input
            style={{background: theme.background1, color: theme.color1}}
            type="text"
            value={state.tracker.category}
            onChange={handleCategoryChange}
            disabled={disabled}
          />
        </fieldset>
        <div id="actionButtonDiv" style={{background: theme.superposition2}}>
          <input
            style={{
              background: state.activeButtons.btnSave ? '' : theme.actionBtn2,
              color: theme.color2,
              boxShadow: state.activeButtons.btnSave ? '' : theme.shadow2,
            }}
            type="button"
            value="mettre à jour"
            onClick={handleUpdate}
            disabled={state.activeButtons.btnSave}
          />
          <input
            style={{
              background: state.activeButtons.btnDel ? '' : theme.actionBtn2,
              color: theme.color2,
              boxShadow: state.activeButtons.btnDel ? '' : theme.shadow2,
            }}
            type="button"
            value="supprimer"
            onClick={handleDelete}
            disabled={state.activeButtons.btnDel}
          />
          <input
            style={{
              background: state.activeButtons.btnUp ? '' : theme.actionBtn2,
              color: theme.color2,
              boxShadow: state.activeButtons.btnUp ? '' : theme.shadow2,
            }}
            type="submit"
            value="ajouter"
            disabled={state.activeButtons.btnUp}
          />
          <input
            style={{
              background: state.activeButtons.btnAdd ? '' : theme.actionBtn2,
              color: theme.color2,
              boxShadow: state.activeButtons.btnAdd ? '' : theme.shadow2,
            }}
            type="button"
            value="nouveau"
            onClick={handleCreate}
            disabled={state.activeButtons.btnAdd}
          />
        </div>
      </form>
    </div>
  )
}
