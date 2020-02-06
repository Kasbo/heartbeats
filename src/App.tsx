import React from 'react';
import moment from 'moment';
import './App.css';


const DATE_WE_MET = moment('11/11/2016 18:00:00', 'DD/MM/YYYY hh:mm:dd');

type BeatsProps = {
  shouldVibrate: boolean;
}

function Beats({shouldVibrate} : BeatsProps): JSX.Element {
  const [beats, setBeats] = React.useState(
    moment().diff(DATE_WE_MET, 'seconds')
  );

  const getBeats = React.useCallback((): number => {
    return moment().diff(DATE_WE_MET, 'seconds');
  }, []);

  React.useEffect((): (() => void) => {
    const interval = setInterval((): void => {
      const nextBeats = getBeats();
      setBeats(nextBeats);

      if (shouldVibrate) {
        window.navigator.vibrate(200);
        console.log('vibrating');
      }
    }, 1000);

    return (): void => {
      clearInterval(interval);
      navigator.vibrate(0);
    };
  }, [getBeats, shouldVibrate]);

  return (
    <div className="beats">
      {beats} раз
    </div>
  );
}

function App() {
  const [shouldVibrate, setShouldVibrate] = React.useState(false);

  const toggleShouldVibrate = () => {
    setShouldVibrate(prevState => !prevState);
    window.navigator.vibrate(100);
  };

  return (
    <div className="content">
      <div className="title">Привет, Аня</div>
      <div className="heart-wrapper">
        <div
          className="heart"
          onClick={toggleShouldVibrate}
        />
      </div>
      <div className="beats-label">
        Сейчас моё сердце бьется для тебя в
      </div>
      <Beats shouldVibrate={shouldVibrate}/>
    </div>
  );
}

export default App;
