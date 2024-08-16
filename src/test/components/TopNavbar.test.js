import { act, render, screen, within } from "@testing-library/react"

import TopNavbar from "../../components/TopNavbar"
import { MOCK_MANAGED_USER, MOCK_PERSONAL_USER } from "../mockValues"
import userEvent from "@testing-library/user-event"

describe("Personal user display", () => {
  beforeAll(() => {
    render(<TopNavbar user={MOCK_PERSONAL_USER} />)
  })

  it("Account settings dropdown", async () => {
    // Ensure dropdown toggle displays similar name and visible
    let accSettingsDropdownElem = screen.getByTestId("acc_settings_dropdown")
    let userName = accSettingsDropdownElem.querySelector(".dropdown-toggle span").textContent

    expect(accSettingsDropdownElem).toBeVisible()
    expect(userName).toEqual(MOCK_PERSONAL_USER.name)

    // Ensure dropdown menu functions after click
    await act(async () => {
      userEvent.click(accSettingsDropdownElem.querySelector(".dropdown-toggle"))

      await new Promise(resolve => setTimeout(resolve, 0))
    })

    let accSettingsMenuElem = screen.queryByRole("menu")
    expect(accSettingsMenuElem).toBeVisible()

    // Ensure the dropdown has the name of the user and the user type
    expect(accSettingsMenuElem).toHaveTextContent(MOCK_PERSONAL_USER.name)
    expect(accSettingsMenuElem).toHaveTextContent(/personal user/i)

    // Ensure there is a logout button in the dropdown menu
    expect(within(accSettingsMenuElem).getByRole("menuitem", { name: "Logout" })).toBeVisible()
  })
})

describe("Managed user display", () => {
  beforeAll(() => {
    render(<TopNavbar user={MOCK_MANAGED_USER} />)
  })

  it("Account settings dropdown", async () => {
    // Ensure dropdown toggle displays similar name and visible
    let accSettingsDropdownElem = screen.getByTestId("acc_settings_dropdown")
    let userName = accSettingsDropdownElem.querySelector(".dropdown-toggle span").textContent

    expect(accSettingsDropdownElem).toBeVisible()
    expect(userName).toEqual(MOCK_MANAGED_USER.name)

    // Ensure dropdown menu functions after click
    await act(async () => {
      userEvent.click(accSettingsDropdownElem.querySelector(".dropdown-toggle"))

      await new Promise(resolve => setTimeout(resolve, 0))
    })

    let accSettingsMenuElem = screen.queryByRole("menu")
    expect(accSettingsMenuElem).toBeVisible()

    // Ensure the dropdown has the name of the user and the user type
    expect(accSettingsMenuElem).toHaveTextContent(MOCK_MANAGED_USER.name)
    expect(accSettingsMenuElem).toHaveTextContent(/managed user/i)

    // Ensure there is a logout button in the dropdown menu
    expect(within(accSettingsMenuElem).getByRole("menuitem", { name: "Logout" })).toBeVisible()
  })
})