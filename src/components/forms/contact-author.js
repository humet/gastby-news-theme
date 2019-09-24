import React from "react";

function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

export default function ContactAuthor(props) {
  const [state, setState] = React.useState({})
  const [sent, setSent] = React.useState(false)

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
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
      .then(() => setSent(true))
      .catch((error) => alert(error))
  }
    if(!sent) {
    return (
      <form className="form"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        name="contactauthor"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contactauthor" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <input type="hidden" name="author-name" value={props.authorName} />
        <div className="form__row">
          <div className="form__field form__field--50">
            <label className="form__field__label" for="firstname">First Name:</label>
            <input className="form__field__input" type="text" name="firstname" id="firstname" onChange={handleChange} />
          </div>
          <div className="form__field form__field--50">
            <label className="form__field__label" for="lastname">Last Name:</label>
            <input className="form__field__input" type="text" name="lastname" id="lastname" onChange={handleChange} />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--50">
            <label className="form__field__label" for="email">Email:</label>
            <input className="form__field__input" type="email" name="email" id="email" onChange={handleChange} />
          </div>
          <div className="form__field form__field--50">
            <label className="form__field__label" for="phone">Phone (optional)</label>
            <input className="form__field__input" type="tel" name="phone" id="phone" onChange={handleChange} />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            <label className="form__field__label" for="message">Your Message:</label>
            <textarea className="form__field__input" name="message" id="message" rows="10" onChange={handleChange} />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            <button type="submit">Send</button>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <div className="form__row">
      <div className="form__message form__message--success">
        Thanks! We have received your message succesfully.
      </div>
      </div>
    )
  }
}