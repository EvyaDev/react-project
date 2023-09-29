import React, { useContext, useEffect } from 'react'
import { Theme } from './Theme';
import { BsSun } from "react-icons/bs"
import { BiMoon } from "react-icons/bi"
import { darkContext } from '../App';

export default function ToggleThemeMode() {

    // const [darkMode, setDarkMode] = useState(false);
    const { darkMode, setDarkMode } = useContext(darkContext);

    useEffect(() => {
        const saveMode = localStorage.darkMode
        if (saveMode) { setDarkMode(JSON.parse(saveMode)) }
    }, [setDarkMode])

    const toggleTheme = () => {
        const newMode = darkMode ? false : true;
        setDarkMode(newMode);
        localStorage.darkMode = JSON.stringify(newMode)
    };

    return (
        <div>
            <Theme darkMode={darkMode} />
            {
                <button className='btnMode' onClick={toggleTheme}>
                    {darkMode ? <BsSun /> : <BiMoon />}
                </button>
            }
        </div>
    )
}