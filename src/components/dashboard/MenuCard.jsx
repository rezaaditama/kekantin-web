const MenuCard = ({ shop_name, shop_src, shop_location }) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100'>
      <img
        src={shop_src}
        className='w-full h-32 md:h-48 object-cover'
        alt={shop_name}
      />

      <div className='p-3 md:p-4'>
        <h3 className='font-bold text-sm md:text-lg mb-1 md:mb-2 text-center line-clamp-1'>
          {shop_name}
        </h3>

        <p className='text-[10px] md:text-sm text-gray-500 text-center line-clamp-1 italic'>
          {shop_location}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
