import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function createModalHTML(): HTMLDivElement {
    const ele = document.createElement('div')
    const classes =
        'inset-0 h-modal h-full fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-70 dark:bg-opacity-80 flex justify-center'
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
        }
        return () => {
            if (elRef.current && modalRoot) {
                modalRoot.removeChild(elRef.current)
            }
        }
    }, [])

    return createPortal(
        <div
            className={`relative m-auto w-full md:h-auto md:w-9/12 ${
                props.className || ''
            }`}
        >
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                {props.children}
            </div>
        </div>,
        elRef.current
    )
}
