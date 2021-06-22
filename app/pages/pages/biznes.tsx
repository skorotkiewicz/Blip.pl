import React from "react"
import Header from "app/core/components/Header"

const Biznes = () => {
  return (
    <>
      <div id="full" className="full-container-high">
        <div id="main" className="clearfix">
          <Header />

          <div id="content" className="foreign-dashboard">
            <div className="c">Przewodnik</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .c {
          padding: 10px;
          margin: 10px;
          background-color: #fff;
          border-radius: 10px;
        }
      `}</style>
    </>
  )
}

export default Biznes
