import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from "./Form";
import ShowDetails from "./ShowDetails";

function Home() {
    return (
        <Router>
            <div className="App">
                <ul className="App-header">
                    <li>
                        <Link to="/Form">Add Details</Link>
                    </li>
                    <li>
                        <Link to="/ShowDetails">Show Details</Link>
                    </li>
                </ul>
                <Routes>
                    <Route exact path='/Form' element={< Form />}></Route>
                    <Route exact path='/ShowDetails' element={< ShowDetails />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default Home;
