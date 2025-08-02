import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    <div className='w-full h-full bg-black  overflow-y-auto'>
      {/* Heading */}
      <div className="sticky top-0 bg-black underline z-10  py-2">
        <Link to="/settings" className='text-[#FFD700] text-3xl px-3 font-bold cursor-pointer hover:text-white transition-all duration-300'>
          Settings.
        </Link>
        <div className='w-full h-0.5 bg-amber-400 mt-2'></div>
      </div>
      {/* Long paragraph */}
      <div className='text-[#FFD700] text-sm leading-relaxed mt-5 px-2'>
        empore fugiat distinctio nam nulla praesentium aspernatur doloremque sapiente minus omnis. Vel ipsa suscipit in, dolorem fugiat vitae autem debitis tenetur eaque, modi veritatis aliquid sequi distinctio accusamus optio possimus ex repellendus minus ullam quasi, perferendis tempora! Quod, eos dicta dolore voluptas corrupti tempora nisi hic tempore eaque, sint maiores ducimus corporis fugiat deleniti dolorem architecto, fuga suscipit vel? Sit corporis vero iusto nobis provident maxime fuga itaque mollitia maiores quod repellendus ullam harum, perspiciatis praesentium porro neque perferendis voluptatum! Quidem temporibus officiis sint consequuntur, minima dolorem in, eveniet quos culpa adipisci incidunt. Odio illum impedit dolor exercitationem aliquam, fuga sunt ipsa quisquam laborum ab officiis, aut dicta sit itaque totam earum. Voluptate sunt natus facere quaerat impedit iste exercitationem explicabo eveniet assumenda vero ad quis hic perferendis, provident ab autem quia odit cumque sa aspernatur!
      </div>
    </div>
  )
}

export default Settings 