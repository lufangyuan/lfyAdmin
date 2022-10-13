import useUserStore from "./modules/user";
import useAppStore from "./modules/app";
import useTagsViewStore from "./modules/tagsView";

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  tagsView: useTagsViewStore(),
});

export default useStore;
