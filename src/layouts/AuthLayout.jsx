const AuthLayout = ({ children, hero, reverse = false }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid md:grid-cols-2 w-full min-h-screen bg-white">

        {reverse ? (
          <>
            {children} {/* form kiri */}
            {hero}     {/* hero kanan */}
          </>
        ) : (
          <>
            {hero}     {/* hero kiri */}
            {children} {/* form kanan */}
          </>
        )}

      </div>
    </div>
  );
};

export default AuthLayout;