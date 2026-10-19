import {screen , render, within} from "@testing-library/react"
import {it, expect, describe} from "vitest"

import App from "../../App"

describe("Testing App Component",()=>{
    it("Should contain a text",()=>{
        render(<App/>)
        const heading = screen.getByRole("heading")
        const text = within(heading).getByText(/testing/i)
        expect(text).toBeInTheDocument()
    })
})