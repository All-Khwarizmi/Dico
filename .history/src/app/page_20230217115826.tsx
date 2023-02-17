import Image from 'next/image'
import { Inter } from '@next/font/google'

import EspModal from '@/components/EspModal'
import DicoModal from '@/components/DicoModal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='w-screen h-screen'>
      <div className=' grid grid-cols-2 gap-5 py-5 content-center'>
     {/*    <EspModal />

        <DicoModal /> */}
      </div>
    </main>
  );
}
