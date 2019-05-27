import { ThemeProvider } from 'styled-components'
import { theme1, GlobalStyles } from '../theme/globalStyle'

const Layout = (props) => (
    <div>
        <ThemeProvider theme={theme1} >
        {props.children}
        </ThemeProvider>
        <GlobalStyles />
    </div>
)

export default Layout