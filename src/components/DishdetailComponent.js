import React , {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb,ListGroup,ListGroupItem, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Row,Col,
     Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom';


  function RenderDish({dish}) {
   if (dish != null) 
            return(
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

   function RenderComments({comments , postComment, dishId}){
       
        if (comments != null) {
            const commented = comments.map((com) => {
                return (
                    
                    <ListGroup key={com.id} className="col-12 m-1" >
                       <ListGroupItem >{com.comment}</ListGroupItem>
                       <ListGroupItem > -- {com.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</ListGroupItem>
                    </ListGroup>
                    
                ); 
            });
            return(
                <div  className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {commented}
                    <CommentForm dishId={dishId} postComment={postComment} />
               </div>
               
               );
        }
        else 
           return (
               <div></div>
           );

    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component {
        constructor(props){
            super(props);

            this.state = {
                isModalOpen : false
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        }
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

          handleSubmit(values) {
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }
        render() {
            return(
                <div> 
                <Button onClick={this.toggleModal} type="submit" color="primary"><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Label htmlFor="rating" >Rating</Label>
                                   <Control.select model=".rating" name="rating" 
                                        className="form-control ">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>    
                        </div>
                        <div className="form-group">
                            <Label htmlFor="yourname" >Your Name</Label>
                            <Control.text model=".author" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="author"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />

                        </div>
                        <div className="form-group">
                            <Label htmlFor="comment" >Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                        </div>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            );
        }
    }
    
   

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
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
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} /> 
                    </div>
                
            </div>
            );
    }  
    


export default DishDetail;