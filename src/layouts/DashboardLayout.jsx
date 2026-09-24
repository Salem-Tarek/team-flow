import { Outlet } from "react-router-dom";

function PostsLayout() {
    return (
        <div className="Posts Wrapper">
            <h3 className="text-2xl text-green-500 font-bold mb-4">Hello Posts Layout</h3>
            <Outlet />
        </div>
    )
}

export default PostsLayout;