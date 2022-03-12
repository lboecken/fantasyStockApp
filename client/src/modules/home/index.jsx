function Home() {
  return (
    <>
      <Header />
      <div id='BODY'>
        <h1>Welcome</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          quas et necessitatibus cum, molestiae pariatur aperiam officia vitae
          consectetur quisquam recusandae maiores similique est ipsum, quam
          nesciunt provident tempore officiis!
        </p>
        <img src='https://via.placeholder.com/150'></img>
      </div>
      <div id='footer'>
        <a>About the developer </a>
        <a>About the project behind the scenes </a>
        <a>LinkedIn </a>
        <a>Github </a>
        <a>Personal Website </a>
      </div>
    </>
  );
}

export default Home;

function Header() {
  return (
    <div id='HEADER'>
      <h2> Stock Trader</h2>
      <button>Login</button>
      <button>Register</button>
    </div>
  );
}
