import Layout from "@/contexts/shared/components/Layout";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { t } = useTranslation();

	return (
    <Layout pageTitle={t('dashboard.settings.general')}>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full flex-0">
          <div className="bg-white border-0 shadow-xl rounded-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita dolores odit aperiam laudantium quae aliquid itaque doloremque vitae. Expedita est excepturi quia sequi alias cumque porro pariatur! Est, sed. Beatae?
          </div>
        </div>
      </div>
    </Layout>
	);
}

export default SettingsPage
