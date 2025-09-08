import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SettingsMap } from "@/contexts/settings/libs/types";
import { useAlert } from "@/contexts/shared/contexts/AlertContext";
import { useTranslation } from "react-i18next";
import updateSettings from "@/contexts/settings/actions/updateSettings";

export const useSettings = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation()
  const { showAlert } = useAlert()

  const { mutateAsync: update, isPending: updating } = useMutation({
    mutationFn: (payload: SettingsMap) => updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] })
      showAlert(t('controller.updated'), "success")
    },
    onError: (err: Error) => showAlert(err.message, 'error')
  });

  return { update, updating };
};