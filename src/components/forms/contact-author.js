import React from "react";

export default class ContactAuthorForm extends React.Component {
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
        action="https://formspree.io/xklgazpm"
        method="POST"
      >
        <input type="hidden" name="author-name" value={this.props.authorName} />
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
            <label className="form__field__label" for="message">Your Message:</label>
            <textarea className="form__field__input" name="message" id="message" rows="10" />
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