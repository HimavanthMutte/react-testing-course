import {screen,render, findByRole} from "@testing-library/react"
import {expect,describe,it} from "vitest"

import Sandbox from "./Sandbox"

describe('Testing Sandbox',()=>{
    it("should render both nav and links",()=>{
        render(<Sandbox/>)
        screen.debug()
        expect(screen.getByRole("navigation")).toBeInTheDocument()

        expect(screen.getByRole("link",{name: "Home"})).toBeInTheDocument()
        expect(screen.getByRole("link",{name: "About"})).toBeInTheDocument()
    })

    it("render heading with correct heirarchy",()=>{
        render(<Sandbox/>)
        expect(screen.getByRole("heading",{name: "Main Heading",level: 1})).toBeInTheDocument()
        expect(screen.getByRole("heading",{name: "Subheading",level: 2})).toBeInTheDocument()
    })

    it("renders image with alt text",()=>{
        render(<Sandbox/>)
        expect(screen.getByRole('img',{name: "Example"})).toBeInTheDocument();
    })

    it("renders initial Buttons",()=>{
        render(<Sandbox/>)
        expect(screen.getAllByRole('button')).toHaveLength(3)
        expect(screen.getByRole('button',{name: "Click me"})).toBeInTheDocument();
        expect(screen.getByRole('button',{name: "Submit"})).toBeInTheDocument();
        expect(screen.getByRole('button',{name: "Cancel"})).toBeInTheDocument();
    })

    it("error button not visible initially",()=>{
        render(<Sandbox/>)
        expect(screen.queryByRole('button',{name: "Error"})).not.toBeInTheDocument();
    })

    it("async button appears after delay",async ()=>{
        render(<Sandbox/>)
        const buttonName = /async button/i
        expect(screen.queryByRole("button",{name: buttonName})).not.toBeInTheDocument()
        const asyncButton = await screen.findByRole('button',{name: buttonName})
        expect(asyncButton).toBeInTheDocument()
    })
})