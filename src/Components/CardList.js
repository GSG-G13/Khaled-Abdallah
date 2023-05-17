import React from 'react';
import Card from './Card';

class CardList extends React.Component {
  state = {
    data: null,
    page: 1,
    url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=b9da8a8928ade30c5680978edd9a4330&page=`,
    filter: ''
  };
now_playing
  pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  filterList = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming']
  
  componentDidMount() {
    this.fetchData();
  }

  changeFilter(filter){
    this.setState({ filter: filter }, ()=> {
      console.log(this.state.filter);
      this.setState({ url : `https://api.themoviedb.org/3/movie/${this.state.filter}?api_key=b9da8a8928ade30c5680978edd9a4330&language=en-US&page=`}, ()=> {
        console.log(this.filterUrl);
        console.log(this.state.url);
        this.fetchData()
      })
      
    })
  }

  fetchData() {
    fetch(this.state.url+this.state.page)
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
          <div className="filter">
            {this.filterList.map(filter => <div key={filter} onClick={()=> this.changeFilter(filter.toLowerCase().replace(' ', '_'))}>{filter}</div>)}
          </div>

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
