import { GameIcon, TimerIcon, UserIcon } from "../../Utils/Icons/icons";
import "./index.css";

const Header = ({ userName, currentScore, targetScore, timer }) => (
  <nav className="p-2 nav_container">
    <div className="nav_width   d-flex justify-content-between">
      <div className="">
        <h1 className="text-light">Return Journey</h1>
      </div>
      <ul className="d-flex justify-content-between text-light  align-items-center list-unstyled m-0">
        <li className="d-flex align-items-center mr-4">
          <p className="m-0 mr-2">
            <GameIcon />
          </p>
          <h1 className="h4 m-0">
            <span className="text-secondary">{targetScore} / </span>
            {currentScore.toString().padStart(2, "0")}
          </h1>
        </li>
        <li className="d-flex align-items-center mr-4">
          <p className="m-0 mr-2">
            <TimerIcon />
          </p>
          <h1 className={`h4 m-0 ${timer <= 5 ? "text-danger" : ""}`}>
            {timer.toString().padStart(2, "0")}
          </h1>
        </li>
        <li className="d-flex align-items-center">
          <p className="m-0 mr-2">
            <UserIcon />
          </p>
          <h1 className="h4 m-0">{userName}</h1>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
