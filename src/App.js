
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import NpcDetails from './NpcDetails';
import SkillCheck from './SkillCheck';
import DrivingCheck from './DrivingCheck';
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'topsecretApp.npcs'

function App() {
  const [npcs , newNpc] = useState([])
  const createNpcRef = useRef();

  useEffect(() => {
    const storedNpcs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedNpcs) newNpc(storedNpcs)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(npcs))
  }, [npcs])

  function toggleSelected (id){
    const copyNewNpcs = [...npcs]
    const npc = copyNewNpcs.find(npc => npc.id === id)
    npc.selected = !npc.selected
    newNpc(copyNewNpcs)
  }

  function createNpc (e) {
    const name = createNpcRef.current.value
    if (name ==='') return
    newNpc(prevNpc => {
      return [...prevNpc, {id: uuidv4(), name: name, attributeLevel: '30', selected: false}]
    })
    createNpcRef.current.value = null
  }

  function clearSelected() {
    const copyNewNpcs = npcs.filter(npc => !npc.selected)
    newNpc(copyNewNpcs)
  }

  return (
    <>
    <NpcDetails npcs = {npcs} toggleSelected = {toggleSelected}/>
    <input ref={createNpcRef} type = 'text'></input>
    <button onClick={createNpc}>Add Easy NPC</button>
    <button onClick={createNpc}>Add Medium NPC</button>
    <button onClick={clearSelected}>Delete Selected Character</button>
    <SkillCheck />
    <DrivingCheck />
    </>
  );
}

export default App;
