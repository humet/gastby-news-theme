import React from "react";
import { Link } from "gatsby"

export default class SubmitContent extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (
      <form className="form"
        onSubmit={this.submitForm}
        action="https://formspree.io/xwdpdbnm"
        method="POST"
        enctype="multipart/form-data"
      >
        <div className="form__row">
          <div className="form__field form__field--50">
            <label className="form__field__label" for="firstname">First Name:</label>
            <input className="form__field__input" type="text" name="firstname" id="firstname" />
          </div>
          <div className="form__field form__field--50">
            <label className="form__field__label" for="lastname">Last Name:</label>
            <input className="form__field__input" type="text" name="lastname" id="lastname" />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--50">
            <label className="form__field__label" for="email">Email:</label>
            <input className="form__field__input" type="email" name="email" id="email" />
          </div>
          <div className="form__field form__field--50">
            <label className="form__field__label" for="phone">Phone (optional)</label>
            <input className="form__field__input" type="tel" name="phone" id="phone" />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            <label className="form__field__label" for="message">Tell us about your video:</label>
            <textarea className="form__field__input" name="message" id="message" rows="10" />
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--50">
            <label className="form__field__label" for="file">Upload your file <br></br>(MP4, MOV, AVI, M4V, WMV):</label>
            <input className="form__field__input" name="file" id="file" type="file" accept="video/*" />
          </div>
          <div className="form__field form__field--50">
            <label className="form__field__label" for="username">Please choose a platform and provide the username to be credited (FB, IG, YT or Twitter):</label>
            <input className="form__field__input" type="text" name="username" id="username" />
            <small>Example: YT: YourUsernameHere</small>
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            <input className="form__field__input form__field__input--checkbox" type="checkbox" name="privacy-policy" id="privacy-policy" />
            <label className="form__field__label" for="privacy-policy">I agree to the <Link to="/privacy-policy">Privacy Policy</Link></label>
          </div>
          <div className="form__field form__field--100">
            <input className="form__field__input form__field__input--checkbox" type="checkbox" name="terms-conditions" id="terms-conditions" />
            <label className="form__field__label" for="terms-conditions">I agree to the terms and conditions shown below.</label>
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            {status === "SUCCESS" ? <div className="form__message form__message--success">Thanks! We have received your message.</div> : <button>Submit</button>}
          </div>
        </div>
        <div className="form__row">
          <div className="form__field form__field--100">
            {status === "ERROR" && <div className="form__message form__message--error">Ooops! There was an error.</div>}
          </div>
        </div>
      </form>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}