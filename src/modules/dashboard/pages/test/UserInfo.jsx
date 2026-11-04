import { memo } from 'react';

export default memo(function UserInfo({ user }) {
    console.log("UserInfo rendered");

    return (
        <div>
            <h2>Hello</h2>
            {/* <h2>{user.name}</h2>
            <p>{user.role}</p> */}
        </div>
    );
})
