import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Header from "../Header";
import "./index.css";
import { useState } from "react";
import { levelsData } from "../../Utils/SharedData/Data";

let timerId;

let bgColors = ["bg-danger", "bg-success"];
const GreenLightRedLight = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [UserPhoneNumber, setUserPhoneNumber] = useState("");
  const [level, setLevel] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(40);
  const [currentScore, setCurrentScore] = useState(0);
  const [targetScore, setTargetScore] = useState();
  const [randomIndex, setRandomIndex] = useState();
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleTimer = () => {
    timerId = setInterval(() => {
      console.log("--------------------------------------------,", timer);
      if (timer === 0) {
        clearInterval(timerId);
        setShowRestartModal(true);
        setTimer(40);

        console.log(
          "========================================================="
        );
      } else {
        setRandomIndex(Math.floor(Math.random() * 2));
        console.log(randomIndex);
        setTimer((prevState) => prevState - 1);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setTimer(40);
    setCurrentScore(0);
    setShowRestartModal(false);
    handleTimer();
  };

  //   console.log(userName, userEmail, UserPhoneNumber, level);

  const onClickStartGameButton = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(userEmail);
    const phoneRegex = /^\d{10}$/;
    const isValidPhoneNumber = phoneRegex.test(UserPhoneNumber);
    if (isValidEmail && isValidPhoneNumber && level !== "") {
      setShowModal(false);
      setTargetScore(levelsData[level]);
      handleTimer();
    } else {
      setError("Please Fill Valid Details");
    }
  };

  const renderDialogBox = () => (
    <Dialog open={showModal}>
      <div className="pt-5 pr-5 pl-5 pb-3 d-flex flex-column ">
        <h1 className="text-secondary h4 text-center mb-3">Welcome</h1>
        <TextField
          label="Name"
          className="mb-3"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <TextField
          label="Email"
          className="mb-3"
          value={userEmail}
          onChange={(event) => setuserEmail(event.target.value)}
        />
        <TextField
          label="Mobile-Number"
          className="mb-3"
          value={UserPhoneNumber}
          onChange={(event) => setUserPhoneNumber(event.target.value)}
        />
        <div className="mt-2">
          <Chip
            label="Easy"
            variant={level === "Easy" ? "filled" : "outlined"}
            className="mr-3"
            color="primary"
            sx={{ width: 100 }}
            onClick={() => setLevel("Easy")}
          />
          <Chip
            label="Medium"
            variant={level === "Medium" ? "filled" : "outlined"}
            className="mr-3"
            color="primary"
            sx={{ width: 100 }}
            onClick={() => setLevel("Medium")}
          />
          <Chip
            label="Hard"
            variant={level === "Hard" ? "filled" : "outlined"}
            color="primary"
            sx={{ width: 100 }}
            onClick={() => setLevel("Hard")}
          />
        </div>
        <div className="text-center mt-4">
          <Button
            className=" w-100"
            variant="contained"
            onClick={onClickStartGameButton}
          >
            Start Game
          </Button>
        </div>
        <p className="text-danger text-center mt-2">{error}</p>
      </div>
    </Dialog>
  );

  const renderRestartView = () => (
    <Dialog open={showRestartModal}>
      <div className="d-flex flex-column justify-content-center align-items-center p-4">
        <div className="col-8">
          <img
            className="w-100"
            src="https://img.freepik.com/premium-vector/goal-achievement-successful-progress-career-ladder-female-character_194360-239.jpg?w=826"
            alt="winImage"
          />
        </div>
        <h2 className="text-warning h1">
          {currentScore.toString().padStart(2, "0")}
        </h2>
        <div className="text-center mt-4">
          <Button
            className=" w-100"
            variant="contained"
            onClick={handleRestart}
          >
            Restart Game
          </Button>
        </div>
      </div>
    </Dialog>
  );

  console.log(bgColors[randomIndex]);
  //   clearInterval(timerId);

  const updateScore = () => {
    console.log("Radhe Rahde", randomIndex);
    if (randomIndex === 0) {
      clearInterval(timerId);
      setTimer(40);
      setShowRestartModal(true);
    } else {
      setCurrentScore((prevState) => prevState + 1);
    }
  };
  return (
    <div className="game_container">
      <Header
        userName={userName}
        currentScore={currentScore}
        targetScore={targetScore}
        timer={timer}
      />
      <div className=" d-flex justify-content-center align-items-center h-100">
        {/* <button className={`box_container ${bgColors[randomIndex]}`}>
          <h1>Krishna</h1>
        </button> */}
        <button
          className={`square shadow-lg ${bgColors[randomIndex]}`}
          onClick={updateScore}
        >
          {randomIndex === 0 ? "Red" : "Green"}
        </button>
      </div>
      {renderDialogBox()}
      {renderRestartView()}
    </div>
  );
};

export default GreenLightRedLight;
