import React, { useState, useEffect } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import TempControls from './TempControls';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HourlyCard from './HourlyCard';

function Location(props) {
  const [copied, setCopied] = useState(false);

  const getDailyContent = (forcast, selectedTemp) => {
    let content = [];
    for (let daily in forcast) {
      content.push(
        <div key={daily} className='weather-section'>
          <Row className='day-header'><strong>{daily}</strong></Row>
          <Row className='temp-header'>
              <Col>Time</Col>
              <Col>Temperature</Col>
              <Col>Forcast</Col>
              <Col>Wind</Col>
          </Row>
          {forcast[daily].map(hour =>         
            <HourlyCard 
              key={hour.startTime}
              hourly={hour}
              selectedTemp={selectedTemp}
            />
          )}
        </div>
      );
    }
    return content;
  };

  return (
    <>
    <Row className='location'>
      <Col className='title'>
        {props.location}
        <CopyToClipboard text={`${window.location.origin}/?zipcode=${props.zipCode}`}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            },1000)
          }}>
          <button className="btn btn-sm btn-secondary ms-2 share-link">Share</button>
        </CopyToClipboard>
        {copied ? <span className='share-copy ps-2'> Link copied!</span> : null}
      </Col>
      <Col className={'text-end'}>
        <TempControls
          tempOptions={props.tempOptions}
          changeTempFormat={props.changeTempFormat}
          selectedTemp={props.selectedTemp}
        />
      </Col>
    </Row>
    {getDailyContent(props.forcast, props.selectedTemp)}
    </>
  );
}

export default Location;