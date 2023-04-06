import React, { useState, useEffect } from 'react';

const ShowDetails = () => {
    const [apiResponse, setApiResponse] = useState([]);
    const [wbsElement, setWbsElement] = useState('');

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        fetch("http://localhost:8080/api/timesheet")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setApiResponse(data)
            })
    };

    const handleSubmitButtonClick = () => {
        if(wbsElement){
            var newArray = apiResponse.filter(obj=> obj.wbsCode === wbsElement);
            setApiResponse(newArray);
            setWbsElement('');
        }
    };

    return (
        <div>
            {apiResponse.length > 0 && (
                <table border={1}>
                    <tr>
                        <td><b>ID</b></td>
                        <td><b>User Name</b></td>
                        <td><b>Email Id</b></td>
                        <td><b>WBS Code</b></td>
                        <td><b>Booking Date</b></td>
                        <td><b>Booked Efforts</b></td>
                    </tr>
                    {apiResponse.map(user => (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.userName}</td>
                            <td>{user.emailId}</td>
                            <td>{user.wbsCode}</td>
                            <td>{user.createdAt}</td>
                            <td>{user.bookedEfforts}</td>
                        </tr>
                    ))}
                </table>
            )}
            <div>
                <p>Filter by WBS Code</p>
                <input
                    type="text"
                    required
                    value={wbsElement}
                    onChange={(e) => setWbsElement(e.target.value)}
                />
                <button  type='submit' onClick={handleSubmitButtonClick} >SUBMIT</button>
            </div>
        </div>
    )
}

export default ShowDetails;