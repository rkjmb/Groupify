import React, { useState, useEffect } from 'react'

import Card from './components/Card';
import UploadImage from './components/UploadImage';

import { v4 as uuidv4 } from 'uuid';

import { validateGroup } from '../util';

const CreateGroup = ({ users, handleTeam, setopen, currTeam }) => {

    const [team, setTeam] = useState(currTeam);
    const [error, seterror] = useState(false)

    const setGroupImage = (image) => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = (e) => {
            setTeamDetails('Image', reader.result)
        }
    }

    const handleTeamEdit = () => {
        let error = validateGroup(team);
        if (error) {
            seterror(error)
        } else {
            if (team.id) {
                handleTeam('edit', team);
            } else {
                team.id = uuidv4();
                handleTeam('add', team);
            }
        }

    }

    const handleTeamRemove = () => {
        handleTeam('remove', team);
    }

    const setUserList = ({ id }) => {
        let newMembers = team.members;
        let userExist = newMembers.indexOf(id) > -1;
        if (userExist) {
            newMembers = newMembers.filter(m => m !== id)
        } else {
            newMembers.push(id)
        }
        setTeamDetails('members', newMembers);
    }

    const setTeamDetails = (key, value) => {
        let newTeam = { ...team, [key]: value }
        setTeam(newTeam)
        seterror('')
    }

    return (
        <div className='teamBackdrop'>
            <div className='team'>
                <header className="header teamHeader">
                    <h1>
                        {(team.id ? 'Update' : 'Create') + " Group"}
                    </h1>
                    <span className="close" onClick={() => setopen(false)}>X</span>
                </header>
                {error && <div className='error'>{error}</div>}
                <section className='teamInfo'>
                    <div className='withUploadButton'>
                        <div className='imageWrapper'>
                            <img src={team.Image} alt='' className='cardImage' />
                        </div>
                        <UploadImage setImage={setGroupImage} />
                    </div>
                    <div className='inputWrapper'>
                        <label>Name *</label>
                        <input placeholder='group name' value={team.name} onChange={e => setTeamDetails('name', e.target.value)} />
                        <label>Descrption</label>
                        <input placeholder='group description' value={team.desc} onChange={e => setTeamDetails('desc', e.target.value)} />
                    </div>
                </section>
                <section className='cardsWrapper'>
                    {users.map(user => <Card key={user.id} data={user} checked={team.members.includes(user.id)} handleClick={setUserList} />)}
                </section>
                <footer>
                    <button className='addButton' onClick={handleTeamEdit}>{team.id ? 'Update' : 'Create'}</button>
                    {team.id && <button className='removeButton' onClick={handleTeamRemove}>Remove</button>}
                </footer>
            </div >
        </div>

    )
}

export default CreateGroup
