const MenuItem = ({ name, price, qty, image }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">

      <img
        src={image}
        alt={name}
        className="w-14 h-14 object-cover rounded-lg"
      />

      <div className="flex-1">
        <p className="font-semibold">{name}</p>
      </div>

      <div className="text-right">
        <p className="text-orange-500">{price}</p>
        <p className="text-xs">x{qty}</p>
      </div>

    </div>
  );
};

export default MenuItem;