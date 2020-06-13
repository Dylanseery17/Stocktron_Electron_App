import React from 'react'
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then(response => response.json());

function difference(data , price){
    const change = ((data.c-price)/price * 100).toFixed(2);
    const difference = (data.c-price).toFixed(2);
    const gain = difference > 0 ? true : false;
    return [change, difference, gain]
}

const Card = (props) => {
    
    const { data } = useSwr(`https://finnhub.io/api/v1/quote?symbol=${props.stock.ticker}&token=brh2thvrh5r9t6gjh5og`, { fetcher, refreshInterval: 5 });
    return (
        <div className="container" style={{border: '1px solid #dfe6e9', padding: '10px'}}>
        <div className="row">
            <div className="column" style={{textAlign: 'center'}}>
                <h3 style={{maxHeight: '35px' , overflow: 'hidden'}}><img src={props.stock.logo} style={{maxWidth: '30px' , float: 'left', marginTop: '5px'}}></img>{props.stock.name}</h3><br/>
                {data ?
                <h4 style={{color:'#9b4dca'}}>&#36;{data.c.toFixed(2) * props.stock.stock}</h4>
                :
                <div></div>
                }
            </div>
                {data ?
                    <div className="column" style={{marginTop:'5px', textAlign: 'center'}}>
                        {difference(data , props.stock.price)[2] === true ?
                        <div>
                            <h4 style={{color:'#00b894'}}><i className="fa fa-long-arrow-up" aria-hidden="true"></i> {difference(data , props.stock.price)[0]}% <span style={{color:'#2d3436'}}>&#36;{(difference(data , props.stock.price)[1] * props.stock.stock).toFixed(2)}</span></h4>
                            <h4 style={{marginTop: '47.5px'}}>{props.stock.stock} Share</h4>
                        </div>
                        :
                        <div>
                            <h4 style={{color:'#d63031'}}><i className="fa fa-long-arrow-down" aria-hidden="true"></i> {difference(data , props.stock.price)[0]}% < span style={{color:'#2d3436'}}>&#36;{(difference(data , props.stock.price)[1] * props.stock.stock).toFixed(2)}</span></h4>
                            {props.stock.stock > 1 ? 
                                <h4 style={{marginTop: '47.5px'}}>{props.stock.stock} Share's</h4>
                            :
                                <h4 style={{marginTop: '47.5px'}}>{props.stock.stock} Share</h4>
                            }
                        </div>
                        }
                    </div>
                :
                <div></div>
                }
        </div>
        <div className="row" style={{width:'85%', margin: '0 auto', textAlign: 'center'}} >
            <div className="column">
                <a className="button-outline" href="#">1D</a>
            </div>
            <div className="column">
                <a className="button-outline" href="#">5D</a>
            </div>
            <div className="column">
                <a className="button-outline" href="#">1W</a>
            </div>
            <div className="column">
                <a className="button-outline" href="#">1M</a>
            </div>
            <div className="column">
                <a className="button-outline" href="#">1Y</a>
            </div>
        </div>
        </div>
    )
}

export default Card
