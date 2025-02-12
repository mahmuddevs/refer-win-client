import { useState } from "react"
import { CiMenuFries } from "react-icons/ci"
import { IoMdClose } from "react-icons/io"
import { motion } from "motion/react"

const Header = () => {
    const [navOpen, setNavOpen] = useState(false)
    const navItems = (
        <>
            <li className="flex justify-between">
                <a href='/'>Home</a>
                <IoMdClose onClick={() => { setNavOpen(false) }} className="block lg:hidden cursor-pointer" />
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </>
    )
    return (
        <header className="z-50 fixed left-0 right-0 bg-[#151515]/50">
            <div className="w-11/12 md:container mx-auto flex justify-between items-center py-4 md:py-2 text-white">
                <a to='/' className="font-cinzel">
                    <h4 className="font-black md:text-2xl">Refer & Earn</h4>
                </a>
                <nav>
                    <motion.ul className={`uppercase flex flex-col lg:flex-row lg:items-center gap-6 font-semibold fixed lg:static top-0  w-56 h-screen lg:h-auto lg:w-auto p-8 md:py-4 bg-[#151515]/90 lg:bg-transparent`}
                        initial={{ right: '-14rem' }}
                        animate={{ right: navOpen ? '0' : '-14rem' }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        {navItems}
                    </motion.ul>
                    <div>
                        <CiMenuFries onClick={() => { setNavOpen(true) }} className="block lg:hidden" />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header