import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1Url = useRef();
  const candidateName2Url = useRef();

  const promptRef = useRef();
     
    const sendToBlockchain= async ()=> {

      await window.contract.addUrl({
        name: candidateName1.current.value,
        url: candidateName1Url.current.value
      });

      await window.contract.addUrl({
        name: candidateName2.current.value,
        url: candidateName2Url.current.value
      });

      await window.contract.addCandidatePair({

        prompt: promptRef.current.value,
        name1: candidateName1.current.value,
        name2: candidateName2.current.value
      });

      await window.contract.addToPromptArray(
        { prompt: promptRef.current.value}
      );
    };
  return (
    <Container style={{ marginTop: "10px" }}>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Candidiate 1 Name</Form.Label>
          <Form.Control
            ref={candidateName1}
            placeholder='Enter Candidate Name'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidate 1 Image URL</Form.Label>
          <Form.Control
            ref={candidateName1Url}
            placeholder='enter Image URL'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidiate 2 Name</Form.Label>
          <Form.Control
            ref={candidateName2}
            placeholder='Enter Candidate Name'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidate 2 Image URL</Form.Label>
          <Form.Control
            ref={candidateName2Url}
            placeholder='enter Image URL'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Prompt</Form.Label>
          <Form.Control ref={promptRef} placeholder='Add Prompt'></Form.Control>
        </Form.Group>
      </Form>

      <Button onClick={sendToBlockchain} variant='primary'>Submit</Button>
    </Container>
  );
};

export default NewPoll;