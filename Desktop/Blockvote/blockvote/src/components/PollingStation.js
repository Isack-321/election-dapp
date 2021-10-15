import React, { useState ,useEffect} from "react";
import { Container,Row,Col,Button } from "react-bootstrap";
import mao from "../assets/mao.jpg";
import einstein from "../assets/einstein.jpg";

const PollingStation = (props) => {
    const [maoURL, changeMaoUrl] = useState(mao);
    const [einsteinURL, changeEinsteinUrl] = useState(einstein);
    const [showresults, changeResultsDisplay] = useState(false);
    const[candidate1Votes,changeCandidate1Votes]= useState('--');
    const[candidate2Votes,changeCandidate2Votes]= useState('--');

    const poll= props.promptlist;
    
      useEffect(()=>{
        const getInfo = async ()=>{
          let voteCount= await window.contract.getVotes({prompt: localStorage.getItem("prompt"),});
            changeCandidate1Votes(voteCount[0]);
            changeCandidate2Votes(voteCount[1]);

            changeMaoUrl(await window.contract.getUrl({name: localStorage.getItem("candidate1"),}));

            changeEinsteinUrl(await window.contract.getUrl({name: localStorage.getItem("Candidate2"),}));

            let didUserVote= await window.contract.didParticipate({prompt:localStorage.getItem("prompt"),user:window.accountId,});
            changeResultsDisplay(didUserVote);
        };

        getInfo();
      },[]);

      
      const addVote= async(index)=>{
        
        await window.contract.addVote({
          prompt: localStorage.getItem("prompt"),
          index:index,
        });

        
        await window.contract.recordUser({
          
          prompt: localStorage.getItem("prompt"),
          
          user: window.accountId,
        }); 

        changeResultsDisplay(true);

        alert("Succesfully voted");

      }
     
      
  
    return (
      <Container>
        <Row>
          <Col className='jutify-content-center d-flex'>
            <Container>
              <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "3vw",
                  }}
                >
                  <img
                    style={{
                      height: "35vh",
                      width: "20vw",
                    }}
                    src={maoURL}
                  ></img>
                </div>
              </Row>
              {showresults ? (
                <Row
                  className='justify-content-center d-flex'
                  style={{ marginTop: "5vh" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "8vw",
                      padding: "10px",
                      backgroundColor: "#c4c4c4",
                    }}
                  >
                    {candidate1Votes}
                  </div>
                </Row>
              ) : null}
              <Row
                style={{ marginTop: "5vh" }}
                className='justify-content-center d-flex'
              >
                <Button disabled={showresults} onClick={()=> addVote(0)}>Vote</Button>
              </Row>
            </Container>
          </Col>
          <Col className='justify-content-center d-flex align-items-center'>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#c4c4c4",
                height: "20vh",
                alignItems: "center",
                padding: "2vw",
                textAlign: "center",
              }}
            >
              {poll}
            </div>
          </Col>
          <Col className='jutify-content-center d-flex'>
            <Container>
              <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "3vw",
                  }}
                >
                  <img
                    style={{
                      height: "35vh",
                      width: "20vw",
                    }}
                    src={einsteinURL}
                  ></img>
                </div>
              </Row>
              {showresults ? (
                <Row
                  className='justify-content-center d-flex'
                  style={{ marginTop: "5vh" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "8vw",
                      padding: "10px",
                      backgroundColor: "#c4c4c4",
                    }}
                  >
                    {candidate2Votes}
                  </div>
                </Row>
              ) : null}
              <Row
                style={{ marginTop: "5vh" }}
                className='justify-content-center d-flex'
              >
                <Button disabled={showresults} onClick={()=> addVote(1)}>Vote</Button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
 };            
  export default PollingStation;