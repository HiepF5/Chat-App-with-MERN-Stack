import { useSocketContext } from '@context/SocketContext'
import useConversation from '@store/useConversation'
import { useEffect } from 'react'
import notification from '../assets/sounds/notification.mp3'
const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()
    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (newMessage) => {
                newMessage.shouldShake = true;
                const sound = new Audio(notification)
                sound.play()
                setMessages([...messages, newMessage])
            })
        }
        return () => {
            if (socket) {
                socket.off('newMessage')
            }
        }
    }, [socket, setMessages, messages])



}

export default useListenMessages