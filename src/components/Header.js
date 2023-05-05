import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Header(props) {
  const [zipCode, updateZipCode] = useState(props.zipCode);
  const [copied, setCopied] = useState(false);

  return (
    <div className="justify-content-md-center">
      <h1>ACME Hourly Weather Forcast</h1>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter Zip Code"
          onChange={(e) => updateZipCode(e.currentTarget.value)} 
          value={zipCode}
        />
        <Button 
          className="btn btn-secondary" 
          id="button-addon2"
          onClick={(e) => props.changeZipcode(zipCode)}
        >
        Go
        </Button>
      </InputGroup>
    </div>
  );
}

export default Header;