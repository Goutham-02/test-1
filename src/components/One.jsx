import React from 'react'

const One = (props) => {

    const handleClick = () => {
        var copy = Object.values(props).join(' ');
        navigator.clipboard.writeText(copy);
    }

  return (
    <div>
        <h4>{props.topic}</h4>
        <button onClick={handleClick}>Copy</button>
    </div>
  )
}

export default One