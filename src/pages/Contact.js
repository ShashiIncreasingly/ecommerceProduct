import React from "react";
import { useState } from "react";
import styles from '../App.css';

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)

    function encode(data) {
      return Object.keys(data).map((key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      ).join("&");
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      setSuccess(false)
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
            "form-name": "contact",
            name, email, message
        }),
      })
      .then(() => {
            setSuccess(true)
            setName('')
            setEmail('')
            setMessage('')
      })
      .catch((error) => alert(error));
      };
    return (
      <div className="contact_block">
          <h1>Contact Me</h1>
          <div className="contact_wrap">
            <div className="mob"><span>Mobile No :</span> <span>8892880637</span></div>
            <div className="email"><span>Email : </span><span>shashi1525@gmail.com</span></div>
            <div className="linkedin"><span>LinkedIn :</span> <span><a href={'https://www.linkedin.com/in/shashbhushan/'} target='_blank' rel="noreferrer">shashbhushan/</a></span></div>
            <div className="github"><span>GitHub : </span><span><a href='https://github.com/Shashi1525' target='_blank' rel="noreferrer">Shashi1525</a></span></div>
          </div>
          <div className="contact_chat">
            <div className='contactHeaderBox'>
                <h1 className='contactHeader' id="contact">Services</h1>
            </div>
            <section className='contact'>
                <div className='contactMain'>
                    <div className='contactLeft'>
                        <h2>Let's build your brand.</h2>
                        <p>My goal is to work with you to create a cohesive brand image that accurately reflects your business's values, personality, and offerings.
                        Whether you're looking to showcase your products, capture the essence of your services, or simply tell your brand's story through imagery, I'm 
                        here to help bring your vision to life.</p>
                    </div>
                    <form onSubmit={handleSubmit} className='contactRight'>
                        <input type="hidden" name="form-name" value="contact" />
                        <input className='contactInputNameEmail' type="text" placeholder="Name*" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
                        <input className='contactInputNameEmail' type="text" placeholder="Email*" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <textarea className='contactInputMessage' type="text" placeholder="Message*" name="message" rows="8"
                            required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <div className='sendMessageButtonBox'>
                                <button type='submit' className='contactButtons'>Send Message</button>
                                <div>
                                    <div className='messageSuccessMsgBox'>{success && "message sent"}</div>
                                </div>
                            </div>
                    </form>
                </div>
            </section>
          </div>
      </div>
    );
  };
  
  export default Contact;