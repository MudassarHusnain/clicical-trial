import React from 'react'
import Logo from './Logo'
import Container from '../global/Container'
import NavLinks from './NavLinks'

function NavBar() {
    return (
        <nav className='fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b'>
            <div className='flex flex-row justify-between items-center h-16'>
                <div className='ms-6'>
                    <Logo />
                </div>
                <div className='pe-8'>
                    <NavLinks />
                </div>
            </div>
        </nav>
    )
}

export default NavBar
