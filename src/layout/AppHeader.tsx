import { Link, useNavigate } from "react-router-dom"
import Button from "../components/ui/Button/Button"

const AppHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
    navigate("/signin")
    // window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 bg-white">
      <div className="lg:flex justify-between gap-6 px-10 py-5 items-center sm:hidden ">
        <div className="flex gap-6">
          <div className="cursor-pointer border rounded-lg border-zinc-300 px-5 py-2.5">
            <button className="text-zinc-400 cursor-pointer">X</button>
          </div>
          <div className="flex gap-4 items-center rounded-lg border-zinc-300 border-1">
            <div className="flex ">
              <Button className="pl-5 pr-2 cursor-pointer bg-white hover:bg-white">
                <svg
                  className="fill-gray-400 "
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </Button>
              <input className="py-2 px-3 focus:outline-none focus:border-black" type="text" placeholder="Search or type command..." />
            </div>
            <div className="pr-2">
              <div className="px-4 bg-zinc-100 rounded-sm">
                <span className="text-zinc-400">⌘</span>
                <span className="text-zinc-400">K</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="flex justify-between px-10 py-5 lg:hidden">
        <div className="cursor-pointer border rounded-lg border-zinc-300 px-4.5 py-2">
          <button className="text-zinc-400 cursor-pointer">X</button>
        </div>
        <div className="">
          <Link to="/">
            {/* <img src="/images/logo/logo.svg" alt="Logo" width={150} height={40} /> */}
            LOGO
          </Link>
        </div>
        <div className="cursor-pointer ">
          ...
        </div>
      </div>
      <hr className="text-zinc-300 sm:hidden" />
    </header>
  )
}

export default AppHeader