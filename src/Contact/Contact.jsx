import { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import style from "./ContactStyle.module.css";

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    emailjs
      .sendForm(
        'service_v75jp81',
        'template_u3xfbxg', 
        form.current,
        'D81LB5y7fAsO8rK1Q' 
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setIsSent(true);
          setIsLoading(false);
          form.current.reset();
          setTimeout(() => setIsSent(false), 3000);
        },
        (error) => {
          console.log('FAILED...', error.text);
          setError('Failed to send message. Please try again.');
          setIsLoading(false);
          setTimeout(() => setError(null), 3000);
        }
      );
  };

  return (
    <section id="Contact" className={style.container}>
      {/* Background Animation Elements */}
      <div className={style.backgroundAnimation}>
        <div className={`${style.orb} ${style.orb1}`}></div>
        <div className={`${style.orb} ${style.orb2}`}></div>
        <div className={`${style.orb} ${style.orb3}`}></div>
      </div>

      <h1 className={`${style.title} ${isVisible ? style.titleVisible : ''}`}>
        Get In Touch
      </h1>
      <div className={`${style.titleUnderline} ${isVisible ? style.underlineVisible : ''}`}></div>

      <form 
        ref={form} 
        onSubmit={sendEmail}
        className={`${style.contactForm} ${isVisible ? style.formVisible : ''}`}
      >
        <div className={style.formGroup}>
          <label htmlFor="from_name" hidden>Name</label>
          <input
            type="text"
            name="from_name"
            id="from_name"
            placeholder='Your Name'
            required
            className={style.formInput}
          />
          <div className={style.inputUnderline}></div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="user_email" hidden>Email</label>
          <input
            type="email"
            name="email_id"
            id="email_id"
            placeholder='Your Email'
            required
            className={style.formInput}
          />
          <div className={style.inputUnderline}></div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="message" hidden>Message</label>
          <textarea
            name="message"
            id="message"
            placeholder='Your Message'
            required
            className={style.formTextarea}
            rows="5"
          ></textarea>
          <div className={style.textareaUnderline}></div>
        </div>

        <button
          type="submit"
          className={`${style.submitBtn} ${isLoading ? style.loading : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={style.spinner}></span>
          ) : (
            <span>Send Message</span>
          )}
          <svg className={style.sendIcon} viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {isSent && (
          <div className={`${style.statusMessage} ${style.success}`}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Message sent successfully!
          </div>
        )}
        {error && (
          <div className={`${style.statusMessage} ${style.error}`}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {error}
          </div>
        )}
      </form>
    </section>
  );
};

export default Contact;