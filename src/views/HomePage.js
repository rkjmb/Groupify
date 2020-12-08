import React, { useState, useEffect } from 'react'
import CreateGroup from './CreateGroup';
import Card from './components/Card';

const HomePage = () => {
    const [users, setusers] = useState([]);
    const [teams, setteams] = useState([]);
    const [currTeam, setcurrTeam] = useState({ Image: '', name: '', desc: '', members: [], id: null })
    const [open, setopen] = useState(false);

    const callGetUsersApi = async () => {
        const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json');
        const users = await response.json();
        setusers(users);
    }

    useEffect(() => {
        callGetUsersApi();
    }, [])

    useEffect(() => {
        if (!open) {
            setcurrTeam({ Image: '', name: '', desc: '', members: [], id: null })
        }
    }, [open])

    const handleTeam = (action, team) => {
        let newTeams = [...teams];
        if (action === 'add') {
            newTeams.push(team);
        } else if (action === 'edit') {
            newTeams = newTeams.map(nT => {
                if (nT.id == team.id) {
                    nT = team;
                }
                return nT;
            });
        } else if (action === 'remove') {
            newTeams = newTeams.filter(nT => nT.id !== team.id);
        } else {
            alert('Something went wrong. Please try again.')
        }
        setteams(newTeams);
        setopen(false)
    }

    const handleTeamClick = (team) => {
        setcurrTeam(team)
        setopen(true)
    }

    return (
        <div>
            {open && <CreateGroup users={users} handleTeam={handleTeam} setopen={setopen} currTeam={currTeam} />}
            <section className='cardsWrapper'>
                {!open && < button onClick={() => setopen(!open)}>Create Team</button>}
                {teams.map((team, index) => <Card key={index} data={team} checked={false} handleClick={handleTeamClick} />)}
            </section>
        </div >
    )
}

export default HomePage
