import React from 'react'
import {Grid, CircularProgress} from '@material-ui/core'

import {useSelector} from 'react-redux'

import makeStyles from './Posts.styles'
import Post from './Post'

const Posts = ({setCurrentId}) =>{
    const posts = useSelector((state) =>state.Posts);
    const classes = makeStyles();

    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItens="stretch" spacing={3}>
                  {posts.map((post) =>(
                      <Grid key={post._id} item xs={12} sm={6}>
                           <Post post={post} setCurrentId={setCurrentId}/>
                      </Grid>
                  ))}
            </Grid>
        )
    )
}

export default Posts;