import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut())
  }
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 onClick={handleLogout} className="text-2xl font-bold text-gray-900">Logout</h1>
          <nav className="hidden md:flex space-x-6 text-gray-700 font-semibold">
            <a
              href="#"
              className="hover:text-gray-900 px-4 py-2 rounded-full hover:bg-pink-100 hover:ring-pink-400 transition duration-300"
            >
              Blog Home
            </a>
            <a
              href="#"
              className="hover:text-gray-900 px-4 py-2 rounded-full hover:bg-pink-100 hover:border-pink-400 transition duration-300"
            >
              Pricing
            </a>
            <a
              href="#"
              className="hover:text-gray-900 px-4 py-2 rounded-full hover:bg-pink-100 hover:border-pink-400 transition duration-300"
            >
              Explore ClickUp
            </a>
            <a
              href="#"
              className="hover:text-gray-900 px-4 py-2 rounded-full hover:bg-pink-100 hover:border-pink-400 transition duration-300"
            >
              Teams
            </a>
            <a
              href="#"
              className="hover:text-gray-900 px-4 py-2 rounded-full hover:bg-pink-100 hover:border-pink-400 transition duration-300"
            >
              Topics
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="hidden md:block bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:ring focus:ring-blue-300"
            />
            <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-300">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-10 gap-6">
        {/* Left Content */}
        <div className="space-y-6 col-span-4">
          <h2 className="text-6xl font-bold text-gray-900 leading-tight">
            Project management tips & trends, delivered.
          </h2>
          <p className="text-gray-600">
            Join productivity hackers from around the world that receive
            WriteClick—the ClickUp Blog Newsletter.
          </p>
          <div className="flex space-x-4">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-grow bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:ring focus:ring-pink-300"
            />
            <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <span>Follow us on:</span>
            <a
              href="#"
              className="hover:text-gray-900 hover:bg-pink-100 hover:border hover:border-pink-400 px-2 py-1 rounded transition duration-300"
            >
              🐦
            </a>
            <a
              href="#"
              className="hover:text-gray-900 hover:bg-pink-100 hover:border hover:border-pink-400 px-2 py-1 rounded transition duration-300"
            >
              💼
            </a>
            <a
              href="#"
              className="hover:text-gray-900 hover:bg-pink-100 hover:border hover:border-pink-400 px-2 py-1 rounded transition duration-300"
            >
              📷
            </a>
            <a
              href="#"
              className="hover:text-gray-900 hover:bg-pink-100 hover:border hover:border-pink-400 px-2 py-1 rounded transition duration-300"
            >
              📘
            </a>
          </div>
        </div>

        {/* Right Content */}
        <div className="bg-white col-span-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:bg-pink-50 hover:border hover:border-pink-400 transition duration-300">
          <img
            src="https://clickup.com/blog/wp-content/uploads/2024/09/Chat-Blog-Image.png"
            alt="ClickUp Chat"
            className="w-full h-[430px] object-cover hover:scale-105 transition duration-300"
          />
          <div className="flex justify-center items-center gap-4">
            <h3 className="text-xl font-bold text-gray-900 hover:text-pink-600 transition duration-200">
              Chat Is Broken. We're Fixing It.
            </h3>
            <div className="flex items-center mt-4 space-x-4 text-gray-600">
              <img
                src="https://via.placeholder.com/40"
                alt="Author"
                className="w-10 h-10 rounded-full hover:ring-2 hover:ring-pink-600 transition duration-200"
              />
              <span>Zeb Evans</span>
              <span className="text-sm">• Max 1 min read</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainLayout;
