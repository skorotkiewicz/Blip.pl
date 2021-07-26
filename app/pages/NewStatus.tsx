import { useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import createStatus from "app/statuses/mutations/createStatus"
import { useState, useEffect } from "react"

const NewStatusPage /*: BlitzPage */ = ({ refetch, reply }) => {
  const [createStatusMutation] = useMutation(createStatus)
  const [aaa, setStatus] = useState("")
  const [error, setError] = useState("")

  const _status = async (value: string) => {
    if (value.length <= 160) {
      setStatus(value)
    }
  }

  const _submit = async (e: any) => {
    e.preventDefault()

    try {
      if (aaa !== "") {
        await createStatusMutation({ status: aaa })
      }
      refetch()
      setError("")
    } catch (error) {
      setError(error.message)
      // console.error(error)
    }
  }

  useEffect(() => {
    if (reply) setStatus(reply)
  }, [reply])

  return (
    <div id="dashboard-input" style={{ marginBottom: 30 }}>
      <div id="middle">
        <div id="textarea-background">
          <textarea
            placeholder="Co słychać?"
            value={aaa}
            onChange={(e) => {
              _status(e.target.value)
            }}
            name="status"
          ></textarea>
        </div>
      </div>

      <div id="footline">
        <div id="blip-post">
          <button
            style={{
              background: "url(/images/logo.png) no-repeat",
              border: 0,
              height: 60,
              width: 95,
            }}
            onClick={(e) => {
              _submit(e)
              setStatus("")
            }}
          ></button>
        </div>
        <span style={{ marginLeft: 10 }}>Pozostała ilość znaków: {160 - aaa.length}</span>
      </div>
      {error}
    </div>
  )
}

NewStatusPage.authenticate = true
NewStatusPage.getLayout = (page) => <Layout title={"Create New Status"}>{page}</Layout>

export default NewStatusPage
