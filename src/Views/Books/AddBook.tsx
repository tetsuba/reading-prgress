import Svg from '../../Components/Svg/Svg'
import Button from '../../Components/Button/Button'
import Modal from '../../Components/Modal/Modal'
import { useState } from 'react'
import RegisterBookForm from './RegisterBookForm'

export default function AddBook() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Button
                className="flex"
                type="button"
                template="tertiary"
                clickHandler={() => setShowModal(true)}
            >
                <span className="mr-2">
                    <Svg type="plus" />
                </span>
                Add Book
            </Button>
            {showModal && (
                <Modal className="">
                    <RegisterBookForm
                        clickHandlerCancel={() => setShowModal(false)}
                    />
                </Modal>
            )}
        </>
    )
}
