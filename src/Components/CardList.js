import React, { Component } from 'react';
import Card from './Card';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      page: 1,
      url: 'https://api.themoviedb.org/3/discover/movie',
      filter: '',
      genres: [],
      searchQuery: '',
      selectedCategory: '',
     
    };
    this.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.filterList = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming']
  }

  componentDidMount() {
    this.fetchGenres();
    this.fetchData();
  }

  fetchGenres = async () => {
    const apiKey = 'b9da8a8928ade30c5680978edd9a4330';
    const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?include_adult=false&api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.setState({ genres: data.genres });
    } catch (error) {
      console.error(error);
    }
  };


  

  fetchData = async () => {
    const { url, filter, page, searchQuery, selectedCategory } = this.state;
    const apiKey = 'b9da8a8928ade30c5680978edd9a4330';
    let apiUrl = `${url}?include_adult=false&api_key=${apiKey}&language=en-US&page=${page}&with_genres=${filter}`;

    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${searchQuery}&api_key=b9da8a8928ade30c5680978edd9a4330&page=${page}`;
    } else if (selectedCategory) {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=b9da8a8928ade30c5680978edd9a4330&page=${page}&with_genres=${selectedCategory}`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=b9da8a8928ade30c5680978edd9a4330&page=${page}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.setState({ data: data.results });
    } catch (error) {
      console.error(error);
    }
  };
  
  changelist = (selectedCategory) => {
    this.setState(
      {
        selectedCategory,
        page: 1,
      },
      () => {
        this.fetchData();
      }
    );
  };


changeFilter(filter) {
    this.setState({ filter: filter, page: 1 }, () => {
      console.log(this.state.filter);
      this.setState({ url: `https://api.themoviedb.org/3/movie/${filter}?api_key=b9da8a8928ade30c5680978edd9a4330&language=en-US&page=`}, () => {
        console.log(this.state.url);
        this.fetchData();
      });
    });
  }
  
  changePage = (page) => {
    this.setState({ page }, () => {
      this.fetchData();
    });
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };



  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ page: 1 }, () => {
      this.fetchData();
    });
  };


  render() {
    const { data, genres , searchQuery, } = this.state;

    return (
      <main>
        <div className="filter ">
        <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder="Search movies"
              className='catList'
            />          
            <button onClick={this.handleSubmit} className='catList search'>Search</button>
         
          <select onChange={(e) => this.changelist(e.target.value)} className='catList'>
            <option value="">All Categories</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="filter">
        {this.filterList.map(filter => <div key={filter} onClick={()=> this.changeFilter(filter.toLowerCase().replace(' ', '_'))}>{filter}</div>)}
          </div>
        <div className="cards-grid">
          {data ? (
            data.map((card) => <Card key={card.id} data={card} />)
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <ul className="pages-list">
          {this.pages.map((page) => (
            <li
              className="page"
              key={page}
              onClick={() => this.changePage(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default CardList;
