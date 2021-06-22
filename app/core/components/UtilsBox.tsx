import React from "react"
import { Link, Image } from "blitz"

const UtilsBox = ({ tag }) => {
  return (
    <>
      <div id="dashboard-loading" className="clearfix">
        <Image width="50" height="50" src="/images/ajax-loading.gif" alt="loading" />
      </div>
      <div id="last-updates">
        <h1>Statusy oznaczone tagiem: {tag}</h1>
      </div>
      <div id="pages-top" className="pages" style={{ display: "none" }}>
        <a href="#content" className="prev-page">
          &nbsp;
        </a>
        <div className="pages-info">
          Archiwum (<Link href={`/tags/`}>wróć na kokpit</Link>)
        </div>
        <a href={`/tags/${tag}/page/2`} className="next-page">
          &nbsp;
        </a>
        <br className="clearfix" />
      </div>{" "}
    </>
  )
}

export default UtilsBox
