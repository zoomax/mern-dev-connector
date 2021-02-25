import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../store/actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm" ; 

export const Post = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div>
      {/* {!loading && <h1 className = "large text-primary">posts</h1> } */}
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <PostForm />
      <div className="posts">
        {posts.length > 0 && (
          <Fragment>
            {posts.map((post, index) => (
              <PostItem post={post} key={index} />
            ))}
          </Fragment>
        )}
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
