import React from 'react';

import { BackgroundMP4, BackgroundWEBM } from './assets/images';

const App = () => {
  const [timerDays, setTimerDays] = React.useState('--');
  const [timerHours, setTimerHours] = React.useState('--');
  const [timerMinutes, setTimerMinutes] = React.useState('--');
  const [timerSeconds, setTimerSeconds] = React.useState('--');

  let interval = React.useRef();

  const startTimer = () => {
    // Дата с которой нужно сделать обратный отсчет
    const countDownDate = new Date('Jan 1 2022').getTime();

    interval = setInterval(() => {
      // Расчёт оставшегося времени
      const now = new Date().getTime();
      const distance = countDownDate - now;

      // Подсчёт дней, часов, минут, секунд
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // Остановить таймер если оставшиеся время меньше нуля
        clearInterval(interval.current);
      } else {
        // Обновить таймер
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  React.useEffect(() => {
    startTimer();
  }, []);

  return (
    <>
      <div className="timer">
        <div className="timer__body">
          <div className="timer__top">
            <h1 className="timer__title">
              До Нового <span>2022</span> Года осталось
            </h1>
          </div>
          <div className="timer__bottom">
            <div className="timer__bottom-wrapper">
              <div className="timer__block">
                <span className="timer__time">{timerDays}</span>
                <span className="timer__text">Дней</span>
              </div>
              <div className="timer__block">
                <span className="timer__time">{('0' + timerHours).slice(-2)}</span>
                <span className="timer__text">Часов</span>
              </div>
              <div className="timer__block">
                <span className="timer__time">{('0' + timerMinutes).slice(-2)}</span>
                <span className="timer__text">Минут</span>
              </div>
              <div className="timer__block">
                <span className="timer__time">{('0' + timerSeconds).slice(-2)}</span>
                <span className="timer__text">Секунд</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <video autoPlay muted loop preload="auto" className="full-screen-video">
        <source type="video/webm" src={BackgroundWEBM} />
        <source type="video/mp4" src={BackgroundMP4} />
      </video>
    </>
  );
};

export default App;