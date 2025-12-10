const Logo = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex gap-1">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-sidebar-foreground font-bold text-lg leading-tight">MANDELA</span>
        <span className="text-sidebar-foreground/70 text-xs tracking-widest">LEGACY</span>
      </div>
    </div>
  );
};

export default Logo;
