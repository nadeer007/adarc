import Image from 'next/image'
import React, { useState } from 'react'
import PriceComponent from './PriceComponent'

import UnderLinedButton from '../buttons/UnderLinedButton'
import Strings from '../../utils/string'
import QuantityButton from '../buttons/QuantityButton'
import TitleComponent from '@/app/[productTitle]/components/TitleComponent'
import Tick_icon from "../../../public/assets/icons/tick_blue.svg"
import { cn } from '@/utils/utils'
import postApiData from '@/config/post-api-data'
import RatingReviewModal from '@/app/my-account/_components/RatingReviewModal'
import Modal from '../modal/Modal'
import Cookies from 'js-cookie';
import { select_border_grey } from '../../../colors.config'

interface ApiResponse<T> {
    status_code: number;
    data: T | null;
    message?: string;
}

export default function LargeCard({ ischeckOut, isSelectedItems, setSelectedItems, moveItem, isRefresh, setRefresh, getList, removeItem, isCart = false, wishlist = false, product, cart = false, onClick, myOrder = false }: any) {
console.log(product,"productproduct");

    const [isratingModal, setRatingModal] = useState(false)

    const [isLoading, setLoader] = useState(false)
    const [quantity, setQuantity] = useState<any>(product?.quantity || 1);


    const incrementCount = async (e: any) => {
        setLoader(true)
        e.stopPropagation();
        const updatedQuantity = quantity + 1;
        setQuantity(updatedQuantity);
        await addtoCart(updatedQuantity);
    };

    const decrementCount = async (e: any) => {
        e.stopPropagation();
        if (quantity > 1) {
            const updatedQuantity = quantity - 1;
            setQuantity(updatedQuantity);
            await addtoCart(updatedQuantity);
        }
    };

    const addtoCart = async (count?: any) => {
        setLoader(true);
        console.log(product?.product?.slug, 'slug', count, 'quantity')
        try {

            const response = await postApiData<ApiResponse<any>>(
                `carts/add-cart-item/nanotech-asus-cpu-blue-128gb/`,
                {
                    quantity: count,
                    sku_code: product.sku,
                },
                undefined,
                true
            );
            console.log(response, "response===")
            if (response?.status_code === 6000) {
                Cookies.set("cart_id", response?.data?.cart_id, { path: '/', secure: true, sameSite: 'Strict' });

                setRefresh(!isRefresh)

                console.log("Item added to cart successfully!", response);
            } else {
                console.error("Failed to add item to cart:", response?.message);
            }
        } catch (error) {
            console.error("An error occurred while adding to cart:", error);
        } finally {
            setTimeout(() => {
                setLoader(false);

            }, 500);
        }
    };

    const orderData = [{ status: "active", updated_at: "2025-01-12T11:35:11.013071Z" }, { status: "pending", updated_at: "2025-01-12T11:35:11.013071Z" }]

    return (

        <>
            <Modal isOpen={isratingModal} onClose={() => setRatingModal(false)} className='w-[530px] p-8'>
                <RatingReviewModal product={product} />
            </Modal>


            <div onClick={onClick} className={cn('relative  cursor-pointer block w-[100%] mt-[12px]  max-lg:mt-0 py-[16px] border-t border-solid border-Platinum hover:opacity-[0.9]', myOrder && 'mt-0, border-0 opacity-[1] py-0', ischeckOut && 'border border-solid rounded-[4px] px-3 py-2')} >
                {/* {isCart && <button
                    onClick={(e: any) => {
                        e.stopPropagation();

                        const isSelected = isSelectedItems.some((item: any) => item.pk === product?.pk);

                        if (isSelected) {
                            setSelectedItems(isSelectedItems.filter((item: any) => item.pk !== product?.pk));
                        } else {
                            setSelectedItems([...isSelectedItems, product]);
                        }
                    }}
                    className={cn(
                        'flex justify-center items-center top-[10px] left-0 absolute z-10 w-[20px] h-[20px] rounded-[4px] overflow-hidden border border-solid border-gray-400',
                        isSelectedItems.some((item: any) => item.pk === product?.pk) ? 'bg-blue-500' : 'bg-white'
                    )}
                    aria-label="checkbox"
                >
                    {isSelectedItems.some((item: any) => item.pk === product?.pk) && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-4 h-4"
                        >
                            <path d="M9 16.2L4.8 12l-1.4 1.4 6 6 12-12-1.4-1.4z" />
                        </svg>
                    )}
                </button>} */}
                <div className={cn('items-start  py-[16px] w-[100%] flex justify-between ', ischeckOut && 'py-0 items-center')}>
                    <div className={cn('flex flex-row w-[71.42%] ', ischeckOut && 'items-center')}>
                        <div className='w-[96px] h-[104px] min-w-[96px]  justify-center items-center'>
                            <Image src={product?.product?.primary_attachment} width={100} height={100} className='contain-content' alt='productImage' loading='lazy' />
                        </div>
                        <div className={cn('mx-[16px] w-[100%]  flex flex-col justify-between', ischeckOut ? 'h-auto' : '')}>
                            <div className=''>
                                <h2 className='rubik_medium text-[16px] max-lg:text-[15px] leading-[24px] text-start text-[shadow_gray]'>
                                    {product?.product?.name}
                                </h2>
                                {ischeckOut && <h2 className='rubik_medium text-[16px] leading-[24px] text-start text-[shadow_gray]'>
                                    quantity : {product?.quantity}
                                </h2>}
                            </div>
                            {myOrder &&
                                <div className='flex flex-col w-full'>
                                    <div className='flex mb-2'>
                                        <div className='mr-3 items-center flex'><UnderLinedButton className='no-underline' title={Strings.button.reOrder} /></div>

                                        
                                       {
                                        product?.current_status === "completed" &&   <div><UnderLinedButton className='text-tang_blue' title={Strings.button.rateReview} onClick={(e: any) => {
                                            e.stopPropagation(); // Prevents parent div onClick from triggering
                                            setRatingModal(true); // Open the rating modal
                                        }} /></div>
                                       }
                                      


                                    </div>
                                    {
                                        product?.current_status &&
                                        <div className='text-[#717171] p-3 my-3 w-[50%] min-w-[300px] rounded-[6px] text-[14px] rubik_regular text-center border border-solid border-[#0000003B]'>
                                            {product?.current_status}
                                        </div>
                                    }
                                    {product?.return_policy_end_date &&
                                        <div className='text-[#717171] rubik_regular text-[14px]'>Return policy ends on {product?.return_policy_end_date}</div>
                                    }

                                    {product?.order_history.length > 0 &&
                                        product?.order_history?.map((order: any, index: any) => (
                                            <div key={index} className='w-full flex gap-2 '>
                                                <div className='flex flex-col justify-between items-center'>
                                                    <div className='w-[20px] h-[20px]'>
                                                        <Image src={Tick_icon} alt='tick icon' />
                                                    </div>
                                                    {index !== product?.order_history?.length - 1 && (
                                                        <div className='flex-1 w-[1px] border border-[#E2E4E5] border-solid'></div>
                                                    )}


                                                </div>
                                                <div >
                                                    <h5 className='rubik_regular text-[12px] text-[#222222]'>
                                                        {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1)}
                                                    </h5>
                                                    <p className='text-[#717171] rubik_regular text-[10px] mb-5'>
                                                        {new Date(order?.updated_at).toLocaleString('en-GB', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </p>
                                                </div>


                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            {/* {!myOrder &&
                            (!wishlist ?
                                <div >
                                    <ReturnAvailComponent />
                                </div>
                                :  */}
                            {!ischeckOut && <div><TitleComponent title={product?.product?.stock_status?.status == 'not available' ? 'out of stock' : 'In stock'} titleClass={product?.product?.stock_status?.status == 'not available' ? 'text-error_red' : 'text-avail_green'} /></div>
                            }                            {/* )} */}
                        </div>
                    </div>
                    <div className=' flex justify-end  items-center '>
                        <PriceComponent isHome={false} badge={product?.product?.badge} data={product?.product?.price_details} isOffer={!myOrder ? true : false} />

                        {
                            myOrder && <div className='absolute bottom-[10px] '>
                                <div className='flex gap-3 text-[16px] rubik_regular '>

                                     {
                                        product?.current_status !== "completed" ?
                                    <button className='text-[#C73E1D] underline'>Cancel</button>
                                    :
                                    <>
                                              <button className='text-[#222222] underline'>Return Product</button>
                                              <button className='text-[#222222] underline'>Invoice</button>
                                    </>                          
                                    }                                 
                                </div>


                            </div>
                        }
                    </div>
                </div>
                {!myOrder && <div className='flex flex-row items-end justify-end gap-[40px] '>

                    {!wishlist && !ischeckOut && <div>
                        <UnderLinedButton onClick={(e: any) => { e.stopPropagation(); moveItem() }} title={!wishlist ? Strings.button.moveToWishlist : Strings.button.moveToCart} />
                    </div>}

                    {!ischeckOut && <div>
                        <UnderLinedButton onClick={(e: any) => { e.stopPropagation(); removeItem() }} title={Strings.button.remove} />
                    </div>}
                    {product?.inStock && <div>
                        <UnderLinedButton onClick={(e: any) => { e.stopPropagation() }} title={wishlist ? Strings.button.addCart : Strings.button.saveLater} />
                    </div>}
                    {!wishlist && !ischeckOut && product?.product?.stock_status?.status != 'not available' &&
                        <QuantityButton
                            isLoading={isLoading}
                            incrementCount={incrementCount}
                            decrementCount={decrementCount}
                            quantity={quantity} setQuantity={setQuantity} />}

                </div>}
            </div>
        </>
    )
}
