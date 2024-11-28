import { useState } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const fadeInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  max-width: ${(props) => (props.$isOpened ? "220px" : "50px")};
  transition: max-width 0.3s ease-in-out;
  margin: 10px auto;
  padding: 20px 20px 20px 20px;
  background-color: ${(props) =>
    props.$color === "light"
      ? "var(--color-sidebar-background-light-default)"
      : "var(--color-sidebar-background-dark-default)"};
  color: ${(props) =>
    props.$color === "light"
      ? "var(--color-text-light-default)"
      : "var(--color-text-dark-default)"};
  border: 3px solid
    ${(props) =>
      props.$color === "light"
        ? "var(--color-sidebar-background-light-hover)"
        : "var(--color-sidebar-background-dark-hover)"};
  border-radius: 20px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  padding-left: 4px;

  animation: ${(props) => (props.$loadPage ? fadeInFromTop : "none")} 0.3s
    ease-in-out;
`;

const WrapperLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  position: relative;
`;

const TextLogo = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) =>
    props.$color === "light"
      ? "var(--color-text-logo-light-default)"
      : "var(--color-text-logo-dark-default)"};
  transform: ${(props) =>
    props.$isOpened ? "translateX(0)" : "translateX(20px)"};
  opacity: ${(props) => (props.$isOpened ? 1 : 0)};
  transition: all 0.2s ease-in-out;

  animation: ${(props) => (props.$loadPage ? fadeInFromTop : "none")} 0.3s
    ease-in-out;
`;

const Button = styled.div`
  position: absolute;
  right: ${(props) => (props.$isOpened ? "-30px" : "-60px")};
  transition: right 0.3s ease-in-out;
  top: 5px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$color === "light"
      ? "var(--color-button-background-light-default)"
      : "var(--color-button-background-dark-default)"};
  border-radius: 50%;
  padding: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: ${(props) =>
      props.$color === "light"
        ? "var(--color-button-background-light-active)"
        : "var(--color-button-background-dark-active)"};
  }

  opacity: 0;
  visibility: ${(props) => (props.$loadPage ? "visible" : "hidden")};
  animation: ${(props) => (props.$loadPage ? fadeInFromRight : "none")} 0.3s
    ease-in-out;
  animation-delay: 1.8s;
  animation-fill-mode: forwards;
`;

const AllRoutes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 90px;
`;

const Route = styled(AllRoutes)`
  gap: 10px;
`;

const RouteLink = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
  font-weight: 600;
  padding: 10px ${(props) => (props.$isOpened ? "20px" : "16px")};
  border-radius: 15px;
  color: ${(props) =>
    props.$active
      ? props.$color === "light"
        ? "var(--color-text-light-active)"
        : "var(--color-text-dark-active)"
      : props.$color === "light"
      ? "var(--color-text-light-default)"
      : "var(--color-text-dark-default)"};
  background-color: ${(props) =>
    props.$active
      ? props.$color === "light"
        ? "var(--color-sidebar-background-light-active)"
        : "var(--color-sidebar-background-dark-active)"
      : null};

  &:hover {
    color: ${(props) =>
      !props.$active
        ? props.$color === "light"
          ? "var(--color-text-light-hover)"
          : "var(--color-text-dark-hover)"
        : null};
    background-color: ${(props) =>
      !props.$active
        ? props.$color === "light"
          ? "var(--color-sidebar-background-light-hover)"
          : "var(--color-sidebar-background-dark-hover)"
        : null};
  }
  transition: color 0.1s ease-in-out;

  opacity: 0;
  visibility: ${(props) => (props.$loadPage ? "visible" : "hidden")};

  animation: ${(props) =>
      props.$loadPage
        ? props.$bottom
          ? fadeInFromBottom
          : fadeInFromTop
        : "none"}
    0.2s linear;
  animation-delay: ${(props) => props.$index * 0.2}s;
  animation-fill-mode: forwards;
`;

const RouteText = styled.span`
  transform: ${(props) =>
    props.$isOpened ? "translateX(0)" : "translateX(20px)"};
  opacity: ${(props) => (props.$isOpened ? 1 : 0)};
  transition: all 0.2s ease-in-out;
`;

const Sidebar = (props) => {
  const { color } = props;
  const [isOpened, setIsOpened] = useState(true);
  const [activeRoute, setActiveRoute] = useState("");
  const loadPage = true;
  const containerClassnames = classnames("sidebar", { opened: isOpened });

  const goToRoute = (path) => {
    console.log(`going to "${path}"`);
    setActiveRoute(path);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  return (
    <Wrapper
      $color={color}
      $isOpened={isOpened}
      className={containerClassnames}
    >
      <WrapperLogo>
        <Logo $loadPage={loadPage} src={logo} alt="TensorFlow logo" />
        <TextLogo $color={color} $isOpened={isOpened} $loadPage={loadPage}>
          TensorFlow
        </TextLogo>
        <Button
          $color={color}
          $isOpened={isOpened}
          $loadPage={loadPage}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
        </Button>
      </WrapperLogo>
      <AllRoutes>
        <Route>
          {routes.map((route, index) => (
            <RouteLink
              $color={color}
              key={route.title}
              onClick={() => {
                goToRoute(route.path);
              }}
              $active={activeRoute === route.path}
              $loadPage={loadPage}
              $index={index + 1}
            >
              <FontAwesomeIcon icon={route.icon} />

              <RouteText $isOpened={isOpened}>{route.title}</RouteText>
            </RouteLink>
          ))}
        </Route>
        <Route>
          {bottomRoutes.map((route, index) => (
            <RouteLink
              $color={color}
              key={route.title}
              onClick={() => {
                goToRoute(route.path);
              }}
              $active={activeRoute === route.path}
              $loadPage={loadPage}
              $index={index + 6}
              $bottom
            >
              <FontAwesomeIcon icon={route.icon} />
              <RouteText $isOpened={isOpened}>{route.title}</RouteText>
            </RouteLink>
          ))}
        </Route>
      </AllRoutes>
    </Wrapper>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;
