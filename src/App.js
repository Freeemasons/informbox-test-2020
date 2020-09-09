import React from 'react';
import { Row, Col, Grid } from "react-flexbox-grid";
import Form from "./Components/Form";

function App() {

  return (
    <div className="App">
      <Grid fluid>
        <Row center="xs">
          <Col lg={6} className="form-layout u-padding-reset">
            <Form />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default App;
