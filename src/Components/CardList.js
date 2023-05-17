import React from 'react';
import Card from './Card';

class CardList extends React.Component {
  state = {
    data: null,
    page: 1
  };

  pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=b9da8a8928ade30c5680978edd9a4330&page=${this.state.page}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ data: data.results });
      });
  }

  changePage = (page) => {
    this.setState({ page }, () => {
      this.fetchData();
    });
  };

  render() {
    const { data } = this.state;

    return (
      !data ? <div>Loading...</div> :
        <main>
          <div className="cards-grid">
            {data.map(card => <Card key={card.id} data={card} />)}
          </div>
          <ul className="pages-list">
            {this.pages.map(page => (
              <li className='page' key={page} onClick={() => this.changePage(page)}>{page}</li>
            ))}
          </ul>
        </main>
    );
  }
}

export default CardList;
