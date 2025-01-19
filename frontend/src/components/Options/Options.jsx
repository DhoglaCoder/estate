import React from 'react'
import './Options.css'
import { edge_list,carousel1_list,home_list } from '../../assets/asset'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Options() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:true
  };
  return (
    <>
    <div className="help">
        <div className="edge">
            <div>
            <h2 className="section-title">Housing Edge</h2>
            <p className="sub-title">Explore property related services</p>
            </div>
            <div className="explore">
                <button className='link' href="/">Explore Services &gt;</button>
                {/* <i class="fa-solid fa-chevron-right"></i>use font awesome */}
            </div>
        </div>
        <div className="card1-list">
          {edge_list.map((item,index)=>{
            return(
              <div key={index} className="outer-1">
                <div className="outer">
                <img src={item.img_id} alt="" className="image" />
                <p className="firstLine">{item.name}</p>
                <p className="secondLine">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="edge">
            <div>
            <h2 className="section-title">Projects by trusted developers</h2>
            <p className="sub-title">Exclusive showcase of top projects</p>
            </div>
        </div>
        <div className="carouselList1">
        <Slider {...settings}>
        {carousel1_list.map((item,index)=>{
            return(
                <div key={index} className="element">
                    <div className="card">
                        <div className="image1">
                            <img src={item.img_id} alt="" className='img-tag' />
                        </div>
                        <div className="info">
                            <div className="info1">
                                <a href="/" className='link1'></a>
                                <div>{item.name}</div>
                            </div>
                            <div className="first">{item.builder}</div>
                            <div className="second">{item.title}</div>
                            <div className="third">{item.address}</div>
                            <div className="fourth">
                                <span className="price">₹ </span>{/*rupee icon will come*/}
                                {item.cost}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
        </Slider>
        </div>
        <div className="edge">
            <div>
            <h2 className="section-title">Research and Insights </h2>
            <p className="sub-title">Explore useful real estate insights</p>
            </div>
        </div>
        <div className="research">
                <div className="card2_list">
                    {home_list.map((item,index)=>{
                        return(
                            <span className="card2" key={index}>
                                <img src={item.img_id} alt="" className='card2_img' />
                                <p className="card2-first">{item.name}
                                    <span className="card2-first-span">&gt;</span>{/* add font icon here arrow will come*/}
                                </p>
                                <p className="card2-second">{item.desc}</p>
                            </span>
                        )
                    })}
                </div>
        </div>
        <div className="edge">
            <div>
            <h2 className="section-title">Have a property to sell? </h2>
            </div>
        </div>
        <div className="sell">
          <a href="/" className='sell-a'>
            <div className="sell1">
              <div className="sell2">
                <span className='sell3'>List your property & connect with clients faster!</span>
                <div className="sell4">
                  <span className="sell5">Sell your property</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
