import Svg, { SvgIconTypes } from '../Svg/Svg'
import Button from './Button'

type PropTypes = {
    onClick?: () => void
}

export function BackToBooksButton(props: PropTypes) {
    return (
        <Button
            className="ml-4 flex items-center place-self-start"
            data-testid="back-button"
            template="secondary"
            {...props}
        >
            <Svg icon="back" />
            <span className="ml-2 hidden md:inline">Back to books</span>
        </Button>
    )
}
