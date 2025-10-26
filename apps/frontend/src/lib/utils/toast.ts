import toast from 'react-hot-toast';

/**
 * Toast notification utilities
 */
export const toastUtils = {
  /**
   * Show success toast
   */
  success: (message: string) => {
    toast.success(message);
  },

  /**
   * Show error toast
   */
  error: (message: string) => {
    toast.error(message);
  },

  /**
   * Show loading toast
   */
  loading: (message: string) => toast.loading(message),

  /**
   * Show info toast
   */
  info: (message: string) => {
    toast(message, {
      icon: 'ℹ️',
    });
  },

  /**
   * Dismiss a specific toast
   */
  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },

  /**
   * Promise toast - shows loading, then success/error based on promise result
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    },
  ) => toast.promise(promise, messages),
};

export default toastUtils;
