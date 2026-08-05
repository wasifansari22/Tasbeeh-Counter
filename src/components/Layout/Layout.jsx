import './Layout.css'

import React from 'react'

const Layout = ({ children }) => {
    return (
        <main className='app'>
            <section className='container'>
                {children}
            </section>
        </main>
    )
}

export default Layout