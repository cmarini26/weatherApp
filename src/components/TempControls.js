import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function TempControls(props) {
  return (
    <ButtonGroup>
    {props.tempOptions.map((radio, idx) =>
        <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={radio.value}
            checked={props.selectedTemp === radio.value}
            onChange={(e) => props.changeTempFormat(e.currentTarget.value)}
            >
            {radio.name}
        </ToggleButton>
    )}
    </ButtonGroup>
  );
}

export default TempControls;