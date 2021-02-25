import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../store/actions/post";

export const CommentForm = ({ addComment, post: { post } }) => {
  const [formData, setFormData] = useState({
    text: "",
  });
  let {text} = formData ; 
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormData({ text: "" });
          addComment(formData, post._id);
        }}
        className="form my-1"
      >
        <textarea
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value = {text}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
});

const mapDispatchToProps = {
  addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
