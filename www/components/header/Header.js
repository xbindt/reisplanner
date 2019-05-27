import Link from 'next/link';
import styled from 'styled-components';
const MainNav = styled.nav`
    ul {
      list-style: none;
      margin: 1em 0;
      padding: 0;
      display: flex;
      flex-direction: row;

      li {
        margin: 0 1em;
        &:first-child {
          margin-left: 0;
        }
      }
    }

    a {
        color: ${props => props.theme.basecolor};

        &:hover {
            text-decoration: none;
        }
    }
`

const Header = () => (
    <header>
        <MainNav>
            <ul>
                <li><Link href="/" prefetch><a>Home</a></Link></li>
            </ul>
        </MainNav>
    </header>
)

export default Header
