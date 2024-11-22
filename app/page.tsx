import PickupLineGenerator from '@/components/PickupLineGenerator'


export default function Home() {
  return (
    <main className=" relative min-h-screen flex items-center flex-col justify-center ">
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Pickup Line Generator</h1>
        <PickupLineGenerator />
      </div>


      <footer className=' justify-center items-center flex flex-col'>
        <p>© {new Date().getFullYear()} Pickup Line Generator</p>
        <p>Made by <a href='https://x.com/sh17va' target='_blank' className=' border-b border-b-purple-200'>Shiva Bhattacharjee</a></p>
      </footer>
    </main>
  )
}

