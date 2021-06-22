const Pagination = ({ router, page, hasMore }) => {
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div id="pages-bottom" className="pages">
      <span
        className="prev-page"
        onClick={() => {
          if (page !== 0) goToPreviousPage()
        }}
      >
        &nbsp;
      </span>

      <div className="pages-info">
        Strona: <span id="page-number">{page + 1}</span>
      </div>

      <span
        className="next-page"
        onClick={() => {
          if (hasMore) goToNextPage()
        }}
      >
        &nbsp;
      </span>

      <br className="clearfix" />
    </div>
  )
}

export default Pagination
