import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Container} from "react-bootstrap"
import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";
import Home from './components/Home'
import NewPoll from './components/NewPoll'
import Pollingstation from './components/PollingStation'
import getConfig from './config'
import { WalletAccount } from 'near-api-js';
const { networkId } = getConfig(process.env.NODE_ENV || 'development')


export default function App() {

  

  const changeCandidatesFunction = async (prompt)=>{

    console.log(prompt);

    let namepair= await window.contract.getCandidatePair({prompt: prompt});
    localStorage.setItem("candidate1",namepair[0]);
    localStorage.setItem("Candidate2",namepair[1]);
    localStorage.setItem("prompt",prompt);

    window.location.replace(window.location.href+"pollingstation")

    
  };
  const signIn =()=>{ WalletAccount.requestSignIn();
  };


 return (<Router>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand onClick={window.accountId=='null' ? signIn :Home} href="/" >BlockVote</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto"></Nav>
          
          <Nav>
            <Nav.Link href= '/newpoll'>new poll</Nav.Link>
            <Nav.Link onClick={window.accountId==="" ? login:logout}>
              {window.accountId==="" ? "login":window.accountId}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
    <Switch>
        <Route exact path="/">
          <Home changeCandidates={changeCandidatesFunction}/>
        </Route>
        <Route exact path="/newpoll">
          <NewPoll/> 
        </Route>
        <Route exact path="/pollingstation">
          <Pollingstation />
        </Route>
    </Switch>
</Router>
);
}
