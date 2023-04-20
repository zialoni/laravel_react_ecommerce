import React, { Fragment } from 'react';
import Animation from './Loading_2.gif';

const loader = () => {
  return (
    <Fragment>
        <img src={Animation} style={{display: 'block', margin: 'auto'}}/>
    </Fragment>
  )
}

export default loader