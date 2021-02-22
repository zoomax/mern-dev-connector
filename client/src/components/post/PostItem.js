import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from "react-moment"

const PostItem = ({post : {avatar,likes,comments , date  ,user , name , text} }) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profiles/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
             {text}
            </p>
            <p className="post-date">Posted on <Moment format="YYYY/MM/DD" date = {date} /></p>
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              <span>{likes.length}</span>
            </button>
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <a href="post.html" className="btn btn-primary">
              Discussion <span className="comment-count">{comments.length}</span>
            </a>
            <button type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
    )
}

PostItem.propTypes = {
    post : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
