import AuthLayOut from "../components/layout";

const { createBrowserRouter } = require("react-router-dom");
const { default: App } = require("../App");
const { default: RegisterPage } = require("../pages/RegisterPage");
const { default: CheckEmailPage } = require("../pages/CheckEmailPage");
const { default: CheckPasswordPage } = require("../pages/CheckPasswordPage");
const { default: Home } = require("../pages/Home");
const { default: MessagePage } = require("../components/MessagePage");


const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                path: "register",
                element: <AuthLayOut><RegisterPage /></AuthLayOut>
            },
            {
                path: "email",
                element:<AuthLayOut><CheckEmailPage /></AuthLayOut>
            },
            {
                path: "password",
                element: <AuthLayOut><CheckPasswordPage /></AuthLayOut>
            },
            {
                path: "",
                element: <Home />,
                children: [
                   {
                    path: ":userId",
                    element: <MessagePage />
                   }
                ]
            },
        ]
    }
]);

export default router;