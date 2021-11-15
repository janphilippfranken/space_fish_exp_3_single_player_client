import React from 'react';

import classes from './MiniArrows.module.css';

const MiniArrows = props => {
    return (
        <div onClick={props.onClick} hover={props.hover} className={[classes.MiniArrows,classes[props.arrow_id]].join(" ")} style={{display: props.display, backgroundColor: props.color, left:props.left, position: props.position, width: props.width, top: props.top, opacity: props.opacity, borderColor: props.borderColor}}>
        {props.children}
        
        </div>
    );
  
    
};

export default MiniArrows; 