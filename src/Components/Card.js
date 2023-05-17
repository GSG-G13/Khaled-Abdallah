import React from "react";

class Card extends React.Component {


    state = {
        display: false
    }

    toggleDisplay = () => {
        this.setState((prevState) => {
           return {
                display: !prevState.display
            };
        });
    };


    render() {
        return (
            <div className="card-full">
                <img src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`} />
                <div className="card-rating fa-solid fa-star">{this.props.data.vote_average}</div>
                <div className="img-discription"><div className="main-discription">
                    <h4 className="title">{this.props.data.original_title}</h4>
                    <div className="year">{this.props.data.release_date?.split('-')[0]}</div>
                </div>
                    <div className="group-icons">
                        <i className={this.state.display ? "fa-solid fa-angle-up" :"fa-solid fa-angle-down"} onClick={() => this.toggleDisplay()}>
                        </i>
                        <div className="lpt">
                            <i className="fa-regular fa-thumbs-up">
                            </i>
                            <i className="fa-solid fa-plus">
                            </i>
                            <i className="fa-solid fa-circle-play">
                            </i>
                        </div>
                    </div>
                    <div className="discription" style={{ display: this.state.display ? 'block' : 'none' }}>
                        {this.props.data.overview}
                    </div>
                </div>
            </div>
        )
    }
}

export default Card