import React from 'react'

import './Button.css'

export default props => {
    let classes = 'btn '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''
    
    return (
        <button 
            className={classes} 
            onClick={() => props.click(props.label)}>
        {props.label}
    </button>
)}
