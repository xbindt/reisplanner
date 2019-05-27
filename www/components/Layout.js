import { ThemeProvider } from 'styled-components';
import { theme1, GlobalStyles } from '../theme/globalStyle';
import Header from './header/Header';


const Layout = (props) => (
    <main>
        <ThemeProvider theme={theme1} >
        <>
            <Header />
            {props.children}
        </>
        </ThemeProvider>
        <GlobalStyles />
    </main>
)

export default Layout