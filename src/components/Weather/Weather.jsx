import styles from './Weather.module.scss'
import {Card} from "react-bootstrap";
import PositionSvg from "../Svgs/PositionSvg";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

import Sunny from "../Svgs/Sunny";
import Cloudy from "../Svgs/Cloudy";
import Rainy from "../Svgs/Rainy";
export const Weather = () => {
    const weather = useSelector(({weather}) =>  (weather))
        const displayIcon = () => {

            const defaultWidth = '200px';
            const defaultHeight = '200px';
            const {icon} = weather.weather[0]
            console.log(icon)
            switch (icon) {
                case '01d':
                    return <Sunny width={defaultWidth} height={defaultHeight}/>
                case '03d':
                    return <Sunny width={defaultWidth} height={defaultHeight}/>
                case '04d':
                    return <Cloudy width={defaultWidth} height={defaultHeight}/>
                case '10d':
                    return <Rainy width={defaultWidth} height={defaultHeight}/>
                case '11d':
                    return <Thermometer width={defaultWidth} height={defaultHeight}/>
                default:
                    return <img src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`} alt=""/>
            }

 }
    console.log(weather);
    return (
        <>
            <Card className={styles.container}>
                <Card.Body>
                    <Card.Title>
                        {weather.name} , {weather.sys.country} <PositionSvg color={'rgba(255,255,255,0.7)'}/>
                        <div className={styles.date}>
                                <div>
                                    <Moment format={'llll'}/></div>
                                <div><Time width={'15px'} height={'15px'}/>
                                </div>
                        </div>
                    </Card.Title>
                    <Card.Text as={'div'} className={styles.weather_infos}>
                        <div>
                                {displayIcon()}
                        </div>
                        <div className={styles.temperature}>
                            <div>{weather.main.temp}</div>
                            <div>
                                <Thermometer/>
                            </div>
                        </div>
                        <div>
                            Good Morning {weather.name}
                            <div className={styles.separator}></div>
                        </div>
                        <div className={styles.infos}>
                            <div className={styles.border_right}>
                                <div><DefaultWeather color={'#fff'}/></div>
                                <div>Sunrise</div>
                                    <div>
                                        <Moment unix={true} format={'hh:mm'}>
                                            {weather.sys.sunrise}
                                        </Moment>
                                        </div>
                                <div>08:00</div>
                            </div>
                            <div className={styles.border_right}>
                                <div><Wind/></div>
                                <div>Wind</div>
                                <div>08m/s</div>
                            </div>
                            <div>
                                <div><Thermometer color={'#fff'} width={'25px'} height={'25px'}/></div>
                                <div>Temp</div>
                                <div>35° C</div>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
