import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <>
    <div className="footer">
        <div className="sb__footer section__padding">
            <div className="sb__footer-links">
                <div className="sb__footer-links_div">
                    <h4>For Business</h4>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                </div>
                <div className="sb__footer-links_div">
                    <h4>resources</h4>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                </div>
                <div className="sb__footer-links_div">
                <h4>resources</h4>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                </div>
                <div className="sb__footer-links_div">
                <h4>resources</h4>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                    <a href="/">
                        <p>Employer</p>
                    </a>
                </div>
                <div className="sb__footer-links-div">
                    <h4>coming soon</h4>
                    <div className="socialmedia">
                        <p><img src="/" alt="" /></p>
                        <p><img src="/" alt="" /></p>
                        <p><img src="/" alt="" /></p>
                        <p><img src="/" alt="" /></p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="sb__footer-below">
                <div className="sb__footer-copyright">
                    <p>
                        @{new Date().getFullYear()} Estate. All right reserved.
                    </p>
                </div>
                <div className="sb__footer-below-links">
                    <a href="/"><div><p>Terms & Conditions</p></div></a>
                    <a href="/"><div><p>Privacy</p></div></a>
                    <a href="/"><div><p>Security</p></div></a>
                    <a href="/"><div><p>Cookie Declaration</p></div></a>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
