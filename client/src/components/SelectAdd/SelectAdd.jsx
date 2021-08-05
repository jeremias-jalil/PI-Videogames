import React from 'react'

export default function SelectAdd({ name, setGameInfo, gameInfo, list }) {

    let listAdd=gameInfo[name]

    function add(e) {
        e.preventDefault()
        listAdd.push(parseInt(e.target[0].value))
        setGameInfo({...gameInfo,[name]: listAdd})
    }

    return (
        <div>
            <form onSubmit={(e) => add(e)}>
                <select name={name}>
                    <option value="">Add {name}</option>
                    {list.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}
