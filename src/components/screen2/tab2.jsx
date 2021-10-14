import axios from "axios";
import React , {useEffect,useState} from "react";
import { Button } from "react-bootstrap";
import { useAlert } from "react-alert";

import styles from "./screen2.module.css";

function Userdetails(){

    const alert = useAlert();
    const [users,setUsers] = useState([]);
    const [hasUsers,setHasUsers] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    async function getData(){
        await axios.get(`/getUsers`)
        .then(res=>{
            if(res.data.msg.length === 0 ){
                setHasUsers(false);
            }else{
                setHasUsers(true);
                setUsers(res.data.msg);
            }
        }).catch((error)=>{
            console.log(error);
        });
    }

    function clickHandler(userId){
        axios.post(`/delete`,{
            id:userId,
        }).then((res)=>{
            alert.success("Successfully Deleted the Record");         
            window.location.reload();
        }).catch((error)=>{
            alert.error(error.response.data.msg);
        })
    }

    return <div>
        <h4>User Details</h4>
        <hr style={{width:600}}/>
        <div>
            {hasUsers
            ?<div style={{display:"inline-grid",marginBottom:20}}>
                {users.map((user)=>{
                    return <div className={styles.userList}>
                        <p>
                            <b>Username</b> : {user.username}
                        </p>
                        <p>
                            <b>E-Mail</b> : {user.email}
                        </p>
                        <p>
                           <b> Mobile No.</b> : {user.mobileNo}
                        </p>
                        <p style={{marginBottom:10,width:500}}>
                           <b> Address</b> : {user.address}
                        </p>
                        <Button onClick={()=>{clickHandler(user._id)}} >
                            Delete
                        </Button>
                    </div>
                })}
            </div>
            :<div>
                <h3>No Users are added yet!</h3>
            </div>
            }
        </div>
    </div>
}

export default Userdetails;