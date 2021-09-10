import React from 'react';
import { ArsenalLogo } from '../ui/icons';

const Footer = () => {
    return ( 
        <footer className="bck_blue">
            <div className="footer_logo">
                <ArsenalLogo
                    width="70px"
                    height="70px"
                    link={true}
                    linkTo="/"
                />
            </div>
            <div className="footer_discl">
                Arsenal {new Date().getFullYear()}. All rights reserved
            </div>
        </footer>
    );
}
 
export default Footer;