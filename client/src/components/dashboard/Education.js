import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import {deleteProfileEducation} from "../../store/actions/profile" ; 

const Education = ({ education  , deleteProfileEducation}) => {
  const educations = education.map(({ _id, school, from, to, degree }) => (
    <tr key={_id}>
      <td>{school}</td>
      <td>{degree}</td>
      <td>
        <Moment format="YYYY/MM/DD" date={from} /> -{" "}
        {!to ? " Now" : <Moment format="YYYY/MM/DD" date={to} />}
      </td>
      <td>
        <button onClick = {()=>deleteProfileEducation(_id )} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
        <h2 className  = "my-2">
            Education Credentials
        </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteProfileEducation : PropTypes.func.isRequired,
 
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  deleteProfileEducation
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
