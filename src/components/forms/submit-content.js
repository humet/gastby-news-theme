import React from "react";
import { Link } from "gatsby"

function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

export default function SubmitContent() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleAttachment = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => alert('form sent'))
      .catch((error) => alert(error))
  }

    return (
      <form className="form"
        data-netlify="true"
        data-netlify-recaptcha="true"
        data-netlify-honeypot="bot-field"
        name="submitcontent"
        method="POST"
        action="/thank-you"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="submitcontent" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <div className="form__row">
          <div className="form__field form__field--50">
            <label className="form__field__label" htmlFor="firstname">First Name:</label>
            <input className="form__field__input" type="text" name="firstname" id="firstname" onChange={handleChange} />
          </div>
          <div className="form__field form__field--50">
            <label className="form__field__label" htmlFor="lastname">Last Name:</label>
            <input className="form__field__input" type="text" name="lastname" id="lastname" onChange={handleChange} />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--50">
            <label className="form__field__label" htmlFor="email">Email:</label>
            <input className="form__field__input" type="email" name="email" id="email" onChange={handleChange} />
          </div>
          <div className="form__field form__field--50">
            <label className="form__field__label" htmlFor="phone">Phone (optional)</label>
            <input className="form__field__input" type="tel" name="phone" id="phone" onChange={handleChange} />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            <label className="form__field__label" htmlFor="message">Tell us about your video:</label>
            <textarea className="form__field__input" name="message" id="message" rows="10" onChange={handleChange} />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--50">
            <label className="form__field__label" htmlFor="file">Upload your file <br></br>(MP4, MOV, AVI, M4V, WMV):</label>
            <input className="form__field__input" name="file" id="file" type="file" onChange={handleAttachment} />
          </div>
          <div className="form__field form__field--50">
            <label className="form__field__label" htmlFor="username">Please choose a platform and provide the username to be credited (FB, IG, YT or Twitter):</label>
            <input className="form__field__input" type="text" name="username" id="username" onChange={handleChange} />
            <small>Example: YT: YourUsernameHere</small>
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            <input className="form__field__input form__field__input--checkbox" type="checkbox" name="privacy-policy" id="privacy-policy" onChange={handleChange} />
            <label className="form__field__label" htmlFor="privacy-policy">I agree to the <Link to="/privacy-policy">Privacy Policy</Link></label>
          </div>
          <div className="form__field form__field--100">
            <input className="form__field__input form__field__input--checkbox" type="checkbox" name="terms-conditions" id="terms-conditions" onChange={handleChange} />
            <label className="form__field__label" htmlFor="terms-conditions">I agree to the terms and conditions shown below.</label>
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            <button type="submit">Send</button>
          </div>
        </div>
      </form>
    )
  }