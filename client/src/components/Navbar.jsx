import { Badge } from '@material-ui/core'
import { Search, ShoppingBasketOutlined } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Container = styled.div`
    height: 60px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
 border: none;
`

const Left = styled.div`
 flex: 1;
 display: flex;
 align-items: center;
`
const Language = styled.span`
    font-size :14px;
    cursor: pointer;
`
const Center = styled.div`
flex: 1;
text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`

const Navbar = () => {
    console.log(useSelector(state=>state))
    const quantity = useSelector(state=>state.cart.quantity)
    // const cart = useSelector(state=>state.cart)
    // console.log(cart)
  return (
    <Container>
        <Wrapper>
        <Left>
            <Language>EN</Language>
            <SearchContainer>
                <Input />
                <Search style={{color:"gray", fontSize:16}}/>
            </SearchContainer>
        </Left>
        <Center>
            <Link to="/" style={{ color: 'black' }}>
            <Logo>Just bAIy</Logo>
            </Link>
        </Center>
        <Right>
            <MenuItem>REGISTER</MenuItem>
            <MenuItem>SIGN IN</MenuItem>
            <Link to="/cart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingBasketOutlined />
                    </Badge>
                </MenuItem>
            </Link>
        </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar