import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Header from "../Header";
import "./index.css";
import { useState } from "react";
import { levelsData } from "../../Utils/SharedData/Data";
import { RestartIcon } from "../../Utils/Icons/icons";
import LeaderBoard from "../LeaderBoard";
import { EASY, HARD, MEDIUM } from "../../Utils/SharedData/constants";

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
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [leaderBoardList, setLeaderBoardList] = useState([]);

  const handleTimer = () => {
    timerId = setInterval(() => {
      setRandomIndex(Math.floor(Math.random() * 2));
      setTimer((prevState) => {
        if (prevState === 0) {
          clearInterval(timerId);
          setShowRestartModal(true);
          setTimer(40);
        } else {
          return prevState - 1;
        }
      });
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentScore(0);
    setShowRestartModal(false);
    setShowModal(true);
    setError("");
    handleLeaderBoardList();
  };

  const handleLeaderBoardList = () => {
    let updatedList = leaderBoardList.map((each) => {
      if (each.name === userName) {
        if (each.score < currentScore) {
          return { ...each, score: currentScore, level };
        }
      }
      return each;
    });

    setLeaderBoardList(updatedList);
  };

  const addUser = () => {
    let isUserExit = leaderBoardList.some((each) => each.name === userName);
    if (!isUserExit) {
      setLeaderBoardList([
        ...leaderBoardList,
        { name: userName, score: currentScore, level },
      ]);
    }
  };

  console.log(leaderBoardList);
  const onClickStartGameButton = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(userEmail);
    const phoneRegex = /^\d{10}$/;
    const isValidPhoneNumber = phoneRegex.test(UserPhoneNumber);
    if (isValidEmail && isValidPhoneNumber && level !== "") {
      setShowModal(false);
      setTargetScore(levelsData[level]);
      handleTimer();
      addUser();
    } else {
      setError("Please Fill Valid Details");
    }
  };

  const renderDialogBox = () => (
    <Dialog open={showModal}>
      <div className="p-0 p-md-5 userFormContainer col-12">
        <div className=" d-flex flex-column shadow p-3 p-md-4 formCon">
          <h1 className="text-secondary h4 text-center mb-3">Rock The Game</h1>
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
              label={EASY}
              variant={level === EASY ? "filled" : "outlined"}
              className="mr-3"
              color="primary"
              sx={{ width: 100 }}
              onClick={() => setLevel(EASY)}
            />
            <Chip
              label={MEDIUM}
              variant={level === MEDIUM ? "filled" : "outlined"}
              className="mr-3"
              color="primary"
              sx={{ width: 100 }}
              onClick={() => setLevel(MEDIUM)}
            />
            <Chip
              label={HARD}
              variant={level === HARD ? "filled" : "outlined"}
              color="primary"
              sx={{ width: 100 }}
              onClick={() => setLevel(HARD)}
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
      </div>
    </Dialog>
  );

  const isTargetAchieved = currentScore >= targetScore;
  const renderRestartView = () => (
    <Dialog open={showRestartModal}>
      <div className="d-flex flex-column justify-content-center align-items-center p-4">
        <h2
          className={`${isTargetAchieved ? "text-warning" : "text-primary"} h2`}
        >
          {isTargetAchieved ? "You Won 😍" : "Better Luck! 👍"}
        </h2>
        <div className="col-8">
          <img
            className="w-100"
            src={
              isTargetAchieved
                ? "https://img.freepik.com/premium-vector/goal-achievement-successful-progress-career-ladder-female-character_194360-239.jpg?w=826"
                : "https://img.freepik.com/premium-vector/pop-art-style-with-oops-sign-banner-design-vector-illustration_194782-922.jpg?size=626&ext=jpg&ga=GA1.1.905824719.1684755036&semt=ais"
            }
            alt="gameStatusImage"
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
            <span className="mr-2">Restart Game</span>
            <RestartIcon />
          </Button>
        </div>
      </div>
    </Dialog>
  );

  const renderLeaderBoardDialogBox = () => (
    <Dialog open={showLeaderBoard} onClose={onCloseLeaderBoard}>
      <LeaderBoard
        leaderBoardList={leaderBoardList.sort((a, b) => b.score - a.score)}
      />
    </Dialog>
  );

  const updateScore = () => {
    // console.log("Radhe Rahde", randomIndex);
    if (randomIndex === 0) {
      clearInterval(timerId);
      setTimer(40);
      setShowRestartModal(true);
    } else {
      setCurrentScore((prevState) => prevState + 1);
    }
  };

  const handleShowLeaderBoard = () => {
    setShowLeaderBoard(true);
    clearInterval(timerId);
  };

  const onCloseLeaderBoard = () => {
    setShowLeaderBoard(false);
    handleTimer();
  };
  return (
    <div className="w-100 parent_container">
      <Header
        userName={!showModal && userName}
        currentScore={currentScore}
        targetScore={targetScore}
        timer={timer}
      />
      <div className="game_container border">
        <div
          className={` d-flex justify-content-center align-items-center h-100 ${
            !showRestartModal
              ? ""
              : isTargetAchieved
              ? "bg-success"
              : "bg-danger"
          }`}
        >
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
        <div className="leader_board_button">
          <Button
            className=""
            variant="contained"
            color="secondary"
            onClick={handleShowLeaderBoard}
          >
            Leader Board
          </Button>
        </div>
        {renderDialogBox()}
        {renderRestartView()}
        {renderLeaderBoardDialogBox()}
      </div>
    </div>
  );
};

export default GreenLightRedLight;
