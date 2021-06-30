import React from 'react'
// components
import Issues from './Issues';
import Details from "./Details"
import Welcome from "./Welcome"
export default function index() {
    return (
        <div className="bg-pink-light">
            <Welcome/>
            <Details/>
            <Issues/>
        </div>
    )
}
