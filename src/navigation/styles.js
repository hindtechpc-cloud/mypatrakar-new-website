import styled from "styled-components";

export const NavbarContainer = styled.header`
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
`;

export const MenuButton = styled.button`
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export const DropdownMenu = styled.div`
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s, transform 0.2s;
`;