import React from 'react'

export default function Npc({npc, toggleSelected}) {
    function handleToggleSelected() {
        toggleSelected(npc.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={npc.selected} onChange={handleToggleSelected}></input>
                {npc.name}
                {`Level: ${npc.attributeLevel}`}
            </label>
            
        </div>
    )
}
