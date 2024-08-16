import { useEffect, useState } from "react"
import { Container, Button, Card, CardBody, Col, Row, Table } from "reactstrap"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import { MdMoreVert } from "react-icons/md"
import Axios from "axios"
import moment from "moment"

import TopNavbar from "./components/TopNavbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-circular-progressbar/dist/styles.css"
import "./App.css"

const PERSONAL_USER_ENDPOINT = "https://api.jsonbin.io/v3/b/66b1b31cad19ca34f892124a"
const MANAGED_USER_ENDPOINT = "https://api.jsonbin.io/v3/b/66a878a5e41b4d34e4190c12"
const CAREER_GOAL_ENDPOINT = "https://api.jsonbin.io/v3/b/66a87a3ae41b4d34e4190ccc"
const DOCUMENTS_ENDPOINT = "https://api.jsonbin.io/v3/b/66a87a90ad19ca34f88ecd65"

const App = (props) => {
  const [user, setUser] = useState(props.mockData?.user ?? {})
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const [isPersonal, setIsPersonal] = useState(props.mockData?.user?.current_organisation.is_personal ?? props.initiallyPersonal)
  const [careerGoal, setCareerGoal] = useState(props.mockData?.careerGoal ?? {})
  const [documents, setDocuments] = useState(props.mockData?.documents ?? [])

  useEffect(() => {
    // Retrieve data based on whether the user is a personal user or managed user
    let url = (isPersonal)
      ? PERSONAL_USER_ENDPOINT
      : MANAGED_USER_ENDPOINT

    Axios.get(url).then(resp => {
      setUser(resp.data.record.data)
    }).catch(err => {
      console.log(err)
    })

    // Grab career goal for managed user
    if(!isPersonal) {
      Axios.get(CAREER_GOAL_ENDPOINT).then(resp => {
        setCareerGoal(resp.data.record.data[0])
      }).catch(err => {
        console.log(err)
      })
    }

    // Grab documents
    Axios.get(DOCUMENTS_ENDPOINT).then(resp => {
      setDocuments(resp.data.record.data)
    }).catch(err => {
      console.log(err)
    })
  }, [isPersonal])

  const manageText = () => {
    return (isPersonal) ? "Manage your documents." : ("Manage your documents issued by " + user.current_organisation?.name + " or track your career goal.")
  }

  const convertToReadableDate = (dateTime) => {
    let tmp = moment(dateTime)
    
    return !isNaN(tmp) ? moment(dateTime).format("D MMM YYYY") : "-"
  }

  const logout = () => {
    setIsLoggedOut(true)
  }

  return (
    <div>
      {(isLoggedOut) ? <p>Logged Out!</p> : (
        <>
          <TopNavbar {...props} user={user} isPersonal={isPersonal} onClickLogout={logout} onToggle={setIsPersonal} />
          <Container className="p-5">
            <Row>
              <Col>
                <h1>Hi, {user.name} 👋</h1>
                <span className="text-black-50">{manageText()}</span>
              </Col>
            </Row>

            <div className="my-3"></div>
          
            <Row>
              {!isPersonal && (
                <Col sm={12} md={12} lg={4} className="py-3" data-testid="career_goal_col">
                  <h3>Career Goal</h3>

                  <Card className="p-3">
                    <CardBody className="text-center">
                      <Row>
                        <Col xs={5} sm={5} md={5} lg={12}>
                          <p className="text-muted">Your Progress</p>
                          <br/>
                          <div className="w-100 h-50">
                            <CircularProgressbar value={careerGoal.progress || 0} text={(careerGoal.progress || 0) + "%"} styles={buildStyles({
                              pathColor: "#6a23db",
                              textColor: "#6a23db",
                            })}/>  
                          </div>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={12} className="py-lg-5 align-center">
                          <p className="text-muted">
                            I want to become a(an)
                          </p>

                          <h4>{careerGoal.name}</h4>

                          <br/>

                          <a href="#" style={{textDecoration: "none", fontWeight: "bold"}}>View Insights</a>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              )}
              <Col sm={12} md={12} lg={isPersonal ? 12 : 8} className="py-3">
                <Row>
                  <Col xs={8} sm={8} md={8}>
                    <h3>Recent Documents</h3>
                  </Col>
                  <Col xs={4} sm={4} md={4} className="text-end">
                    <a href="#" style={{textDecoration: "none", fontWeight: "bold"}}>View All</a>
                  </Col>
                </Row>

                <Card className="p-3">
                  <CardBody>
                    <Table>
                      <thead>
                        <tr>
                          <th className="text-muted align-center">Document Name</th>
                          <th className="text-muted align-center">Received On</th>
                          <th className="align-center"></th>
                        </tr>
                      </thead>
                      <tbody data-testid="recent_documents_table_body">
                        {documents.length > 0
                          ? (
                            documents.sort((a,b) => new Date(b.received_on) - new Date(a.received_on)).map(document => {
                              return (
                                <tr key={document.id} data-key={document.id} >
                                  <td className="align-center"><span className="text-truncate">{document.document_name}</span></td>
                                  <td className="align-center">{convertToReadableDate(document.received_on)}</td>
                                  <td className="align-center"><Button className="rounded-circle" style={{background: "none", border: "none", color: "black"}}><MdMoreVert/></Button></td>
                                </tr>
                              )
                            })
                          )
                          : (
                            <tr>
                              <td colSpan={3} className="text-center">No documents</td>
                            </tr>
                          )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
       </>
      )}
    </div>
  );
}

export default App;
