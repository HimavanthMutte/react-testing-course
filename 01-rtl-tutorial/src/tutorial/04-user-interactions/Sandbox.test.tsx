import {screen, render, fireEvent} from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import {it, describe, expect} from "vitest"

import Sandbox from "./Sandbox"

describe('Testing Sandbox',()=>{
    beforeEach(()=>{
        render(<Sandbox/>)
    })
    it('Screen Debugging',()=>{
        screen.debug()
    })

    it("should contain buttons with correct names",()=>{
        expect(screen.getByRole('button',{name: /increase/i})).toBeInTheDocument()
        expect(screen.getByRole('button',{name: /decrease/i})).toBeInTheDocument()

        expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()
    })

    it("should increase count when increase button is clicked - fireEvent",()=>{
        const increaseButton = screen.getByRole('button',{name: /increase/i})
        fireEvent.click(increaseButton)
        expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()
    })

    it("should decrease count when decrease button is clicked - fireEvent",()=>{
        const decreaseButton = screen.getByRole('button',{name: /decrease/i})
        fireEvent.click(decreaseButton)
        expect(screen.getByText(/Count: -1/i)).toBeInTheDocument()
    })

    it("should increase count when increase button is clicked - userEvent",async()=>{
        const user = userEvent.setup()
        const increaseButton = screen.getByRole('button',{name: /increase/i})
        await user.click(increaseButton)
        expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()
    })

    it("should decrease count when decrease button is clicked - userEvent",async()=>{
        const user = userEvent.setup()
        const decreaseButton = screen.getByRole('button',{name: /decrease/i})
        await user.click(decreaseButton)
        expect(screen.getByText(/Count: -1/i)).toBeInTheDocument()
    })

    it("working of like and unlike buttons - fireEvent",()=>{
        const likeButton = screen.getByRole("button",{name: "like button"})

        expect(likeButton).toBeInTheDocument()

        fireEvent.click(likeButton)

        const unLikeButton = screen.getByRole("button",{name: "unlike button"})

        expect(unLikeButton).toBeInTheDocument()
    })

    it("working of like and unlike buttons - userEvent",async()=>{
        const user = userEvent.setup()

        const likeButton = screen.getByRole("button",{name: "like button"})

        expect(likeButton).toBeInTheDocument()

        await user.click(likeButton)

        const unLikeButton = screen.getByRole("button",{name: "unlike button"})

        expect(unLikeButton).toBeInTheDocument()
    })
})