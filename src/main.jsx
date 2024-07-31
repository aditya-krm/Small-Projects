import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./Pages/Home";
import { ChatBox } from "./components";
const ChatApp = lazy(() => delayForDemo(import("./Pages/ChatApp")));
const WeatherApp = lazy(() => delayForDemo(import("./Pages/WeatherApp")));
const CurrencyConvertor = lazy(() =>
  delayForDemo(import("./Pages/CurrencyConvertor"))
);

const Loading = () => {
  return (
    <h1 className=" text-center text-2xl my-72 text-gray-500">Loading...</h1>
  );
};
function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="" element={<Home />} />
      <Route
        path="chat-app"
        element={
          <Suspense fallback={<Loading />}>
            <ChatApp />
          </Suspense>
        }
      />
      <Route path="chat/:roomId" element={<ChatBox />} />
      <Route
        path="weather-app"
        element={
          <Suspense fallback={<Loading />}>
            <WeatherApp />
          </Suspense>
        }
      />
      <Route
        path="currency-convertor"
        element={
          <Suspense fallback={<Loading />}>
            <CurrencyConvertor />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <div className="text-red-700 font-bold text-3xl">
            Error: 404 Page not Found
          </div>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
