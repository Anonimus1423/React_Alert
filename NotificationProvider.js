import { createContext, useState } from "react"
import Notification from "./Notification"
import { v4 } from 'uuid';

export const NotificationContext = createContext()

export default function NotificationProvider(props) 
{
    const [notifications, setNotifications] = useState([
        {
            text: "Hello World1",
            type: "error",
            id: v4()
        },
        {
            text: "Hello World2",
            type: "success",
            id: v4()
        },
        {
            text: "Hello World3",
            type: "success",
            id: v4()
        }
    ])

    const destroyThis = index =>
    {
        if(notifications.length === 1)
        {
            setNotifications([])
        }
        setNotifications(lastState => lastState.filter((e) => String(e.id) !== String(index)))
    }

    const alerting = (type, text) => 
    {
        setNotifications(lastState => [...lastState, { type, text, id: v4() }])
    }

    return(
        <NotificationContext.Provider value={alerting}>
            <div key="notifications" className="notifications">
                { 
                    notifications.map((notification) => <Notification key={notification.id} index={notification.id} destroyThis={destroyThis} text={notification.text} type={notification.type } />)
                }
            </div>
            { props.children }
        </NotificationContext.Provider>
    )
}