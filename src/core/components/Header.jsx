import Logo from '../../assets/Logo.png';

export function Header() {
  return (
    <>
      <div className="bg-[#2D6DF6] h-20 w-[100%] py-10 px-14 flex justify-center items-center ">
        <img src={Logo} alt="LOGO-SURA" />
      </div>
    </>
  );
}

