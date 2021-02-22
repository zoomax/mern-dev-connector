import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../store/actions/post";
import PostItem from "./PostItem" ; 

export const Post = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
    console.log(posts);
  }, [getPosts, loading]);
  return (
    <div>
      {/* {!loading && <h1 className = "large text-primary">posts</h1> } */}
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="posts">
        {posts.length > 0 && <Fragment>
            {posts.map(post=> <PostItem post = {post} key = {post._id}/>)}
            </Fragment>}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
});

const mapDispatchToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
