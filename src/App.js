import React from 'react';
import './App.css';
import { Row, Col, Grid } from "react-flexbox-grid";
import Form from "./Components/Form";

function App() {



  return (
    <div className="App">
      <Grid fluid>
        <Row center="xs">
          <Col lg={7} className="form-layout">
            <Form>

            </Form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default App;
