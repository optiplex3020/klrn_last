import React, { Component } from 'react'
import { fetchUser, fetchUserPosts } from '../redux/actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


export class Main extends Component{
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchUserPosts();
      }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main); 
