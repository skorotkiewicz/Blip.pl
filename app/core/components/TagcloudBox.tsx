import React from "react"

const TagcloudBox = () => {
  return (
    <div id="tagcloud-box-container" style={{ marginTop: "10px" }}>
      <div id="tagcloud-box-rounding-top">&nbsp;</div>
      <div id="tagcloud">
        <h2>
          <a href="/tags">Popularne tagi</a>:
        </h2>

        <div id="tagcloud-items">
          {/* <a
            href="/tags/wyraz"
            className="g5 p2"
            title="#wyraz - statusy oznaczone tagiem wyraz na Blipie"
          >
            #wyraz
          </a> */}

          <h3 style={{ color: "red" }}>[WIP] Już niedługo</h3>
        </div>
        {/* <a href="/tags" className="tagcloud-more">
          więcej »
        </a> */}
      </div>
      <div id="tagcloud-box-rounding-bottom">&nbsp;</div>
    </div>
  )
}

export default TagcloudBox
