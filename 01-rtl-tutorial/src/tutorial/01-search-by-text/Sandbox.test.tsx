import { render, screen } from '@testing-library/react';
import Sandbox from './Sandbox';

describe('01-search-by-text', () => {
  test('demonstrates different query methods', async () => {
    render(<Sandbox />);
    console.log(screen.debug());

    // 1. getByText - exact string match 
    // check if the heading element is having - React Testing Library Examples 
    const heading = screen.getByRole("heading")
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("React Testing Library Examples")    
    // 2. getByText with regex - phone number 
    // get the phone number using regex expression and make sure it exists in document 
    const phoneRegex = /\d{3}-\d{3}-\d{3}/
    const phoneNumber = screen.getByText(phoneRegex)
    expect(phoneNumber).toBeInTheDocument()
    // 3. queryByText - element doesn't exist
    // make sure - Error message - doesnt exist by default
    const errorMsg = screen.queryByText("Error message")
    expect(errorMsg).not.toBeInTheDocument()
    // 4. getAllByText - multiple elements
    // make sure we have 3 - Item 1 - in document
    const items = screen.getAllByText("Item 1")
    expect(items).toHaveLength(3)
    // make sure we have 3 - info - in document use shortcut
    const infos = screen.getAllByText("info")
    expect(infos).toHaveLength(3)
    // 5. findByText - async element - Async message
    const asyncMsg = await screen.findByText("Async message")
    expect(asyncMsg).toBeInTheDocument()
  });
});
