import React from 'react';
import developerPng from './images/developer-png.png';

const Contact = () => {
  return (
    <div className="contactUs-main-container">
      <div className="contactUs-left-para">
        <h3>Let's get in touch</h3>
        <i class="fa fa-envelope"></i>
        <a class="mail-links" href="mailto:singhsankalp997@gmail.com">
          singhsankalp997@gmail.com
        </a>

        <i class="fa fa-linkedin"></i>
        <a class="mail-links" href="https://www.linkedin.com/in/sankalpsingh03/">
          sankalpsingh03
        </a>

        <i class="fa fa-github"></i>
        <a class="mail-links" href="https://github.com/Sankalpcreat">
          Sankalpcreat
        </a>

        <i class="fa fa-twitter"></i>
        <a class="mail-links" href="https://x.com/3sankalpsingh">
          @3sankalpsingh
        </a>
      </div>
      <div className="contactUs-pic">
        <img src={developerPng} alt="Profile" />
      </div>
    </div>
  );
};

export default Contact;
