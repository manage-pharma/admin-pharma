import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";
import { createProvider, updateProvider } from '../../Redux/Actions/ProviderAction';
import { useDispatch, useSelector } from 'react-redux';
import { listProvider } from './../../Redux/Actions/ProviderAction';
import { toast } from "react-toastify";
import Toast from '../LoadingError/Toast';
import { PROVIDER_CREATE_RESET, PROVIDER_SINGLE_RESET, PROVIDER_UPDATE_RESET } from '../../Redux/Constants/ProviderConstants';
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const AddProvider = (props) => {    
    const {show, setShow} = props
    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
        dispatch({type: PROVIDER_SINGLE_RESET});
    };
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
        if(successProviderSingle){
            dispatch(updateProvider({ ...dataModal, providerID }));
        }
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

    const providerEditing = useSelector((state)=> state.providerSingle)
    const {success: successProviderSingle, provider: providerEdit } = providerEditing
    const providerID = providerEdit._id

    const providerUpdated = useSelector((state)=> state.providerUpdate) 
    const {success: successProviderUpdated} = providerUpdated

    useEffect(()=>{
        if(success || successProviderUpdated){
            if(successProviderUpdated){
                toast.success(`Updated successfully`, ToastObjects);
                dispatch({type: PROVIDER_UPDATE_RESET})
            }
            else{
                toast.success(`Added successfully`, ToastObjects);
                dispatch({type: PROVIDER_CREATE_RESET})
            }
            setDataModal({
                name: '',
                contactName: '',
                taxCode: '',
                phone: '',
                email: '',
                address: '',
            })
            dispatch(listProvider())
            setShow(false)
        }
        if(successProviderSingle){
            setDataModal({
                name: providerEdit.name,
                contactName: providerEdit.contactName,
                taxCode: providerEdit.taxCode,
                phone: providerEdit.phone,
                email: providerEdit.email,
                address: providerEdit.address,
            })
        }
    }, [success, dispatch, setShow, successProviderSingle, successProviderUpdated, providerEdit])

    const { name, contactName, taxCode, phone, email, address } = dataModal

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
                                    value={name}
                                    required
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
                                        value={contactName}
                                        required
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
                                    value={taxCode}
                                    required
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
                                    value={phone}
                                    required
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
                                    value={email}
                                    required
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
                                    value={address}
                                    required
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
              {successProviderSingle ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  export default AddProvider;