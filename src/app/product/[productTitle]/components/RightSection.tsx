
'use client'
import PriceComponent from '@/components/includes/PriceComponent'
import React, { useEffect, useState } from 'react'
import ReturnAvailComponent from './ReturnAvailComponent'
import strings from '@/utils/string'
import CustomButton from '@/components/buttons/CustomButton'
import CartButton from '../../../../../public/assets/icons/cartDark.svg'
import QuantityButton from '@/components/buttons/QuantityButton'
import DeliveryItemHighlight from './DeliveryItemHighlight'
import product from '../../../../../data.json'
import TitleComponent from './TitleComponent'
import fetchApiData from '@/config/fetch-api-data'
import postApiData from '@/config/post-api-data'
import WishList from '../../../../../public/assets/icons/wishlist.svg'
import RedWishList from '../../../../../public/assets/icons/redWishlist.svg'
import useZustandStore from '@/store/useStore'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

interface ApiResponse<T> {
    status_code: number;
    data: T | null;
    message?: string;
  }
export default function RightSection({ Product, productTitle, data, }: any) {
const [isLoading,setLoader] = useState(false)
const [isBuyLoading,setBuyLoader] = useState(false)
    const { wishlist, setWishlist, accessToken, setCartlist, setCartAmountDetails } = useZustandStore()
    const router = useRouter()

const addtoCart = async (isType:string) => {
    isType  ==  'checkout' ? setBuyLoader(true) :setLoader(true);
    try {
        const response = await postApiData<ApiResponse<any>>(
            `carts/add-cart-item/${productTitle}/`,
            {
                quantity: quantity,
                sku_code: Product,
            },
            undefined,
            false,
            true
        );

        if (response?.status_code === 6000) {
            // Cookies.set("cart_id", response?.data?.cart_id, { path: '/', secure: true, sameSite: 'Strict' });
            // await moveToCheckout()

            console.log("Item added to cart successfully!", response);
            await getCartList(isType,response?.data?.cart_id)
                
        } else {
            console.error("Failed to add item to cart:", response?.message);
        }
    } catch (error) {
        console.error("An error occurred while adding to cart:", error);
    } finally {
        isType  ==  'checkout'? setBuyLoader(false) :setLoader(false);
    }
};
    
    const moveToCheckout = async (cartId:string) => {
        console.log('nadeer')
        setBuyLoader(true)
    try {
        const response = await postApiData<ApiResponse<any>>(
            `orders/create-order/`,
            {
                selected_items: [cartId],
                
            },
            undefined,
            true,
        );

        if (response?.status_code === 6000) {
            const id = response?.data?.order_id
             
            
            console.log("Item added checkout!", response);
            router.push(`/checkout/${id}`)
        } else {
            console.error("Failed to add item to cart:", response?.message);
        }
    } catch (error) {
        console.error("An error occurred while adding to cart:", error);
    } finally {
        setBuyLoader(false);
    }
};

    const getCartList = async (isType:string, cartId: string) => {
        console.log(isType,'hellooooo')
        isType  ==  'checkout'&&  setBuyLoader(true)

    const response = await fetchApiData<ApiResponse<any>>('carts/list-cart-items/',{requireAuth:true, checkAccessToken: true})
    if (response?.status_code == 6000) {
      setCartlist(response?.data?.cart_items)
        setCartAmountDetails(response?.data?.cart_amount_details)
        isType  ==  'checkout' && await moveToCheckout(response?.data?.last_added_item)
        

    }
    console.log(response, 'cartResponse')
  }

const [isRefresh,setRefresh] = useState(false)
  const getWishList =async()=>{
    if (accessToken){
        const response = await fetchApiData<ApiResponse<any>>('wishlists/list-wishlist-items/',{requireAuth:true})
        if (response?.status_code == 6000){
          // setWishist(response?.data?.cart_items)
          setWishlist(response?.data?.cart_items)
          setRefresh(!isRefresh)
        }
    }

  
   
  }
  

  console.log(wishlist,'wishlist')


const addtoWishlist = async () => {
    try {
        const response = await postApiData<ApiResponse<any>>(
            `wishlists/add-wishlist-item/${productTitle}/`,
            {},
            undefined,
            true
        );

        if (response?.status_code === 6000) {

            await getWishList()
            console.log('resoinsse',response)
            
            console.log("Item added to cart successfully!", response);
        } else {
            console.error("Failed to add item to cart:", response?.message);
        }
    } catch (error) {
        console.error("An error occurred while adding to cart:", error);
    } finally {
    }
};
    const [quantity, setQuantity] = useState(1)

    const incrementCount = (e: any) => {
        e.stopPropagation();
        if (quantity < 10) {
            setQuantity(quantity + 1)
        }


    }
    const decrementCount = (e: any) => {
        e.stopPropagation();
        if (quantity != 1) { setQuantity(quantity - 1) }

    }



    const [isInWishlist,setInWishlist] = useState(false)
    console.log(wishlist,'ddd')

    useEffect(() => {
        const isProductInWishlist = wishlist?.some((item: any) => item?.product?.slug === productTitle);
        setInWishlist(isProductInWishlist || false);
    }, [isRefresh,wishlist]);

    return (
        <div className=' px-4 py-6   rounded-[8px] bg-white_smoke'>
            <div className='pb-[16px] flex flex-col gap-[16px] border-b border-solid border-Platinum'>
                <PriceComponent actualPriceClass='' badge={'save20%'} data={data?.price_details} isHome={false} />
                {/* <ReturnAvailComponent /> */}
                <TitleComponent titleClass='text-[12px] rubik_regular text-nickel_grey' title={strings.productPage.inclusiveVAT} />
            </div>
            <div className='flex flex-col py-[16px] gap-[8px] border-b border-solid border-Platinum'>
                <div className='flex flex-row items-center w-[100%]'>
                    <p className='text=[12px] text-BLACK leading-[16px] rubik_regular'>Delivery to  <b className='text=[12px] text-BLACK leading-[16px] rubik_medium'>​130, Humaid Alhasm Al Rumaithi street</b></p>

                </div>
                <div className=''>
                    <p>{strings.productPage.deliveryDateTitle}
                        <b className='text=[12px] text-BLACK leading-[16px] rubik_medium'>{' '}Sunday, 3 November, 7 AM - 9 PM</b>
                    </p>
                </div>

            </div>
            <div className=' py-4 border-b border-solid border-Platinum'>
                <div className='mb-[26px]'>
                    <p className='text=[12px] text-BLACK leading-[14px] rubik_regular'>Sold and shipped by: {' '}
                        <b className='text=[12px] text-BLACK leading-[14px] rubik_medium'>Adarc computers</b>
                    </p>
                </div>
                <div className='flex flex-row justify-between '>
                    <QuantityButton incrementCount={incrementCount} decrementCount={decrementCount} quantity={quantity} setQuantity={setQuantity} />
                    <div>
                        <div className=''>
                            <h6 className='rubik_medium text-[12px] text-gunmetal leading-[14px]'>AED {" "}{quantity * data?.price_details?.actual_price}</h6>
                        </div>
                    </div>
                </div>
                <div >
                    <div className=' my-[8px]'>
                        <CustomButton onClick={addtoCart} isLoading={isLoading} isDisabled={data?.stock < 1} isButtonClass={true} buttonClass=' border-0 bg-button_yellow ' isLeftIcon={true} leftIcon={CartButton} title={data?.stock < 1? 'out of stock' :strings.button.addCart} />
                    </div>

                </div >
                <div className='flex gap-4 justify-between'>
                    <div className='w-[100%]  flex justify-center items-center'>
                        <CustomButton onClick={()=>addtoCart('checkout')}  isLoading={isBuyLoading} isButtonClass={true} buttonClass='' title={strings.button.buyNow}     />
                    </div>
                    <div className='w-[48px] flex flex-row justify-center items-center'>
                        <CustomButton  onClick={addtoWishlist} isButtonClass={true} buttonClass='' isLeftIcon={true} leftIcon={isInWishlist ? RedWishList :WishList} isTitle={false} />
                    </div>
                </div>
            </div>
            <div className='flex flex-row flex-wrap gap-x-[24px] gap-y-[12px] items-center py-[16px] '>
                {product?.productPage?.deliveryHighlight?.map((item: any, index: any) => (
                    <DeliveryItemHighlight key={index} item={item} />
                ))}
            </div>
        </div>
    )
}
