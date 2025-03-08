import Wrapper from "@/components/includes/Wrapper"
import SideBar from "./_components/SideBar"

export default function MyAcountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Wrapper className="pr-0">
            <div className='flex w-full relative '>
                <div className="w-[20%] max-lg:w-[22%] z-30 top-[170px] h-full mb-5 sticky max-[850px]:hidden ">
                    <SideBar />
                </div>
                <div className="flex-1">
                    {children}
                </div>


            </div>
        </Wrapper>

    )
}