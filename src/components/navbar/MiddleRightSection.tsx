import React from 'react'
import Icon from '../includes/Icon'
import { navBarMiddle } from '@/utils/staticUtils';
// import useStore from '@/store/useStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useZustandStore from '@/store/useStore';
import searchIcon from '../../../public/assets/icons/search-gray.svg';



function MiddleRightSection({ setSearchVisble, searchvisible }: any) {
  const router = useRouter()
  const userInfo = useZustandStore.getState().userInfo;
  const { cartlist } = useZustandStore()


  const filterednavBarMiddle = navBarMiddle.map((item) => {
    if (item.label === 'My Account' && !userInfo) {
      return {
        ...item,
        label: 'Login',
        route: '/login',
      };
    }
    return item;
  });

  return (
    <div className='flex gap-4 max-sm:gap-3 max-[480px]:gap-2 '>
      <button className='hidden max-sm:flex justify-center items-center min-w-[26px] h-[26px] '
        onClick={() => { setSearchVisble(true) }}>
        <Icon src={searchIcon} width={26} height={26} alt="icon" className="min-w-[20px] inline-block" />
      </button>

      {filterednavBarMiddle?.map((item: any, index) => (<>

        <Link aria-label={`go to ${item?.route}`} key={index} className='flex justify-between items-center gap-1' href={item?.route} >
          <div className='relative'>
            <Icon src={item?.icon} width={24} height={24} alt="icon" className="min-w-[20px] w-[24px] inline-block" />
            {index == 2 && cartlist?.length > 0 && <div className='absolute -top-4   rounded-full w-[20px] h-[20px] flex items-center justify-center'>
              <span className='text-yellow-500 rubik_regular'>{cartlist?.length}</span>
            </div>}
          </div>
          <h5 className='text-[#fff] max-lg:hidden text-[14px] max-[980px]:text-[13px]'>{item?.label}</h5>
        </Link></>
      ))}

    </div>
  )
}

export default MiddleRightSection
