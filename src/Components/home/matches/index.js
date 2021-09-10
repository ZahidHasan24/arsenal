import React from 'react';
import { Tag } from '../../ui/misc';
import Blocks from './Blocks';

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="app_container">
                <Tag
                    bck="#0e1731"
                    size="50px"
                    color="#fff"
                >
                    Matches
                </Tag>

                <Blocks />
                
                <Tag
                    bck="#fff"
                    size="22px"
                    color="#0e1731"
                    link={true}
                    linkto="/the_matches"
                >
                    See More Matches
                </Tag>
            </div>
        </div>
    );
}
 
export default MatchesHome;