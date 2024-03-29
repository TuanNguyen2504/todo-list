import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '~/configs/query-client';
import { ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/key';
import { Category } from '~/types/Category';

const deleteCategory = async ({ id }: Pick<Category, 'id'>) => {
  return axiosInstance.delete(ENDPOINT.DELETE_CATEGORY.replace(':id', id));
};

export const CategoryItem = (props: Category) => {
  const { id, name, icon, color } = props;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.setQueriesData<Category[]>({ queryKey: [QUERY_KEY.CATEGORIES] }, (prevData) => {
        return prevData?.filter((item) => item.id !== id);
      });
    }
  });

  const handleDelete = () => {
    if (mutation.isPending) return;
    mutation.mutate({ id });
  };

  return (
    <div className="flex flex-col gap-2" title={name}>
      <div
        className="relative flex items-center justify-center w-16 h-16 mx-auto overflow-hidden rounded-lg cursor-pointer group"
        style={{ backgroundColor: color }}
      >
        <img className="w-8 h-8" src={icon} />
        <span
          className="absolute flex items-center justify-center invisible w-full h-full transition-all opacity-0 bg-gray-800/70 group-hover:visible group-hover:opacity-100"
          onClick={handleDelete}
        >
          {mutation.isPending ? (
            <span className="loading text-error loading-spinner"></span>
          ) : (
            <span className="w-5 h-5 text-error cursor-pointer hover:scale-110 transition-transform icon-[ph--trash-simple-fill]"></span>
          )}
        </span>
      </div>
      <div className="max-w-full text-sm text-center truncate text-base-content/80">{name}</div>
    </div>
  );
};

export default CategoryItem;
