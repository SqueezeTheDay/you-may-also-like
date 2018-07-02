import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedItemList from './components/RelatedItemList';

class YouMayAlsoLike extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      relateditems: []
    };
    this.getRelatedItems = this.getRelatedItems.bind(this);
  }

  componentDidMount () {
    let id = window.location.href.match(/localhost:\d{4}\/(\d+)/) ? window.location.href.match(/localhost:\d{4}\/(\d+)/)[1] : 0;

    if (!id) {
      id = 1;
    }

    this.getRelatedItems(id);
  }

  getRelatedItems (id) {
    axios.get(`/youMayAlsoLike/${id}`)
      .then((response) => {
        const unwrapped = response.data.map(item => item.info);
        this.setState({
          relateditems: unwrapped
        });
      })
      .catch((error) => {
        console.log('your get has an error', error);
      });
  }

  render () {
    return (
      <div>
        <div className="related-wrapper">
          <div>
            <h1 className="you-may-header">You may also like</h1>
          </div>
          <RelatedItemList items={this.state.relateditems} handleReq={this.getRelatedItems} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<YouMayAlsoLike />, document.getElementById('you-may-also-like'));
