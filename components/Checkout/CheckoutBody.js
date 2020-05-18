import React, {useEffect, useState} from 'react';
// import OrderSummary from './OrderSummary';
// import useForm from './userForm';
import {connect} from "react-redux";
import axios from "axios";
import config from "../../config/config";

import * as cartAction from "../../store/actions/cartActions";
import CustomPaypal from "../Payment/customPayment";
import Router from 'next/router';
import {Button, Tooltip} from "@material-ui/core";
import {bindActionCreators} from "redux";

function CheckoutBody(props) {

    const [bPaypal, setPaypal] = useState(true);
    const [bChecked, setChecked] = useState(false);
    const [firstNameErr, setFirstNameErr] = useState('');

    const [lastNameErr, setlastNameErr] = useState('');

    const [addressErr, setAddressErr] = useState('');

    const [cityErr, setCityErr] = useState('');

    const [stateErr, setStateErr] = useState('');

    const [zipErr, setZipErr] = useState('');

    const [emailErr, setEmailErr] = useState('');

    const [phoneErr, setPhoneErr] = useState('');

    const [keys, setKeys] = useState([]);
    const errorStyle = {
        color: "red",
        fontSize: "13px"
    };

    const onChangeInput = () => {
        setPaypal(!bPaypal)
    };

    const onInitData = () => {
        localStorage.removeItem('cart_data');
        localStorage.removeItem('cart_count');

        let data = {
            subTotal : 0,
            tax : 0,
            shipping : 0,
            total : 0,
            cartData : {}
        };

        props.cartAction.initCartCountSet(0);
        props.cartAction.initBuyerInfoData();
        props.cartAction.setCheckoutInfo(data);
    };

    const postToURL = (url, values) => {
        values = values || {};

        var form = document.createElement("form");

        form.action = url;
        form.method = "POST";
        form.style.display = "none";

        let keys = Object.keys(values);

        for (let i = 0; i < keys.length; i++) {
            let tempKey = keys[i];

            let input = document.createElement("input");
            input.name = tempKey;
            input.setAttribute('value', values[tempKey]);
            // input.value = values[tempKey];

            form.appendChild(input);
        }

        document.body.appendChild(form);

        form.submit();
        document.body.removeChild(form);
    };

    const onSendPayfast = () => {

        const buyerInfo = props.buyerInfo;
        const cartData = props.cartData;
        const orderDetail = {
            payment: bPaypal === true ? 'paypal' : 'payfast',
            shipping : props.shipping,
            tax : props.tax,
            total : props.total
        };

        let sendData = {
            buyerInfo,
            cartData,
            orderDetail
        };

        localStorage.setItem('payment_data', JSON.stringify(sendData));

        let sendPayfastData = {
            'merchant_id' : '15427158',
            'merchant_key' : 'pfa22g4v2jmg4',
            'return_url' : 'http://68.183.108.52:3030/success-payment',
            'cancel_url' : 'http://68.183.108.52:3030/cancel-payment',
            'notify_url' : 'http://68.183.108.52:3030/notify-payment',
            'name_first' : firstName,
            'name_last'  : lastName,
            'email_address' : email,
            'cell_number' : phone,
            'amount' : props.total,
            'm_payment_id' : '',
            'email_confirmation' : '1',
            'confirmation_address' : email
        };

        //https://'.$pfHost.'/eng/process
        //'sandbox.payfast.co.za' : 'www.payfast.co.za';
        postToURL('https://sandbox.payfast.co.za/eng/process', sendPayfastData)
    };


    const onSaveData = () => {
        const buyerInfo = props.buyerInfo;

        console.log('save data');
        console.log(buyerInfo);
        const cartData = props.cartData;
        console.log(props.cartData);
        const orderDetail = {
            payment: 'paypal',
            subTotal : props.subTotal,
            shipping : props.shipping,
            tax : props.tax,
            total : props.total
        };

        let sendData = {
            buyerInfo,
            cartData,
            orderDetail
        };

        axios.post(config.ADD_ORDER, sendData)
            .then(response => {
                setKeys([]);
                onInitData();
                Router.push('/success-payment');
            })
            .catch(function (error) {
            });
    };

    const onCheckState = () => {
        if (props.total === 0) {
            alert('Please select products...');
            return;
        }

        if (onCheck() === false) {
            alert('Please insert values.');
        }
        else {
            let buyerInfo = props.buyerInfo;
            console.log('before saving');
            console.log(buyerInfo);
        }
    };

    const onSuccessPayment = (resultData, order) => {
        onSaveData();
    };

    useEffect(() => {
        let keys = Object.keys(props.cartData);

        setKeys(keys);
    }, [props.cartData]);

    const onCheck = () => {
        let bOk = true;
        if (props.buyerInfo.firstName === '') {
            setFirstNameErr('Please insert value');
            bOk = false;
        }
        else if (firstNameErr !== '') {
            bOk = false;
        }

        if (props.buyerInfo.lastName === '') {
            setlastNameErr('Please insert value');
            bOk = false;
        }
        else if (lastNameErr !== '') {
            bOk = false;
        }

        if (props.buyerInfo.address === ''){
            setAddressErr('Please insert value');
            bOk = false;
        }
        else if (addressErr !== '') {
            bOk = false;
        }

        if (props.buyerInfo.city === ''){
            setCityErr('Please insert value');
            bOk = false;
        }
        else if(cityErr !== '') {
            bOk = false;
        }

        if (props.buyerInfo.state === ''){
            setStateErr('Please insert value');
            bOk = false;
        }
        else if(stateErr !== '') {
            bOk = false;
        }

        if (props.buyerInfo.zip === ''){
            setZipErr('Please insert value');
            bOk = false;
        }
        else if(zipErr !== '') {
            bOk = false;
        }

        if (props.buyerInfo.email === ''){
            setEmailErr('Please insert value');
            bOk = false;
        }
        else if(emailErr !== '') {
            bOk = false;
        }

        if (props.buyerInfo.phone === ''){
            setPhoneErr('Please insert value');
            bOk = false;
        }
        else if(phoneErr !== '') {
            bOk = false;
        }

        setChecked(bOk);
        return bOk;
    };
     return (
        <section className="checkout-area ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="user-actions">
                            <i className="icofont-ui-file"></i>
                            <span>Returning customer? <a href="#">Click here to login</a></span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="billing-details">
                            <h3 className="title">Billing Details</h3>
                            <div className="bar"></div>

                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label>Country <span className="required">*</span></label>

                                        <div className="select-box">
                                            <select className="form-control" value={props.buyerInfo.country}
                                                    onChange={(e) => props.cartAction.changeCountry(e.target.value)}>
                                                <option value="Russia">Russia</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="United States">United States</option>
                                                <option value="United Arab Emirates">United Arab Emirates</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Germany">Germany</option>
                                                <option value="France">France</option>
                                                <option value="Japan">Japan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>First Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-control"
                                            onChange={(e) => {
                                                if (e.target.value === ''){
                                                    setFirstNameErr('Please insert value');
                                                }
                                                else {
                                                    setFirstNameErr('');
                                                }
                                                props.cartAction.changeFirstName(e.target.value)
                                            }}
                                            value={props.buyerInfo.firstName}
                                        />
                                        {firstNameErr && <p style={errorStyle}>{firstNameErr}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>Last Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control"
                                            onChange={(e) => {
                                                if (e.target.value === '') {
                                                    setlastNameErr('Please insert value');
                                                }
                                                else {
                                                    setlastNameErr('');
                                                    setlastNameErr('');
                                                }
                                                props.cartAction.changeLastName(e.target.value)
                                            }}
                                            value={props.buyerInfo.lastName}
                                        />
                                        {lastNameErr && <p style={errorStyle}>{lastNameErr}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input
                                            type="text"
                                            value={props.buyerInfo.company}
                                            onChange={(e) => props.cartAction.changeCompany(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-6">
                                    <div className="form-group">
                                        <label>Address <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            onChange={(e) => {
                                                if (e.target.value === '') {
                                                    setAddressErr('Please insert value');
                                                }
                                                else {
                                                    setAddressErr('');
                                                }
                                                props.cartAction.changeAddress(e.target.value)
                                            }}
                                            value={props.buyerInfo.address}
                                        />
                                        {addressErr && <p style={errorStyle}>{addressErr}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-6">
                                    <div className="form-group">
                                        <label>Town / City <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control"
                                            onChange={(e) => {
                                                if (e.target.value === '') {
                                                    setCityErr('Please insert value');
                                                }
                                                else {
                                                    setCityErr('');
                                                }
                                                props.cartAction.changeCity(e.target.value)
                                            }}
                                            value={props.buyerInfo.city}
                                        />
                                        {cityErr && <p style={errorStyle}>{cityErr}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>State / County <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="state"
                                            className="form-control"
                                            onChange={(e) => {
                                                if (e.target.value === '') {
                                                    setStateErr('Please insert value');
                                                }
                                                else {
                                                    setStateErr('');
                                                }
                                                props.cartAction.changeState(e.target.value)
                                            }}
                                            value={props.buyerInfo.state}
                                        />
                                        {stateErr && <p style={errorStyle}>{stateErr}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>Postcode / Zip <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="zip"
                                            className="form-control"
                                            onChange={(e) => {
                                                if (e.target.value === '') {
                                                    setZipErr('Please insert value');
                                                }
                                                else {
                                                    setZipErr('');
                                                }
                                                props.cartAction.changeZip(e.target.value)
                                            }}
                                            value={props.buyerInfo.zip}
                                        />
                                        {zipErr && <p style={errorStyle}>{zipErr}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>Email Address <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            onChange={(e) => {
                                                let index = e.target.value.indexOf('@');
                                                let index2 = e.target.value.indexOf('.');

                                                setEmailErr('This is not email type');

                                                if (index < 0 || index2 < 0) {
                                                    setEmailErr('This is not email type');
                                                }else {
                                                    setEmailErr('');
                                                }

                                                if (e.target.value === '') {
                                                    setEmailErr('Please insert value');
                                                }

                                                props.cartAction.changeEmail(e.target.value);
                                            }}
                                            value={props.buyerInfo.email}
                                        />
                                        {emailErr !== '' && <p style={errorStyle}>{emailErr}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>Phone <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            onChange={(e) => {
                                                let index = e.target.value.indexOf('+');
                                                if (index < 0) {
                                                    setPhoneErr('Phone number must be like +1231231..');
                                                }
                                                else {
                                                    setPhoneErr('');
                                                }

                                                if (e.target.value === '') {
                                                    setPhoneErr('Please insert value');
                                                }

                                                props.cartAction.changePhone(e.target.value)
                                            }}
                                            value={props.buyerInfo.phone}
                                        />
                                        {phoneErr && <p style={errorStyle}>{phoneErr}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="create-an-account" />
                                        <label className="form-check-label" htmlFor="create-an-account">Create an account?</label>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="ship-different-address" />
                                        <label className="form-check-label" htmlFor="ship-different-address">Ship to a different address?</label>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <textarea name="notes" onChange={(e) => props.cartAction.changeOrderNote(e.target.value)} value={props.buyerInfo.orderNote} id="notes" cols="30" rows="4" placeholder="Order Notes" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <button onClick={onSuccessPayment}>Check</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="order-details">
                            <h3 className="title">Your Order</h3>
                            <div className="bar"></div>
                            {
                                keys.length > 0 &&
                                <div className="order-table table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th style={{textAlign : 'center'}} scope="col">Product</th>
                                            <th style={{textAlign : 'center'}} scope="col">Price</th>
                                            <th style={{textAlign : 'center'}} scope="col">quantity</th>
                                            <th style={{textAlign : 'center'}} scope="col">Total</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {keys.map((data, idx) => (
                                            <tr key={idx}>
                                                <td style={{textAlign : 'center'}} className="product-name">
                                                    <label>{props.cartData[data].productName}</label>
                                                </td>
                                                <td style={{textAlign : 'center'}}>
                                                    <span className="subtotal-amount">${props.cartData[data].price}</span>
                                                </td>
                                                <td style={{textAlign : 'center'}}>
                                                    <span className="subtotal-amount">{props.cartData[data].quantity}</span>
                                                </td>
                                                <td style={{textAlign : 'center'}} className="product-total">
                                                    <span className="subtotal-amount">${props.cartData[data].price * props.cartData[data].quantity}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            }


                            <div className="order-table table-responsive py-3">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th scope="col">Sum</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="order-subtotal">
                                            <span>Cart Subtotal</span>
                                        </td>

                                        <td className="order-subtotal-price">
                                            <span className="order-subtotal-amount">${props.subTotal}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="order-shipping">
                                            <span>Shipping</span>
                                        </td>

                                        <td className="shipping-price">
                                            <span>${props.shipping}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="order-shipping">
                                            <span>Tax</span>
                                        </td>

                                        <td className="shipping-price">
                                            <span>${props.tax}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="total-price">
                                            <span>Order Total</span>
                                        </td>

                                        <td className="product-subtotal">
                                            <span className="subtotal-amount">${props.total}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="payment-method">
                                <p>
                                    <input type="radio" onChange={onChangeInput} checked={bPaypal} id="paypal" name="radio-group" />
                                    <label htmlFor="paypal">PayPal</label>
                                </p>
                                <p>
                                    <input type="radio" onChange={onChangeInput} id="cash-on-delivery" name="radio-group" />
                                    <label htmlFor="cash-on-delivery">Payfast</label>
                                </p>
                            </div>
                            {
                                bPaypal === true?
                                    <div onClick={onCheckState}>
                                        <CustomPaypal
                                            style={{pointerEvents :
                                                    bChecked === true ? 'auto' : 'none'}}
                                            total={props.total}
                                            currency={'USD'}
                                            onSuccess={onSuccessPayment}
                                        />
                                    </div>
                                     :
                                    <div style={{textAlign : 'center'}}>
                                        <div onClick={onCheckState} style={{padding: '0', width : '200px', margin : 'auto'}}>
                                            <Button onClick={onSendPayfast} disabled={!bChecked} style={{padding : '0', minWidth: '200px'}}>
                                                <img
                                                    src="https://www.payfast.co.za/images/buttons/paynow_basic_logo.gif"
                                                    align="bottom" vspace="3" style={{width : '100%', height : '70px', margin : '0'}} alt="Pay Now"
                                                />
                                            </Button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    cartData: state.cart.cartData,
    buyerInfo : state.cart.buyerInfo,
    subTotal : state.cart.subTotal,
    shipping : state.cart.shipping,
    tax : state.cart.tax,
    total: state.cart.total,
});

const mapDispatchToPros = (dispatch) => ({
    cartAction : bindActionCreators(cartAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToPros)(CheckoutBody);
