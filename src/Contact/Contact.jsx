import emailjs from 'emailjs-com';
import { useRef, useState } from 'react';
import style from "./ContactStyle.module.css";

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

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
          form.current.reset(); // Reset the form after successful submission
        },
        (error) => {
          console.log('FAILED...', error.text);
          setError('Failed to send message. Please try again.');
          setIsLoading(false);
        }
      );
  };

  return (
    <section id="Contact" className={style.container}>
      <h1 className='sectionTitle'>Contact</h1>
      <form ref={form} onSubmit={sendEmail}>
        <div>
          <div className='formGroup'>
            <label htmlFor="from_name" hidden>Name</label>
            <input
              type="text"
              name="from_name"
              id="from_name"
              placeholder='Name'
              required
            />
          </div>
        </div>
        <div>
          <div className='formGroup'>
            <label htmlFor="user_email" hidden>Email</label>
            <input
              type="email"
              name="email_id"
              id="email_id"
              placeholder='Email'
              required
            />
          </div>
        </div>
        <div>
          <div className='formGroup'>
            <label htmlFor="message" hidden>Message</label>
            <textarea
              name="message"
              id="message"
              placeholder='Message'
              required
            ></textarea>
          </div>
        </div>

        <input
          type="submit"
          className="hover btn"
          value={isLoading ? 'Sending...' : 'Send'}
          disabled={isLoading}
        />

        {isSent && <p style={{ color: 'green' }}>Message sent successfully!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
};

export default Contact;