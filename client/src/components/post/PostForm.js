import React  , {useState   } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../store/actions/post";

export const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: "",   
  });
  let {text } = formData ; 
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormData({text :""}) ; 
          addPost(formData);
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
