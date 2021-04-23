import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import makeStyles from './Form.styles'

//conexão com store
import {useDispatch, useSelector} from 'react-redux'
import { createPost, updatePost } from '../../store/PostActions'

const Form = ({currentId, setCurrentId}) =>{
    const classes = makeStyles();
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    ///acesso ao post escolhido para edição na store, usando a prop currentId passada pelo componente "pai" App
    const post = useSelector((state) => currentId ? state.Posts.find((p) => p._id === currentId): null);
    
    const user = JSON.parse(localStorage.getItem('profile'));
    
    useEffect(() => {
        if (post) setPostData(post);
      }, [post]);
    
      const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost({ ...postData, name: user?.result?.name }));
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          clear();
        }
      };
    
      if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
             Faça login para criar suas próprias memórias e curtir as lembranças de outras pessoas.
            </Typography>
          </Paper>
        );
      }
    
    return (
        <Paper className={classes.paper}>
             <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                 <Typography variant="h6">{currentId ? `Editar "${post.title}"`: 'Crie uma lembrança'}</Typography>
                <TextField 
                    name="title"
                    variant="outlined"
                    label="Título do seu Post"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <TextField 
                    name="message"
                    variant="outlined"
                    label="Fale sobre sua lembrança"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}
                />
                <TextField 
                    name="tags"
                    variant="outlined"
                    label="tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button 
                   className={classes.buttonSubmit}
                   variant="contained"
                   color="primary"
                   size="large"
                   type="submit"
                   fullWidth
                >Postar</Button>
                <Button 
                   variant="contained"
                   color="secondary"
                   size="small"
                   onClick={clear}
                   fullWidth
                >Limpar</Button>
             </form>
        </Paper>
    )
}

export default Form;