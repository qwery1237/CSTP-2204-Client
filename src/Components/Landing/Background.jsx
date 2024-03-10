import React from 'react'
import './Background.css'
import Smoke from './Smoke'
export default function Background() {
  return (
    <><Smoke/>
    <div id='background'>
        <div className="space stars1"></div>
        <div className="space stars2"></div>
        <div className="space stars3"></div>
        
    </div>
    </>
  )
}
