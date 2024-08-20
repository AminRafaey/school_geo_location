import React from "react";
import ContainerMUI from "@mui/material/Container";
import { styled } from "@mui/system";

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 9,
}));

const FixedContainer = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: '#282828',
  top: 0,
  zIndex: 10,
  boxShadow: '0px 3px 0px rgba(24, 24, 24, 0.35)',
  borderRadius: '8px 8px 0px 0px',
}));

const Wrapper = styled(ContainerMUI)(({ theme }) => ({
  padding: '8px 0',
  display: 'flex !important',
  alignItems: 'center !important',
  height: '51px',
}));

const Item = styled('h1')(({ theme }) => ({
  fontSize: '15px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  margin: '0 15px 0 0',
  cursor: 'pointer',
  textDecoration: 'none',
  color: '#FCFCFC',
}));

const CloseIcon = styled('img')(({ theme }) => ({
  height: '44px',
  width: '44px',
  padding: '15.63px',
  position: 'absolute',
  right: '8px',
  cursor: 'pointer',
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '44px',
  width: '44px',
  position: 'absolute',
  left: '8px',
  cursor: 'pointer',
}));

const RightIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '44px',
  width: '44px',
  position: 'absolute',
  right: '8px',
  cursor: 'pointer',
}));

const TitleWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}));
export const HeaderModal: React.FC<{
  title?: string;
  onClick?: () => void;
  onIconLeftClick?: () => void;
  onIconRightClick?: () => void;
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
  isIconTrue?: boolean;
  headerStyle?: React.CSSProperties;
}> = ({
  title,
  onClick,
  onIconLeftClick,
  onIconRightClick,
  IconLeft,
  IconRight,
  isIconTrue = true,
  headerStyle,
}) => {
  return (
    <>
      <Container id="scroll-dialog-title">
        <FixedContainer
          style={{
            ...headerStyle,
          }}
        >
          <Wrapper maxWidth="md">
            <TitleWrapper>
              <Item>{title || ""}</Item>
            </TitleWrapper>
            {IconLeft && (
              <IconWrapper onClick={onIconLeftClick}>{IconLeft}</IconWrapper>
            )}
            {IconRight && (
              <RightIconWrapper onClick={onIconRightClick}>
                {IconRight}
              </RightIconWrapper>
            )}
            {isIconTrue && !IconRight && (
              <CloseIcon src="/icons/close.svg" onClick={onClick} />
            )}
          </Wrapper>
        </FixedContainer>
      </Container>
    </>
  );
};
