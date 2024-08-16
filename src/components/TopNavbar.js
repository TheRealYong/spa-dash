import { Navbar, NavbarText, Nav, DropdownToggle, DropdownItem, UncontrolledDropdown, DropdownMenu, Row, Col, Container } from "reactstrap"
import { MdLogout } from "react-icons/md"
import Switch from "react-switch"
import { useState } from "react"

const TopNavbar = (props) => {
  const {
    user,
    onClickLogout
  } = props

  const [isToggled, setIsToggled] = useState(user?.current_organisation?.is_personal || props.isPersonal || false)

  return (
    <Navbar
      className="border-bottom text-end p-0" data-testid="main_navbar"
    >
      <Nav navbar>
        <div className="d-flex p-3">
          Managed User
          <Switch
            checked={isToggled}
            onChange={(val) => {
              setIsToggled(val)
              props.onToggle(val)
            }}
            uncheckedIcon={false}
            checkedIcon={false}
            className="mx-3"
          />
          Personal User
        </div>
        
      </Nav>
      <NavbarText>
        <UncontrolledDropdown data-testid="acc_settings_dropdown">
          <DropdownToggle caret className="hover-pointer" tag="span">
            <img src={user.profile_picture_url} width="40px" height="40px" className="rounded-circle m-2" alt="profile_pic"></img>
            <span>{user.name}</span>
          </DropdownToggle>
          <DropdownMenu className="mt-3" style={{width: 300 + "px"}}>
            <Container className="p-3">
              <Row>
                <Col xs={4} sm={4} md={4} lg={4}>
                  <img src={user.profile_picture_url} width="60px" height="60px" className="rounded-circle m-2" alt="profile_pic"></img>  
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} className="align-center">
                  <span className="h4"><b>{user.name}</b></span>
                  <br/>
                  <span className="text-muted">{user.current_organisation?.is_personal ? "Personal User" : "Managed User" }</span>
                </Col>
              </Row>
            </Container>
            
            <DropdownItem divider></DropdownItem>
            <DropdownItem
              onClick={onClickLogout}
            >
              <span>
                <MdLogout className="m-2"/> Logout
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </NavbarText>
    </Navbar>
  )
}

export default TopNavbar