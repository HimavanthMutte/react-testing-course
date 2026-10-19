import {screen, render, logRoles} from "@testing-library/react"
import Sandbox from "./Sandbox"
import userEvent from "@testing-library/user-event"
import {it,describe} from "vitest"

describe("Form testing",()=>{
    beforeEach(()=>{
        const {container} = render(<Sandbox/>)
        logRoles(container)
    })
    it("Should have fields which are empty",()=>{
        const emailIp = screen.getByRole("textbox",{name: "Email address"})
        expect(emailIp).toBeInTheDocument()
        expect(emailIp).toHaveValue('')

        const passwordIp = screen.getByLabelText("Password")
        expect(passwordIp).toBeInTheDocument()
        expect(passwordIp).toHaveValue('')

        const confirmPasswordIp = screen.getByLabelText(/confirm password/i)
        expect(confirmPasswordIp).toBeInTheDocument()
        expect(confirmPasswordIp).toHaveValue('')

    })

    it("Should be able to provide inputs to fields",async()=>{
        const user = userEvent.setup()

        const emailIp = screen.getByRole("textbox",{name: "Email address"})
        await user.type(emailIp,"test@test.com")
        expect(emailIp).toHaveValue('test@test.com')

        const passwordIp = screen.getByLabelText("Password")
        await user.type(passwordIp,"secret")
        expect(passwordIp).toHaveValue("secret")

        const confirmPasswordIp = screen.getByLabelText(/confirm password/i)
        await user.type(confirmPasswordIp,"secret")
        expect(confirmPasswordIp).toHaveValue('secret')
    })
})