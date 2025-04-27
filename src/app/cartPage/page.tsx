'use client'
import React, { useEffect, useState } from 'react'
import Strings from '../../utils/string'
import product from '../../../data.json'
import LargeCard from '@/components/includes/LargeCard'
import Wrapper from '@/components/includes/Wrapper'
import CustomButton from '@/components/buttons/CustomButton'
import { useRouter } from 'next/navigation';
import AmountLine from './component/AmountLine'
import UnderLinedButton from '@/components/buttons/UnderLinedButton'
import CustomCheckBox from '@/components/input/CustomCheckBox'
import Icon from '@/components/includes/Icon'
import GiftIcon from '../../../public/assets/icons/giftIcon.svg'
import InfoIcon from '../../../public/assets/icons/info.svg'
import TitleComponent from '../product/[productTitle]/components/TitleComponent'
import fetchApiData from '@/config/fetch-api-data'
import postApiData from '@/config/post-api-data'
import { div } from 'framer-motion/client'
import EmptySection from '@/components/emptyContainer/EmptySection'
import useZustandStore from '@/store/useStore'
import PriceDetail from './_components/PriceDetail'
import PageLoader from '@/components/includes/PageLoader'

interface ApiResponse<T> {
status_code: number;
data: T | null;
message?: string;
}
export default function Page() {


  const { cartlist, setCartlist, wishlist, cartAmountDetails, accessToken, setWishlist, setCartAmountDetails } = useZustandStore()
  const [isRefresh, setRefresh] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isSelectedItems, setSelectedItems] = useState([])
  const [pageLoading,setPageLoading] = useState(true)

  const [totalAmount, setTotalAmount] = useState(0)

  // console.log(cartlist,'cartttt')
  //   const totalAmountCalc = () => {
  //     let total = 0
  //     isSelectedItems?.map((item: any) => {
  //       total += item?.product?.price_details?.current_price * item?.quantity
  //     })
  //     setTotalAmount(total)


  //   }


  //   useEffect(() => {
  //     totalAmountCalc()

  //   },[isSelectedItems,cartlist])
  const getList = async (loader :string) => {
    loader == 'loader' && setPageLoading(true)

    const response = await fetchApiData<ApiResponse<any>>('carts/list-cart-items/', { requireAuth: true, checkAccessToken: true })
    if (response?.status_code == 6000) {
      setCartlist(response?.data?.cart_items)
      setCartAmountDetails(response?.data?.cart_amount_details)
      setTimeout(() => {
      setPageLoading(false)
        
      }, 2000);


    } else {
      console.log(response?.data?.message, "message====")
      setPageLoading(false)

    }
    console.log(response, 'cartResponse')
  }

  const removeItem = async (id: any) => {
    console.log(id, 'id cart')

    const response = await postApiData<ApiResponse<any>>(
      `carts/remove-cart-item/${id}/`, {},
      undefined,
      true
    );
    if (response.status_code == 6000) {
      console.log('hello');
      await getList('noloader')

    }
  }

  useEffect(() => {
    getList('loader')
    console.log("inside====")
    console.log('hello')
  }, [isRefresh])

  const router = useRouter()
  const moveItem = async (slug: any, pk: any) => {
    if (accessToken) {
      console.log('hoooooo');

      const itemInWishlist = wishlist.find((item: any) => item.product.slug === slug);

      if (itemInWishlist) {
        console.log(`Item found in wishlist, removing: ${slug}`);
        await removeItem(pk);
      } else {
        console.log(`Item not found in wishlist, adding: ${slug}`);
        await addtoWishlist(slug, pk);
      }
    } else {
      console.log("User not logged in, redirecting to login");
      router.push('/login');
    }
  };
  const getWishList = async (slug: any, pk: any) => {
    const response = await fetchApiData<ApiResponse<any>>('wishlists/list-wishlist-items/', { requireAuth: true })
    if (response?.status_code == 6000) {
      // setWishist(response?.data?.cart_items)
      setWishlist(response?.data?.cart_items)
      await removeItem(pk)
    }
    console.log(response, 'cartResponse')
  }
  const moveToCheckout = async () => {
    console.log('nadeer')
    setLoading(true);
    const selectedItems = cartlist.map((item: any) => item.pk);
    console.log(selectedItems,'itemssss')

    try {
      const response = await postApiData<ApiResponse<any>>(
        `orders/create-order/`,
        {
          selected_items: selectedItems,

        },
        undefined,
        true,
      );

      if (response?.status_code === 6000) {

        const id = response?.data?.order_id
        console.log("Item added checkout!", id);

        router.push(`/checkout/${id}`)

      } else {
        console.error("Failed to add item to cart:", response?.message);
      }
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addtoWishlist = async (slug: any, pk: any) => {
    try {
      const response = await postApiData<ApiResponse<any>>(
        `wishlists/add-wishlist-item/${slug}/`,
        {},
        undefined,
        true
      );
      if (response?.status_code === 6000) {
        await getWishList(slug, pk)
        console.log('resoinsse', response)
        console.log("Item added to cart successfully!", response);
      } else {
        console.error("Failed to add item to cart:", response?.message);
      }
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    } finally {
    }
  };

  console.log(totalAmount, 'heyyyy')
  return (
    <div className='w-full min-h-[100vh]'>
      <Wrapper>
        {
        // pageLoading ? (

        //   <div className='h-[70vh] w-full flex items-center justify-center'>
        //   <PageLoader />

        //   </div>

        // ) : 
        cartlist?.length > 0 ? (
          <div className='relative w-full flex flex-row gap-[16px] justify-between'>
            <div className='w-[65.55%]'>
              <div className='h-auto mb-5 w-full border border-solid border-Platinum px-[24px] py-[16px] rounded-[4px]'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-[2px]'>
                    <TitleComponent title='Delivery to ' />
                    <TitleComponent titleClass='underline' title='130, Al alhasm Al Rumaithi street' />
                  </div>
                  <UnderLinedButton title='Change Address' />
                </div>
                {cartlist.map((item: any, index: any) => (
                <LargeCard key={index} isCart={true} moveItem={() => moveItem(item?.product?.slug, item?.pk)} isRefresh={isRefresh} setRefresh={setRefresh} getList={getList} removeItem={() => removeItem(item?.pk)} onClick={() => router.push(`/${item?.product?.slug}`)} product={item} />

              ))}
              </div>
            </div>
            <div className='w-[26.6%] sticky top-[175px]'>
            <PriceDetail isLoading={isLoading} onClick={() => moveToCheckout()} totalAmount={totalAmount} isCart={true} cartAmountDetails={cartAmountDetails} cartlist={cartlist} />

            </div>
          </div>
        ) : (
          <EmptySection title='Your Cart is Empty' message='Add items to your cart to make your purchase.' />
        )}
      </Wrapper>
    </div>
  );
}