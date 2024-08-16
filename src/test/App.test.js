import { render, screen } from '@testing-library/react'

import App from '../App'
import { MOCK_DOCUMENTS, MOCK_MANAGED_USER, MOCK_PERSONAL_USER } from './mockValues'
import userEvent from '@testing-library/user-event'

const MOCK_MANAGED_USER_DATA = {
  user: MOCK_MANAGED_USER,
  documents: MOCK_DOCUMENTS
}

const MOCK_PERSONAL_USER_DATA = {
  user: MOCK_PERSONAL_USER,
  documents: MOCK_DOCUMENTS
}

it('Managed user flow', () => {
  // Render app with mock data
  render(<App mockData={MOCK_MANAGED_USER_DATA} />)

  let mainNavbarElement = screen.queryByTestId("main_navbar")

  // Top navigation bar exists
  expect(mainNavbarElement).toBeVisible()

  // Recend documents is in descending order
  let mockSortedDesc = MOCK_MANAGED_USER_DATA.documents.sort((a,b) => new Date(b.received_on) - new Date(a.received_on))
  let dataRows = screen.getByTestId("recent_documents_table_body").querySelectorAll("tr")
  let keys = []

  dataRows.forEach(row => {
    (row.getAttribute("data-key")) && keys.push(Number(row.getAttribute("data-key")))
  })

  // Compare the document id to ensure that the item is displayed in descending order about received on
  expect(keys).toEqual(mockSortedDesc.map(item => item.id))

  // Career goal should exists
  expect(screen.queryByTestId("career_goal_col")).toBeVisible()

  // Click on account settings dropdown
  let dropdownTrigger = mainNavbarElement.querySelector(".dropdown-toggle")
  userEvent.click(dropdownTrigger)

  let accSettingsMenuElem = screen.queryByRole("menu")
  let dropdownMenuItems = Array.from(accSettingsMenuElem.querySelectorAll(".dropdown-item"))
  
  // Click on logout
  let logoutElem = dropdownMenuItems.find(elem => elem.textContent.trim() === "Logout")
  userEvent.click(logoutElem)

  // Expect a logged out screen
  expect(screen.getByText(/logged out/i)).toBeVisible()
})

it('Personal user flow', () => {
  // Render app with mock data
  render(<App mockData={MOCK_PERSONAL_USER_DATA} />)

  let mainNavbarElement = screen.queryByTestId("main_navbar")

  // Top navigation bar exists
  expect(mainNavbarElement).toBeVisible()

  // Recend documents is in descending order
  let mockSortedDesc = MOCK_PERSONAL_USER_DATA.documents.sort((a,b) => new Date(b.received_on) - new Date(a.received_on))
  let dataRows = screen.getByTestId("recent_documents_table_body").querySelectorAll("tr")
  let keys = []

  dataRows.forEach(row => {
    (row.getAttribute("data-key")) && keys.push(Number(row.getAttribute("data-key")))
  })

  // Compare the document id to ensure that the item is displayed in descending order about received on
  expect(keys).toEqual(mockSortedDesc.map(item => item.id))

  // Career goal column should not be rendered into the DOM
  expect(screen.queryByTestId("career_goal_col")).not.toBeInTheDocument()

  // Click on account settings dropdown
  let dropdownTrigger = mainNavbarElement.querySelector(".dropdown-toggle")
  userEvent.click(dropdownTrigger)

  let accSettingsMenuElem = screen.queryByRole("menu")
  let dropdownMenuItems = Array.from(accSettingsMenuElem.querySelectorAll(".dropdown-item"))
  
  // Click on logout
  let logoutElem = dropdownMenuItems.find(elem => elem.textContent.trim() === "Logout")
  userEvent.click(logoutElem)

  // Expect a logged out screen
  expect(screen.getByText(/logged out/i)).toBeVisible()
})
