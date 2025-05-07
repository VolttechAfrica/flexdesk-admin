import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@components/ui/button'



describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    render(<Button>Click Me</Button>)
    const buttonElement = screen.getByRole('button', { name: /click me/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    const buttonElement = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies the correct class for the variant', () => {
    render(<Button variant="primary">Primary Button</Button>)
    const buttonElement = screen.getByRole('button', { name: /primary button/i })
    expect(buttonElement).toHaveClass('button-primary')
  })

  it('is disabled when the disabled prop is passed', () => {
    render(<Button disabled>Disabled Button</Button>)
    const buttonElement = screen.getByRole('button', { name: /disabled button/i })
    expect(buttonElement).toBeDisabled()
  })
})


