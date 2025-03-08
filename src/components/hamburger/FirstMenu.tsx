"use client"
import fetchApiData from '@/config/fetch-api-data';
import React, { useEffect, useState } from 'react'
import Icon from '../includes/Icon';
import { cn } from '@/utils/utils';
import VectorIcon from '../../../public/assets/icons/vector_black.svg'
import SecondaryMenu from './SecondaryMenu';
import CustomButton from '../buttons/CustomButton';
import { useRouter } from 'next/navigation';
import useZustandStore from '@/store/useStore';


function FirstMenu() {
  const router = useRouter()
  const { clearAccessToken, userInfo } = useZustandStore();
  const [isActiveMegaMenu, setActiveMegaMenu] = useState(false)
  const [activeIndex, setActiveIndex] = useState<any>(10000)
  const [data, setData] = useState<any[]>([]); // Adjust type based on your data structure



  const getData = async () => {
    try {
      const response = await fetchApiData<any>('products/list-all-categories/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSignin = () => {
    router.push("/login")
  }


  useEffect(() => {
    getData();
  }, []);


  return (
    <div className=" w-full rounded-tl-[6px] rounded-bl-[6px]   h-full py-6  flex flex-col justify-between overflow-y-scroll no-scrollbar">
      <div className='w-full'>
        {!isActiveMegaMenu &&
          <h4 className='px-9 text-[#222222] pb-2 text-[16px] rubik_medium'>
            Shop by Category
          </h4>
        }

        {!isActiveMegaMenu && data?.map((section: any, index: any) => (
          <div
            onClick={() => {
              if (isActiveMegaMenu == false) {
                setActiveMegaMenu(true);
                setActiveIndex(index)
              }
              else {
                setActiveMegaMenu(false);
                setActiveIndex(null)


              }
            }}

            key={index} className="flex px-9 justify-between items-center cursor-pointer py-3">
            <div className='flex gap-2'>
              <Icon src={section.icon} height={'18px'} width={'18px'} alt={'vectorIcon'} />

              <h4 className=' rubik_regular text-[14px]'>{section.name}</h4>
            </div>
            {/* <div>{getIcon({ icon: 'vector_black', className: 'w-[15px] rotate-0' })}</div>
             */}

            <div
              className={cn(
                'transition-transform duration-300',
                index == activeIndex ? '-rotate-90' : 'rotate-0'
              )}
            >
              <Icon src={VectorIcon} height={'20px'} width={'20px'} alt={'vectorIcon'} />
            </div>
          </div>
        ))}
        {
          isActiveMegaMenu &&
          <div className='w-full' >
            <SecondaryMenu setActiveMegaMenu={setActiveMegaMenu} setActiveIndex={setActiveIndex} data={data?.[activeIndex]?.departments} />
          </div>
        }

      </div>
      <div className='px-6'>
        {
          userInfo ?
            <>
              <div className='w-full rubik_medium mb-3 text-[18px] text-[#1D252C] py-2 border-[#E2E4E5] border-solid border-b '>Hello, {userInfo?.first_name}</div>
              <CustomButton
                onClick={() => {
                  clearAccessToken()
                 window.location.reload()
                }}
                title='Sign out'
                buttonClass=''
                isButtonClass={true}
                istTitleClass={true}
                titleClass='text-[#040C13]
                                       rubik_medium text-[16px]'/>
            </> :
            <CustomButton
              onClick={handleSignin}
              title='Sign In'
              buttonClass='bg-[#FFE000]'
              isButtonClass={true}
              istTitleClass={true}
              titleClass='text-[#040C13] rubik_medium text-[16px]'/>

        }

      </div>


    </div>
  )
}

export default FirstMenu
