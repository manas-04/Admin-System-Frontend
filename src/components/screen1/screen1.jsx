import React, { useState } from "react";
import { Form , Button } from "react-bootstrap";
import axios from "axios";
import {useAlert} from "react-alert";
import { useHistory } from "react-router";

import styles from "./screen1.module.css";

function Screen1(){

    const alert = useAlert();
    const history = useHistory();
    const [loginDetails,setLoginDetails] = useState({
        email:"",
        password:"",
    });

    function InputHandler(event){
        const {name,value} = event.target;

        setLoginDetails((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        });
    }

    function formSubmission(event){
        event.preventDefault();
        console.log(loginDetails);

        axios.post(`/user/login`,{
            user:loginDetails
        }).then((res)=>{
            localStorage.setItem('token', res.data.token);
            setTimeout(() => {
                history.push("/dashboard");
            }, 1000);
        }).catch((error)=>{
            if(error.response.status===404 || error.response.status===401){
                alert.error(error.response.data.msg);
            }else if(error.response.status===500 ){
                alert.error("Internal Server Error");
            }
            console.log(error.response)
        })

    }

    return <div>
        <center>
            <div className={styles.loginDiv}>
                <p className={styles.heading}>User Login</p>
                <Form onSubmit={formSubmission}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={InputHandler} 
                            name="email" 
                            required    
                        />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            onChange={InputHandler} 
                            name="password" 
                            required    
                        />
                    </Form.Group>
                    <center>
                        <Button type="submit" className={styles.button}>
                            <span>
                                Sign In
                            </span>
                        </Button>
                    </center>
                </Form>
            </div>
        </center>
    </div>
}

export default Screen1;