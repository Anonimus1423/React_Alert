import React, { useEffect, useRef, useState } from 'react'

export default function useNotification({ index, text, type, destroyThis }) 
{
    const barSpeed = 2;
    const [barWidth, setBarWidth] = useState(0)
    const notification = useRef("bar")
    let intervalId = useRef();
    let [notificationClassnames, setNotificationClassnames] = useState("notification" + (type === "error" ? " notification-error" : ""));
    let timeoutId = null;

    const notificationMouseEnter = () => clearInterval(intervalId.current)
    const notificationMouseLeave = () => {
        clearInterval(intervalId.current)
        intervalId.current = setInterval(() => 
        {
            setBarWidth(lastWidth => lastWidth + barSpeed)
        }, 20)
    }

    const endNotification = () => 
    {
        if(!notificationClassnames.split(" ").includes("close"))
        {
            clearInterval(intervalId.current)
            timeoutId = setTimeout(() => {
                destroyThis(index)
                setNotificationClassnames(notificationClassnames.replace("close", "dont-animate"))
                clearTimeout(timeoutId)
            }, 500);
            setNotificationClassnames(state => state += " close")
        }
    }

    useEffect(() => 
    {
        if(barWidth > notification.current.offsetWidth)
        {
            endNotification()
        }
        return () => setNotificationClassnames("notification" + (type === "error" ? " notification-error" : ""))
    }, [barWidth])

    useEffect(() => 
    {
        setTimeout(() => {
            intervalId.current = setInterval(() => 
            {
                setBarWidth(lastWidth => lastWidth + barSpeed)
            }, 20)
        }, 400);
        return () => clearInterval(intervalId.current)
    }, [])

    return (
        <div onMouseEnter={notificationMouseEnter} onMouseLeave={notificationMouseLeave} ref={notification} className={notificationClassnames}>
            <button onClick={endNotification} className='notification__button'>✖</button>
            <p className='notification__text'>{ text }</p>
            <div style={{ width: barWidth }} className={"notification__bar"}></div>
        </div>
    )
}
