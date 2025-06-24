const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user)
export const checkAuth = () => {
    if (!user?.user_name || !user?.email || !user?.user_id) {
        return null;
    }
    return user;
};