import "./index.css";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="">
        <div className="d-flex">
          <p className="m-0">Name : </p>
          <input type="text" placeholder="Name" />
        </div>
        <div className="d-flex mt-3">
          <p className="m-0">Email : </p>
          <input type="email" placeholder="Email" />
        </div>
        <div className="d-flex mt-3">
          <p className="m-0">Mobile Number : </p>
          <input type="number" placeholder="Mobile Number" />
        </div>
      </form>
    </div>
  );
};

export default Home;
