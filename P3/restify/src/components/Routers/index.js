
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "../Home";
import Layout from "../Templates/Layout";
import Signup from "../User/Signup";
import MyProfile from "../User/MyProfile";
import EditProfile from "../User/EditProfile";
import Notification from "../Notification";
import Login from "../User/Login";
import CreateRestaurant from "../Restaurant/CreateRestaurant";
import MyRestaurant from "../Restaurant/MyRestaurant";
import EditRestaurant from "../Restaurant/EditRestaurant";

import Menu from"../Restaurant/Menu";
import EditMenu from"../Restaurant/EditMenu";
import EditFood from"../Restaurant/EditFood";

import AddBlog from "../Blog/addBlog";
import Feed from "../Blog/Feed";
import SearchRestaurant from "../Restaurant/SearchRestaurant";
import ViewRestaurant from "../Restaurant/ViewRestaurant";
import ViewBlog from "../Blog/ViewBlog";
import ViewBlogComment from "../Blog/BlogComments/ViewBlogComment";



const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}/>
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route path="myProfile" element={<MyProfile />} />
                    <Route path="editProfile" element={<EditProfile />} />
                    <Route path="notification" element={<Notification />} />
                    <Route path="createRestaurant" element={<CreateRestaurant />} />
                    <Route path="myRestaurant" element={<MyRestaurant />} />
                    <Route path="editRestaurant" element={<EditRestaurant />} />

                    <Route path="Menu" element={<Menu />} />
                    <Route path="EditMenu" element={<EditMenu />} />
                    <Route path="EditFood" element={<EditFood />} />

                    <Route path="addBlog" element={<AddBlog />} />
                    <Route path="ViewBlog" element={<ViewBlog />} />
                    <Route path="feed" element={<Feed />} />
                    <Route path="search" element={<SearchRestaurant />} />
                    <Route path="viewRestaurant" element={<ViewRestaurant />} />
                    <Route path="ViewBlogComments" element={<ViewBlogComment />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
