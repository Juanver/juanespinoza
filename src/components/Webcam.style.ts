import styled from "styled-components";

export const ContainerVideo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  video {
    width: 500px;
    height: 300px;
    background-color: #ddd;
  }
`;
export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 15px auto;
`;
export const Button = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid teal;
  border-radius: 6px;
  color: #fff;
  background-color: teal;
  margin: 0 10px;
`;
