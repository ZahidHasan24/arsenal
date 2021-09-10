import React, { useState } from "react";
import Stripes from "../../../Resources/images/stripes_red.png";
import { Tag } from "../../ui/misc";
import { Fade } from "react-awesome-reveal";
import HomeCards from "./cards";

const MeetPlayers = () => {
  const [show, setShow] = useState(false);

  return (
    <Fade
      onVisibilityChange={(inView) => {
        if (inView) {
          setShow(true);
        }
      }}
      triggerOnce
    >
      <div
        className="home_meetplayers"
        style={{ background: `#fff url(${Stripes})` }}
      >
        <div className="app_container">
          <div className="home_meetplayers_wrapper d-flex align-items-start justify-content-center">
            <div className="home_card_wrapper">
              <HomeCards show={show} />
            </div>
            <div className="home_text_wrapper">
              <div>
                <Tag
                  bck="#0e1731"
                  size="100px"
                  color="#fff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px",
                  }}
                >
                  Meet
                </Tag>
              </div>
              <div>
                <Tag
                  bck="#0e1731"
                  size="100px"
                  color="#fff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px",
                  }}
                >
                  The
                </Tag>
              </div>
              <div>
                <Tag
                  bck="#0e1731"
                  size="100px"
                  color="#fff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px",
                  }}
                >
                  Players
                </Tag>
              </div>
              <div>
                <Tag
                  bck="#fff"
                  size="27px"
                  color="#0e1731"
                  link={true}
                  linkto="/the_team"
                  add={{
                    display: "inline-block",
                    marginBottom: "27px",
                    border: "1px solid #0e1731",
                  }}
                >
                  Meet them here
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default MeetPlayers;
