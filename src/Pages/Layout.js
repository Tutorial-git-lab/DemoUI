import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="container-fluid d-flex align-item-center justify-content-left  ">
        <nav className="navbar navbar-expand-lg p-0 ">
          <div className="container-fluid w-100 ">
            {/* <a className="navbar-brand " href="#">
              {props.title}
            </a> */}
            <div
              className="collapse navbar-collapse p-0 "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto  mb-lg-0 ">
                <li className="nav-item p-2 mx-3">
                  <NavLink className="nav-link " to="/">
                    <strong>Home</strong>
                  </NavLink>
                </li>
                <li className="nav-item p-2 mx-3">
                  <NavLink className="nav-link " to="/country">
                    <strong> Country</strong>
                  </NavLink>
                </li>
                <li className="nav-item p-2 mx-3">
                  <NavLink className="nav-link " to="/state">
                    <strong>State</strong>
                  </NavLink>
                </li>

                <li className="nav-item p-2 mx-3">
                  <NavLink className="nav-link " to="/district">
                    <strong>District</strong>
                  </NavLink>
                </li>
                <li className="nav-item p-2 mx-3">
                  <NavLink className="nav-link " to="/">
                    <strong>Login</strong>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
