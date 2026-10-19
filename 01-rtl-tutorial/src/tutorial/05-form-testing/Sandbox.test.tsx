import {screen, render, logRoles} from "@testing-library/react"
import Sandbox from "./Sandbox"
import userEvent from "@testing-library/user-event"
import {it,describe, expect} from "vitest"

const formElements = ()=>({
    emailIp: screen.getByRole("textbox",{name: "Email address"}),
    passwordIp: screen.getByLabelText("Password"),
    confirmPasswordIp: screen.getByLabelText(/confirm password/i)
})

describe("Form testing",()=>{
    beforeEach(()=>{
        const {container} = render(<Sandbox/>)
        logRoles(container)
    })
    it("Should have fields which are empty",()=>{
        const {emailIp,passwordIp,confirmPasswordIp} = formElements()
        expect(emailIp).toBeInTheDocument()
        expect(emailIp).toHaveValue('')

        expect(passwordIp).toBeInTheDocument()
        expect(passwordIp).toHaveValue('')

        expect(confirmPasswordIp).toBeInTheDocument()
        expect(confirmPasswordIp).toHaveValue('')

    })

    it("Should be able to provide inputs to fields",async()=>{
        const {emailIp,passwordIp,confirmPasswordIp} = formElements()
        const user = userEvent
        await user.type(emailIp,"test@test.com")
        expect(emailIp).toHaveValue('test@test.com')

        
        await user.type(passwordIp,"secret")
        expect(passwordIp).toHaveValue("secret")

        
        await user.type(confirmPasswordIp,"secret")
        expect(confirmPasswordIp).toHaveValue('secret')
    })
})