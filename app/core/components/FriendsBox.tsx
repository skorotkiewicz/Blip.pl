/* eslint-disable @next/next/no-img-element */
import UserBox from "./UserBox"
const FriendsBox = ({ friends, user }) => {
  return (
    <>
      {user && <UserBox friends={friends} user={user} />}

      <div className="side-box-container" id="archives" style={{ marginTop: 15 }}>
        <div className="side-box">
          <div className="content">
            <div className="tabs">
              <h4>Obserwatorzy: {friends.Followers}</h4>
            </div>
            <div className="track-box">
              {friends.follows.map((e, key) => (
                <a
                  key={key}
                  href={`/blog/${e.follower.name}`}
                  title={e.follower.name}
                  className="user"
                >
                  <img
                    src={e.follower.avatar}
                    alt={e.follower.name}
                    style={{ width: 30, height: 30 }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="side-box-container" id="archives">
        <div className="side-box">
          <div className="content">
            <div className="tabs">
              <h4>Obserwuje: {friends.Following}</h4>
            </div>
            <div className="track-box">
              {friends.followings.map((e, key) => (
                <a
                  key={key}
                  href={`/blog/${e.following.name}`}
                  title={e.following.name}
                  className="user"
                >
                  <img
                    src={e.following.avatar}
                    alt={e.following.name}
                    style={{ width: 30, height: 30 }}
                  />
                </a>
              ))}
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

        .users {
          display: flex;
        }
        .users li {
          margin: 5px;
          list-style: none;
        }
        .users a {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default FriendsBox
