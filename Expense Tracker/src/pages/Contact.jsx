import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className='w-full h-full bg-black text-[#FFD700] overflow-y-auto'>

      {/* Sticky Header */}
      <div className="sticky top-0 bg-black underline z-10 py-2">
        <Link to="/contact" className='text-[#FFD700] text-3xl px-3 font-bold cursor-pointer hover:text-white transition-all duration-300'>
          Contact.
        </Link>
        <div className='w-full h-0.5 bg-amber-400 mt-2'></div>
      </div>

      {/* Contact Content */}
      <div className='px-4 py-6'>

        {/* CTA Line */}
        <h3 className="text-white text-base italic mb-3">Got a question or just want to say hi? I'm just a click away.</h3>

        {/* Section Heading */}
        <h2 className='text-2xl font-semibold mb-2'>Let’s Connect</h2>
        <p className='text-sm leading-relaxed mb-6 text-[#e4c95a]'>
          Feel free to reach out — whether it’s feedback, collaboration, or tech talk. I'm open to opportunities and networking!
        </p>

        {/* Divider */}
        <div className="w-full h-0.5 bg-[#FFD700] my-4 rounded"></div>

        {/* Contact Details */}
        <div className="space-y-4 text-sm">

          <div className='flex items-center gap-2'>
            <span className="font-bold">📞 Phone:</span>
            <span className="text-white">8698503198</span>
          </div>

          <div className='flex items-center gap-2'>
            <span className="font-bold">📧 Email:</span>
            <span className="text-white">karanmagham09@gmail.com</span>
          </div>

          <div className='flex items-center gap-2'>
            <span className="font-bold">💼 GitHub:</span>
            <a
              href="https://github.com/KaranMagham"
              target="_blank"
              rel="noopener noreferrer"
              className='text-white underline hover:text-[#FFD700] transition-all duration-300'
            >
              github.com/KaranMagham
            </a>
          </div>

          <div className='flex items-center gap-2'>
            <span className="font-bold">🔗 LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/karanmaghamb099/"
              target="_blank"
              rel="noopener noreferrer"
              className='text-white underline hover:text-[#FFD700] transition-all duration-300'
            >
              linkedin.com/in/karanmaghamb099
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-0.5 bg-[#FFD700] my-6 rounded"></div>

        {/* Made By */}
        <div className='text-center text-sm text-[#aaa]'>
          <p className='mb-1'>🚀 Built with ❤️ using React, Tailwind CSS, and MongoDB</p>
          <p className='text-white font-semibold'>Made by <span className='text-[#FFD700]'>Karan Magham</span> © 2025</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
