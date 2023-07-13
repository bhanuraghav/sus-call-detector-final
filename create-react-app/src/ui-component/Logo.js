// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import logo from 'assets/images/logo3.png';
// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  return <img src={logo} alt="Deutsche Bank" height="30px" width="160" />;
};

export default Logo;
