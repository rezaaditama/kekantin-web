const OrderHeader = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between">
      <div>
        <h2 className="font-semibold">Pesanan #123</h2>
        <p className="text-sm text-gray-500">Hari ini</p>
      </div>

      <span className="bg-green-100 text-green-600 px-3 py-3 rounded-full text-xs">
        SELESAI
      </span>
    </div>
  );
};

export default OrderHeader;

