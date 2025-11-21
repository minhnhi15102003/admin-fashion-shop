import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import AppSlideBar from './AppSlideBar'

export const LayoutContent = () => {
  return (
    <div className='min-h-screen xl:flex'>
      <div>
        <AppSlideBar/>
      </div>
      <div className='flex-1 transition-all duration-300 ease-in-out lg:ml-[290px]'>
        <AppHeader/>
        <div className='p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

const AppLayout = () => {
  return <LayoutContent/>
}

export default AppLayout