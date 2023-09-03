import { Button } from 'react-bootstrap';
import React, { useState } from 'react'
import { useTheme } from '@mui/material';
import { tokens } from './Theme';

export default function ColorMode() {
    const [mode, setMode] = useState("dark");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    function dark() {
        setMode("dark")
        document.querySelector("html").setAttribute("color-mode", "dark")
    }

    function light() {
        setMode("light")
        document.querySelector("html").setAttribute("color-mode", "light")
    }


    return (
        <div>
            <Button onClick={dark} variant="primary">dark</Button>{' '}
            <Button onClick={light} variant="primary">light</Button>{' '}
        </div>
    )
}
