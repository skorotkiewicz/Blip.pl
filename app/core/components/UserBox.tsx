/* eslint-disable @next/next/no-img-element */
import { Link, useMutation, useQuery } from "blitz"
import createFollowing from "app/statuses/mutations/createFollowing"
import createBlocked from "app/statuses/mutations/createBlocked"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import getBlocked from "app/statuses/queries/getBlocked"

const UserBox = ({ friends, user }) => {
  const [createFollowingMutation] = useMutation(createFollowing)
  const [createBlockedMutation] = useMutation(createBlocked)
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [blocked] = useQuery(getBlocked, { id: user?.id })

  return (
    <div className="side-box-container" id="archives">
      <div className="side-box">
        <div className="content">
          <div className="tabs">
            <h4 style={{ width: 70, border: "1px solid #ccc" }}>
              <img src={user.avatar} style={{ width: 70, height: 70 }} alt="" />
              <span style={{ color: "darkorange", fontSize: 16, padding: 5 }}>{user?.name}</span>
            </h4>

            {user?.id !== currentUser?.id && (
              <>
                <button
                  onClick={async () => {
                    await createFollowingMutation({ id: user?.id })
                  }}
                  style={{ marginTop: 10, marginBottom: 10, padding: 2 }}
                >
                  {friends.follows.some((user) => user.followerId === currentUser?.id)
                    ? "Przestań obserwować"
                    : "Obserwuj"}
                </button>
                <button
                  onClick={async () => {
                    await createBlockedMutation({ id: user?.id })
                  }}
                  style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, padding: 2 }}
                >
                  {blocked.isBlocked === 0 ? "Zablokuj" : "Odblokuj"}
                </button>
              </>
            )}

            <div className="options">
              <Link href="/options">
                <span>ustawienia</span>
              </Link>
              {" | "}

              <span
                className="button small"
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                wyloguj
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .side-box-container {
          background: url(/side-box-top.png) top left no-repeat;
          padding-top: 2px;
          width: 249px;
        }
        .side-box {
          background: url(/side-box-bottom.png) bottom left no-repeat;
          padding-bottom: 3px;
          margin-bottom: 16px;
          width: 249px;
        }
        .content {
          background: url(/side-box.gif) top left repeat-x #fff;
        }
        .track-box a {
          margin: 3px;
        }
        .tabs {
          padding: 7px;
        }
        .options a,
        .options span {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default UserBox
