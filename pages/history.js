import React, {useState, useEffect} from 'react'
import Octicon, { Calendar, LinkExternal, Trashcan } from '@primer/octicons-react';
import { useRouter } from 'next/router'
import localHistory from '../utils/localHistory'
import styled from 'styled-components';
import { theme, mixins } from '../style';
const { colors, fonts } = theme;

const HistoryContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.black};
  background-image: linear-gradient(${colors.black} 0%, ${colors.darkGrey} 100%);
  color: ${colors.offWhite};
  height: calc(100vh - 60px);
`;
const HistoryDiv = styled.div`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.black};
  color: ${colors.offWhite};
  .avatar {
    ${mixins.flexCenter};
    border: 0.2rem solid ${colors.blue};
    border-radius: 100%;
    width: 80px;
    height: 80px;
    img {
      border-radius: 100%;
    }
  }
`
const UserInfo = styled.div`
  display: block;
  padding-left: 20px;
  padding-right: 20px;
`

const TimeStamp = styled.div`
  text-align: right;
`

const ExternalLinkButton = styled.button`
  background: transparent;
  color: ${colors.white};
`
function timeSince(date) {
  console.log("data: ", date)
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  console.log("seconds: ", seconds)
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


const history = () => {
  const router = useRouter()
  const [history, setHistory] = useState([])
  useEffect(() => {
    setHistory(localHistory.getHistory())
  }, [])
  return(
    <HistoryContainer>
      <div>
        {
          history.map((history, index) => {
            return(
              <HistoryDiv key={index}>
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <div class="avatar">
                    <img src={history.userData.avatar_url} alt="avatar" />
                  </div>
                  <UserInfo>
                    <div>username: <a href={history.userData.url}>{history.userData.name}</a></div>
                    {history.userData.created_at && (
                      <span className="info__item">
                        <Octicon icon={Calendar} size="small" />
                        {' '}Joined{' '}
                        {new Date(history.userData.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </UserInfo>
                </div>
                <TimeStamp>
                  <ExternalLinkButton onClick={e => {
                    e.preventDefault();
                    localHistory.removeHistory(history.userData.id)
                    setHistory(localHistory.getHistory())
                  }}>
                    <Octicon icon={Trashcan} size="small" />
                  </ExternalLinkButton>
                  <ExternalLinkButton onClick={e => {
                    e.preventDefault();
                    router.push({
                      pathname: '/user',
                      query: { id: history.userData.login },
                    });
                  }}>
                    <Octicon icon={LinkExternal} size="small" />
                  </ExternalLinkButton>
                  <p>{timeSince(history.dateTime)} ago</p>
                </TimeStamp>
              </HistoryDiv>
            )
          })
        }
      </div>
    </HistoryContainer>
  )
}

export default history