import MenuItem from "../components/MenuItem";
import OrderHeader from "../components/OrderHeader";
import PaymentCard from "../components/PaymentCard";
import SummaryCard from "../components/SummaryCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import nasgor from "../assets/nasgor.png";
import mi from "../assets/mi.jpg";

const Detailpesanan = () => {

  const menu = [
    {
      name: "Nasgor",
      price: "Rp 15.000",
      qty: 2,
      image: nasgor,
    },
    {
      name: "mi goreng",
      price: "Rp 10.000",
      qty: 1,
      image: mi,
    },
  ];

  return (
    <>
      <Navbar />

      {/* FIX DI SINI */}
      <main className="pt-5 bg-white-100 p-6">

        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">

          <div className="col-span-2 space-y-4">
            <OrderHeader />

            <h3 className="text-sm font-semibold">
              Rincian Menu
            </h3>

            {menu.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>

          <div className="space-y-4">
            <PaymentCard />
            <SummaryCard />
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
};

export default Detailpesanan;