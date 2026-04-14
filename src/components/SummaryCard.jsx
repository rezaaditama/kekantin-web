const SummaryCard = () => {
  return (
    <div className='bg-white p-4 rounded-xl shadow'>
      <h3 className='font-semibold text-sm'>Ringkasan</h3>

      <div className='flex justify-between text-sm'>
        <span>Subtotal</span>
        <span>Rp 40.000</span>
      </div>

      <hr className='my-2' />

      <div className='flex justify-between font-bold text-orange-500'>
        <span>Total</span>
        <span>Rp 40.000</span>
      </div>

      <div>
        <button className='w-full bg-orange-500 text-white py-2 rounded-lg mt-4 hover:bg-orange-600 transition'>
          Pesan lagi
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;
