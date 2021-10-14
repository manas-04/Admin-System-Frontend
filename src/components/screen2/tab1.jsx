import axios from "axios";
import React, { useState } from "react";
import { Form , Button  } from "react-bootstrap";
import { useAlert } from "react-alert";

import styles from "./screen2.module.css";

function AddUserTab(){

    const alert = useAlert();
    const [error,setError] = useState(false);
    const [mailError,setMailError] = useState(false);
    const [numLengthError,setNumLengthError] = useState(false);
    const [userDetails,setUserDetails] = useState({
        username:"",
        email:"",
        mobileNo:"",
        address:""
    });
    
    function InputHandler(event){
        const {name,value} = event.target;

        if(name==="username"){
            if (/[^0-9a-zA-Z]/.test(value)) {
                setError(true);
            } else {
                setError(false);
            }
        }

        if(name==="mobileNo"){
            if(value.length === 10 && /^[0-9\b]+$/.test(value)){
                console.log(/^[0-9\b]+$/.test(value));
                setNumLengthError(false);
            }else{
                setNumLengthError(true);
                console.log(/^[0-9\b]+$/.test(value));

            }
        }

        if(name==="email"){
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)){
                setMailError(false);
            }else{
                setMailError(true);
            }
        }

        setUserDetails((prev)=>{
           return {
               ...prev,
               [name]:value
           } 
        });
    }

    async function FormSubmit(event){
        event.preventDefault();

        if(error){
            alert.error("Invalid Username");
        }else if(mailError){
            alert.error("Invalid Email.")
        }else if(numLengthError){
            alert.error("Invalid Mobile No.")
        }else{
            await axios.post(`https://manas-admin-system.herokuapp.com/createUser`,{
                user:userDetails
            }).then((res)=>{
                alert.success("User added Successfully.");
                setTimeout(() => {
                    window.location.reload();            
                }, 1500);
    
            }).catch((error)=>{
                if(error.response.status === 406 || error.response.status === 500){
                    alert.error(error.response.data.msg);
                }
            })
        }
    }

    return <div className={styles.form}>
    <h4 style={{marginBottom:30}}>Add User</h4>
    <Form onSubmit={FormSubmit}>
            <Form.Group controlId="formGridEmail" className="mb-3">
                <Form.Control 
                    type="name" 
                    placeholder="Username" 
                    name="username"
                    onChange={InputHandler}
                    required
                />
            </Form.Group>
            {error
            ?<p className={styles.spaceError}>
                * No spaces and signs are Allowed in Username
            </p>
            :null}
            
            <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control 
                placeholder="Mobile No." 
                type="" 
                name="mobileNo"    
                onChange={InputHandler}
                required
            />
            </Form.Group>
            {numLengthError
            ?<p className={styles.spaceError}>
                * Enter a valid 10 digit Phone Number
            </p>
            :null}

            <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Control 
                type="email" 
                placeholder="E-mail" 
                name="email"    
                onChange={InputHandler}
                required
            />
            </Form.Group>
            {mailError
            ?<p className={styles.spaceError}>
                * Enter a Valid E-Mail 
            </p>
            :null}

            <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control 
                placeholder="Address"
                name="address"  
                as="textarea" 
                rows={3}    
                onChange={InputHandler}
                required
            />
            </Form.Group>

            <Button type="submit">
                Create Record
            </Button>
        </Form>
    </div>
}

export default AddUserTab;