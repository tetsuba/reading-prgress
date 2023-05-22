import { render } from '@testing-library/react'
import Button from '../Button'
import { TailwindTemplateTypes } from '../buttonClasses.tailwind'
import Svg from '../../Svg/Svg'

describe('Button', () => {
    const buttonTemplates: TailwindTemplateTypes[] = [
        'primary',
        'secondary',
        'tertiary',
        'warning',
        'svgClose',
        'textLink'
    ]
    test.each(buttonTemplates)(
        'should render %s button',
        (template: TailwindTemplateTypes) => {
            const { asFragment } = render(
                <Button template={template}>{template}</Button>
            )
            expect(asFragment()).toMatchSnapshot()
        }
    )
    test('should render an icon button', () => {
        const { asFragment } = render(
            <Button template="svgClose">
                <Svg icon="close"></Svg>
            </Button>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
