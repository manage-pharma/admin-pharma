import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";
import { createProvider } from '../../Redux/Actions/ProviderAction';
import { useDispatch, useSelector } from 'react-redux';
import { listProvider } from './../../Redux/Actions/ProviderAction';
import { toast } from "react-toastify";
import Toast from '../LoadingError/Toast';
import { PROVIDER_CREATE_RESET } from '../../Redux/Constants/ProviderConstants';
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const AddProvider = (props) => {    
    const {show, setShow} = props

    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const [dataModal, setDataModal] = useState({
        name: '',
        contactName: '',
        taxCode: '',
        phone: '',
        email: '',
        address: '',
    })

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createProvider(dataModal));
    }
      
    const handelChangeModal = e =>{
        e.preventDefault();
        setDataModal(prev => {
          return {
            ...prev, [e.target.name]: e.target.value
          }
        })
    }

    const createProviderStatus = useSelector((state)=> state.providerCreate)
    const { success } = createProviderStatus

    useEffect(()=>{
        if(success){
            toast.success(`Add provider successfully`, ToastObjects);
            setDataModal({
                name: '',
                contactName: '',
                taxCode: '',
                phone: '',
                email: '',
                address: '',
            })
            dispatch(listProvider())
            dispatch({type: PROVIDER_CREATE_RESET})
            setShow(false)
        }
    }, [success])
  
    return (
      <>
        <Toast />
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title  id="contained-modal-title-vcenter">Add Provider</Modal.Title>
          </Modal.Header>
          <Modal.Body  className="show-grid">
            <Form>
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Provider</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="provider name"
                                    autoFocus
                                    onChange={handelChangeModal}
                                    name="name"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Contact person</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="contact person"
                                        onChange={handelChangeModal}
                                        name="contactName"
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tax code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="tax code"
                                    onChange={handelChangeModal}
                                    name="taxCode"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="phone"
                                    onChange={handelChangeModal}
                                    name="phone"
                                />
                                </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    onChange={handelChangeModal}
                                    name="email"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    type="text"
                                    onChange={handelChangeModal}
                                    name="address"
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  export default AddProvider;