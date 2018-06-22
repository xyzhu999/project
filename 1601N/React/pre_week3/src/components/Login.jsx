import React from 'react';
import '../scss/login.css';
import {Redirect} from 'react-router-dom';
import {login} from '../actions/actions';
import {connect} from 'react-redux';

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    valueChange(type, value){
        this.setState({
            [type]: value
        })
    }

    submit(){
        if (!this.state.username || !this.state.password){
            alert('请输入用户名或密码');
            return;
        }
        fetch(`/login?username=${this.state.username}&password=${this.state.password}`)
            .then(res=>{
                res.json().then(body=>{
                    console.log('body...', body);
                    if (body.code === 0){
                        this.props.doLogin();
                    }else{
                        alert(body.msg);
                    }
                })
            })
    }

    render(){
        if (this.props.login){
            return <Redirect to="/tab/index"/>
        }
        return <div className="login">
            <p>登陆页面</p>
            <input type="text" value={this.state.username} placeholder="请输入用户名" 
                onChange={(e)=>{this.valueChange('username', e.target.value)}}/>
            <input type="password" value={this.state.password} placeholder="请输入密码" 
                onChange={(e)=>{this.valueChange('password', e.target.value)}}/>
            <button onClick={this.submit.bind(this)}>登陆</button>
        </div>
    }
}

const mapStatetoProps = (state)=>{
    return {
        login: state.login.isLogin
    }
}

const mapDispatchtoProps = (dispatch)=>{
    return {
        doLogin: ()=>dispatch(login())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Login)