function BlinkCounter({ count }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-6xl font-bold tracking-tighter text-white">
        {count}
      </span>
      <span className="text-xs font-medium uppercase tracking-widest text-white/30">
        Blinks detected
      </span>
    </div>
  )
}

export default BlinkCounter