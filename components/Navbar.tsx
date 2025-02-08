"use client";
import React from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import styled from "styled-components";

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #2c3e50;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ecf0f1;
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
`;

const NavItem = styled.li`
  a {
    text-decoration: none;
    color: white;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s;
    
    &:hover {
      color: #f5a623;
    }
  }
`;

const ProfileLink = styled(NavItem)`
  margin-left: auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Navbar: React.FC = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <NavbarWrapper>
      <Logo>
        <a href="/">Craftify AI</a>
      </Logo>
      <NavList>
        <NavItem>
          <a href="/Generate">Image Generator</a>
        </NavItem>
        <NavItem>
          <a href="/Remove">BackGround Remover</a>
        </NavItem>
        <NavItem>
          <a href="/Edit">BG Replacer AI</a>
        </NavItem>
        <ProfileLink>
          <a href="/Profile">Profile</a>
        </ProfileLink>
      </NavList>
      <UserButton />
    </NavbarWrapper>
  );
};

export default Navbar;
