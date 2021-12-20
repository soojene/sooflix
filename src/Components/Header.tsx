import { Link, useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 40px;
  width: 98px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 3px;
    stroke: red;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  font-weight: 500;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Clicked = styled(motion.span)`
  position: absolute;
  width: 15px;
  height: 1px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 0px 30px 3px 5px;
  /* padding-left: 40px; */
  z-index: -1;
  color: white;
  font-size: 16px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.white.lighter};
  background-color: transparent;
  ::placeholder{
    color: white;
    font-weight: 200;
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);
  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
  };
  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          animate="normal"
          xmlns="http://www.w3.org/2000/svg"
          // width="1024"
          // height="276.742"
          viewBox="18 115 370 15"
        >
          <motion.path d="M55.8984375,132.109375q0,7.734375-5.56640625,12.1875t-15.48828125,4.453125q-9.140625,0-16.171875-3.4375l0-11.25q5.78125,2.578125,9.78515625,3.6328125t7.32421875,1.0546875q3.984375,0,6.11328125-1.5234375t2.12890625-4.53125q0-1.6796875-0.9375-2.98828125t-2.75390625-2.51953125t-7.40234375-3.8671875q-5.234375-2.4609375-7.8515625-4.7265625t-4.1796875-5.2734375t-1.5625-7.03125q0-7.578125,5.13671875-11.9140625t14.19921875-4.3359375q4.453125,0,8.49609375,1.0546875t8.45703125,2.96875l-3.90625,9.4140625q-4.5703125-1.875-7.55859375-2.6171875t-5.87890625-0.7421875q-3.4375,0-5.2734375,1.6015625t-1.8359375,4.1796875q0,1.6015625,0.7421875,2.79296875t2.36328125,2.3046875t7.67578125,4.00390625q8.0078125,3.828125,10.9765625,7.67578125t2.96875,9.43359375z M123.584765625,119.3359375q0,14.1796875-7.03125,21.796875t-20.15625,7.6171875t-20.15625-7.6171875t-7.03125-21.875t7.05078125-21.77734375t20.21484375-7.51953125t20.13671875,7.578125t6.97265625,21.796875z M81.905078125,119.3359375q0,9.5703125,3.6328125,14.4140625t10.859375,4.84375q14.4921875,0,14.4921875-19.2578125q0-19.296875-14.4140625-19.296875q-7.2265625,0-10.8984375,4.86328125t-3.671875,14.43359375z M192.75546875,119.3359375q0,14.1796875-7.03125,21.796875t-20.15625,7.6171875t-20.15625-7.6171875t-7.03125-21.875t7.05078125-21.77734375t20.21484375-7.51953125t20.13671875,7.578125t6.97265625,21.796875z M151.07578125,119.3359375q0,9.5703125,3.6328125,14.4140625t10.859375,4.84375q14.4921875,0,14.4921875-19.2578125q0-19.296875-14.4140625-19.296875q-7.2265625,0-10.8984375,4.86328125t-3.671875,14.43359375z M222.004296875,147.96875l-11.9140625,0l0-57.109375l32.734375,0l0,9.921875l-20.8203125,0l0,14.7265625l19.375,0l0,9.8828125l-19.375,0l0,22.578125z M259.4953125,147.96875l0-57.109375l12.109375,0l0,47.109375l23.1640625,0l0,10l-35.2734375,0z M310.189453125,147.96875l0-57.109375l12.109375,0l0,57.109375l-12.109375,0z M388.34453125,147.96875l-13.828125,0l-13.28125-21.6015625l-13.28125,21.6015625l-12.96875,0l18.9453125-29.453125l-17.734375-27.65625l13.359375,0l12.3046875,20.546875l12.0703125-20.546875l13.046875,0l-17.9296875,28.3203125z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              Home {homeMatch?.isExact && <Clicked layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              TV Shows {tvMatch && <Clicked layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            style={{cursor:"pointer"}}
            onClick={toggleSearch}
            // animate={{ x: searchOpen ? 0 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 -5 17 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;