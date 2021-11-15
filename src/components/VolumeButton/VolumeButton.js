import React from 'react';

import classes from './VolumeButton.module.css';

const VolumeButton = ( props ) => {
  let classesNames = [classes.VolumeButton];
  if (props.isPrevious){
    classesNames = [classes.VolumeButton];
  }
  return (
    <button
      // disabled={props.disabled}
      className={classesNames.join(' ')} style={{display: props.display, color: props.color}}
      onClick={props.clicked}><span>{props.children}</span></button>
  );
}

export default VolumeButton;
