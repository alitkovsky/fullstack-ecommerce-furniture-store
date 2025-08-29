"use client";

import { useState } from "react";
import { useData } from "@/app/context/AppContext";
import PageHeading from "@/app/components/PageHeading";

const CheckoutPage: React.FC = () => {
    const [selectedPayment, setSelectedPayment] = useState<string>("");

    const handlePaymentChange = (paymentMethod: string) => {
        setSelectedPayment(paymentMethod);
    };

    const { cartItems } = useData()

    return (
        <>
            <PageHeading mainhead="Checkout" />
            <div className="p-8 lg:p-20">
                <form className="grid lg:grid-cols-2" action="">
                    <div className="lg:px-20">
                        <h3 className="font-semibold text-4xl mb-10">Billing details</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-6 lg:gap-0 flex-col lg:flex-row justify-between">
                                <div className="flex flex-col gap-4">
                                    <label className="font-medium" htmlFor="firstname">First Name</label>
                                    <input className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="firstname" type="text" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label className="font-medium" htmlFor="lastname">Last Name</label>
                                    <input className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="lastname" type="text" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="company">Company Name (Optional)</label>
                                <input className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="company" type="text" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="region">Country / Region</label>
                                <select defaultValue='1' className="border rounded-lg p-4 border-[#9F9F9F]" id="region">
                                    <option value="1">Sri Lanka</option>
                                    <option value="2">Ikinci Olke</option>
                                    <option value="3">Ucuncu Olke</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="street">Street address</label>
                                <input className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="street" type="text" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="city">Town / City</label>
                                <input className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="city" type="text" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="province">Province</label>
                                <select defaultValue='1' className="border rounded-lg p-4 border-[#9F9F9F]" id="province">
                                    <option value="1">Western Province</option>
                                    <option value="2">Ikinci Province</option>
                                    <option value="3">Ucuncu Province</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="zip">ZIP code</label>
                                <input className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="zip" type="text" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="phone">Phone</label>
                                <input className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="phone" type="text" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-medium" htmlFor="email">Email address</label>
                                <input className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="email" type="text" />
                            </div>
                            <div className="flex flex-col gap-4 mt-6">
                                <input placeholder="Additional information" className="border focus:outline-hidden rounded-lg p-4 border-[#9F9F9F]" id="additional" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:px-10 mt-12">
                        <div className="w-full flex flex-col gap-6 border-b-[#D9D9D9] border-b pb-10">
                            <div className="text-2xl font-medium flex justify-between">
                                <p>Product</p>
                                <p>Subtotal</p>
                            </div>
                            <div className="max-h-[40vh] overflow-y-auto flex flex-col gap-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between pr-4">
                                        <p className="text-[#9F9F9F]">{item?.product?.title} <span className="text-black text-[12px]">x {item?.features?.quantity}</span></p>
                                        <p className="font-light">Rs. {item?.product?.price}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p className="font-light">Rs. {cartItems.reduce((total, product) => total + ((product?.product?.oldprice ? product?.product?.oldprice : product?.product?.price) * product?.features?.quantity), 0)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total</p>
                                <p className="font-bold lg:text-2xl text-ochre">Rs. {cartItems.reduce((total, product) => total + (product?.product?.price * product?.features?.quantity), 0)}</p>
                            </div>
                        </div>
                        <div className="text-[#9F9F9F] py-4">
                            <div className="group mb-3">
                                <label className={`inline-flex cursor-pointer items-center gap-3 mb-3 duration-300 ${selectedPayment === 'bank' ? 'text-black' : ''}`} htmlFor="bank">
                                    <input className="peer sr-only" onChange={() => handlePaymentChange('bank')} type="radio" name="payment" id="bank" />
                                    <span className="w-3 h-3 border border-[#9F9F9F] rounded-full peer-checked:bg-black peer-checked:border-black"></span>
                                    Direct Bank Transfer</label>
                                <p className={selectedPayment === 'bank' ? 'block' : 'hidden'}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                            </div>
                            <div className="group">
                                <label className={`inline-flex cursor-pointer items-center gap-3 mb-3 duration-300 ${selectedPayment === 'cash' ? 'text-black' : ''}`} htmlFor="cash">
                                    <input className="peer sr-only" onChange={() => handlePaymentChange('cash')} type="radio" name="payment" id="cash" />
                                    <span className="w-3 h-3 border border-[#9F9F9F] rounded-full peer-checked:bg-black peer-checked:border-black"></span>
                                    Cash On Delivery</label>
                                <p className={selectedPayment === 'cash' ? 'block' : 'hidden'}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                            </div>
                        </div>
                        <p className="mb-8">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <b>privacy policy.</b></p>
                        <div className="w-full text-center">
                            <button className="text-xl border border-black hover:bg-black hover:text-white duration-300 rounded-lg py-3 w-1/2 lg:px-20">Place order</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CheckoutPage;