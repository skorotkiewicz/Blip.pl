/* eslint-disable @next/next/no-img-element */
import React from "react"
import { useQuery } from "blitz"
import getBliposphere from "app/statuses/queries/getBliposphere"
// import ReactHashtag from "app/react-hashtag"
import { parser } from "app/parser"

const Bliposphere = () => {
  const [statuses] = useQuery(getBliposphere, {})

  return (
    <div id="bliposphere-public">
      <div id="bliposphere-container">
        <div id="bliposphere">
          <div id="last-updates">
            <p>Przed chwilą na Blipie:</p>
          </div>
          {/* 
          <div id="pictures-pick">
            <ul className="clearfix" id="bliposphere-images">
              <li>
                <div className="rounding-top">&nbsp;</div>
                <div className="content">
                  <a href="/web/20130423065641/http://blip.pl/s/1672353819">
                    <img
                      alt="mms picture"
                      src="https://web.archive.org/web/20130423065641im_/http://static2.blip.pl/user_generated/update_pictures/3074535_standard.jpg"
                      title="stonqs: Czerna Mala."
                    />
                  </a>
                </div>
                <div className="rounding-bottom">&nbsp;</div>
              </li>

              <li>
                <div className="rounding-top">&nbsp;</div>
                <div className="content">
                  <a href="/web/20130423065641/http://blip.pl/s/1672353735">
                    <img
                      alt="mms picture"
                      src="https://web.archive.org/web/20130423065641im_/http://static0.blip.pl/user_generated/update_pictures/3074533_standard.jpg"
                      title="stonqs: Poranek."
                    />
                  </a>
                </div>
                <div className="rounding-bottom">&nbsp;</div>
              </li>

              <li>
                <div className="rounding-top">&nbsp;</div>
                <div className="content">
                  <a href="/web/20130423065641/http://blip.pl/s/1672351715">
                    <img
                      alt="mms picture"
                      src="https://web.archive.org/web/20130423065641im_/http://static1.blip.pl/user_generated/update_pictures/3074529_standard.jpg"
                      title="szpiegula: #Piglet byl paczec wschod slonca nad morzem."
                    />
                  </a>
                </div>
                <div className="rounding-bottom">&nbsp;</div>
              </li>

              <li>
                <div className="rounding-top">&nbsp;</div>
                <div className="content">
                  <a href="/web/20130423065641/http://blip.pl/s/1672350855">
                    <img
                      alt="mms picture"
                      src="https://web.archive.org/web/20130423065641im_/http://static3.blip.pl/user_generated/update_pictures/3074527_standard.jpg"
                      title="torowisko: Nie ma to jak zapelnienie w porannych pociagach ..."
                    />
                  </a>
                </div>
                <div className="rounding-bottom">&nbsp;</div>
              </li>

              <li>
                <div className="rounding-top">&nbsp;</div>
                <div className="content">
                  <a href="/web/20130423065641/http://blip.pl/s/1672347667">
                    <img
                      alt="mms picture"
                      src="https://web.archive.org/web/20130423065641im_/http://static1.blip.pl/user_generated/update_pictures/3074521_standard.jpg"
                      title="stonqs: "
                    />
                  </a>
                </div>
                <div className="rounding-bottom">&nbsp;</div>
              </li>
            </ul>
          </div> */}

          <ul id="bliposphere-statuses">
            {statuses.results.map((s, key) => (
              <LatestTextStatuses
                key={key}
                id={s.id}
                username={s.User?.name}
                avatar={s.User?.avatar}
                status={s.status}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export const LatestTextStatuses = ({ id, username, avatar, status }) => {
  return (
    <li className="status" id={`"status-of-user-${id}"`}>
      <div className="rounding-top">&nbsp;</div>
      <div className="container">
        <div className="inner">
          <a href={`/blog/${username}`} className="picture">
            <img alt={`${username} - avatar`} src={avatar} />
          </a>
          <div className="body ">
            <p>
              <a href={`/blog/${username}`} className="nick">
                {username}
              </a>
              :{" "}
              {/* <ReactHashtag
                renderHashtag={(hashtagValue: String) => (
                  <Link href={`/tags/${hashtagValue.substring(1)}`}>
                    <a className="hashtag">{hashtagValue}</a>
                  </Link>
                )}
              >
                {status}
              </ReactHashtag> */}
              {parser(status)}
              <span className="created-ago" style={{ display: "none" }}></span>
            </p>
          </div>
        </div>
      </div>
      <div className="rounding-bottom">&nbsp;</div>
    </li>
  )
}

export default Bliposphere
