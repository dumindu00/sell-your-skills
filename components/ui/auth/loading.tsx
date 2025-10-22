
import Image from 'next/image'


export const Loading = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Image 
        alt='loading' 
        src="/logo.svg"
        width={120}
        height={120}
        className='animate-ping duration-7000'/>
    </div>
  )
}

