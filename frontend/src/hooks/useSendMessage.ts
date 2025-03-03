import { IMessage } from '@interface/message.interface'
import api from '@lib/axios/axiosInterceptor'
import useConversation from '@store/useConversation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    const sendMessage = async (message: string) => {
        setLoading(true)
        try {
            const res = await api.post(`/api/message/send/${selectedConversation?._id}`, { message })
            if (res.status === 200) {
                setMessages([...messages, res.data as IMessage])
            }


        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, sendMessage }
}

export default useSendMessage