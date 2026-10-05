'use client'

import { useState } from 'react'
import { Pause, Play } from 'lucide-react'

const messages = ['Handcrafted in Goa', 'Because details matter', 'Your nails, your mood', 'Pan-India shipping', 'A little everyday luxury']

export default function MarqueeSection() {
  const [paused, setPaused] = useState(false)
  return (
    <div className="marquee relative">
      <div className="marquee-track" style={paused ? { animationPlayState: 'paused' } : undefined}>
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group" aria-hidden={copy === 1 ? true : undefined}>
            {messages.map((message) => <span key={message} className="flex items-center gap-10 whitespace-nowrap"><span aria-hidden="true">✦</span>{message}</span>)}
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play announcement animation' : 'Pause announcement animation'}
        className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-[#d4b779] border border-[#202739]/20 hover:bg-[#e3c98f] motion-reduce:hidden">
        {paused ? <Play size={12} /> : <Pause size={12} />}
      </button>
    </div>
  )
}
