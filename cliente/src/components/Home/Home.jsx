import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { Container, Grow, Grid } from '@material-ui/core'
import makeStyles from './Home.styles'

import Posts from '../Posts'
import Form from '../Form'

import { getPosts } from '../../store/PostActions'

const Home = () =>{
    const classes = makeStyles();
    const dispatch = useDispatch();
    //id da postagem passada como props ao form para edição "update"
    const [currentId, setCurrentId] = useState(0);
    useEffect(() => {
        dispatch(getPosts());
      }, [ currentId, dispatch]);

    return (
        <Grow in>
              <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItens="stretch" spacing={3}>
                   <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>
                   </Grid>
                   <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                   </Grid>
                </Grid>
             </Container>
         </Grow>
    )
}

export default Home;