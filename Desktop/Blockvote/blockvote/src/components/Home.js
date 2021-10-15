import {Tab} from "bootstrap";
import React from "react";
import { Table,Container,Button } from "react-bootstrap";

const home = (props) => {
    const promptlist= ["The Chairman","Men's Representative","School's women Rep"]
    return ( <Container>
        <Table style={{margin:"5vh"}} striped bordered >
            <thead>
                <tr>
                    <th>#</th>
                    <th>list of polls</th>
                    <th>Go to polls</th>
                </tr>
            </thead>
            <tbody>
               { promptlist.map((el,index)=>{
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                             <td>{el}</td>
                             <td>
                                 {" "}
                                 <Button onClick ={()=>props.changeCandidates(el)}>Go to poll</Button></td>
                            </tr>
                    );
                })
                }
            </tbody>
        </Table>
    </Container>
    );
};

export default home;