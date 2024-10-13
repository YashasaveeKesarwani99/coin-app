// custom hook for notifying error to user

import { useSnackbar } from "notistack";

export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();
  const error = (message: string) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  return {
    error,
  };
};
