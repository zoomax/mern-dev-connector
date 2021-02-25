import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../store/actions/post";
import CommentForm from "./CommentForm";
import Spinner from "../layout/Spinner";
import CommentItem from "./CommentItem";
const initial = {
  _id: "",
  avatar: "",
  likes: [],
  comments: [],
  date: "",
  user: "",
  name: "",
  text: "",
};
export const SinglePost = ({
  post: { post = initial, loading },
  match,
  auth,
  getPost,
}) => {
  const postdata = post === null ? initial : post;
  const { _id, user, date, comments, likes, text, avatar, name } = postdata;
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, loading, match.params.id]);
  return (
    <Fragment>
      {post ? (
        <div>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profiles/${user}`}>
                <img className="round-img" src={avatar} alt="" />
                <h4>{name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{text}</p>
            </div>
          </div>
          <CommentForm />

          <div className="comments"></div>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentItem comment={comment} key={comment._id} />
            ))
          ) : (
            <p className="my-1">Be the first to put a comment</p>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

SinglePost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
  auth: state.authReducer,
});

const mapDispatchToProps = {
  getPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
