import {useEffect, useRef} from "react"
import { createPortal} from "react-dom"

function createModalHTML(): HTMLDivElement {
    const ele = document.createElement('div')
    const classes = 'fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-gray-900 bg-opacity-50 dark:bg-opacity-80 flex justify-center'
    ele.setAttribute('class', classes)
    return ele
}

type PropTypes = {
    children: JSX.Element
}

export default function Modal(props: PropTypes) {
    const elRef = useRef<HTMLDivElement | null>(null)
    if (!elRef.current) {
        elRef.current = createModalHTML()
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal")
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
        <div className="relative w-full h-full max-w-xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {props.children}
            </div>
        </div>,
        elRef.current
    )
}
