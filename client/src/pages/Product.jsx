import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";


const Container = styled.div``;

const Wrapper = styled.div`
display: flex;
padding: 50px;
`;

const ImgContainer = styled.div`
flex:1;
`;

const Image = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;
`;

const InfoContainer = styled.div`
flex:1;
padding: 0px 50px;
`;

const Title = styled.h1`
font-weight: 200
`;

const Desc = styled.p`
margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 30px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: ${props=>props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`;

const FilterSize = styled.select`
margin-left: 5px;
padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;
`;

const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
`;

const Amount = styled.span`
width: 30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display:flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
`;

const Button = styled.button`
padding: 15px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: bolder;

&:hover{
    background-color:#f8f4f4;
}
`;





const Product = () => {
    const location = useLocation()
    const id=location.pathname.split("/")[2]
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch()

    useEffect(()=>{
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/"+id)
                setProduct(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getProduct()
    },[id]);

    const handleClick = () => {
        //update cart
        dispatch(addProduct({...product,quantity,color,size}))
    }
    

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                    {product.desc}
                </Desc>
                <Price>₹ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map((c)=>(
                            <FilterColor color={c.toLowerCase()} key={c} onClick={()=>setColor(c)}/>
                        ))}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=>setSize(e.target.value)}>
                            {product.size?.map((z)=>(
                                <FilterSizeOption key={z} >{z}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>{setQuantity(quantity>1 ? quantity-1:1)}}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick={()=>{setQuantity(quantity+1)}}/>
                    </AmountContainer>
                    <Button onClick={handleClick}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Product