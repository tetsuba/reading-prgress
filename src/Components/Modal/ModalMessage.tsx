import { useState } from 'react'
import Modal from './Modal'
import Message from './Message'

export default function ModalMessage() {
    const [show, setShow] = useState(false)

    return (
        <Modal className="md:max-w-xl">
            <Message />
        </Modal>
    )
}
