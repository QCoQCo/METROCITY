import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './account.css';

const Signup = () => {
    const navigate=useNavigate();
    
    const[username,setUsername]=useState('');
    const[nickname,setNickname]=useState('');
    const[userId,setUserId]=useState('');
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
    const[address,setAddress]=useState('');
    const[phone,setPhone]=useState('');

    const nameRef=useRef();
    const nameErrRef=useRef();
    const nicknameRef=useRef();
    const nicknameErrRef=useRef();
    const idRef=useRef();
    const idErrRef=useRef();
    const pwRef=useRef();
    const pwErrRef=useRef();
    const emailRef=useRef();
    const emailErrRef=useRef();

    const handleChangeName=(e)=>{
        nameErrRef.current.textContent='';
        setUsername(e.target.value);
    };
    const handleChangeNickname=(e)=>{
        nicknameErrRef.current.textContent='';
        setNickname(e.target.value);
    };
    const handleChangeId=(e)=>{
        idErrRef.current.textContent='';
        setUserId(e.target.value);
    };
    const handleChangePw=(e)=>{
        pwErrRef.current.textContent='';
        setPassword(e.target.value);
    };
    const handleChangeEmail=(e)=>{
        emailErrRef.current.textContent='';
        setEmail(e.target.value);
    };
    const handleChangeAddress=e=>setAddress(e.target.value);
    const handleChangePhone=e=>setPhone(e.target.value);

    const handleSignUp=async()=>{
        let V=true;
        const nameValid=username.trim();
        const nickValid=nickname.trim();
        const idValid=userId.trim();
        const pwValid=password.trim();
        const emailValid=email.trim();
        
        if(!nameValid){
            nameErrRef.current.textContent='PLEASE CHECK YOUR NAME';
            V=false;
        }
        if(!nickValid){
            nicknameErrRef.current.textContent='PLEASE CHECK YOUR NICKNAME';
            V=false;
        }
        if(!idValid){
            idErrRef.current.textContent='PLEASE CHECK YOUR ID';
            V=false;
        }
        if(!pwValid){
            pwErrRef.current.textContent='PLEASE CHECK YOUR PW';
            V=false;
        }
        if(!emailValid){
            emailErrRef.current.textContent='PLEASE CHECK YOUR EMAIL';
            V=false;
        }

        if(!V){
            if(!nameValid)nameRef.current.focus();
            else if(!nickValid)nicknameRef.current.focus();
            else if(!idValid)idRef.current.focus();
            else if(!pwValid)pwRef.current.focus();
            else if(!emailValid)emailRef.current.focus();
            return;
        }
        /*

        try {
            const res=await axios.post('/api/signup',{
                username,
                nickname,
                userId,
                password,
                email,
                address,
                phone
            });
            
            if(res.status===200){

            }
            
        */
        //테스트용 프론트작업
        try{
            const userData={
                id:new Date().getTime(),
                username,
                nickname,
                userId,
                password,
                email,
                address,
                phone
            };

            const storedUsers=sessionStorage.getItem('users');
            let users=[];
            if(storedUsers){
                try {
                    const parsed=JSON.parse(storedUsers);
                    users=Array.isArray(parsed)?parsed:[];
                } catch (err) {
                    console.error('세션 데이터 파싱 실패',err);
                    users=[];
                }
            }
            users.push(userData);
            sessionStorage.setItem('users',JSON.stringify(users));
            navigate('/account/signup-complete');
        }catch(err){
            console.error('회원가입 실패',err);
        }
    };

    return (
        <div className="account">
            <div className="account-inner">
                <h2>회원가입</h2>
                <div className="comment mb4">*는 필수 입력 사항입니다.</div>
                <div className="input-name mb4">
                    <input
                        type="text"
                        placeholder="* 이름을 입력해주세요"
                        value={username}
                        ref={nameRef}
                        onChange={handleChangeName}
                    />
                    <div className="noti"ref={nameErrRef}></div>
                </div>
                <div className="input-nickname mb4">
                    <input
                        type="text"
                        placeholder="* 닉네임을 입력해주세요"
                        value={nickname}
                        ref={nicknameRef}
                        onChange={handleChangeNickname}
                    />
                    <div className="noti"ref={nicknameErrRef}></div>
                </div>
                <div className="input-id mb4">
                    <input
                        type="text"
                        placeholder="* 아이디를 입력해주세요"
                        value={userId}
                        ref={idRef}
                        onChange={handleChangeId}
                    />
                    <div className="noti"ref={idErrRef}></div>
                </div>
                <div className="input-pw mb4">
                    <input
                        type="text"
                        placeholder="* 비밀번호를 입력해주세요"
                        value={password}
                        ref={pwRef}
                        onChange={handleChangePw}
                    />
                    <div className="noti"ref={pwErrRef}></div>
                </div>
                <div className="input-email mb4">
                    <input
                        type="text"
                        placeholder="* 이메일을 입력해주세요"
                        value={email}
                        ref={emailRef}
                        onChange={handleChangeEmail}
                    />
                    <div className="noti"ref={emailErrRef}></div>
                </div>
                <div className="input-address mb4">
                    <input
                        type="text"
                        placeholder="주소를 입력해주세요"
                        value={address}
                        onChange={handleChangeAddress}
                    />
                </div>
                <div className="input-phone mb4">
                    <input
                        type="text"
                        placeholder="전화번호를 입력해주세요"
                        value={phone}
                        onChange={handleChangePhone}
                    />
                </div>
                <div className="btn-submit">
                    <button onClick={handleSignUp}>회원가입</button>
                </div>
            </div>
        </div>
    )
};

export default Signup;