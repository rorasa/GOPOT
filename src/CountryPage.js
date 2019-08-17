import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

import NavigationBar from './Navbar';
import country_list from './country_list';

class CountryPage extends Component{
    constructor(props){
        super(props);


    }

    

    render(){
        if(typeof(this.props.cookies.get('auth_username'))=="undefined"){
            window.location="/login"
        }else{
            let enabled_country = country_list.filter((country)=>{
                return country.enable==true
            });

            return(
                <div>
                    <NavigationBar/>

                    {enabled_country.map((country, i) => (
                        <div>
                            <a href={"/dashboard/"+country.code.toLowerCase()+"/"}>{country.name}</a>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default withCookies(CountryPage);