import React from "react"
import { Link } from "react-router-dom"
import "../App.css"

const About = () => {
    return (
        <div className="about">
            <p>Welcome to the About Page</p>
            <Link className ="App-link" to= "/">Link to Home</Link>
        </div>
    )
}

export default About