import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@mui/material'
import './hero.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
const Hero = ({recommends}) => {


    // const navigate = useNavigate();
    // function reviews(movieId){
    //     navigate(`/Reviews/${movieId}`)
    // }
  return (
    <div className='carousel-container'>
        <Carousel>
            {
                recommends?.map((item)=>{ 
                    return(
                        <Paper key={item._id}>
                            <div className="item-card-container">
                                <div className="item-card" style={{"--img": `url(${item.poster})`}}> 
                                    {/* <h1>ssssa</h1> */}
                                    <div className="item-details">
                                        <div className="item-poster">
                                            <img src={item.image[0]} alt=""/>
                                        </div>
                                        <div className="item-title">
                                            <h4>{item.name}</h4>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                } )
            }
        </Carousel>

    </div>
  )
}

export default Hero;
