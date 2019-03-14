import React from 'react';
import { Link } from 'react-router-dom';

import arsenalLogo from '../../Resources/images/logos/arsenal_logo.png';

export const ArsenalLogo = (props) => {
    const template = <div className="img_cover" style={{width: props.width, height: props.height, background: `url(${arsenalLogo}) no-repeat`}}>

    </div>
    if(props.link){
        return (
            <Link to={props.linkTo} className="link_logo">
                {template}
            </Link>
        )
    }else{
        return template
    }
}