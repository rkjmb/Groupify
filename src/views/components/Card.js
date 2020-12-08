import React from 'react'

const Card = ({ data, checked, handleClick }) => {
    const { id, name, Image } = data;
    return (
        <div className='cardWrapper' onClick={() => handleClick(data)}>
            {checked && <div className='cardChecked'>+</div>}
            <div className='imageWrapper'><img className='cardImage' alt={name} src={Image} /></div>
            <div className='cardName'>{name}</div>
        </div>
    )
}

export default Card;
