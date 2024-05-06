import { createContext } from "react"

const themeContext = createContext ({
    isDark: window.matchMedia('{prefers-color-scheme: dark}').matches
})

const ThemeContextProvider = ({children}: {children:React.ReactNode}) => {
    return (
    <themeContext.Provider value={{isDark: false}}>
        {children}
    </themeContext.Provider>
    )
}

export {ThemeContextProvider,themeContext}