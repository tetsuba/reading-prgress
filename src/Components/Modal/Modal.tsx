import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function createModalHTML(): HTMLDivElement {
    const ele = document.createElement('div')
    const classes =
        'z-50 inset-0 h-modal h-full fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-70 flex justify-center'
    ele.setAttribute('class', classes)
    return ele
}

type PropTypes = {
    children: JSX.Element
    className?: string
}

export default function Modal(props: PropTypes) {
    const elRef = useRef<HTMLDivElement | null>(null)
    if (!elRef.current) {
        elRef.current = createModalHTML()
    }

    useEffect(() => {
        const modalRoot = document.getElementById('modal')
        if (elRef.current && modalRoot) {
            modalRoot.appendChild(elRef.current)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            if (elRef.current && modalRoot) {
                modalRoot.removeChild(elRef.current)
                document.body.style.overflow = 'visible'
            }
        }
    }, [])

    return createPortal(
        <div
            data-testid="modal-test"
            className={`relative m-auto w-full rounded-lg bg-white shadow dark:bg-gray-700 md:h-auto md:w-9/12 ${
                props.className || ''
            }`}
        >
            {props.children}
        </div>,
        elRef.current
    )
}
