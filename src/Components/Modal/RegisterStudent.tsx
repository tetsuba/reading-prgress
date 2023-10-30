import Button from '../Button/Button'
import Display from '../Dispay/Display'
import Modal from './Modal'
import { useState } from 'react'
import FormRegisterStudent from '../Form/FormRegisterStudent'
import H3 from '../H3/H3'
import Svg from '../Svg/Svg'

export default function RegisterStudent() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button
                className="max-md:px-3"
                onClick={() => setShowModal(true)}
                icon="addUser"
                template="primary"
                right
            >
                <span className="mr-2 hidden md:block">Register Student</span>
            </Button>
            <Display value={showModal}>
                <Modal className="md:max-w-xl">
                    <>
                        <Button
                            className="absolute right-2.5 top-3"
                            data-testid="modal-close"
                            icon="close"
                            onClick={() => setShowModal(false)}
                            template="icon-close"
                        />
                        <div className="px-6 py-6 lg:px-8">
                            <H3 className="mb-3">Register a new student</H3>
                            <FormRegisterStudent
                                closeModal={() => setShowModal(false)}
                            />
                        </div>
                    </>
                </Modal>
            </Display>
        </>
    )
}
