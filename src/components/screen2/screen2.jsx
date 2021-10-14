import React , {useEffect,useState} from "react";
import { Tabs,Tab } from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { useAlert } from "react-alert";
import {SyncLoader} from "react-spinners";

import AddUserTab from "./tab1";
import Userdetails from "./tab2";

function Screen2(){

    const history = useHistory();
    const alert = useAlert();
    const [isLoading,setLoading] = useState(true);
    useEffect(() => {
        checkLogin();
    }, []);

    async function checkLogin(){
        await axios.post(`https://manas-admin-system.herokuapp.com/validate`,{
            token:localStorage.getItem("token"),
        }).then(res=>{
            if(res.status === 200){
                setTimeout(() => {
                    setLoading(false);              
                }, 1500);
            }
        }).catch((error)=>{
            console.log(error);
            setTimeout(() => {
				setLoading(false);
				if(error.response.status === 403){
					alert.error("Please Login, to access this page.");
					history.replace("/");
				}else if(error.response.status === 500){
                    alert.error("Internal Server Error")
                }
			},1500);
        });
    }

    return <center>
            {isLoading
                ?<div style={{marginTop:40+"vh",marginLeft:-10}}>
                    <h2>Processing your request ... </h2>
                    <SyncLoader loading size={50} margin={20}/>
                </div>
                :<Tabs defaultActiveKey="user" className="mb-3">
                    <Tab eventKey="user" title="Add User">
                        <AddUserTab />
                    </Tab>
                    <Tab eventKey="profile" title="User Details">
                        <Userdetails />
                    </Tab>
                </Tabs>
            }
        </center>
}

export default Screen2;