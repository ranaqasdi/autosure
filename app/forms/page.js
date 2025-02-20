import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function Forms(props) {
    return (
        <div className='flex justify-center items-center h-screen'>
            <button className='bg-green-500 py-5 px-12 '> 
                <Link href="/forms/nda-forms" >New NDA Form</Link>

            </button>
        </div>
    )
}

Forms.propTypes = {

}

export default Forms

