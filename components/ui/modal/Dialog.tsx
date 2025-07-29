import React from 'react';
import { Modal, type ModalProps } from './Modal';
import { Button } from '../button/Button';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import styles from './Dialog.module.css';

export type DialogType = 'info' | 'success' | 'warning' | 'error' | 'confirm';

export interface DialogProps extends Omit<ModalProps, 'children' | 'footer'> {
  type?: DialogType;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  icon?: React.ReactNode;
}

const dialogIcons: Record<DialogType, React.ReactNode> = {
  info: <Info className="h-6 w-6" />,
  success: <CheckCircle className="h-6 w-6" />,
  warning: <AlertTriangle className="h-6 w-6" />,
  error: <XCircle className="h-6 w-6" />,
  confirm: <AlertTriangle className="h-6 w-6" />,
};

const dialogColors: Record<DialogType, string> = {
  info: styles.info,
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
  confirm: styles.warning,
};

export const Dialog: React.FC<DialogProps> = ({
  type = 'info',
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  showCancelButton = type === 'confirm',
  icon,
  onClose,
  ...modalProps
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const dialogIcon = icon || dialogIcons[type];

  return (
    <Modal
      {...modalProps}
      onClose={onClose}
      size="sm"
      className={styles.dialog}
      showCloseButton={false}
    >
      <div className={styles.content}>
        {dialogIcon && (
          <div className={`${styles.iconWrapper} ${dialogColors[type]}`}>
            {dialogIcon}
          </div>
        )}
        
        <div className={styles.message}>
          {message}
        </div>
      </div>

      <div className={styles.actions}>
        {showCancelButton && (
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
        )}
        
        <Button
          variant={type === 'error' ? 'danger' : 'primary'}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

// Convenience components for specific dialog types
export const InfoDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <Dialog {...props} type="info" />
);

export const SuccessDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <Dialog {...props} type="success" />
);

export const WarningDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <Dialog {...props} type="warning" />
);

export const ErrorDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <Dialog {...props} type="error" />
);

export const ConfirmDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <Dialog {...props} type="confirm" showCancelButton />
);