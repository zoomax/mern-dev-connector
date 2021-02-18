import React  , {Fragment}from "react";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import { connect } from "react-redux";
const Navbar = ({auth : {isAuthenticated , loading} , logout}) => {
  const guest = (
    <ul>
      <li>
        <a herf="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  const auth = (
    <ul>
      <li>
        <a href="#!" onClick={() => logout()}>
          <i className ="fas fa-sign-out-alt"></i>
          <span className ="hide-sm"></span>Logout 
        </a>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <Fragment> {isAuthenticated  ? auth : guest}</Fragment>}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return  { 
    auth : state.authReducer
  }
};

export default connect(mapStateToProps ,{logout})(Navbar) ; 
