import { useState,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FindPw=()=>{
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[id,setId]=useState('');
    const[foundPw,setFoundPw]=useState('');
    const[errorMsg,setErrorMsg]=useState('');

    const idRef=useRef();
    const idErrRef=useRef();
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

    const handleChangeId=(e)=>{
        idErrRef.current.textContent='';
        setId(e.target.value);
    };

    const handleFindPW=async()=>{
        setFoundPw('');
        setErrorMsg('');
        let V=true;
        const nameValid=name.trim();
        const emailValid=email.trim();
        const idValid=id.trim();

        if(!nameValid){
            nameErrRef.current.textContent='PLEASE CHECK YOUR NAME';
            V=false;
        }
        
        if(!emailValid){
            emailErrRef.current.textContent='PLEASE CHECK YOUR EMAIL';
            V=false;
        }
        
        if(!idValid){
            idErrRef.current.textContent='PLEASE CHECK YOUR ID';
            V=false;
        }

        if(!V){
            if(!nameValid)nameRef.current.focus();
            else if(!emailValid)emailRef.current.focus();
            else if(!idValid)idRef.current.focus();
            return;
        }

        try {
            const res=await axios.get('/data/users.json');
            const userData=res.data.users;

            const targetUser=userData.find(
                user=>user.username===name&&user.email===email&&user.userId===id
            );

            if(targetUser){
                setFoundPw(targetUser.password);
                return;
            }else{
                setErrorMsg('CAN`T FIND USER, PLEASE CHECK YOUR INFO');
                return;
            }

        } catch (err) {
            console.error('데이터 로딩 실패',err);
        }

    };

    return(
        <div className="account">
            <div className="account-inner">
                <h2>비밀번호 찾기</h2>
                <div className='input-name mb4'>
                    <input
                        type='text'
                        placeholder='이름을 입력해주세요.'
                        value={name}
                        onChange={handleChangeName}
                    />
                    <div className='noti'ref={nameErrRef}></div>
                </div>
                <div className='input-email mb4'>
                    <input
                        type='text'
                        placeholder='이메일을 입력해주세요.'
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <div className='noti'ref={emailErrRef}></div>
                </div>
                <div className='input-id mb12'>
                    <input
                        type='text'
                        placeholder='아이디를 입력해주세요.'
                        value={id}
                        onChange={handleChangeId}
                    />
                    <div className='noti'ref={idErrRef}></div>
                </div>
                <div className="btn-submit">
                    <button onClick={handleFindPW}>비밀번호 찾기</button>
                </div>
                <div className='find-btn'>
                    <p><Link to="/account/signin">로그인 바로가기</Link></p>
                    <p><Link to="/account/find-id">아이디 찾기</Link></p>
                </div>
                <div className="result">
                    {foundPw&&<p className="found">YOUR PASSWORD IS <span>{foundPw}</span></p>}
                    {errorMsg&&<p className="error">{errorMsg}</p>}
                </div>
            </div>
        </div>
    )
};

export default FindPw;