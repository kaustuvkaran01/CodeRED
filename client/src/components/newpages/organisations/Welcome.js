import React from 'react'

function Welcome() {
    return (
        <div>
            <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-20">
      <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-center">
        20 Nov 2020
      </p>
      <div className="max-w-xl mb-5 md:mx-auto sm:text-center lg:max-w-2xl">
        <div className="mb-4">
          <a
            href="/"
            aria-label="Article"
            className="inline-block max-w-lg font-sans text-3xl font-extrabold leading-none tracking-tight text-black transition-colors duration-200 hover:text-deep-purple-accent-700 sm:text-4xl"
          >
            Welcome Organisation
          </a>
        </div>
        <p className="text-base text-gray-700 md:text-lg">
          Here are a few stats 
        </p>
      </div>
    
     
    </div>
        </div>
    )
}

export default Welcome
