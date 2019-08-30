import React from "react"

class GetPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      content: ''
    };
  }

  componentDidMount() {
    fetch("https://www.iubenda.com/api/privacy-policy/" + this.props.id)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          content: result.content
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, content } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div dangerouslySetInnerHTML={{__html: content}} />
      );
    }
  }
}

export default GetPolicy