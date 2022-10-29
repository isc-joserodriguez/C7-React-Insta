import LogoutPage from "../pages/LogoutPage";
import NewPostPage from "../pages/NewPostPage";
import PrivateHomePage from "../pages/PrivateHomePage";
import ProfilePage from "../pages/ProfilePage";
import SearchPage from "../pages/SearchPage";

export const PRIVATE_ROUTES = [
  {
    path: "/",
    title: "Private Home",
    element: <PrivateHomePage />,
  },
  {
    path: "/new-post",
    title: "New Post",
    element: <NewPostPage />,
  },
  {
    path: "/profile",
    title: "Profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/:username",
    element: <ProfilePage />,
  },
  {
    path: "/search",
    title: "Search",
    element: <SearchPage />,
  },
  {
    path: "/logout",
    title: "Logout",
    element: <LogoutPage />,
  },
];
