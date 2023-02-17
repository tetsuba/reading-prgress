import React from "react";

type PropTypes = {
    type: 'email' | 'password' | 'checkbox' | 'text'
    name?: string
    placeholder?: string
    id?: string
    value?: string
    onChangeHandler?: (value: string) => void
    dataTestId?: string
}

const sharedClasses =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'

const input_classes: { [k: string]: string } = {
    email: sharedClasses,
    password: sharedClasses,
    text: sharedClasses,
    checkbox:
        'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
}

export default function Input(props: PropTypes) {
    return (
        <input
            data-testid={props.dataTestId || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (props.onChangeHandler) {
                    props.onChangeHandler(e.target.value)
                }
            }}
            className={input_classes[props.type]}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            required
            type={props.type}
        />
    )
}
