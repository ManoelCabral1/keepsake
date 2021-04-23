import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login';
import makeStyles from './Auth.styles'

import {useDispatch} from 'react-redux'
import {signin, signup} from '../../store/AuthActions'
import {AUTH} from '../../store/ActionTypes'
import Input from './Input'
import Icon from './Icon'

const clienteId = '775284636586-abhfrqhjndc6e3tb1asg4ue3roalhid2.apps.googleusercontent.com'
const initialState ={ FirstName: '', LastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () =>{
    const classes = makeStyles();
    const [formData, setFormData] =useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) =>{
       e.preventDefault();
       if (isSignUp) {
           dispatch(signup(formData, history))
       } else {
        dispatch(signin(formData, history))
       }
    };
    const handleChange = (e) =>{
       setFormData({...formData, [e.target.name]: e.target.value })
    };
    const switchMode = () =>{
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    const googleSuccess = async (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({
                type: AUTH,
                data: {result, token}
            });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error) =>{
            console.error(error);
    };

    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
               <Avatar className={classes.avatar}>
                   <LockOutlinedIcon/>
               </Avatar>
               <Typography>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
               <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                         {
                             isSignUp && (
                                 <>
                                    <Input 
                                    name="FirstName" 
                                    label="Nome" 
                                    half
                                    autoFocus
                                    handleChange={handleChange}
                                    />
                                    <Input
                                    name="LastName" 
                                    label="sobrenome" 
                                    half
                                    handleChange={handleChange}
                                    />
                                 </>
                             )}
                         <Input name="email" label="Email" handleChange={handleChange} type="email"/>
                         <Input 
                         name="password" 
                         label="Senha" 
                         handleChange={handleChange} 
                         type={showPassword ? "text" : "password"}
                         handleShowPassword={handleShowPassword}/>
                         { isSignUp && <Input name="confirmPassword" label="Repita a senha" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' :'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId={clienteId}
                        render={(renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick}
                            disable={renderProps.disabled}
                            startIcon={<Icon/>}
                            variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                         ></GoogleLogin>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
               </form>
           </Paper>
       </Container>
    )
}

export default Auth;