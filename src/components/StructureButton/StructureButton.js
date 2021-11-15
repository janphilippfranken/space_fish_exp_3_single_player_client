import React from 'react';

import classes from './StructureButton.module.css';

const StructureButton = ( props ) => {
  let classesNames = [classes.StructureButton];
  // if (props.isPrevious){
  //   classesNames = [classes.StructureButton];
  // }
  return (
    <button
      // disabled={props.disabled}
      className={classesNames.join(' ')} style={{position: props.position, display: props.display, color: props.color, left: props.left, top: props.top}}
      onClick={props.onClick}><span>{props.children}</span></button>
  );
}

export default StructureButton;
