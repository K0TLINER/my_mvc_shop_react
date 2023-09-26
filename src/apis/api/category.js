import { defaultInstance } from "../utils/instance";

const ADMIN_CATEGORY_URI = "/admin/category";

export const getCategoryByParentId = async (parentCategoryId) => {
  try {
    const { data } = await defaultInstance.get(
      `${ADMIN_CATEGORY_URI}/getList`,
      {
        params: {
          parentCategoryId: parentCategoryId,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
