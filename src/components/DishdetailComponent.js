import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, ListGroup, ListGroupItem } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);

    }
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(dish){
       
        if (dish != null) {
            const commented = this.props.dish.comments.map((com) => {
                return (
                    <ListGroup key={com.id} >
                       <ListGroupItem >{com.comment}</ListGroupItem>
                       <ListGroupItem >--{com.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</ListGroupItem>
                    </ListGroup>
                ); 
            });
            return(
                <div  className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {commented}
               </div>
               );
        }
        else 
           return (
               <div></div>
           );

    }

    render () {
    
        return (
            <div className="container">            <div className="row">
                 <div  className="col-12 col-md-5 m-1">
                  {this.renderDish(this.props.dish)}
               </div>
                 {this.renderComments(this.props.dish)}
               </div>
            </div>

           
        );
    }
}

export default DishDetail;