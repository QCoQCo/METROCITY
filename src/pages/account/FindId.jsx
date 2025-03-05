import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FindId=()=>{
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[foundId,setFoundId]=useState('');
    const[errorMsg,setErrorMsg]=useState('');

    const nameRef=useRef();
    const nameErrRef=useRef();
    const emailRef=useRef();
    const emailErrRef=useRef();

    const handleChangeName=(e)=>{
        nameErrRef.current.textContent='';
        setName(e.target.value);
    };

    const handleChangeEmail=(e)=>{
        emailErrRef.current.textContent='';
        setEmail(e.target.value);
    };

    const handleFindID=async()=>{
        setFoundId('');
        setErrorMsg('');
        let V=true;
        const nameValid=name.trim();
        const emailValid=email.trim();
        // setName(nameRef.current?.value.trim()||'');
        // setEmail(emailRef.current?.value.trim()||'');
        
        if(!nameValid){
            nameErrRef.current.textContent='PLEASE CHECK YOUR NAME';
            V=false;
        }
        
        if(!emailValid){
            emailErrRef.current.textContent='PLEASE CHECK YOUR EMAIL';
            V=false;
        }

        if(!V){
            if(!nameValid)nameRef.current.focus();
            else if(!emailValid)emailRef.current.focus();
            return;
        }

        try{
            const res=await axios.get('/data/users.json');
            const userData=res.data.users;

            const targetUser=userData.find(
                user=>user.username===name&&user.email===email
            );

            if(targetUser){
                setFoundId(targetUser.userId);
                return;
            }else{
                setErrorMsg('CAN`T FIND USER, PLEASE CHECK YOUR INFO');
                return;
            }

        }catch(err){
            console.error('데이터 로딩 실패: ',err);
        }
    };


    return(
        <div className="account">
            <div className="account-inner">
                <h2>아이디 찾기</h2>
                <div className='input-name mb4'>
                    <input
                        type='text'
                        placeholder='이름을 입력해주세요.'
                        ref={nameRef}
                        value={name}
                        onChange={handleChangeName}
                    />
                    <div className='noti'ref={nameErrRef}></div>
                </div>
                <div className='input-email mb12'>
                    <input
                        type='text'
                        placeholder='이메일을 입력해주세요.'
                        ref={emailRef}
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <div className='noti'ref={emailErrRef}></div>
                </div>
                <div className="btn-submit">
                    <button onClick={handleFindID}>아이디 찾기</button>
                </div>
                <div className='find-btn'>
                    <p><Link to="/account/signin">로그인 바로가기</Link></p>
                    <p><Link to="/account/find-pw">비밀번호 찾기</Link></p>
                </div>
                <div className="result">
                    {foundId&&<p className="found">YOUR ID IS <span>{foundId}</span></p>}
                    {errorMsg&&<p className="error">{errorMsg}</p>}
                </div>
            </div>
        </div>
    )
};

export default FindId;