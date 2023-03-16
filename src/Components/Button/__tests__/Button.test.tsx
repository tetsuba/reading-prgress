import { fireEvent, render, screen } from '@testing-library/react'
import Button, { ButtonTemplateTypes } from '../Button'

describe('Button', () => {
    const buttonTemplates: ButtonTemplateTypes[] = [
        'none',
        'primary',
        'secondary',
        'tertiary',
        'warning'
    ]
    test.each(buttonTemplates)(
        'should render %s button',
        (template: ButtonTemplateTypes) => {
            const { asFragment } = render(
                <Button type="button" template={template}>
                    {template}
                </Button>
            )
            expect(asFragment()).toMatchSnapshot()
        }
    )
    test('should render an icon button', () => {
        const { asFragment } = render(
            <Button
                title="title"
                data-testid="test"
                className="m-2"
                type="button"
                template="icon"
                svg="warning"
            />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
