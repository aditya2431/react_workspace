import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Logo from "../assets/Logo.JPG";

const Form = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [wbsCode, setWbsCode] = useState('');
    const [date, setDate] = useState('');
    const [efforts, setEfforts] = useState('');
    const [avatarImageSrc, setAvatarImageSrc] = useState('');
    const [image, setImage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [apiResponse, setApiResponse] = useState({});
    // const handleAvatarChange = (e) => {
    //     setImage(e.target.files[0])
    //     setAvatarImageSrc(URL.createObjectURL(e.target.files[0]))
    // }
    const handleSubmitButtonClick = () => {
        if (avatarImageSrc === '') {
            toast.dismiss()
            toast.error("Please select an image.")
        }
    }
    const handleFormSubmit = (event) => {
        event.preventDefault()
        setIsProcessing(true)
        toast.success("Submitting details....")
        // const storageRef = ref(storage, `${email}/${image.name}`)
        // const uploadTask = uploadBytesResumable(storageRef, image)
        // uploadTask.on('state_changed', (snapshot) => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        // }, () => {
        //     toast.error("Error Occurred While Submitting Details.")
        //     setIsProcessing(false)
        // }, () => {
        //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //         addDetails(downloadURL)
        //     })
        // })
        addDetails();
        setIsProcessing(false)
    }
    const addDetails = async () => {
        // await addDoc(collection(db, "registration-form-details"), {
        //     name, email, password, phoneNo, profileImage: profileImage_url
        // });
        const request = {
            userName: userName,
            emailId: email,
            wbsCode: wbsCode,
            createdAt: date,
            bookedEfforts: efforts
        };
        axios.post('http://localhost:8080/api/timesheet', request)
        .then(response => setApiResponse(response.data));
        setIsProcessing(false);
        toast.dismiss();
        if(apiResponse){
            toast.success("Details submitted successfully.");
        }
        setUserName('');
        setEmail('');
        setWbsCode('');
        setDate('');
        setEfforts('');
        setAvatarImageSrc('');
    }
    return (
        <form className='form-wrapper' onSubmit={handleFormSubmit} >
            <div className='form-header' >
                {/* <div className='form-header-image-container' >
                    {
                        avatarImageSrc ?
                            <img src={avatarImageSrc} alt="" />
                            :
                            <img src={profileIcon} alt="" />
                    }
                    <div className='image-input-container' >
                        <label htmlFor="inputTag">
                            <BsFillCameraFill />
                            <input id="inputTag" required onChange={handleAvatarChange} type="file" />
                            <span id="image-input-span"></span>
                        </label>
                    </div>
                </div> */}
                <div className='form-header-image-container' >
                    <img src={Logo} alt="" />
                </div>
            </div>
            <div className='form-body-container' >
                <div className='input-field-container' >
                    <p>User NAME</p>
                    <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className='input-field-container' >
                    <p>EMAIL</p>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input-field-container' >
                    <p>WBS Code</p>
                    <input
                        type="text"
                        required
                        value={wbsCode}
                        onChange={(e) => setWbsCode(e.target.value)}
                    />
                </div>
                <div className='input-field-container' >
                    <p>Date</p>
                    <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className='input-field-container' >
                    <p>Efforts</p>
                    <input
                        type="text"
                        required
                        value={efforts}
                        onChange={(e) => setEfforts(e.target.value)}
                    />
                </div>
                <div className='submit-button-container' >
                    <button disabled={isProcessing} type='submit' onClick={handleSubmitButtonClick} >SUBMIT</button>
                </div>
            </div>
            <Toaster />
        </form>
    )
}

export default Form