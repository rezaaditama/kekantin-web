const AuthHeroLogin = ({ image }) => {
  return (
    <div className="hidden md:block relative h-full">

      <img
        src={image}
        alt="canteen"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-orange-500/40"></div>

      <div className="absolute bottom-16 left-12 right-10 text-white max-w-md">
        <h1 className="text-4xl font-bold leading-snug mb-6">
          Temukan Menu Favoritmu dari Kantin Kampus
        </h1>

        <p className="text-base opacity-90 leading-relaxed">
          Nikmati kemudahan memesan makanan favorit dari berbagai tenant
          kantin kampus tanpa perlu antre.
        </p>
      </div>

    </div>
  );
};

export default AuthHeroLogin;