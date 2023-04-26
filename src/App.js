import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  redirect,
  Navigate,
} from "react-router-dom";

import { Home, Login, Signup } from "./views/pages";
import AuthLayout from "./views/layouts/AuthLayout";
import PublicLayout from "./views/layouts/PublicLayout";

function App() {
  return (
    <Routes>
      {/* <Route path="/*" element={<Navigate to="/home" replace />} /> */}
      <Route
        path="/*"
        element={
          <AuthLayout>
            <Home />
          </AuthLayout>
        }
      />

      {/* <Route
        path="/home/*" // we are putting "/*" here because it has switch router inside
        element={
          <AuthLayout>
            <Home />
          </AuthLayout>
        }
      /> */}

      <Route
        path="login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />

      <Route
        path="signup"
        element={
          <PublicLayout>
            <Signup />
          </PublicLayout>
        }
      />
      {/* <Route path="*" element={<Navigate to="/notfound" replace />} /> */}
    </Routes>
  );
}

export default App;
