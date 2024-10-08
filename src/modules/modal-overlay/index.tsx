import React from 'react';
import { HeaderModal } from '../headers/HeaderModal';
import { StyledDialog } from '@/shared/components/StyledDialog';

type ModalOverlayProps = {
  onCloseClick?: () => void | undefined | any;
  onIconLeftClick?: () => void | undefined | any;
  onIconRightClick?: () => void | undefined | any;
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
  title?: string;
  open: boolean;
  color?: string | undefined;
  height?: string | number;
  maxWidth?: string | number;
  width?: string | number;
  isHeaderHidden?: boolean;
  isIconTrue?: boolean;
  alignItems?: string;
  borderRadius?: string;
  children: React.ReactNode;
  headerStyle?: React.CSSProperties;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  onCloseClick,
  onIconLeftClick,
  onIconRightClick,
  IconLeft,
  IconRight,
  title,
  open,
  color,
  height,
  maxWidth,
  width,
  isHeaderHidden,
  isIconTrue = true,
  children,
  alignItems,
  borderRadius,
  headerStyle,
}) => {
  return (
    <StyledDialog
      open={open}
      scroll="paper"
      color={color || '#282828'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      width={width}
      height={height}
      maxWidth={maxWidth}
      alignItems={alignItems}
      borderRadius={borderRadius}
      onClick={() => {
        // @ts-ignore
        onCloseClick();
      }}
      onIconLeftClick={() => {
        // @ts-ignore
        onIconLeftClick();
      }}
      PaperProps={{
        onClick: (e:any) => {
          e.stopPropagation();
        },
      }}
    >
      {!isHeaderHidden && (
        <HeaderModal
          onIconLeftClick={onIconLeftClick}
          onIconRightClick={onIconRightClick}
          IconRight={IconRight}
          IconLeft={IconLeft}
          onClick={onCloseClick}
          title={title}
          isIconTrue={isIconTrue}
          headerStyle={headerStyle}
        />
      )}
      {children}
    </StyledDialog>
  );
};

export default ModalOverlay;
