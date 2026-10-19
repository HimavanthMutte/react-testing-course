import { render, screen } from '@testing-library/react';
import Sandbox from './Sandbox';

describe('01-search-by-text', () => {
  test('demonstrates different query methods', async () => {
    render(<Sandbox />);
    console.log(screen.debug());

    // 1. getByText - exact string match 
    // check if the heading element is having - React Testing Library Examples 

    // 2. getByText with regex - phone number 
    // get the phone number using regex expression and make sure it exists in document 

    // 3. queryByText - element doesn't exist
    // make sure - Error message - doesnt exist by default

    // 4. getAllByText - multiple elements
    // make sure we have 3 - Item 1 - in document
    
    // // make sure we have 3 - info - in document use shortcut


    // 5. findByText - async element - Async message
  });
});
