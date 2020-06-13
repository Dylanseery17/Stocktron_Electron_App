import React from 'react';
import Card from './components/Card'
import Chart from './components/Chart.js'
import News from './components/News.js'
import Slider from "react-slick";
import './App.css';

function App() {
  const localstonks = localStorage.getItem('Stonks');
  const [newstonk, setNewstonk] = React.useState(false);
  const [stonks, setStonks] = React.useState(JSON.parse(localstonks));
  const [stonk, setStonk] = React.useState({
    name: "",
    buys: "",
    price: ""
  });
  const {name , buys, price} = stonk;

  const onChange = e => setStonk({ ...stonk, [e.target.name]: e.target.value });

  const onSubmit = async e =>{
    e.preventDefault();
    
    fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${name}&token=brh2thvrh5r9t6gjh5og`,{
          method: "GET"
      })
      .then(response => response.json())
      .then(data => { 
          data.stock = buys;
          data.price = price;
          const storageinit = {
            "results" : [
              data
            ]
          }
          if(localstonks === null){
            localStorage.setItem('Stonks', JSON.stringify(storageinit));
          }else{
            const results = stonks.results;
            results.push(data);
            localStorage.setItem('Stonks',  JSON.stringify({
              results
            }));
          }
          setStonk({
            name: "",
            buys: "",
            price: ""
          });
          window.location.reload();
      });
  }

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  const remove = () => {
    localStorage.removeItem('Stonks');
    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header" style={{minHeight:'100vh'}}>
        <div className="clearfix" style={{backgroundColor: '#dfe6e9', maxHeight: '45px'}}>
          <div className="container" style={{marginTop: '5px'}}>
            <div className="float-left" style={{marginTop: '7.5px'}}>
              <p>Manage your stock portfolio</p>
            </div>
            <div className="float-right">
              <button className="button button-clear">$</button>
              <button className="button button-clear">£</button>
              <button className="button button-clear">&euro;</button>
            </div>
          </div>

        </div>

        <div className="container" style={{marginTop:'5px'}}>
        <div className="clearfix">
          <div className="float-left" style={{marginLeft:'-190px'}}>
            <h1>Stonktron</h1>
          </div>
          <div className="float-right">
            {newstonk ? 
              <button style={{marginTop: '15px'}} className="button button-outline" onClick={e=> {setNewstonk(!newstonk)}}>View Stonks <i class="fa fa-backward" aria-hidden="true"></i></button>
            :
              <button style={{marginTop: '15px'}} className="button button-outline" onClick={e=> {setNewstonk(!newstonk)}}>Add new Stonk <i className="fa fa-plus-circle" aria-hidden="true"></i></button>
            }
            <button style={{marginTop: '15px'}} className="button button-outline" onClick={e=> {remove()}}>Delete all Stonks <i className="fa fa-trash" aria-hidden="true"></i></button>
          </div>
        </div>
        {newstonk ? 
            <div className="row">
              <div className="column">
              <form onSubmit={e => onSubmit(e)}>
                  <fieldset>
                    <label>Name</label>
                    <input type="text" placeholder="Companys ticket : TSLA, AAPL, AMZN..." name="name" value={name} onChange={e=>onChange(e)} />
                    <label>Stock Buys</label>
                    <input type="number" placeholder="How many stocks did you buy ? 0.5, 5, 10.32"name="buys" value={buys} onChange={e=>onChange(e)} />
                    <label>Buy Price $</label>
                    <input type="number" placeholder="What price did you buy the stock at ? $60.50 $0.50 $990.33" name="price" value={price} onChange={e=>onChange(e)}/>
                    <input className="button-primary" type="submit" value="Add"/>
                  </fieldset>
                </form>
              </div>
            </div>
            :
            <div>
              {stonks && stonks.results.lenght !== 0 ?
                <Slider {...settings}>
                  {stonks.results.map((stonk, index) => {
                    return(
                      <Card stock={stonk} key={index}/>
                    )
                  })}
                </Slider>
              :
                <div style={{width: '100%', textAlign: 'center'}}>
                  <img src="https://i.giphy.com/media/YOqgY2wQazNKleTJ5D/giphy.webp" width="380" height="224"/>
                  <h4>Looks Empty here</h4>
                </div>
              }
            </div>
        }
        <div className="row">
          <div className="column"><Chart/></div>
        </div>
        <div className="row">
          <div className="column"><News/></div>
        </div>
        </div>
      </header>
      
    </div>
  );
}

export default App;
