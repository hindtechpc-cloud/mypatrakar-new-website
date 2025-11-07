 export  function MenuButton() {
  return (
    <div className="flex items-center gap-3 text-white">
      <div className="flex items-end justify-end flex-col gap-1">
        <span className="block w-5 h-[2px] bg-white"></span>
        <span className="block w-5 h-[2px] bg-white"></span>
        <span className="block w-3 h-[2px] bg-white"></span>
      </div>
      <span className="text-xs font-medium">Menu</span>
    </div>
  );
}