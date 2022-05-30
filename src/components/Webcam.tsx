import React from "react";
import { ContainerVideo, ContainerButton, Button } from "./Webcam.style";

const Webcam = () => {
  const [enableGray, setEnableGray] = React.useState(false);
  const [showTime, setshowTime] = React.useState(false);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const videoref = React.useRef(null);

  React.useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds >= 0) {
        setSeconds(seconds + 1);
      }
      if (seconds >= 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

  const getTime = () => {
    alert(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
    setSeconds(1);
  };
  const handleGrayScale = () => {
    setEnableGray(!enableGray);
  };
  const handleStartVideo = () => {
    setshowTime(true);
    setSeconds(1);
    if (navigator.mediaDevices.getUserMedia) {
      let video = videoref.current;
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((err) => {
          console.log("Wrong");
        });
    }
  };
  const handleStopVideo = () => {
    setshowTime(false);
    getTime();
    if (navigator.mediaDevices.getUserMedia) {
      let video = videoref.current;
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          const tracks = stream.getVideoTracks();
          tracks[0].stop();
        })
        .catch((err) => {
          console.log("Wrong");
        });
    }
  };
  const handlePauseVideo = () => {
    let video = videoref.current;
    video.pause();
  };
  return (
    <ContainerVideo>
      <ContainerButton>
        <Button onClick={handleGrayScale}>
          {enableGray ? "Normal scale" : "Gray scale"}
        </Button>
        <Button onClick={handleStartVideo}>Capture</Button>
        <Button onClick={handleStopVideo}>Stop</Button>
        <Button onClick={handlePauseVideo}>Pause</Button>
      </ContainerButton>
      <video
        ref={videoref}
        id="webcam"
        autoPlay={true}
        className={enableGray ? "grayscale" : null}
      ></video>
      {!showTime || (minutes === 0 && seconds === 0) ? null : (
        <h1>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </ContainerVideo>
  );
};

export { Webcam };
