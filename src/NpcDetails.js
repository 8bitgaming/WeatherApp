import React from 'react'
import Npc from './Npc'

export default function combatChecker({npcs, toggleSelected}) {
    return (
        npcs.map(npc => {
            return <Npc key={npc.id} npc={npc} toggleSelected={toggleSelected}/>
        })
    )
}
