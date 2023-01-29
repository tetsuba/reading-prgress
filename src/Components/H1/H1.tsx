type PropTypes = {
  children: string
  className?: string
}
export default function H1(props: PropTypes) {
  const classNames = props.className || ''
  return (
    <h1
      className={`text-4xl font-bold tracking-tight sm:text-center sm:text-6xl ${classNames}`}
    >
      {props.children}
    </h1>
  )
}
