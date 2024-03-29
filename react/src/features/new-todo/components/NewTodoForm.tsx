import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { axiosInstance } from '~/configs/query-client';
import { ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/key';
import { Todo } from '~/types/Todo';
import CategorySelect from './CategorySelect';

const MAX = { TITLE: 100 };

const schema = yup.object({ title: yup.string().trim().required().max(MAX.TITLE) });

type TodoForm = Pick<Todo, 'title' | 'categoryId'>;

const addTodo = (todo: TodoForm) => {
  const now = new Date();
  return axiosInstance.post(ENDPOINT.POST_NEW_TODO, {
    ...todo,
    id: uuidv4(),
    isCompleted: false,
    createdAt: now,
    updatedAt: now
  });
};

export const NewTodoForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<TodoForm>({
    resolver: yupResolver(schema)
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTodo,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      onSuccess();
      toast.success('Success');
      reset({ title: '' });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] });
    }
  });

  const handleAddTodo = (todo: TodoForm) => {
    mutation.mutate(todo);
  };

  return (
    <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit(handleAddTodo)}>
      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span className={clsx('label-text', { 'text-error': errors.title })}>Title:</span>
        </div>
        <input
          type="text"
          placeholder="Enter title"
          className={clsx('w-full max-w-xs input input-bordered input-sm', { 'input-error': errors.title })}
          maxLength={MAX.TITLE}
          autoFocus
          {...register('title')}
        />
        {errors.title && (
          <div className="label">
            <span className="label-text-alt text-error">{errors.title.message}</span>
          </div>
        )}
      </label>

      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span className="label-text">Category:</span>
        </div>
        <CategorySelect
          onSelect={(id) => {
            setValue('categoryId', id, { shouldValidate: true });
          }}
          value={getValues('categoryId')}
        />
      </label>

      <button className="btn btn-primary btn-md">
        {mutation.isPending && <span className="loading loading-spinner"></span>}
        Submit
      </button>
    </form>
  );
};

export default NewTodoForm;
