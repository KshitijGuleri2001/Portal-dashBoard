import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { BsArrowLeftCircle } from 'react-icons/bs'
import { BsHourglassBottom } from "react-icons/bs";
import HamburgerButton from './HamburgerMenuButton/HamburgerButton'
import { FaRegCalendarCheck } from "react-icons/fa";
import { GiTripleYin } from "react-icons/gi";
import { Ri24HoursLine } from "react-icons/ri";
import { ImUserPlus,ImUserMinus  } from "react-icons/im";
import { IoTimerSharp } from "react-icons/io5";
import { BsJournalCheck } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { IoIosPricetags } from "react-icons/io";
const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const location = useLocation()

  const Menus = [
    { title: 'MIS', path: '/mis-data', src:<FaRegCalendarCheck size={20} className="text-blue-700"/>},
    { title: 'Check logs ', path: '/Previous', src:<IoTimerSharp size={20} className="text-green-500" /> },
    { title: 'Subscription ', path: '/profile', src:<ImUserPlus size={20} className="text-blue-500 " />},
    { title: 'Unsubscription ', path: '/Contest', src: <ImUserMinus     size={20}  className="text-red-500" />,
  },
    { title: 'Check Specific Logs' , path: '/checkSpecificLogs', src: <BsJournalCheck   size={20}  className="text-orange-500" />,  },
    { title: 'Check Daily Billing Logs' , path: '/checkDailyBillingLogs', src: <Ri24HoursLine   size={20}  className="text-green-700" />,  },
    { title: 'Check Hourly Logs' , path: '/checkHourlylogs', src: <BsHourglassBottom   size={20}  className="text-orange-500" />,  },
    { title: 'Draw Winnners' , path: '/price', src: <IoIosPricetags   size={20}  className="text-red-600" />,  },
    { title: 'Logout' , path: '/', src: <IoIosLogOut   size={20}  className="text-red-600" />,  },
  ]

  return (
    <>
      <div
      className={`${
        open ? 'w-60' : 'w-fit'
      } h-screen hidden sm:block relative duration-300 bg-white border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-700 shadow-y-xl`}
    >
        <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-300 dark:bg-gray-800 `}
          onClick={() => setOpen(!open)}
        />
       
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
              < GiTripleYin size={50} className="IoFootball animate-spin text-black/80 dark:text-white" style={{ animationDuration: '10s' }}/>
            {open && (
              <span className='text-xl font-bold whitespace-nowrap dark:text-white'>
                H2N
              </span>
            )}
          </div>
  
       
        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
                <hr/>
              <li
                className={`flex items-center gap-x-6 p-3 text-sm font-bold rounded-lg cursor-pointer dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${
                  location.pathname === menu.path &&
                  'bg-black/20 dark:bg-gray-600'
                }`}
              >
              
                <span className='text-xl'>{menu.src}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  'bg-gray-200 dark:bg-gray-700'
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar
// .hide-scrollbar {
//   -ms-overflow-style: none; /* Internet Explorer 10+ */
//   scrollbar-width: none; /* Firefox */
// }

// .hide-scrollbar::-webkit-scrollbar {
//   display: none; /* Safari and Chrome */
// }