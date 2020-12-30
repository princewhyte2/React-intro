import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb,ListGroup,ListGroupItem, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


  function RenderDish({dish}) {
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

   function RenderComments({comments}){
       
        if (comments != null) {
            const commented = comments.map((com) => {
                return (
                    
                    <ListGroup key={com.id} className="col-12 m-1" >
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

    const DishDetail = (props) => {
          
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                    <RenderComments comments={props.comments} />
                
            </div>
            </div>
        );
    }  
    


export default DishDetail;