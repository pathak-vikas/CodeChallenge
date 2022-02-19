import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectActiveItem } from "../../features/forms/ActiveItemSlice";
import { selectAddCart, setAddCart } from "../../features/forms/AddCartSlice";
import {
  selectOrderItem,
  setOrderItem,
} from "../../features/forms/orderItemsSlice";

function AddCartForm() {
  const orderItem = useSelector(selectOrderItem);
  const addCart = useSelector(selectAddCart);
  const activeItem = useSelector(selectActiveItem);
  let dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = () => {
    dispatch(
      setOrderItem([
        ...orderItem,
        {
          id: activeItem.id,
          name: activeItem.name,
          price: activeItem.price,
          quantity: quantity,
          restaurant: activeItem.restaurant,
        },
      ])
    );
  };

  return (
    <div>
      {addCart && (
        <AddWellWrapper>
          <FormContainer
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              dispatch(setAddCart(false));
            }}
          >
            <FormTitle>
              <span>Add to Cart</span>
              <span
                onClick={() => {
                  dispatch(setAddCart(false));
                }}
              >
                X
              </span>
            </FormTitle>

            {activeItem !== null && (
              <div>
                <div>{activeItem.name}</div>
                <div>Price - {activeItem.price}</div>
              </div>
            )}

            <InputGroup>
              <label>Enter Quantity</label>
              <input
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                type="number"
                placeholder="enter quantity"
                required
              />
              <small className="text-muted">*required</small>
            </InputGroup>

            <InputGroup>
              <ButtonSubmissionSet>
                <button>Add to Cart</button>
              </ButtonSubmissionSet>
            </InputGroup>
          </FormContainer>
        </AddWellWrapper>
      )}
    </div>
  );
}

const FormTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:20px;
    & > span {
    font-weight: 600;
    text-transform: capitalize;
    font-size: 12px;
    color: black;
    padding: 2px;
    border-radius:7px;
    border-radius:50%;
    
    }
    & > span:first-child{
        font-size:15px;
    }

    & > span:last-child{
        font-weight: bold;
        color:black;
        display:flex;
        justify-content:center;
        align-items:center;
        height:20px;
        width:20px;
        cursor:pointer;
    }

    & > span:last-child:hover{
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
    }
  }`;

const AddWellWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11100;
  }`;

const ButtonSubmissionSet = styled.div`
    display: flex;
    justify-content: space-between;
    button {
      color: white;
      padding: 5px 20px;
      border-radius: 5px;
      background-color: silver;
      outline: none;
      cursor: pointer;
      border: none;
      &:first-child {
        background: green;
      }
    }
  }`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  small {
    color: red;
  }
  label {
    padding: 0.4rem 0rem;
  }
  select {
    line-height: 30px;
    border-radius: 10px;
    padding: 0px 10px;
    margin-bottom: 5px;
    height: 30px;
    outline: none;
    width: 100%;
    cursor: pointer;
    border: 1px solid black;
    option {
      background: silver;
    }
  }
  input {
    line-height: 30px;
    border-radius: 10px;
    padding: 0px 10px;
    margin-bottom: 5px;
    height: 30px;
    outline: none;
    width: 100%;
    border: 1px solid black;
  }

  textarea {
    border-radius: 10px;
    padding: 0px 10px;
    margin-bottom: 5px;
    height: 100px;
    outline: none;
    width: 100%;
    border: 1px solid black;
  }
`;

const FormContainer = styled.form`
  background: #eeeaea;
  width: 50%;
  height: 70%;
  padding: 50px;
  padding-top: 5px;
  border-radius: 10px;
  box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
`;

export default AddCartForm;
