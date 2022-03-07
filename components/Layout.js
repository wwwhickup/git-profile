import React from  "react"
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { theme, mixins } from '../style';
const { colors, fonts } = theme;

const StyledNavBar = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.black};
  background-image: linear-gradient(${colors.black} 0%, ${colors.darkGrey} 100%);
  color: ${colors.offWhite};
  padding: 10px;
  .nav-link {
    padding: 10px;
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
  }
  .active {
    color: ${colors.grey2}
  }
`;


const Layout = ({children}) => {
  const router = useRouter()
  const gotoSearchPage = (e) => {
    e.preventDefault()
    router.push('/')
  }
  const gotoHistoryPage = (e) => {
    e.preventDefault()
    router.push('/history')
  }
  return(
    <div>
      <StyledNavBar>
        <a onClick={(e) => gotoSearchPage(e)} className={`nav-link ${router.pathname === '/history' ? null : 'active'}`}>Search</a>
        <a onClick={(e) => gotoHistoryPage(e)} className={`nav-link ${router.pathname === '/history' ? 'active' : null}`}>History</a>
      </StyledNavBar>
      {children}
    </div>
  )
}

export default Layout