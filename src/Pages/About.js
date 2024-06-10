// src/components/About.js
import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About One Store</h1>
                <p>Your one-stop shop for all your needs.</p>
            </div>
            <div className="about-content">
                <p>
                    Welcome to One Store, your number one source for all things electronics, fashion, home goods. We're dedicated to giving you the very best of fashion, with a focus on quality, customer service, and uniqueness.
                </p>
                <p>
                    Founded in 2024 by Jagmeet Singh, One Store has come a long way from its beginnings in Mohali. When Jagmeet Singh first started out, his passion for  "eco-friendly cleaning products" drove them to quit their day job, do tons of research and gave them the impetus to turn hard work and inspiration into a booming online store. We now serve customers all over India, and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the fashion, baked goods, watches industry.
                </p>
                <p>
                    We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                </p>
                <p>
                    Sincerely,<br />
                    Jagmeet Singh, Founder
                </p>
            </div>
        </div>
    );
}

export default About;
