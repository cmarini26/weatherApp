import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCloudBolt, faCloudRain, faCloudSun, faSun } from '@fortawesome/free-solid-svg-icons'

function HourlyCard(hourly) {
    let iconsMap = {
        'sunny': faSun,
        'partlyCloudy': faCloudSun,
        'cloudy': faCloud,
        'rainy': faCloudRain,
        'thunderstorm': faCloudBolt
    }

    let icon = '';
    switch (hourly.hourly.shortForecast) {
        case 'Sunny':
        case 'Clear':
        case 'Mostly Clear':
            icon = iconsMap['sunny'];
            break;
        case 'Slight Chance Rain Showers':
        case 'Rain Showers Likely':
        case 'Slight Chance Very Light Rain':
        case 'Slight Chance Light Rain':
        case 'Chance Light Rain':
        case 'Light Rain Likely':
        case 'Rain Likely':
        case 'Chance Rain Showers':
        case 'Rain':
            icon = iconsMap['rainy'];
            break;
        case 'Partly Sunny':
        case 'Mostly Sunny':
        case 'Partly Cloudy':
            icon = iconsMap['partlyCloudy'];
            break;
        case 'Mostly Cloudy':
        case 'Cloudy':
            icon = iconsMap['cloudy'];
            break;
        case 'Chance Showers And Thunderstorms':
        case 'Slight Chance Showers And Thunderstorms':
        case 'Showers And Thunderstorms Likely':
        case 'Thunderstorms':
            icon = iconsMap['thunderstorm'];
            break;
    }

    let temp = (hourly.selectedTemp === 'fahrenheit') ?
        hourly.hourly.temperature + " \u2109" :
        Math.round((hourly.hourly.temperature - 32) * 5/9) + " \u2103";

    return (
        <Row>
            <Col>{moment(hourly.hourly.startTime).format('HH:mm')}</Col>
            <Col>{temp}</Col>
            <Col><FontAwesomeIcon icon={icon}/> {hourly.hourly.shortForecast}</Col>
            <Col>{hourly.hourly.windSpeed} {hourly.hourly.windDirection}</Col>
        </Row>
    );
}

export default HourlyCard;