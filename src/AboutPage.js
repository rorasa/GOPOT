import React, { Component } from 'react';

import NavigationBar from './Navbar';

class AboutPage extends Component{
    render(){
        return(
            <div>
                <NavigationBar/>

                <h2><strong>G</strong>lobally-identified<br/>
                <strong>O</strong>ptimal <strong>P</strong>olicies for <strong>O</strong>peration of <strong>T</strong>rades</h2>

                <p>
                    This platform is built as a part of a Hackathon in 2019 by 
                </p>

                <p>
                    <strong>G</strong>er - Napawit Toomwong
                </p>
                <p>
                    <strong>O</strong>h - Thanaporn Sumpaotong
                </p>
                <p>
                    <strong>P</strong>alm - Pruttipong Apivatanagul
                </p>
                <p>
                    <strong>O</strong>n - Onnapat Kirdratanasak
                </p>
                <p>
                    <strong>T</strong>on - Wattanit Hotrakool
                </p>
            </div>
        );
    }
}

export default AboutPage;